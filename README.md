# 🚀 Automated Deployment Platform(single click frontend Deployment)

A full-stack deployment platform inspired by Vercel, built with the MERN stack. This application allows users to deploy GitHub repositories instantly with zero configuration, handling the entire deployment pipeline from code upload to live hosting.

![Built with React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?logo=mongodb)
![Redis](https://img.shields.io/badge/Redis-5.10-DC382D?logo=redis)
![AWS S3](https://img.shields.io/badge/AWS-S3-FF9900?logo=amazon-aws)



## ✨ Features

- **Zero-Configuration Deployment**: Simply paste a GitHub repository URL and deploy
- **Automated Build Pipeline**: Clones repository, builds project, and deploys automatically
- **Real-time Status Updates**: Live deployment status tracking with WebSocket-like polling
- **Distributed Architecture**: Microservices-based design with separate upload, build, and request handling services
- **Cloud Storage**: AWS S3 integration for storing source code and built assets
- **Queue-based Processing**: Redis-powered job queue for handling multiple deployments
- **Persistent Status Tracking**: MongoDB for deployment status and metadata storage
- **Docker-based Builds**: Isolated build environments using Docker containers
- **Subdomain Routing**: Each deployment gets a unique subdomain (e.g., `projectid.localhost:3001`)
- **Modern UI**: Beautiful, responsive React frontend with real-time feedback

- for now only those project which can build dist files via npm install && npm run build only can be deployed future work is in progress to support other frontend frameworks any contributions are hugely encouraged!

## 🏗️ Architecture

The application follows a microservices architecture with three main services:

```
┌─────────────────┐
│   Frontend      │
│   (React)       │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│      Upload Service (Port 3000)         │
│  - Receives GitHub URLs                 │
│  - Clones repositories                  │
│  - Uploads to S3                        │
│  - Pushes to Redis queue                │
└──────────┬──────────────────────────────┘
           │
           ▼
    ┌──────────────┐
    │    Redis     │
    │ Build Queue  │
    └──────┬───────┘
           │
           ▼
┌─────────────────────────────────────────┐
│      Deploy Service (Background)        │
│  - Polls Redis queue                    │
│  - Downloads from S3                    │
│  - Runs Docker builds                   │
│  - Uploads dist to S3                   │
└──────────┬──────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────┐
│  Request Handler Service (Port 3001)    │
│  - Serves deployed applications         │
│  - Subdomain-based routing              │
│  - Fetches assets from S3               │
└─────────────────────────────────────────┘

         ┌──────────────┐
         │   MongoDB    │
         │ Status Store │
         └──────────────┘
```

## 🛠️ Tech Stack

### Frontend
- **React 19.2** - UI framework
- **Vite** - Build tool and dev server
- **CSS3** - Modern styling with animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database for status tracking
- **Redis** - Message queue for build jobs
- **AWS S3** - Object storage for code and assets
- **Docker** - Containerized build environment
- **simple-git** - Git operations

### DevOps
- **Docker** - Container runtime
- **AWS SDK** - S3 integration
- **CORS** - Cross-origin resource sharing

## 📦 Prerequisites

Before running this application, ensure you have:

- **Node.js** (v18 or higher)
- **Docker** installed and running
- **MongoDB** instance (local or cloud)
- **Redis** server running
- **AWS Account** with S3 bucket configured
- **Git** installed

## 🚀 Installation

### 1. Have  the Repository & Goto the Vercel Folder 

```bash
cd Vercel
```

### 2. Install Dependencies

#### Backend Services

```bash
# Upload Service
cd Backend/UploadService
npm install

# Deploy Service
cd ../Deployservice
npm install

# Request Handler Service
cd ../RequestHandlerService
npm install
```

#### Frontend

```bash
cd ../../frontend
npm install
```

## ⚙️ Configuration

### Environment Variables

Create `.env` files in each backend service directory:

#### UploadService/.env
```env
MONGO_URI=mongodb://localhost:27017/vercel
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
S3_BUCKET_NAME=your_bucket_name
```

#### Deployservice/.env
```env
MONGO_URI=mongodb://localhost:27017/vercel
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
S3_BUCKET_NAME=your_bucket_name
```

#### RequestHandlerService/.env
```env
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
S3_BUCKET_NAME=your_bucket_name
```

### AWS S3 Setup

1. Create an S3 bucket
2. Configure bucket permissions for public read access (for deployed sites)
3. Update the bucket name in your `.env` files

### MongoDB Setup

1. Install MongoDB locally or use MongoDB Atlas
2. Update `MONGO_URI` in `.env` files
3. Database `vercel` and collection `status_tracking` will be created automatically

### Redis Setup

```bash
# Install Redis (Ubuntu/Debian)
sudo apt-get install redis-server

# Start Redis
redis-server

# Or using Docker
docker run -d -p 6379:6379 redis
```

## 💻 Usage

### Start All Services

You'll need **4 terminal windows**:

#### Terminal 1: Upload Service
```bash
cd Backend/UploadService
npm start
# Runs on http://localhost:3000
```

#### Terminal 2: Deploy Service
```bash
cd Backend/Deployservice
npm start
# Background worker (no HTTP server)
```

#### Terminal 3: Request Handler Service
```bash
cd Backend/RequestHandlerService
npm start
# Runs on http://localhost:3001
```

#### Terminal 4: Frontend
```bash
cd frontend
npm run dev
# Runs on http://localhost:5173
```

### Deploy a Repository

1. Open `http://localhost:5173` in your browser
2. Enter a GitHub repository URL (e.g., `https://github.com/username/react-app`)
3. Click **Deploy Now**
4. Watch the real-time status updates:
   - 📤 Uploading files to S3
   - 🔨 Building your project
   - ✅ Deployment successful
5. Access your deployed app at `http://projectid.localhost:3001`

## 📁 Project Structure

```
Vercel/
├── Backend/
│   ├── UploadService/           # Handles repo uploads
│   │   ├── src/
│   │   │   ├── index.js         # Main server
│   │   │   ├── aws.js           # S3 operations
│   │   │   └── utils.js         # Helper functions
│   │   ├── package.json
│   │   └── .env
│   │
│   ├── Deployservice/           # Builds and deploys
│   │   ├── src/
│   │   │   ├── index.js         # Queue consumer
│   │   │   ├── aws.js           # S3 operations
│   │   │   ├── build.js         # Docker build logic
│   │   │   └── utils.js         # Helper functions
│   │   ├── workspace/           # Build workspace
│   │   ├── package.json
│   │   └── .env
│   │
│   └── RequestHandlerService/   # Serves deployed apps
│       ├── src/
│       │   └── index.js         # Static file server
│       ├── package.json
│       └── .env
│
├── frontend/                    # React application
│   ├── src/
│   │   ├── App.jsx              # Main component
│   │   ├── App.css              # Styles
│   │   └── main.jsx             # Entry point
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## 🔌 API Endpoints

### Upload Service (Port 3000)

#### POST `/sendrepourl`
Initiates deployment for a GitHub repository.

**Request Body:**
```json
{
  "repourl": "https://github.com/username/repository"
}
```

**Response:**
```json
{
  "id": "abc123xyz"
}
```

#### GET `/status?id=<projectId>`
Retrieves deployment status.

**Response:**
```json
{
  "status": {
    "sid": "abc123xyz",
    "status": "deployed"
  }
}
```

### Request Handler Service (Port 3001)

#### GET `/*`
Serves deployed application files based on subdomain.

**Example:**
- `http://abc123xyz.localhost:3001/` → Serves `index.html`
- `http://abc123xyz.localhost:3001/assets/main.js` → Serves JavaScript file

## 🔄 How It Works

### Deployment Flow

1. **User Submits Repository URL**
   - Frontend sends POST request to Upload Service
   - Unique project ID generated

2. **Repository Cloning & Upload**
   - Upload Service clones the GitHub repository
   - All files uploaded to S3 under `output/{projectId}/`
   - Job pushed to Redis queue
   - Status set to `uploaded` in MongoDB

3. **Build Process**
   - Deploy Service polls Redis queue
   - Downloads source code from S3
   - Runs Docker container to build the project
   - Uploads built files (`dist/`) to S3
   - Updates status to `deployed` in MongoDB

4. **Serving the Application**
   - Request Handler Service listens on port 3001
   - Extracts project ID from subdomain
   - Fetches files from S3 (`workspace/dist/{projectId}/`)
   - Serves files with appropriate MIME types

5. **Status Polling**
   - Frontend polls `/status` endpoint every 3 seconds
   - Updates UI based on current deployment status
   - Stops polling when status is `deployed`

### Status States

- `uploading` - Files being uploaded to S3
- `uploaded` - Upload complete, waiting for build
- `building` - Docker build in progress
- `deployed` - Application live and accessible

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Shaik Mohammad**
- GitHub: [@ShaikMohammad786](https://github.com/ShaikMohammad786)


## 🐛 Known Issues

- Subdomain routing requires local DNS configuration or `/etc/hosts` modification
- Docker must be running for builds to succeed
- Currently supports only Node.js/React projects with standard build scripts


---

**⭐ If you found this project helpful, please give it a star!**
