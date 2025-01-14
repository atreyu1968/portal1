#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Function to print status messages
print_status() {
    echo -e "${GREEN}==>${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}==>${NC} $1"
}

print_error() {
    echo -e "${RED}==>${NC} $1"
}

# Check if script is run as root
if [ "$EUID" -ne 0 ]; then
    print_error "Este script debe ejecutarse como root (sudo)"
    exit 1
fi

# Get domain name
read -p "Introduce el dominio del sitio (ej: ejemplo.com): " DOMAIN_NAME

# Update system
print_status "Actualizando el sistema..."
apt update && apt upgrade -y

# Install dependencies
print_status "Instalando dependencias..."
apt install -y curl git build-essential

# Install Node.js and Cloudflared
print_status "Instalando Node.js..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

print_status "Instalando Cloudflared..."
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
dpkg -i cloudflared.deb
rm cloudflared.deb

# Verify Node.js installation
NODE_VERSION=$(node --version)
NPM_VERSION=$(npm --version)
print_status "Node.js $NODE_VERSION y npm $NPM_VERSION instalados correctamente"

# Install PM2
print_status "Instalando PM2..."
npm install -g pm2

# Create application directory
print_status "Creando directorio de la aplicación..."
mkdir -p /var/www/portal
chown -R $SUDO_USER:$SUDO_USER /var/www/portal

# Clone repository
print_status "Clonando repositorio..."
su - $SUDO_USER -c "cd /var/www/portal && git clone https://github.com/atreyu1968/portal1.git ."

# Install dependencies and build
print_status "Instalando dependencias y construyendo la aplicación..."
su - $SUDO_USER -c "cd /var/www/portal && npm install"
su - $SUDO_USER -c "cd /var/www/portal/server && npm install"
su - $SUDO_USER -c "cd /var/www/portal && npm run build"

# Create environment files
print_status "Configurando variables de entorno..."
cat > /var/www/portal/.env << EOL
VITE_API_URL=/api
EOL

cat > /var/www/portal/server/.env << EOL
PORT=3001
DB_PATH=./database.sqlite
EOL

# Configure PM2
print_status "Configurando PM2..."
su - $SUDO_USER -c "cd /var/www/portal/server && pm2 start index.js --name 'portal-backend'"
su - $SUDO_USER -c "pm2 save"
env PATH=$PATH:/usr/bin pm2 startup systemd -u $SUDO_USER --hp /home/$SUDO_USER

# Setup backup script
print_status "Configurando backups automáticos..."
cat > /var/www/portal/backup.sh << 'EOL'
#!/bin/bash
BACKUP_DIR="/var/backups/portal"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

mkdir -p "$BACKUP_DIR"
cp /var/www/portal/server/database.sqlite "$BACKUP_DIR/database_$TIMESTAMP.sqlite"
tar -czf "$BACKUP_DIR/uploads_$TIMESTAMP.tar.gz" /var/www/portal/uploads
find "$BACKUP_DIR" -type f -mtime +7 -delete
EOL

chmod +x /var/www/portal/backup.sh
(crontab -u $SUDO_USER -l 2>/dev/null; echo "0 2 * * * /var/www/portal/backup.sh") | crontab -u $SUDO_USER -

# Set permissions
print_status "Configurando permisos..."
chown -R $SUDO_USER:$SUDO_USER /var/www/portal
chmod -R 755 /var/www/portal

print_status "¡Instalación completada!"
print_warning "Credenciales por defecto:"
print_warning "Usuario: admin"
print_warning "Contraseña: admin123"
print_warning "¡IMPORTANTE! Cambia estas credenciales inmediatamente después de iniciar sesión."

echo -e "\nPuedes acceder a tu sitio en: https://$DOMAIN_NAME"