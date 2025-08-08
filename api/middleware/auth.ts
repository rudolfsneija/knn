import { Request, Response, NextFunction } from 'express';
import { authenticateToken } from '../utils/auth';

// Export the main authentication middleware
export const requireAuth = authenticateToken;
