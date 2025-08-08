# KNN API

A basic Express.js backend with SQLite database.

## Features

- ✅ Express.js server with TypeScript
- ✅ SQLite database with promisified queries
- ✅ User authentication (basic implementation)
- ✅ CRUD operations for users
- ✅ Error handling middleware
- ✅ Security middleware (Helmet, CORS)
- ✅ Request logging (Morgan)
- ✅ Environment configuration

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Update the `.env` file with your configuration.

## Development

Start the development server with hot reloading:
```bash
npm run dev
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## Production

### Quick Deployment
Use the automated deployment script:
```bash
./deploy.sh
```

### Manual Deployment
Build and start the production server:
```bash
npm run build
npm start
```

### Production Domain
The API is deployed at: `https://test.knn.lv`

### PM2 Process Management
```bash
# Start the application
pm2 start ecosystem.config.js

# Restart the application
pm2 restart knn-api

# View logs
pm2 logs knn-api

# Monitor resources
pm2 monit
```

## API Endpoints

### Health Check
- `GET /health` - Server health check

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Example Requests

### Register a new user
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123",
    "first_name": "John",
    "last_name": "Doe"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "password": "password123"
  }'
```

### Get all users
```bash
curl http://localhost:3000/api/users
```

## Database Schema

### Users Table
- `id` - Primary key (INTEGER, AUTOINCREMENT)
- `username` - Unique username (VARCHAR(50), NOT NULL)
- `email` - Unique email (VARCHAR(100), NOT NULL)
- `password_hash` - Password hash (VARCHAR(255), NOT NULL)
- `first_name` - First name (VARCHAR(50))
- `last_name` - Last name (VARCHAR(50))
- `created_at` - Creation timestamp (DATETIME, DEFAULT CURRENT_TIMESTAMP)
- `updated_at` - Update timestamp (DATETIME, DEFAULT CURRENT_TIMESTAMP)

### Posts Table
- `id` - Primary key (INTEGER, AUTOINCREMENT)
- `title` - Post title (VARCHAR(255), NOT NULL)
- `content` - Post content (TEXT)
- `user_id` - Foreign key to users table (INTEGER, NOT NULL)
- `created_at` - Creation timestamp (DATETIME, DEFAULT CURRENT_TIMESTAMP)
- `updated_at` - Update timestamp (DATETIME, DEFAULT CURRENT_TIMESTAMP)

## Security Notes

⚠️ **This is a basic implementation for development purposes. For production, you should:**

1. Use proper password hashing (bcrypt)
2. Implement JWT authentication
3. Add input validation and sanitization
4. Implement rate limiting
5. Use HTTPS
6. Add proper logging and monitoring
7. Implement proper error handling
8. Add API documentation (Swagger/OpenAPI)

## File Structure

```
api/
├── db/
│   └── database.ts          # Database connection and queries
├── middleware/
│   └── errorHandler.ts      # Error handling middleware
├── routes/
│   ├── authRoutes.ts        # Authentication routes
│   └── userRoutes.ts        # User CRUD routes
├── types/
│   └── index.ts             # TypeScript type definitions
└── server.ts                # Main server file
```
