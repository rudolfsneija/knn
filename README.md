# KNN Full-Stack Application

A modern full-stack web application built with React frontend and Express.js backend, featuring content management for news (aktualitātes) and products (produkti).

## 🏗️ Architecture Overview

This project consists of:
- **Backend API**: Express.js + TypeScript + SQLite
- **Frontend**: React + TypeScript + Vite + TailwindCSS
- **Database**: SQLite with better-sqlite3
- **Authentication**: JWT-based auth system
- **Deployment**: PM2 + Nginx reverse proxy

## 📁 Project Structure

```
/var/www/knn/
├── api/                     # Backend API (Express + TypeScript)
│   ├── server.ts           # Main server entry point
│   ├── db/
│   │   └── database.ts     # Database connection & schema
│   ├── middleware/
│   │   ├── auth.ts         # JWT authentication middleware
│   │   └── errorHandler.ts # Global error handler
│   ├── routes/
│   │   ├── authRoutes.ts   # Login/register/logout
│   │   ├── userRoutes.ts   # User profile management
│   │   ├── aktualitatesRoutes.ts # News/updates CRUD
│   │   └── produktiRoutes.ts     # Products CRUD
│   ├── types/
│   │   └── index.ts        # TypeScript type definitions
│   └── utils/
│       └── auth.ts         # JWT utility functions
├── frontend/               # Frontend React app
│   ├── src/
│   │   ├── App.tsx         # Main app component
│   │   ├── main.tsx        # React entry point
│   │   ├── components/     # Reusable UI components
│   │   │   ├── Layout.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── Footer.tsx
│   │   ├── contexts/       # React contexts
│   │   │   └── AuthContext.tsx
│   │   └── pages/          # Route components
│   │       ├── Home.tsx
│   │       ├── Aktualitates.tsx    # News listing
│   │       ├── AktualitateDetail.tsx
│   │       ├── Preces.tsx          # Products listing
│   │       ├── PreceDetail.tsx
│   │       ├── Pakalpojumi.tsx     # Services page
│   │       ├── ParUznemumu.tsx     # About company
│   │       ├── Sazinai.tsx         # Contact form
│   │       └── admin/              # Admin panel
│   │           ├── AdminLogin.tsx
│   │           ├── AdminDashboard.tsx
│   │           ├── AdminAktualitates.tsx
│   │           └── AdminPreces.tsx
│   ├── public/             # Static assets (favicon, images)
│   └── package.json        # Frontend dependencies
├── frontend_dist/          # Built frontend (production)
├── dist/                   # Built backend (production)
├── logs/                   # Application logs
├── database.sqlite         # SQLite database file
├── package.json           # Backend dependencies & scripts
├── tsconfig.json          # TypeScript config (backend)
├── deploy.sh              # Automated deployment script
└── ecosystem.config.js    # PM2 configuration
```

## 🖼️ Static Files & Assets

### For Images and Media Files:

1. **Frontend Assets**: Place in `frontend/public/`
   - Company logos: `frontend/public/logo.png`
   - Product images: `frontend/public/products/`
   - General images: `frontend/public/images/`

2. **User Uploaded Content**: Store externally or create a dedicated uploads directory
   - Recommended: Use cloud storage (AWS S3, Cloudinary, etc.)
   - Alternative: Create `/var/www/knn/uploads/` and serve via Express

3. **Static Asset URLs in Database**:
   - Store relative paths in `image_url` fields
   - Example: `/images/product-1.jpg` or `https://cdn.example.com/image.jpg`

### Example Upload Directory Setup:
```bash
mkdir -p /var/www/knn/uploads/{products,news,users}
```

Add to `api/server.ts`:
```javascript
// Serve static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- PM2 (for production)
- Nginx (for production)

### Development Setup

1. **Clone and install backend dependencies**:
```bash
cd /var/www/knn
npm install
```

2. **Install frontend dependencies**:
```bash
cd frontend
npm install
```

3. **Environment Configuration**:
Create `.env` file in project root:
```env
PORT=3000
JWT_SECRET=your-super-secure-jwt-secret-key
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
DOMAIN=test.knn.lv
```

4. **Start Development Servers**:

Backend (API server with hot reload):
```bash
npm run dev
```

Frontend (Vite dev server):
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3000`
- API Health Check: `http://localhost:3000/health`

## 🏭 Production Deployment

### Automated Deployment
```bash
./deploy.sh
```

### Manual Deployment
```bash
# Build backend
npm run build

# Build frontend
cd frontend
npm run build
cd ..

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
```

### Production URL
- **API**: `https://test.knn.lv`
- **Health Check**: `https://test.knn.lv/health`

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | User login | No |
| POST | `/api/auth/logout` | User logout | No |

### User Management
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/users/me` | Get current user profile | Yes |
| PUT | `/api/users/me` | Update user profile | Yes |

### News/Updates (Aktualitātes)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/aktualitates` | Get all news (published) | No |
| GET | `/api/aktualitates/:id` | Get specific news item | No |
| POST | `/api/aktualitates` | Create news (admin) | Yes |
| PUT | `/api/aktualitates/:id` | Update news (admin) | Yes |
| DELETE | `/api/aktualitates/:id` | Delete news (admin) | Yes |

### Products (Produkti)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/produkti` | Get all products | No |
| GET | `/api/produkti/:id` | Get specific product | No |
| POST | `/api/produkti` | Create product (admin) | Yes |
| PUT | `/api/produkti/:id` | Update product (admin) | Yes |
| DELETE | `/api/produkti/:id` | Delete product (admin) | Yes |

### System
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/health` | Server health check | No |

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Aktualitātes (News) Table
```sql
CREATE TABLE aktualitates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  image_url VARCHAR(500),
  published BOOLEAN DEFAULT 0,
  admin_id INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (admin_id) REFERENCES users(id)
);
```

### Produkti (Products) Table
```sql
CREATE TABLE produkti (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  category VARCHAR(100),
  image_url VARCHAR(500),
  gallery_urls TEXT, -- JSON array
  specifications TEXT, -- JSON object
  available BOOLEAN DEFAULT 1,
  featured BOOLEAN DEFAULT 0,
  admin_id INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (admin_id) REFERENCES users(id)
);
```

## 🔧 Development Workflow

### Adding New Features
1. **Backend**: Create routes in `api/routes/`, add types in `api/types/`
2. **Frontend**: Add components in `frontend/src/components/` or pages in `frontend/src/pages/`
3. **Database**: Update schema in `api/db/database.ts`

### Building & Testing
```bash
# Backend build
npm run build

# Frontend build
cd frontend && npm run build

# Linting
npm run lint          # Backend
cd frontend && npm run lint  # Frontend
```

### PM2 Management
```bash
pm2 status           # View running processes
pm2 logs knn-api     # View logs
pm2 restart knn-api  # Restart application
pm2 monit           # Monitor resources
```

## 🔐 Security Features

- ✅ JWT Authentication
- ✅ Password hashing with bcrypt
- ✅ CORS configuration
- ✅ Security headers (Helmet)
- ✅ Request logging (Morgan)
- ✅ Input validation
- ✅ HTTPS ready (with Nginx)

## 📚 Tech Stack

**Backend:**
- Express.js 4.21.2
- TypeScript 5.9.2
- SQLite + better-sqlite3
- JWT authentication
- bcrypt password hashing

**Frontend:**
- React 19.1.1
- TypeScript 5.8.3
- Vite 5.4.11
- TailwindCSS 3.4.17
- React Router 6.26.1
- Axios for API calls

**DevOps:**
- PM2 process manager
- Nginx reverse proxy
- SSL/TLS encryption
- Automated deployment scripts

## 🐛 Troubleshooting

### Common Issues

1. **Build Fails**: Make sure TypeScript configs are properly separated for frontend/backend
2. **CORS Errors**: Update `ALLOWED_ORIGINS` in `.env`
3. **Database Locked**: Check if multiple processes are accessing SQLite
4. **PM2 Issues**: Use `pm2 kill` and restart if needed

### Logs Location
- PM2 Logs: `~/.pm2/logs/`
- Application Logs: `/var/www/knn/logs/`
- Nginx Logs: `/var/log/nginx/`

## 📞 Support

For technical support or questions about the codebase, check the logs and ensure all dependencies are properly installed.
