import express from 'express';
import { requireAuth } from '../middleware/auth';
import { 
  upload, 
  processAndSaveImage, 
  saveImageToDatabase, 
  getEntityImages, 
  deleteImage, 
  setMainImage,
  getImageUrl,
  createImageServingMiddleware
} from '../utils/imageUpload';
import { query } from '../db/database';
import { ImageUploadResponse } from '../types';

const router = express.Router();

// Serve images statically
router.get('/images/*', createImageServingMiddleware());

// Upload image for produkti
router.post('/produkti/:id/images', requireAuth, upload.single('image'), async (req, res) => {
  try {
    const admin = (req as any).user;
    const produktId = parseInt(req.params.id!);
    const file = req.file;
    const isMain = req.body.isMain === 'true';

    if (!file) {
      return res.status(400).json({
        success: false,
        error: 'No image file provided'
      });
    }

    // Verify that the product exists and belongs to the admin
    const product = await query(
      'SELECT admin_id FROM produkti WHERE id = ?',
      [produktId]
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    if (product.admin_id !== admin.userId) {
      return res.status(403).json({
        success: false,
        error: 'Access denied: You can only upload images to your own products'
      });
    }

    // Process and save the image
    const imageData = await processAndSaveImage(file, 'produkti', produktId);
    const imageId = await saveImageToDatabase(
      imageData, 
      'produkti', 
      produktId, 
      admin.userId, 
      isMain
    );

    const response: ImageUploadResponse = {
      success: true,
      data: {
        id: imageId,
        uuid: imageData.uuid,
        url: getImageUrl(imageData.filePath),
        original_name: imageData.originalName,
        file_size: imageData.fileSize,
        width: imageData.width,
        height: imageData.height,
        is_main: isMain,
      }
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Error uploading product image:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to upload image'
    });
  }
});

// Upload image for aktualitates
router.post('/aktualitates/:id/images', requireAuth, upload.single('image'), async (req, res) => {
  try {
    const admin = (req as any).user;
    const aktualitateId = parseInt(req.params.id!);
    const file = req.file;
    const isMain = req.body.isMain === 'true';

    if (!file) {
      return res.status(400).json({
        success: false,
        error: 'No image file provided'
      });
    }

    // Verify that the aktualitate exists and belongs to the admin
    const aktualitate = await query(
      'SELECT admin_id FROM aktualitates WHERE id = ?',
      [aktualitateId]
    );

    if (!aktualitate) {
      return res.status(404).json({
        success: false,
        error: 'Aktualitate not found'
      });
    }

    if (aktualitate.admin_id !== admin.userId) {
      return res.status(403).json({
        success: false,
        error: 'Access denied: You can only upload images to your own aktualitates'
      });
    }

    // Process and save the image
    const imageData = await processAndSaveImage(file, 'aktualitates', aktualitateId);
    const imageId = await saveImageToDatabase(
      imageData, 
      'aktualitates', 
      aktualitateId, 
      admin.userId, 
      isMain
    );

    const response: ImageUploadResponse = {
      success: true,
      data: {
        id: imageId,
        uuid: imageData.uuid,
        url: getImageUrl(imageData.filePath),
        original_name: imageData.originalName,
        file_size: imageData.fileSize,
        width: imageData.width,
        height: imageData.height,
        is_main: isMain,
      }
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Error uploading aktualitate image:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to upload image'
    });
  }
});

// Get images for produkti
router.get('/produkti/:id/images', async (req, res) => {
  try {
    const produktId = parseInt(req.params.id!);
    
    const images = await getEntityImages('produkti', produktId);
    
    const formattedImages = images.map(img => ({
      id: img.id,
      uuid: img.uuid,
      url: getImageUrl(img.file_path),
      original_name: img.original_name,
      file_size: img.file_size,
      width: img.width,
      height: img.height,
      is_main: Boolean(img.is_main),
      created_at: img.created_at,
    }));

    res.json({
      success: true,
      data: formattedImages
    });
  } catch (error) {
    console.error('Error fetching product images:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch images'
    });
  }
});

// Get images for aktualitates
router.get('/aktualitates/:id/images', async (req, res) => {
  try {
    const aktualitateId = parseInt(req.params.id!);
    
    const images = await getEntityImages('aktualitates', aktualitateId);
    
    const formattedImages = images.map(img => ({
      id: img.id,
      uuid: img.uuid,
      url: getImageUrl(img.file_path),
      original_name: img.original_name,
      file_size: img.file_size,
      width: img.width,
      height: img.height,
      is_main: Boolean(img.is_main),
      created_at: img.created_at,
    }));

    res.json({
      success: true,
      data: formattedImages
    });
  } catch (error) {
    console.error('Error fetching aktualitate images:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch images'
    });
  }
});

// Delete image
router.delete('/images/:id', requireAuth, async (req, res) => {
  try {
    const admin = (req as any).user;
    const imageId = parseInt(req.params.id!);

    const success = await deleteImage(imageId, admin.userId);

    if (!success) {
      return res.status(404).json({
        success: false,
        error: 'Image not found or access denied'
      });
    }

    res.json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete image'
    });
  }
});

// Set main image
router.put('/images/:id/main', requireAuth, async (req, res) => {
  try {
    const admin = (req as any).user;
    const imageId = parseInt(req.params.id!);
    const { entityType, entityId } = req.body;

    if (!entityType || !entityId) {
      return res.status(400).json({
        success: false,
        error: 'entityType and entityId are required'
      });
    }

    if (!['produkti', 'aktualitates'].includes(entityType)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid entityType. Must be "produkti" or "aktualitates"'
      });
    }

    const success = await setMainImage(imageId, entityType, entityId, admin.userId);

    if (!success) {
      return res.status(404).json({
        success: false,
        error: 'Image not found or access denied'
      });
    }

    res.json({
      success: true,
      message: 'Main image updated successfully'
    });
  } catch (error) {
    console.error('Error setting main image:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to set main image'
    });
  }
});

export default router;
