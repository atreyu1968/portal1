# Guía de Instalación para Ubuntu Server

Esta guía te ayudará a instalar y configurar el Portal de Educación en un servidor Ubuntu limpio.

## Requisitos Previos

- Ubuntu Server 20.04 LTS o superior
- Acceso root o sudo
- Conexión a Internet
- Cuenta de Cloudflare (para el túnel)

## 1. Instalación Automática

La forma más rápida de instalar es usando nuestro script de instalación:

```bash
# Descargar el script
wget https://github.com/atreyu1968/portal1/main/install.sh

# Dar permisos de ejecución
chmod +x install.sh

# Ejecutar el script
sudo ./install.sh
```

El script se encargará de:
- Instalar todas las dependencias necesarias
- Clonar el repositorio
- Configurar el entorno
- Instalar y configurar Cloudflared
- Configurar PM2 para el backend
- Establecer los backups automáticos

## 2. Instalación Manual

Si prefieres instalar manualmente, sigue estos pasos:

### 2.1 Actualizar el Sistema

```bash
sudo apt update && sudo apt upgrade -y
```

### 2.2 Instalar Dependencias Básicas

```bash
sudo apt install -y curl git build-essential
```

### 2.3 Instalar Node.js

```bash
# Añadir repositorio de Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Instalar Node.js
sudo apt install -y nodejs

# Verificar instalación
node --version  # Debería mostrar v20.x.x
npm --version   # Debería mostrar 10.x.x
```

### 2.4 Instalar Cloudflared

```bash
# Descargar e instalar Cloudflared
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared.deb
rm cloudflared.deb

# Verificar instalación
cloudflared --version
```

### 2.5 Clonar y Configurar la Aplicación

```bash
# Crear directorio de la aplicación
sudo mkdir -p /var/www/portal
sudo chown -R $USER:$USER /var/www/portal

# Clonar repositorio
cd /var/www/portal
git clone https://github.com/atreyu1968/portal1.git .

# Instalar dependencias del frontend
npm install

# Instalar dependencias del backend
cd server
npm install
cd ..

# Construir frontend
npm run build
```

### 2.6 Configurar Variables de Entorno

```bash
# Frontend (.env)
cat > .env << EOL
VITE_API_URL=/api
EOL

# Backend (server/.env)
cat > server/.env << EOL
PORT=3001
DB_PATH=./database.sqlite
EOL
```

### 2.7 Configurar PM2

```bash
# Instalar PM2 globalmente
sudo npm install -g pm2

# Iniciar backend
cd /var/www/portal/server
pm2 start index.js --name "portal-backend"

# Guardar configuración de PM2
pm2 save

# Configurar inicio automático
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $USER --hp /home/$USER
```

## 3. Configuración de Cloudflared

### 3.1 Autenticar Cloudflared

```bash
cloudflared tunnel login
```

### 3.2 Crear y Configurar el Túnel

```bash
# Crear túnel
cloudflared tunnel create portal-tunnel

# Configurar túnel
cat > ~/.cloudflared/config.yml << EOL
tunnel: portal-tunnel
credentials-file: /root/.cloudflared/<TU-ID-TUNEL>.json

ingress:
  - hostname: tu-dominio.com
    service: http://localhost:5173
  - hostname: api.tu-dominio.com
    service: http://localhost:3001
  - service: http_status:404
EOL

# Iniciar túnel
cloudflared tunnel run portal-tunnel
```

### 3.3 Configurar Inicio Automático del Túnel

```bash
sudo cloudflared service install
```

## 4. Backups

Configurar backups automáticos:

```bash
# Crear script de backup
cat > /var/www/portal/backup.sh << 'EOL'
#!/bin/bash
BACKUP_DIR="/var/backups/portal"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

mkdir -p "$BACKUP_DIR"
cp /var/www/portal/server/database.sqlite "$BACKUP_DIR/database_$TIMESTAMP.sqlite"
tar -czf "$BACKUP_DIR/uploads_$TIMESTAMP.tar.gz" /var/www/portal/uploads
find "$BACKUP_DIR" -type f -mtime +7 -delete
EOL

# Hacer ejecutable el script
chmod +x /var/www/portal/backup.sh

# Añadir a crontab (backup diario a las 2 AM)
(crontab -l 2>/dev/null; echo "0 2 * * * /var/www/portal/backup.sh") | crontab -
```

## 5. Credenciales por Defecto

```
Usuario: admin
Contraseña: admin123
```

⚠️ **IMPORTANTE**: Cambia estas credenciales inmediatamente después de iniciar sesión.

## 6. Mantenimiento

### 6.1 Actualizar la Aplicación

```bash
cd /var/www/portal
git pull
npm install
npm run build
cd server
npm install
pm2 restart portal-backend
```

### 6.2 Monitorización

```bash
# Estado de PM2
pm2 status
pm2 monit

# Logs de la aplicación
pm2 logs portal-backend

# Estado del túnel
cloudflared tunnel info portal-tunnel
```

### 6.3 Backup Manual

```bash
/var/www/portal/backup.sh
```

## 7. Solución de Problemas

### 7.1 El Frontend no Responde

```bash
cd /var/www/portal
npm run dev
```

### 7.2 El Backend no Responde

```bash
pm2 restart portal-backend
pm2 logs portal-backend
```

### 7.3 Problemas con el Túnel

```bash
# Reiniciar el servicio de Cloudflared
sudo systemctl restart cloudflared

# Ver logs del túnel
cloudflared tunnel logs portal-tunnel
```

### 7.4 Problemas de Permisos

```bash
sudo chown -R $USER:$USER /var/www/portal
sudo chmod -R 755 /var/www/portal
```

## 8. Recomendaciones de Seguridad

1. Cambiar las credenciales por defecto inmediatamente
2. Mantener el sistema y las dependencias actualizadas
3. Monitorizar los logs regularmente
4. Configurar backups en una ubicación externa
5. Usar contraseñas fuertes
6. Mantener copias de seguridad de la configuración de Cloudflared

## 9. Recursos Adicionales

- [Documentación de Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/)
- [Documentación de PM2](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [Repositorio del Proyecto](https://github.com/atreyu1968/portal1)
