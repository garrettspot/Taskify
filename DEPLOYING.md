# Deployment Guide

This guide covers deploying the Taskify application to production environments.

## Environment Configuration

### Backend (server)

1. Create production environment file:
```bash
cp .env.example .env.production
```

2. Configure production settings:
```env
# Server Configuration
PORT=5000
HOST=0.0.0.0  # Listen on all network interfaces
CORS_ORIGIN=https://your-frontend-domain.com

# Database
MONGODB_URI=mongodb+srv://your-atlas-connection-string

# Authentication
JWT_SECRET=your-super-secret-key-change-this

# Environment
NODE_ENV=production
```

Key settings:
- `HOST`: Use `0.0.0.0` to accept connections from any IP
- `CORS_ORIGIN`: Set to your frontend domain for security
- `JWT_SECRET`: Use a strong random key
- `MONGODB_URI`: Your MongoDB Atlas connection string

### Frontend (client)

1. Create production environment file:
```bash
cp .env.example .env.production
```

2. Configure production API URL:
```env
VITE_API_URL=https://api.your-domain.com
VITE_API_TIMEOUT=10000
```

## Building for Production

### Backend
```bash
cd server
npm install --production
NODE_ENV=production node src/index.js
```

### Frontend
```bash
cd client
npm install
npm run build
```

The built files will be in `client/dist/` ready for static hosting.

## Deployment Checklist

1. Backend:
   - [ ] Set NODE_ENV=production
   - [ ] Configure secure CORS_ORIGIN
   - [ ] Set strong JWT_SECRET
   - [ ] Use proper MongoDB Atlas connection
   - [ ] Listen on 0.0.0.0 if behind reverse proxy

2. Frontend:
   - [ ] Set correct VITE_API_URL
   - [ ] Build with production env
   - [ ] Test API connectivity
   - [ ] Configure static hosting

3. Security:
   - [ ] Enable HTTPS
   - [ ] Set secure headers
   - [ ] Rotate JWT secrets
   - [ ] Whitelist MongoDB IPs