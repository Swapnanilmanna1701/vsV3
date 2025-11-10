#!/bin/bash

# Function to handle cleanup
cleanup() {
    echo "Cleaning up processes..."
    pkill -P $$
    exit 0
}

trap cleanup SIGINT SIGTERM EXIT

# Start backend in the background
(cd backend && uvicorn main:app --host 127.0.0.1 --port 8000) &
echo "Backend started with PID $!"

# Give backend a moment to start
sleep 3

# Start frontend (this will keep the script running)
cd frontend && PORT=5000 HOST=0.0.0.0 npm start
