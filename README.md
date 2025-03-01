# GI Software

A modern web application for processing documents and managing AI news articles.

## Backend Setup

### Prerequisites
- Python 3.8 or higher
- PostgreSQL database
- Node.js 14+ (for frontend)

### Installation

1. Configure your PostgreSQL database by editing the `.env` file in the backend directory:
   ```
   # Copy the example environment file first
   cp backend/.env.example backend/.env
   
   # Then edit the values as needed:
   DATABASE_URL=postgresql+asyncpg://your_username:your_password@localhost/gi_software
   SECRET_KEY=your_secure_secret_key
   ENVIRONMENT=development
   ```

2. Set up and initialize the backend:
   ```bash
   # Navigate to the project directory
   cd gi_software

   # Optional: Create a virtual environment
   python -m venv venv
   source venv/bin/activate   # On Windows: venv\Scripts\activate

   # Install dependencies
   cd backend
   pip install -r requirements.txt
   
   # Initialize database tables
   python init_db.py
   
   # Create admin user
   python create_admin.py
   ```

3. Run the backend server:
   ```bash
   # From the backend directory
   uvicorn main:app --reload
   ```

4. Access the API documentation at `http://localhost:8000/docs`

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Access the application at `http://localhost:3000`

## API Testing

The backend includes test endpoints for working with news articles without authentication:

- `GET /api/test/articles` - List all articles
- `POST /api/test/article` - Create a test article
- `PUT /api/test/article/{article_id}` - Update an article
- `DELETE /api/test/article/{article_id}` - Delete an article

## Deployment Guide

### Using the Automated Script

1. Make the deployment script executable:
   ```bash
   chmod +x deploy.sh
   ```

2. Run the deployment script:
   ```bash
   ./deploy.sh
   ```

3. Follow the instructions provided at the end of the script.

### Manual Deployment

1. Set environment variables for production:
   ```bash
   export ENVIRONMENT=production
   ```

2. Update the `.env` file with production values:
   ```
   # Production settings
   ENVIRONMENT=production
   DATABASE_URL=your_production_db_url
   SECRET_KEY=your_secure_production_key
   DEFAULT_ADMIN_PASSWORD=your_secure_admin_password
   ```

3. Build the frontend:
   ```bash
   cd frontend
   npm ci --production
   npm run build
   ```

4. Configure your web server (Nginx recommended) to:
   - Serve static files from `frontend/build/`
   - Proxy API requests to the backend server

5. Start the backend with a production ASGI server:
   ```bash
   cd backend
   uvicorn main:app --host 0.0.0.0 --port 8000
   ```

For production, consider using Gunicorn with Uvicorn workers:
```bash
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
```

## Security Features

- The application uses bcrypt for password hashing
- JWT tokens are used for authentication with configurable expiration
- User permissions with admin controls
- Environment-specific security settings
- CORS protection for API endpoints
- No sensitive information exposed in frontend code
- Database credentials secured via environment variables
