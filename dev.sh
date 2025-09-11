#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting development environment...${NC}"

# Function to cleanup background processes on exit
cleanup() {
    echo -e "\n${YELLOW}Shutting down development servers...${NC}"
    kill $(jobs -p) 2>/dev/null
    exit
}

# Set up trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Start API server in background
echo -e "${BLUE}[API]${NC} Starting backend server..."
npm run dev &
API_PID=$!

# Wait a moment for API to start
sleep 2

# Start frontend server in background
echo -e "${BLUE}[FRONTEND]${NC} Starting frontend server..."
cd frontend && npm run dev &
FRONTEND_PID=$!

# Wait for both processes
echo -e "${GREEN}Both servers are starting up...${NC}"
echo -e "${YELLOW}Press Ctrl+C to stop both servers${NC}"

# Wait for any background job to finish (this keeps the script running)
wait
