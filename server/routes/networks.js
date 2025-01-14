const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.all('SELECT * FROM networks ORDER BY name', (err, networks) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
      return;
    }
    res.json(networks);
  });
});

router.post('/', (req, res) => {
  const { name, description, icon, color, slug, content } = req.body;
  const id = crypto.randomUUID();
  const lastModified = new Date().toISOString();

  db.run(
    'INSERT INTO networks (id, name, description, icon, color, slug, content, last_modified) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [id, name, description, icon, color, slug, JSON.stringify(content), lastModified],
    (err) => {
      if (err) {
        res.status(500).json({ error: 'Database error' });
        return;
      }
      res.status(201).json({ id });
    }
  );
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, icon, color, slug, content } = req.body;
  const lastModified = new Date().toISOString();

  db.run(
    'UPDATE networks SET name = ?, description = ?, icon = ?, color = ?, slug = ?, content = ?, last_modified = ? WHERE id = ?',
    [name, description, icon, color, slug, JSON.stringify(content), lastModified, id],
    (err) => {
      if (err) {
        res.status(500).json({ error: 'Database error' });
        return;
      }
      res.json({ success: true });
    }
  );
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM networks WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
      return;
    }
    res.json({ success: true });
  });
});

module.exports = router;