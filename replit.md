# Pipeline Builder

## Overview
A visual node-based pipeline builder application with drag-and-drop functionality. Built with React and React Flow on the frontend, with FastAPI backend support (not yet integrated).

**Current Status:** Frontend fully functional and running. Backend infrastructure is in place but not yet connected to the frontend.

**Last Updated:** November 9, 2025

## Project Structure

```
.
├── frontend/           # React application
│   ├── src/
│   │   ├── nodes/     # Node component definitions
│   │   ├── App.js     # Main app component
│   │   └── ...        # UI, store, and utility files
│   ├── public/        # Static assets
│   └── package.json   # Frontend dependencies
├── backend/           # FastAPI backend
│   └── main.py        # API endpoints
├── start.sh           # Development startup script
└── replit.md         # This file

```

## Tech Stack

### Frontend
- **Framework:** React 18.2.0
- **UI Library:** React Flow 11.8.3 (node-based workflow UI)
- **State Management:** Zustand (via store.js)
- **Build Tool:** Create React App / react-scripts

### Backend
- **Framework:** FastAPI
- **Server:** Uvicorn
- **CORS:** Enabled for cross-origin requests

## Available Nodes

The application provides the following workflow nodes:
- **Input** - Data input
- **Output** - Data output
- **LLM** - Language model processing
- **Text** - Text processing
- **Calculator** - Math operations
- **Filter** - Conditional routing
- **Delay** - Time delay
- **Transformer** - Data transformation
- **Router** - Multi-path routing

## Development Setup

### Running Locally
The application runs on port 5000 with the workflow automatically starting both frontend and backend:
- Frontend: http://0.0.0.0:5000
- Backend: http://127.0.0.1:8000 (not yet integrated)

### Environment Configuration
The frontend is configured via `frontend/.env`:
- PORT=5000
- HOST=0.0.0.0
- DANGEROUSLY_DISABLE_HOST_CHECK=true (required for Replit proxy)
- WDS_SOCKET_PORT=0

### Deployment
Configured for autoscale deployment:
- Build: Installs dependencies and builds React app
- Run: Serves production build on port 5000

## Recent Changes (Nov 9, 2025)
- Installed Node.js 20 and Python 3.11 toolchains
- Installed all npm dependencies for React frontend
- Installed FastAPI and Uvicorn for backend
- Configured React to run on port 5000 with proper host settings for Replit
- Created startup script to run both frontend and backend
- Set up workflow for development
- Configured deployment settings for production
- Added .gitignore for Python and Node.js files

## Backend API Endpoints

### Current Endpoints
- `GET /` - Health check (returns {"Ping": "Pong"})
- `GET /pipelines/parse` - Pipeline parsing (placeholder, not yet integrated)

## Future Integration Notes
The backend is set up but the frontend does not currently make API calls to it. To integrate:
1. Update the submit button in `frontend/src/submit.js` to call backend endpoints
2. Ensure backend URL is configured based on environment (dev vs production)
3. Consider using environment variables for API base URL

## User Preferences
None documented yet.
