/*
  # Initial Database Schema

  1. Tables
    - users
      - id (primary key)
      - username (unique)
      - password
      - role
      - name
      - email
      - created_at
      - last_login
      - status
    
    - pages
      - id (primary key)
      - title
      - description
      - slug (unique)
      - sections (JSON)
      - last_modified
    
    - networks
      - id (primary key)
      - name
      - description
      - icon
      - color
      - slug (unique)
      - content (JSON)
      - last_modified
    
    - services
      - id (primary key)
      - title
      - description
      - icon
      - color
      - link
      - order
    
    - carousel_slides
      - id (primary key)
      - image_url
      - title
      - description
      - buttons (JSON)
      - order
    
    - settings
      - id (primary key)
      - key (unique)
      - value (JSON)
    
    - media
      - id (primary key)
      - name
      - url
      - type
      - size
      - uploaded_at
    
    - form_submissions
      - id (primary key)
      - form_id
      - data (JSON)
      - status
      - submitted_at
*/

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'superadmin')),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TEXT NOT NULL,
  last_login TEXT,
  status TEXT NOT NULL CHECK (status IN ('active', 'inactive'))
);

-- Pages table
CREATE TABLE IF NOT EXISTS pages (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  slug TEXT UNIQUE NOT NULL,
  sections TEXT NOT NULL, -- JSON array
  last_modified TEXT NOT NULL
);

-- Networks table
CREATE TABLE IF NOT EXISTS networks (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL, -- JSON array
  last_modified TEXT NOT NULL
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  link TEXT NOT NULL,
  "order" INTEGER NOT NULL
);

-- Carousel slides table
CREATE TABLE IF NOT EXISTS carousel_slides (
  id TEXT PRIMARY KEY,
  image_url TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  buttons TEXT, -- JSON array
  "order" INTEGER NOT NULL
);

-- Settings table
CREATE TABLE IF NOT EXISTS settings (
  id TEXT PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL -- JSON object
);

-- Media table
CREATE TABLE IF NOT EXISTS media (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  type TEXT NOT NULL,
  size INTEGER NOT NULL,
  uploaded_at TEXT NOT NULL
);

-- Form submissions table
CREATE TABLE IF NOT EXISTS form_submissions (
  id TEXT PRIMARY KEY,
  form_id TEXT NOT NULL,
  data TEXT NOT NULL, -- JSON object
  status TEXT NOT NULL CHECK (status IN ('pending', 'processed', 'archived')),
  submitted_at TEXT NOT NULL
);

-- Insert default admin user
INSERT OR IGNORE INTO users (
  id, username, password, role, name, email, created_at, status
) VALUES (
  '1',
  'admin',
  'YWRtaW4xMjM=', -- admin123 in base64
  'superadmin',
  'Administrador',
  'admin@example.com',
  DATETIME('now'),
  'active'
);