const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.all('SELECT * FROM pages ORDER BY last_modified DESC', (err, pages) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
      return;
    }
    res.json(pages);
  });
});

router.post('/', (req, res) => {
  const { title, description, slug, sections } = req.body;
  const id = crypto.randomUUID();
  const lastModified = new Date().toISOString();

  db.run(
    'INSERT INTO pages (id, title, description, slug, sections, last_modified) VALUES (?, ?, ?, ?, ?, ?)',
    [id, title, description, slug, JSON.stringify(sections), lastModified],
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
  const { title, description, slug, sections } = req.body;
  const lastModified = new Date().toISOString();

  db.run(
    'UPDATE pages SET title = ?, description = ?, slug = ?, sections = ?, last_modified = ? WHERE id = ?',
    [title, description, slug, JSON.stringify(sections), lastModified, id],
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

  db.run('DELETE FROM pages WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
      return;
    }
    res.json({ success: true });
  });
});

module.exports = router;