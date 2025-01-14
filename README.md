# Portal de Educación

Sistema de gestión de contenidos (CMS) moderno y flexible desarrollado con React, TypeScript y Tailwind CSS.

## Despliegue Rápido

1. Clonar el repositorio:
```bash
git clone https://github.com/atreyu1968/portal1.git
cd portal1
```

2. Instalar dependencias:
```bash
# Instalar dependencias del frontend
npm install

# Instalar dependencias del backend
cd server && npm install && cd ..
```

3. Configurar variables de entorno:
```bash
# Frontend (.env)
VITE_API_URL=http://localhost:3001

# Backend (server/.env)
PORT=3001
DB_PATH=./database.sqlite
```

4. Iniciar en modo desarrollo:
```bash
# Iniciar frontend y backend
npm run dev:all
```

5. Construir para producción:
```bash
npm run build
```

## Documentación

Para instrucciones detalladas de instalación en un servidor Ubuntu, consulta [INSTALL.md](INSTALL.md).

## Credenciales por Defecto

- Usuario: admin
- Contraseña: admin123

¡Cambia estas credenciales inmediatamente después de la instalación!

## Características

### 🎨 Editor Visual
- Editor de páginas con componentes drag & drop
- Carrusel de imágenes con autoplay
- Secciones de texto enriquecido
- Galerías multimedia
- Formularios personalizables
- Acordeones
- Videos embebidos
- HTML/CSS personalizado
- Scripts JavaScript
- Markdown

### 🛠 Panel de Administración
- Gestión de páginas
- Editor de carrusel
- Gestión de redes
- Gestión de servicios
- Biblioteca de medios
- Gestión de formularios
- Editor de navegación
- Gestión de administradores
- Configuración del sitio

### 🎯 Características Principales
- Diseño responsive
- Efecto glassmorphism en cabecera
- Optimización SEO
- Caché de assets
- Compresión Gzip
- Seguridad mejorada
- Soporte para favicon
- Integración con redes sociales

## Estructura del Proyecto

```
├── src/
│   ├── components/     # Componentes React
│   ├── lib/           # Utilidades y configuración
│   ├── pages/         # Páginas de la aplicación
│   └── types/         # Definiciones TypeScript
├── public/            # Archivos estáticos
└── server/           # Backend Node.js
```

## Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.