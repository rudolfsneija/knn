# KNN Deployment Guide

## Directory Structure

```
/var/www/knn/
├── dist/              # Backend build output (TypeScript → JavaScript)
├── frontend_dist/     # Frontend deployment (served by Nginx)
├── frontend/
│   ├── dist/         # Frontend build staging (temporary, auto-deleted)
│   └── src/          # Frontend source code
└── api/              # Backend source code
```

## Deployment Commands

### Frontend Deployment
```bash
# From project root
npm run deploy:frontend

# Or from frontend directory
cd frontend && npm run deploy
```

### Backend Deployment
```bash
# From project root
npm run deploy:backend
```

### Full Deployment
```bash
# Deploy both frontend and backend
npm run deploy
```

## What Happens During Deployment

### Frontend:
1. `tsc -b && vite build` - Builds React app to `frontend/dist/`
2. `cp -r dist/* ../frontend_dist/` - Copies to deployment directory
3. `rm -rf dist/` - Cleans up temporary staging directory
4. Nginx serves from `/var/www/knn/frontend_dist/`

### Backend:
1. `tsc -p tsconfig.json` - Compiles TypeScript to `dist/`
2. `pm2 reload ecosystem.config.js` - Reloads the API server
3. PM2 runs from `/var/www/knn/dist/api/server.js`

## Nginx Configuration

- **Frontend**: Served from `/var/www/knn/frontend_dist/`
- **API**: Proxied to `http://127.0.0.1:3000/api/`
- **Domain**: `test.knn.lv`

## Quick Development Workflow

```bash
# Backend development
npm run dev

# Frontend development
cd frontend && npm run dev

# Deploy when ready
npm run deploy
```
