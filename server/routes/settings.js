const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.all('SELECT * FROM settings', (err, settings) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
      return;
    }

    // Convert array of key-value pairs to object
    const settingsObject = settings.reduce((acc, { key, value }) => {
      acc[key] = JSON.parse(value);
      return acc;
    }, {});

    res.json(settingsObject);
  });
});

router.put('/', (req, res) => {
  const settings = req.body;
  const id = crypto.randomUUID();

  // Convert object to array of key-value pairs
  const entries = Object.entries(settings);

  // Use a transaction to update all settings
  db.serialize(() => {
    db.run('BEGIN TRANSACTION');

    try {
      // Clear existing settings
      db.run('DELETE FROM settings');

      // Insert new settings
      const stmt = db.prepare('INSERT INTO settings (id, key, value) VALUES (?, ?, ?)');
      entries.forEach(([key, value]) => {
        stmt.run(crypto.randomUUID(), key, JSON.stringify(value));
      });
      stmt.finalize();

      db.run('COMMIT');
      res.json({ success: true });
    } catch (err) {
      db.run('ROLLBACK');
      res.status(500).json({ error: 'Database error' });
    }
  });
});

module.exports = router;