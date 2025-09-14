import express from 'express';
import { query, queryAll, run } from '../db/database';
import { requireAuth } from '../middleware/auth';
import { Produkts, CreateProduktsRequest, UpdateProduktsRequest } from '../types';
import { getEntityImages, getImageUrl } from '../utils/imageUpload';

const router = express.Router();

// GET /api/produkti/categories - Get all unique categories (public endpoint)
router.get('/categories', async (req, res) => {
  try {
    const categories = await queryAll(`
      SELECT DISTINCT category 
      FROM produkti 
      WHERE category IS NOT NULL 
        AND category != ''
      ORDER BY category ASC
    `);

    const categoryList = categories.map((row) => row.category);

    res.json({
      success: true,
      count: categoryList.length,
      data: categoryList,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch categories',
    });
  }
});

// GET /api/produkti/specification-keys - Get all unique specification keys (admin only)
router.get('/specification-keys', requireAuth, async (req, res) => {
  try {
    const products = await queryAll(`
      SELECT specifications 
      FROM produkti 
      WHERE specifications IS NOT NULL 
        AND specifications != ''
        AND specifications != '{}'
    `);

    const allKeys = new Set<string>();

    // Extract all specification keys from all products
    products.forEach((product) => {
      try {
        const specs = JSON.parse(product.specifications);
        if (specs && typeof specs === 'object') {
          Object.keys(specs).forEach((key) => {
            if (key && key.trim() !== '') {
              allKeys.add(key.trim());
            }
          });
        }
      } catch (error) {
        console.warn('Failed to parse specifications for product:', error);
      }
    });

    const keysList = Array.from(allKeys).sort();

    res.json({
      success: true,
      count: keysList.length,
      data: keysList,
    });
  } catch (error) {
    console.error('Error fetching specification keys:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch specification keys',
    });
  }
});

// GET /api/produkti - Get all products (public endpoint)
router.get('/', async (req, res) => {
  try {
    const { available, featured, category } = req.query;

    let sql = `
      SELECT p.*, u.username as admin_username 
      FROM produkti p 
      LEFT JOIN users u ON p.admin_id = u.id
    `;
    let params: any[] = [];
    let conditions: string[] = [];

    // Filter by availability
    if (available !== undefined) {
      conditions.push('p.available = ?');
      params.push(available === 'true' ? 1 : 0);
    }

    // Filter by featured status
    if (featured !== undefined) {
      conditions.push('p.featured = ?');
      params.push(featured === 'true' ? 1 : 0);
    }

    // Filter by category
    if (category) {
      conditions.push('p.category = ?');
      params.push(category);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' ORDER BY p.featured DESC, p.created_at DESC';

    const produkti = await queryAll(sql, params);

    // Parse JSON fields and add images
    const parsedProdukti = await Promise.all(
      produkti.map(async (product) => {
        const images = await getEntityImages('produkti', product.id);
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
          ...product,
          available: Boolean(product.available),
          featured: Boolean(product.featured),
          gallery_urls: product.gallery_urls ? JSON.parse(product.gallery_urls) : [],
          specifications: product.specifications ? JSON.parse(product.specifications) : {},
          images: formattedImages,
          main_image: formattedImages.find((img) => img.is_main) || formattedImages[0] || null,
        };
      })
    );

    res.json({
      success: true,
      count: parsedProdukti.length,
      data: parsedProdukti,
    });
  } catch (error) {
    console.error('Error fetching produkti:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch produkti',
    });
  }
});

// GET /api/produkti/:id - Get single product by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await query(
      `
      SELECT p.*, u.username as admin_username 
      FROM produkti p 
      LEFT JOIN users u ON p.admin_id = u.id 
      WHERE p.id = ?
    `,
      [id]
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }

    // Get images for this product
    const images = await getEntityImages('produkti', product.id);
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

    // Parse JSON fields
    const parsedProduct = {
      ...product,
      gallery_urls: product.gallery_urls ? JSON.parse(product.gallery_urls) : [],
      specifications: product.specifications ? JSON.parse(product.specifications) : {},
      images: formattedImages,
      main_image: formattedImages.find((img) => img.is_main) || formattedImages[0] || null,
    };

    res.json({
      success: true,
      data: parsedProduct,
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch product',
    });
  }
});

// POST /api/produkti - Create new product (admin only)
router.post('/', requireAuth, async (req, res) => {
  try {
    const admin = (req as any).user;
    const {
      name,
      description,
      price,
      category,
      image_url,
      gallery_urls,
      specifications,
      available,
      featured,
    }: CreateProduktsRequest = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        error: 'Product name is required',
      });
    }

    const result = await run(
      `
      INSERT INTO produkti (
        name, description, price, category, image_url, 
        gallery_urls, specifications, available, featured, admin_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        name,
        description || null,
        price || null,
        category || null,
        image_url || null,
        gallery_urls ? JSON.stringify(gallery_urls) : null,
        specifications ? JSON.stringify(specifications) : null,
        available !== undefined ? (available ? 1 : 0) : 1,
        featured !== undefined ? (featured ? 1 : 0) : 0,
        admin.userId,
      ]
    );

    const newProduct = await query(
      `
      SELECT p.*, u.username as admin_username 
      FROM produkti p 
      LEFT JOIN users u ON p.admin_id = u.id 
      WHERE p.id = ?
    `,
      [result.lastID]
    );

    // Parse JSON fields for response
    const parsedProduct = {
      ...newProduct,
      gallery_urls: newProduct.gallery_urls ? JSON.parse(newProduct.gallery_urls) : [],
      specifications: newProduct.specifications ? JSON.parse(newProduct.specifications) : {},
    };

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: parsedProduct,
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create product',
    });
  }
});

// PUT /api/produkti/:id - Update product (admin only)
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const admin = (req as any).user;
    const { id } = req.params;
    const {
      name,
      description,
      price,
      category,
      sub_category,
      image_url,
      gallery_urls,
      specifications,
      available,
      featured,
    }: UpdateProduktsRequest = req.body;

    // Check if product exists and belongs to admin
    const existingProduct = await query('SELECT admin_id FROM produkti WHERE id = ?', [id]);

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }

    if (existingProduct.admin_id !== admin.userId) {
      return res.status(403).json({
        success: false,
        error: 'Access denied: You can only edit your own products',
      });
    }

    await run(
      `
      UPDATE produkti 
      SET name = COALESCE(?, name),
          description = COALESCE(?, description),
          price = ?,
          category = COALESCE(?, category),
          sub_category = COALESCE(?, sub_category),
          image_url = COALESCE(?, image_url),
          gallery_urls = COALESCE(?, gallery_urls),
          specifications = COALESCE(?, specifications),
          available = COALESCE(?, available),
          featured = COALESCE(?, featured),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `,
      [
        name,
        description,
        price !== undefined ? price : null,
        category,
        sub_category,
        image_url,
        gallery_urls ? JSON.stringify(gallery_urls) : null,
        specifications ? JSON.stringify(specifications) : null,
        available !== undefined ? (available ? 1 : 0) : null,
        featured !== undefined ? (featured ? 1 : 0) : null,
        id,
      ]
    );
    const updatedProduct = await query(
      `
      SELECT p.*, u.username as admin_username 
      FROM produkti p 
      LEFT JOIN users u ON p.admin_id = u.id 
      WHERE p.id = ?
    `,
      [id]
    );

    // Parse JSON fields for response
    const parsedProduct = {
      ...updatedProduct,
      gallery_urls: updatedProduct.gallery_urls ? JSON.parse(updatedProduct.gallery_urls) : [],
      specifications: updatedProduct.specifications
        ? JSON.parse(updatedProduct.specifications)
        : {},
    };

    res.json({
      success: true,
      data: parsedProduct,
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update product',
    });
  }
});

// DELETE /api/produkti/:id - Delete product (admin only)
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const admin = (req as any).user;
    const { id } = req.params;

    // Check if product exists and belongs to admin
    const existingProduct = await query('SELECT admin_id FROM produkti WHERE id = ?', [id]);

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }

    if (existingProduct.admin_id !== admin.userId) {
      return res.status(403).json({
        success: false,
        error: 'Access denied: You can only delete your own products',
      });
    }

    await run('DELETE FROM produkti WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete product',
    });
  }
});

export default router;
