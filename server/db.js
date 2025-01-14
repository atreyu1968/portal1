const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');
const { DB_PATH } = require('./config');

// Initialize database
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

// Initialize database schema
function initializeDatabase() {
  const migration = fs.readFileSync(
    path.join(__dirname, 'migrations', '001_initial_schema.sql'),
    'utf8'
  );

  db.exec(migration, (err) => {
    if (err) {
      console.error('Error initializing database:', err);
    } else {
      console.log('Database schema initialized');
    }
  });
}

module.exports = db;