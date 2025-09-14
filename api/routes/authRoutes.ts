import express from 'express';
import { query, run } from '../db/database';
import { hashPassword, comparePassword, generateToken } from '../utils/auth';

const router = express.Router();

// POST /api/auth/login - Simple login (in production, use proper authentication)
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        error: 'Username and password are required',
      });
    }

    // Find user by username or email
    const user = await query(
      'SELECT id, username, email, password_hash, first_name, last_name FROM users WHERE username = ? OR email = ?',
      [username, username]
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials',
      });
    }

    // Compare password with stored hash using bcrypt
    const isValidPassword = await comparePassword(password, user.password_hash);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials',
      });
    }

    // Generate JWT token
    const token = generateToken(user.id, user.username);

    // Remove password from response
    const { password_hash, ...userWithoutPassword } = user;

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userWithoutPassword,
        token: token,
      },
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({
      success: false,
      error: 'Login failed',
    });
  }
});

// POST /api/auth/logout - Logout (placeholder)
router.post('/logout', (req, res) => {
  // In a real app with JWT, you might blacklist the token
  res.json({
    success: true,
    message: 'Logout successful',
  });
});

export default router;
