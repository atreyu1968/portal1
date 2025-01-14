# Installation Guide for Ubuntu Server

This guide will help you set up the application on a clean Ubuntu server.

## Prerequisites

First, update the system and install basic dependencies:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install basic tools
sudo apt install -y curl git build-essential
```

## Install Node.js and npm

Install Node.js 20.x:

```bash
# Add NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Install Node.js and npm
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v20.x.x
npm --version   # Should show 10.x.x
```

## Install Nginx

```bash
# Install Nginx
sudo apt install -y nginx

# Start Nginx and enable it on boot
sudo systemctl start nginx
sudo systemctl enable nginx

# Check status
sudo systemctl status nginx
```

## Clone and Setup Application

```bash
# Create application directory
sudo mkdir -p /var/www/portal
sudo chown -R $USER:$USER /var/www/portal

# Clone repository
cd /var/www/portal
git clone <your-repository-url> .

# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..

# Build frontend
npm run build
```

## Configure Environment

Create environment files:

```bash
# Frontend environment (.env)
cat > .env << EOL
VITE_API_URL=http://your-domain.com/api
EOL

# Backend environment (server/.env)
cat > server/.env << EOL
PORT=3001
DB_PATH=./database.sqlite
EOL
```

## Configure Nginx

Create Nginx configuration:

```bash
sudo nano /etc/nginx/sites-available/portal
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/portal/dist;
    index index.html;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";
    add_header Referrer-Policy "strict-origin-when-cross-origin";
    add_header Content-Security-Policy "default-src 'self' 'unsafe-inline' 'unsafe-eval' https:; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https:; font-src 'self' data: https:;";

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 10240;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml application/javascript;
    gzip_disable "MSIE [1-6]\.";

    # Frontend
    location / {
        try_files $uri $uri/ /index.html;
        expires -1;
        add_header Cache-Control "no-store, no-cache, must-revalidate";
    }

    # API proxy
    location /api/ {
        proxy_pass http://127.0.0.1:3001/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Cache static assets
    location /assets {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/portal /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default  # Remove default site
sudo nginx -t  # Test configuration
sudo systemctl restart nginx
```

## Setup Process Manager (PM2)

Install and configure PM2 to manage the Node.js process:

```bash
# Install PM2 globally
sudo npm install -g pm2

# Start backend server
cd /var/www/portal/server
pm2 start index.js --name "portal-backend"

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $USER --hp /home/$USER
```

## Database Setup

The SQLite database will be automatically initialized when the server starts. The default admin credentials are:

- Username: admin
- Password: admin123

## Firewall Configuration

Configure UFW firewall:

```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow ssh
sudo ufw enable
```

## SSL/TLS Configuration (Optional but Recommended)

Install Certbot and obtain SSL certificate:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## File Permissions

Set proper permissions:

```bash
sudo chown -R $USER:$USER /var/www/portal
sudo chmod -R 755 /var/www/portal
```

## Monitoring and Logs

View logs:

```bash
# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Application logs
pm2 logs portal-backend
```

## Maintenance

Regular maintenance commands:

```bash
# Update application
cd /var/www/portal
git pull
npm install
npm run build
cd server
npm install
pm2 restart portal-backend

# Monitor processes
pm2 status
pm2 monit

# View resource usage
htop
```

## Backup

Setup daily backups:

```bash
# Create backup script
cat > /var/www/portal/backup.sh << 'EOL'
#!/bin/bash
BACKUP_DIR="/var/backups/portal"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Backup database
cp /var/www/portal/server/database.sqlite "$BACKUP_DIR/database_$TIMESTAMP.sqlite"

# Backup uploads
tar -czf "$BACKUP_DIR/uploads_$TIMESTAMP.tar.gz" /var/www/portal/uploads

# Keep only last 7 days of backups
find "$BACKUP_DIR" -type f -mtime +7 -delete
EOL

# Make script executable
chmod +x /var/www/portal/backup.sh

# Add to crontab
(crontab -l 2>/dev/null; echo "0 2 * * * /var/www/portal/backup.sh") | crontab -
```

## Security Recommendations

1. Change default admin password immediately after installation
2. Enable SSL/TLS using Let's Encrypt
3. Keep system and dependencies updated
4. Monitor logs regularly
5. Set up fail2ban for additional security
6. Configure regular backups
7. Use strong passwords
8. Keep firewall rules minimal and specific

## Troubleshooting

Common issues and solutions:

1. If Nginx shows 502 Bad Gateway:
   ```bash
   sudo systemctl restart nginx
   pm2 restart portal-backend
   ```

2. If permissions issues occur:
   ```bash
   sudo chown -R $USER:$USER /var/www/portal
   sudo chmod -R 755 /var/www/portal
   ```

3. If database errors occur:
   ```bash
   # Backup database
   cp /var/www/portal/server/database.sqlite /var/www/portal/server/database.sqlite.bak
   
   # Restart backend
   pm2 restart portal-backend
   ```

4. If the application is not accessible:
   ```bash
   # Check if Nginx is running
   sudo systemctl status nginx
   
   # Check if backend is running
   pm2 status
   
   # Check firewall status
   sudo ufw status
   ```