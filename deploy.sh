#!/bin/bash
# Production deployment script for GI Software

# Stop on any error
set -e

echo "🚀 Starting GI Software deployment..."

# 1. Environment setup
export ENVIRONMENT="production"
echo "✅ Environment set to PRODUCTION"

# 2. Backend deployment
echo "📦 Deploying backend..."
cd backend

# Install or update dependencies
python -m pip install --upgrade pip
pip install -r requirements.txt
echo "✅ Backend dependencies installed"

# Run database migrations if needed
echo "🗃️  Initializing database..."
python init_db.py
echo "✅ Database initialized"

# Create admin user
echo "👤 Creating admin user..."
python create_admin.py
echo "✅ Admin user created"

# 3. Frontend deployment
echo "📦 Deploying frontend..."
cd ../frontend

# Install dependencies
npm ci --production
echo "✅ Frontend dependencies installed"

# Build the frontend
echo "🔨 Building frontend..."
npm run build
echo "✅ Frontend built"

# 4. Final setup
echo "🔧 Setting up web server..."
cd ..

# Instructions for deploying to Nginx or another web server
echo "
===============================
Deployment completed!

To complete setup:
1. Configure your web server to serve the static files from:
   $(pwd)/frontend/build/

2. Configure your web server to proxy API requests to:
   http://localhost:8000/api

3. Start the backend server:
   cd backend && uvicorn main:app --host 0.0.0.0 --port 8000
===============================
"

echo "🎉 Deployment completed successfully!"