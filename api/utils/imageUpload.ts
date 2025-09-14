import multer from 'multer';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as fs from 'fs';
import { promisify } from 'util';
import { run, query, queryAll } from '../db/database';

const mkdir = promisify(fs.mkdir);
const access = promisify(fs.access);

// Configuration for image processing
export const IMAGE_CONFIG = {
  maxWidth: 1920,
  maxHeight: 1080,
  quality: 85,
  format: 'webp' as const,
  thumbnailSize: 300,
  allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  maxFileSize: 10 * 1024 * 1024, // 10MB
};

// Ensure uploads directory exists
const UPLOADS_DIR = path.join(process.cwd(), 'uploads');
const IMAGES_DIR = path.join(UPLOADS_DIR, 'images');

export async function ensureUploadsDir(): Promise<void> {
  try {
    await access(UPLOADS_DIR);
  } catch {
    await mkdir(UPLOADS_DIR, { recursive: true });
  }

  try {
    await access(IMAGES_DIR);
  } catch {
    await mkdir(IMAGES_DIR, { recursive: true });
  }
}

// Multer configuration for memory storage
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: IMAGE_CONFIG.maxFileSize,
  },
  fileFilter: (req, file, cb) => {
    if (IMAGE_CONFIG.allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.'));
    }
  },
});

export interface ProcessedImage {
  uuid: string;
  originalName: string;
  fileName: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
  width: number;
  height: number;
}

export async function processAndSaveImage(
  file: Express.Multer.File,
  entityType: 'produkti' | 'aktualitates',
  entityId: number
): Promise<ProcessedImage> {
  await ensureUploadsDir();

  const imageUuid = uuidv4();
  const fileName = `${imageUuid}.${IMAGE_CONFIG.format}`;
  const filePath = path.join(IMAGES_DIR, fileName);

  // Process image with sharp
  const processedImage = await sharp(file.buffer)
    .resize(IMAGE_CONFIG.maxWidth, IMAGE_CONFIG.maxHeight, {
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality: IMAGE_CONFIG.quality })
    .toFile(filePath);

  // Get metadata
  const metadata = await sharp(filePath).metadata();

  return {
    uuid: imageUuid,
    originalName: file.originalname,
    fileName,
    filePath: path.relative(process.cwd(), filePath),
    fileSize: processedImage.size,
    mimeType: 'image/webp',
    width: metadata.width || 0,
    height: metadata.height || 0,
  };
}

export async function saveImageToDatabase(
  imageData: ProcessedImage,
  entityType: 'produkti' | 'aktualitates',
  entityId: number,
  adminId: number,
  isMain: boolean = false
): Promise<number> {
  const result = await run(
    `
    INSERT INTO images (
      uuid, original_name, file_name, file_path, file_size, 
      mime_type, width, height, entity_type, entity_id, 
      is_main, admin_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
    [
      imageData.uuid,
      imageData.originalName,
      imageData.fileName,
      imageData.filePath,
      imageData.fileSize,
      imageData.mimeType,
      imageData.width,
      imageData.height,
      entityType,
      entityId,
      isMain ? 1 : 0,
      adminId,
    ]
  );

  return result.lastID!;
}

export async function getEntityImages(
  entityType: 'produkti' | 'aktualitates',
  entityId: number
): Promise<any[]> {
  return await queryAll(
    `
    SELECT * FROM images 
    WHERE entity_type = ? AND entity_id = ? 
    ORDER BY is_main DESC, created_at ASC
  `,
    [entityType, entityId]
  );
}

export async function deleteImage(imageId: number, adminId: number): Promise<boolean> {
  // Get image info first
  const image = await query('SELECT * FROM images WHERE id = ? AND admin_id = ?', [
    imageId,
    adminId,
  ]);

  if (!image) {
    return false;
  }

  // Delete file from filesystem
  const fullPath = path.join(process.cwd(), image.file_path);
  try {
    await promisify(fs.unlink)(fullPath);
  } catch (error) {
    console.warn(`Failed to delete file ${fullPath}:`, error);
  }

  // Delete from database
  const result = await run('DELETE FROM images WHERE id = ? AND admin_id = ?', [imageId, adminId]);

  return result.changes > 0;
}

export async function setMainImage(
  imageId: number,
  entityType: 'produkti' | 'aktualitates',
  entityId: number,
  adminId: number
): Promise<boolean> {
  // First, unset all main images for this entity
  await run(
    `
    UPDATE images 
    SET is_main = 0 
    WHERE entity_type = ? AND entity_id = ?
  `,
    [entityType, entityId]
  );

  // Set the specified image as main
  const result = await run(
    `
    UPDATE images 
    SET is_main = 1 
    WHERE id = ? AND admin_id = ? AND entity_type = ? AND entity_id = ?
  `,
    [imageId, adminId, entityType, entityId]
  );

  return result.changes > 0;
}

export function getImageUrl(imagePath: string): string {
  // Remove 'uploads/images/' prefix if present and add API prefix
  const cleanPath = imagePath.replace(/^uploads\/images\//, '');
  return `/api/images/${cleanPath}`;
}

// Middleware for serving images
export function createImageServingMiddleware() {
  return async (req: any, res: any, next: any) => {
    try {
      const imagePath = req.params[0]; // Capture the full path
      const fullPath = path.join(IMAGES_DIR, imagePath);

      // Security check - ensure path is within images directory
      const resolvedPath = path.resolve(fullPath);
      const resolvedImagesDir = path.resolve(IMAGES_DIR);

      if (!resolvedPath.startsWith(resolvedImagesDir)) {
        return res.status(403).json({ error: 'Access denied' });
      }

      // Check if file exists
      try {
        await access(fullPath);
      } catch {
        return res.status(404).json({ error: 'Image not found' });
      }

      // Set appropriate headers
      res.setHeader('Content-Type', 'image/webp');
      res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year

      // Stream the file
      const fileStream = fs.createReadStream(fullPath);
      fileStream.pipe(res);
    } catch (error) {
      console.error('Error serving image:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}
