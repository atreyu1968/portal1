const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.all(
    'SELECT * FROM media ORDER BY uploaded_at DESC',
    (err, media) => {
      if (err) {
        res.status(500).json({ error: 'Database error' });
        return;
      }
      res.json(media);
    }
  );
});

router.post('/', (req, res) => {
  const { name, url, type, size } = req.body;
  const id = crypto.randomUUID();
  const uploaded_at = new Date().toISOString();

  db.run(
    'INSERT INTO media (id, name, url, type, size, uploaded_at) VALUES (?, ?, ?, ?, ?, ?)',
    [id, name, url, type, size, uploaded_at],
    (err) => {
      if (err) {
        res.status(500).json({ error: 'Database error' });
        return;
      }
      res.status(201).json({ id });
    }
  );
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM media WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
      return;
    }
    res.json({ success: true });
  });
});

module.exports = router;