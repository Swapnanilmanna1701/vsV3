# Pipeline Builder

A visual node-based pipeline builder application with drag-and-drop functionality. Built with React and React Flow on the frontend, with a FastAPI backend for pipeline analysis.

![Unsupported image]
 
![Unsupported image]
 
![Unsupported image]

## Features

- 🎨 Drag-and-drop node-based interface
- 🔗 Connect nodes to create workflows
- 📊 Real-time pipeline analysis
- ✅ DAG (Directed Acyclic Graph) validation
- 🚀 Fast and responsive UI

## Available Node Types

- **Input** - Data input
- **Output** - Data output
- **LLM** - Language model processing
- **Text** - Text processing
- **Calculator** - Math operations
- **Filter** - Conditional routing
- **Delay** - Time delay
- **Transformer** - Data transformation
- **Router** - Multi-path routing

## Getting Started

### Prerequisites

- Node.js 20 or higher
- Python 3.11 or higher
- npm or yarn

### Installation

1. **Install Frontend Dependencies**
```bash
cd frontend
npm install
```

2. **Install Backend Dependencies**
```bash
# Python packages are managed via uv
# They should already be installed in .pythonlibs
```

### Running the Application

#### Option 1: Using the Startup Script (Recommended for Replit)

The easiest way to run both servers simultaneously:
```bash
bash start.sh
```

This script will:
- Start the FastAPI backend on http://localhost:8000
- Start the React frontend on http://localhost:5000
- Handle cleanup when you stop the application

#### Option 2: Run Servers Separately

**Terminal 1 - Backend Server:**
```bash
cd backend
uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

**Terminal 2 - Frontend Server:**
```bash
cd frontend
npm start
```

The frontend will automatically be available at http://localhost:5000

## Using the Application

1. **Create Nodes**: Drag node types from the "AVAILABLE NODES" section onto the canvas
2. **Connect Nodes**: Click and drag from one node's connection point to another node
3. **Submit Pipeline**: Click the "SUBMIT PIPELINE" button to analyze your workflow
4. **View Results**: An alert will display:
   - Number of nodes in your pipeline
   - Number of connections (edges)
   - Whether the pipeline is a valid DAG (Directed Acyclic Graph)

## Project Structure
```
.
├── frontend/              # React application
│   ├── src/
│   │   ├── nodes/        # Node component definitions
│   │   ├── App.js        # Main application component
│   │   ├── submit.js     # Submit button with API integration
│   │   ├── store.js      # Zustand state management
│   │   ├── ui.js         # React Flow canvas
│   │   └── toolbar.js    # Node toolbar
│   ├── public/           # Static assets
│   └── package.json      # Frontend dependencies
├── backend/              # FastAPI backend
│   └── main.py          # API endpoints and DAG detection
├── start.sh             # Startup script
└── README.md            # This file
```

## API Endpoints

### Backend API (http://localhost:8000)

#### `GET /`
Health check endpoint

**Response:**
```json
{"Ping": "Pong"}
```

#### `POST /pipelines/parse`
Analyzes a pipeline and validates if it's a DAG

**Request Body:**
```json
{
  "nodes": [{"id": "node-1"}, {"id": "node-2"}],
  "edges": [{"source": "node-1", "target": "node-2"}]
}
```

**Response:**
```json
{
  "num_nodes": 2,
  "num_edges": 1,
  "is_dag": true
}
```

## DAG Detection Algorithm

The backend uses a Depth-First Search (DFS) algorithm with white-gray-black node coloring to detect cycles:

- **White (0)**: Unvisited node
- **Gray (1)**: Currently visiting (in recursion stack)
- **Black (2)**: Finished visiting

If a gray node is encountered during traversal, a cycle exists, and the graph is not a DAG.

## Technologies Used

### Frontend
- **React 18.2.0** - UI framework
- **React Flow 11.8.3** - Node-based workflow visualization
- **Zustand** - Lightweight state management
- **Create React App** - Build tooling

### Backend
- **FastAPI** - Modern Python web framework
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation

## Development

### Frontend Development
The frontend includes hot-reload, so changes are reflected immediately:
```bash
cd frontend
npm start
```

### Backend Development
FastAPI supports auto-reload with the `--reload` flag:
```bash
cd backend
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

## Environment Variables

The frontend uses a `.env` file with the following configuration:
```env
PORT=5000                              # Frontend server port
HOST=0.0.0.0                          # Bind to all interfaces
DANGEROUSLY_DISABLE_HOST_CHECK=true   # Required for Replit proxy
WDS_SOCKET_PORT=0                     # WebSocket configuration
```

## Deployment

This application is configured for Replit's autoscale deployment:

1. Click the "Deploy" button in Replit
2. The build process will install dependencies and build the React app
3. The production server will serve the built frontend on port 5000

## Troubleshooting

### Backend not connecting?
- Ensure the backend is running on port 8000
- Check that CORS is enabled in `backend/main.py`
- Verify the proxy setting in `frontend/package.json` points to `http://localhost:8000`

### Frontend not updating?
- Clear browser cache and hard reload (Ctrl+Shift+R or Cmd+Shift+R)
- Check that the development server restarted successfully
- Look for errors in the browser console

### Nodes not appearing?
- Scroll down to see the canvas area
- Check browser console for JavaScript errors

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.