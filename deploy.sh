#!/bin/bash

# KNN Deployment Script - Deploy code changes to production
echo "🚀 Deploying code changes to production..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Are you in the right directory?"
    exit 1
fi

# Build the backend TypeScript code
print_status "Building backend API..."
npm run build

if [ $? -ne 0 ]; then
    print_error "Backend build failed!"
    exit 1
fi

# Build the frontend
print_status "Building frontend..."
cd frontend
npm run build

if [ $? -ne 0 ]; then
    print_error "Frontend build failed!"
    exit 1
fi

# Deploy frontend to production directory
print_status "Deploying frontend to production..."
cd ..
rm -rf frontend_dist/*
cp -r frontend/dist/* frontend_dist/

# Restart the API server with PM2
print_status "Restarting API server..."
if pm2 list | grep -q "knn-api"; then
    pm2 restart knn-api
else
    print_warning "PM2 process 'knn-api' not found. Starting new process..."
    pm2 start ecosystem.config.js
fi

print_status "Deployment complete! 🎉"
print_status "Your application is now live at: https://test.knn.lv"
print_status ""
print_status "✅ Backend API updated and restarted"
print_status "✅ Frontend updated with latest changes"
print_status ""
print_warning "If you made changes to:"
print_warning "- Environment variables → Restart PM2 manually"
print_warning "- Database schema → Run migrations if needed"
print_warning "- Dependencies → Run 'npm install' first"
