import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from 'dotenv';
import * as path from 'path';
import { initDatabase } from './db/database';
import { errorHandler } from './middleware/errorHandler';

// Routes
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import aktualitatesRoutes from './routes/aktualitatesRoutes';
import produktiRoutes from './routes/produktiRoutes';
import imageRoutes from './routes/imageRoutes';
import contactRoutes from './routes/contactRoutes';
import configuratorRoutes from './routes/configuratorRoutes';

// Load environment variables
if (process.env.NODE_ENV === 'development') {
  config({ path: '.env.development' });
} else {
  config();
}

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Middleware
app.use(helmet()); // Security headers

// Configure CORS for your domain
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions)); // Enable CORS with domain config
app.use(morgan('combined')); // Logging
app.use(express.json({ limit: '10mb' })); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Serve test upload page
app.get('/test-upload', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'test-upload.html'));
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/aktualitates', aktualitatesRoutes);
app.use('/api/produkti', produktiRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/configurator', configuratorRoutes);
app.use('/api', imageRoutes);

// 404 handler - use a more specific pattern instead of *
app.all('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
  });
});

// Error handling middleware (should be last)
app.use(errorHandler);

// Initialize database and start server
async function startServer() {
  try {
    await initDatabase();
    console.log('Database initialized successfully');

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Health check available at http://localhost:${PORT}/health`);
      if (process.env.DOMAIN) {
        console.log(`External access: https://${process.env.DOMAIN}/health`);
      }
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
startServer();

export default app;
