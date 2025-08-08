#!/bin/bash

# KNN API Deployment Script
echo "🚀 Starting deployment for KNN API..."

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

# Install dependencies
print_status "Installing dependencies..."
npm install

# Build the TypeScript code
print_status "Building TypeScript code..."
npm run build

if [ $? -ne 0 ]; then
    print_error "Build failed!"
    exit 1
fi

# Create logs directory
print_status "Creating logs directory..."
mkdir -p logs

# Copy Nginx configuration (requires sudo)
print_status "Setting up Nginx configuration..."
echo "You may need to run these commands manually with sudo:"
echo "sudo cp nginx-site-config /etc/nginx/sites-available/test.knn.lv"
echo "sudo ln -s /etc/nginx/sites-available/test.knn.lv /etc/nginx/sites-enabled/"
echo "sudo nginx -t"
echo "sudo systemctl reload nginx"

# PM2 operations
print_status "Managing PM2 process..."

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    print_warning "PM2 not found. Installing globally..."
    npm install -g pm2
fi

# Start or restart the application
if pm2 list | grep -q "knn-api"; then
    print_status "Restarting existing PM2 process..."
    pm2 restart ecosystem.config.js
else
    print_status "Starting new PM2 process..."
    pm2 start ecosystem.config.js
fi

# Save PM2 configuration
pm2 save

# Show PM2 status
pm2 status

print_status "Deployment complete! 🎉"
print_status "Your API should be available at:"
print_status "- Local: http://localhost:3000/health"
print_status "- Production: https://test.knn.lv/health"

print_warning "Don't forget to:"
print_warning "1. Update your SSL certificate paths in nginx-site-config"
print_warning "2. Copy the Nginx configuration to /etc/nginx/sites-available/"
print_warning "3. Enable the site and reload Nginx"
print_warning "4. Set up PM2 startup: pm2 startup"
