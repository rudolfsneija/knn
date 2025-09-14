import express from 'express';
import { query, queryAll, run } from '../db/database';
import { requireAuth } from '../middleware/auth';
import { Aktualitate, CreateAktualitateRequest, UpdateAktualitateRequest } from '../types';
import { getEntityImages, getImageUrl } from '../utils/imageUpload';

const router = express.Router();

// GET /api/aktualitates - Get all aktualitates (public endpoint)
router.get('/', async (req, res) => {
  try {
    const { published } = req.query;

    let sql = `
      SELECT a.*, u.username as admin_username 
      FROM aktualitates a 
      LEFT JOIN users u ON a.admin_id = u.id
    `;
    let params: any[] = [];

    // Filter by published status if specified
    if (published !== undefined) {
      sql += ' WHERE a.published = ?';
      params.push(published === 'true' ? 1 : 0);
    }

    sql += ' ORDER BY a.created_at DESC';

    const aktualitates = await queryAll(sql, params);

    // Add images to each aktualitate
    const aktualitatesWithImages = await Promise.all(
      aktualitates.map(async (aktualitate) => {
        const images = await getEntityImages('aktualitates', aktualitate.id);
        const formattedImages = images.map((img) => ({
          id: img.id,
          uuid: img.uuid,
          url: getImageUrl(img.file_path),
          original_name: img.original_name,
          file_size: img.file_size,
          width: img.width,
          height: img.height,
          is_main: Boolean(img.is_main),
        }));

        return {
          ...aktualitate,
          published: Boolean(aktualitate.published),
          images: formattedImages,
          main_image: formattedImages.find((img) => img.is_main) || formattedImages[0] || null,
        };
      })
    );

    res.json({
      success: true,
      count: aktualitatesWithImages.length,
      data: aktualitatesWithImages,
    });
  } catch (error) {
    console.error('Error fetching aktualitates:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch aktualitates',
    });
  }
});

// GET /api/aktualitates/:id - Get single aktualitate by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const aktualitate = await query(
      `
      SELECT a.*, u.username as admin_username 
      FROM aktualitates a 
      LEFT JOIN users u ON a.admin_id = u.id 
      WHERE a.id = ?
    `,
      [id]
    );

    if (!aktualitate) {
      return res.status(404).json({
        success: false,
        error: 'Aktualitate not found',
      });
    }

    // Get images for this aktualitate
    const images = await getEntityImages('aktualitates', aktualitate.id);
    const formattedImages = images.map((img) => ({
      id: img.id,
      uuid: img.uuid,
      url: getImageUrl(img.file_path),
      original_name: img.original_name,
      file_size: img.file_size,
      width: img.width,
      height: img.height,
      is_main: Boolean(img.is_main),
    }));

    const aktualitateWithImages = {
      ...aktualitate,
      images: formattedImages,
      main_image: formattedImages.find((img) => img.is_main) || formattedImages[0] || null,
    };

    res.json({
      success: true,
      data: aktualitateWithImages,
    });
  } catch (error) {
    console.error('Error fetching aktualitate:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch aktualitate',
    });
  }
});

// POST /api/aktualitates - Create new aktualitate (admin only)
router.post('/', requireAuth, async (req, res) => {
  try {
    const admin = (req as any).user;
    const { title, content, excerpt, image_url, published, created_at }: CreateAktualitateRequest =
      req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        error: 'Title and content are required',
      });
    }

    const result = await run(
      `
      INSERT INTO aktualitates (title, content, excerpt, image_url, published, admin_id, created_at) 
      VALUES (?, ?, ?, ?, ?, ?, COALESCE(?, CURRENT_TIMESTAMP))
    `,
      [
        title,
        content,
        excerpt || null,
        image_url || null,
        published ? 1 : 0,
        admin.userId,
        created_at,
      ]
    );

    const newAktualitate = await query(
      `
      SELECT a.*, u.username as admin_username 
      FROM aktualitates a 
      LEFT JOIN users u ON a.admin_id = u.id 
      WHERE a.id = ?
    `,
      [result.lastID]
    );

    res.status(201).json({
      success: true,
      message: 'Aktualitate created successfully',
      data: newAktualitate,
    });
  } catch (error) {
    console.error('Error creating aktualitate:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create aktualitate',
    });
  }
});

// PUT /api/aktualitates/:id - Update aktualitate (admin only)
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const admin = (req as any).user;
    const { id } = req.params;
    const { title, content, excerpt, image_url, published, created_at }: UpdateAktualitateRequest =
      req.body;

    // Check if aktualitate exists and belongs to admin
    const existingAktualitate = await query('SELECT admin_id FROM aktualitates WHERE id = ?', [id]);

    if (!existingAktualitate) {
      return res.status(404).json({
        success: false,
        error: 'Aktualitate not found',
      });
    }

    // Allow admin to edit their own aktualitates
    if (existingAktualitate.admin_id !== admin.userId) {
      return res.status(403).json({
        success: false,
        error: 'Access denied: You can only edit your own aktualitates',
      });
    }

    await run(
      `
      UPDATE aktualitates 
      SET title = COALESCE(?, title),
          content = COALESCE(?, content),
          excerpt = COALESCE(?, excerpt),
          image_url = COALESCE(?, image_url),
          published = COALESCE(?, published),
          created_at = COALESCE(?, created_at),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `,
      [
        title,
        content,
        excerpt,
        image_url,
        published !== undefined ? (published ? 1 : 0) : null,
        created_at,
        id,
      ]
    );

    const updatedAktualitate = await query(
      `
      SELECT a.*, u.username as admin_username 
      FROM aktualitates a 
      LEFT JOIN users u ON a.admin_id = u.id 
      WHERE a.id = ?
    `,
      [id]
    );

    res.json({
      success: true,
      data: updatedAktualitate,
    });
  } catch (error) {
    console.error('Error updating aktualitate:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update aktualitate',
    });
  }
});

// DELETE /api/aktualitates/:id - Delete aktualitate (admin only)
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const admin = (req as any).user;
    const { id } = req.params;

    // Check if aktualitate exists and belongs to admin
    const existingAktualitate = await query('SELECT admin_id FROM aktualitates WHERE id = ?', [id]);

    if (!existingAktualitate) {
      return res.status(404).json({
        success: false,
        error: 'Aktualitate not found',
      });
    }

    if (existingAktualitate.admin_id !== admin.userId) {
      return res.status(403).json({
        success: false,
        error: 'Access denied: You can only delete your own aktualitates',
      });
    }

    await run('DELETE FROM aktualitates WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Aktualitate deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting aktualitate:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete aktualitate',
    });
  }
});

export default router;
