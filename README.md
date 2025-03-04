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

## Production Deployment Guide

### Prerequisites

- Ubuntu 20.04 or newer server
- Domain name with DNS configured
- SSH access to the server
- PostgreSQL 12+ installed
- Python 3.8+ installed
- Node.js 14+ installed
- Nginx installed
- Certbot for Let's Encrypt SSL

### Automatic Deployment

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

#### 1. Server Setup

```bash
# Update packages
sudo apt update && sudo apt upgrade -y

# Install dependencies
sudo apt install -y python3-pip python3-venv postgresql nginx certbot python3-certbot-nginx

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs
```

#### 2. Database Setup

```bash
# Create PostgreSQL user and database
sudo -u postgres psql -c "CREATE USER gi_user WITH PASSWORD 'secure_password';"
sudo -u postgres psql -c "CREATE DATABASE gi_software;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE gi_software TO gi_user;"
```

#### 3. Application Setup

```bash
# Clone repository (if not already done)
git clone https://github.com/yourusername/gi_software.git
cd gi_software

# Configure backend
cd backend
cp .env.example .env
nano .env  # Edit with production values
```

Edit the `.env` file with production values:
```
ENVIRONMENT=production
DATABASE_URL=postgresql+asyncpg://gi_user:secure_password@localhost/gi_software
SECRET_KEY=your_secure_random_key
DEFAULT_ADMIN_PASSWORD=your_secure_admin_password
```

```bash
# Set up Python virtual environment
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install gunicorn

# Initialize database and admin user
python init_db.py
python create_admin.py

# Build frontend
cd ../frontend
npm ci --production
npm run build
```

#### 4. Configure Web Server

Create an Nginx configuration file:

```bash
sudo nano /etc/nginx/sites-available/gi_software
```

Add the following configuration (replace yourdomain.com):

```nginx
server {
    server_name yourdomain.com www.yourdomain.com;

    # Frontend static files
    location / {
        root /path/to/gi_software/frontend/build;
        try_files $uri $uri/ /index.html;
        expires 30d;
        add_header Cache-Control "public, max-age=2592000";
    }

    # Backend API proxy
    location /api {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Docs endpoint
    location /docs {
        proxy_pass http://localhost:8000/docs;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Additional security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
}
```

Enable the configuration and obtain SSL certificate:

```bash
sudo ln -s /etc/nginx/sites-available/gi_software /etc/nginx/sites-enabled/
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
sudo systemctl restart nginx
```

#### 5. Set Up Systemd Service

Create a systemd service for the backend:

```bash
sudo nano /etc/systemd/system/gi_software.service
```

Add the following content:

```ini
[Unit]
Description=GI Software Backend
After=network.target

[Service]
User=ubuntu  # Change to your server username
Group=ubuntu  # Change to your server group
WorkingDirectory=/path/to/gi_software/backend
Environment="PATH=/path/to/gi_software/backend/venv/bin"
EnvironmentFile=/path/to/gi_software/backend/.env
ExecStart=/path/to/gi_software/backend/venv/bin/gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app --bind 0.0.0.0:8000
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

Enable and start the service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable gi_software
sudo systemctl start gi_software
```

#### 6. Monitoring and Logs

```bash
# Check backend status
sudo systemctl status gi_software

# View backend logs
sudo journalctl -u gi_software -f

# View Nginx access and error logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

#### 7. Security Recommendations

- Set up UFW firewall to only allow necessary ports (22, 80, 443)
- Configure fail2ban to prevent brute force attacks
- Set up regular database backups
- Enable automatic security updates
- Use secure passwords for all services

#### 8. Performance Tuning

- Configure PostgreSQL for production workloads
- Set up caching with Redis for API responses
- Implement a CDN for static assets
- Configure proper resource limits in Gunicorn

## Security Features

- The application uses bcrypt for password hashing
- JWT tokens are used for authentication with configurable expiration
- User permissions with admin controls
- Environment-specific security settings
- CORS protection for API endpoints
- No sensitive information exposed in frontend code
- Database credentials secured via environment variables
