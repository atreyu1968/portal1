const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.all('SELECT * FROM carousel_slides ORDER BY "order"', (err, slides) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
      return;
    }
    res.json(slides);
  });
});

router.post('/', (req, res) => {
  const { image_url, title, description, buttons, order } = req.body;
  const id = crypto.randomUUID();

  db.run(
    'INSERT INTO carousel_slides (id, image_url, title, description, buttons, "order") VALUES (?, ?, ?, ?, ?, ?)',
    [id, image_url, title, description, JSON.stringify(buttons), order],
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
  const { image_url, title, description, buttons, order } = req.body;

  db.run(
    'UPDATE carousel_slides SET image_url = ?, title = ?, description = ?, buttons = ?, "order" = ? WHERE id = ?',
    [image_url, title, description, JSON.stringify(buttons), order, id],
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

  db.run('DELETE FROM carousel_slides WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
      return;
    }
    res.json({ success: true });
  });
});

module.exports = router;