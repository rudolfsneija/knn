import express from 'express';
import { query, run } from '../db/database';
import { requireAuth } from '../middleware/auth';

const router = express.Router();

// GET /api/users/me - Get current authenticated user profile
router.get('/me', requireAuth, async (req, res) => {
  try {
    const user = (req as any).user;
    const currentUser = await query(
      'SELECT id, username, email, first_name, last_name, created_at, updated_at FROM users WHERE id = ?',
      [user.userId]
    );

    if (!currentUser) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    res.json({
      success: true,
      data: currentUser,
    });
  } catch (error) {
    console.error('Error fetching current user:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user profile',
    });
  }
});

// PUT /api/users/me - Update current user profile
router.put('/me', requireAuth, async (req, res) => {
  try {
    const user = (req as any).user;
    const { username, email, first_name, last_name } = req.body;

    await run(
      'UPDATE users SET username = COALESCE(?, username), email = COALESCE(?, email), first_name = COALESCE(?, first_name), last_name = COALESCE(?, last_name), updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [username, email, first_name, last_name, user.userId]
    );

    const updatedUser = await query(
      'SELECT id, username, email, first_name, last_name, created_at, updated_at FROM users WHERE id = ?',
      [user.userId]
    );

    res.json({
      success: true,
      data: updatedUser,
    });
  } catch (error: any) {
    console.error('Error updating user:', error);

    if (error.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({
        success: false,
        error: 'Username or email already exists',
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to update user',
    });
  }
});

export default router;
