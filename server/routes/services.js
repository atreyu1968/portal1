const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.all('SELECT * FROM services ORDER BY "order"', (err, services) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
      return;
    }
    res.json(services);
  });
});

router.post('/', (req, res) => {
  const { title, description, icon, color, link, order } = req.body;
  const id = crypto.randomUUID();

  db.run(
    'INSERT INTO services (id, title, description, icon, color, link, "order") VALUES (?, ?, ?, ?, ?, ?, ?)',
    [id, title, description, icon, color, link, order],
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
  const { title, description, icon, color, link, order } = req.body;

  db.run(
    'UPDATE services SET title = ?, description = ?, icon = ?, color = ?, link = ?, "order" = ? WHERE id = ?',
    [title, description, icon, color, link, order, id],
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

  db.run('DELETE FROM services WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
      return;
    }
    res.json({ success: true });
  });
});

module.exports = router;