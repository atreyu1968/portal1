const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.all(
    'SELECT * FROM form_submissions ORDER BY submitted_at DESC',
    (err, submissions) => {
      if (err) {
        res.status(500).json({ error: 'Database error' });
        return;
      }
      res.json(submissions);
    }
  );
});

router.post('/', (req, res) => {
  const { form_id, data } = req.body;
  const id = crypto.randomUUID();
  const submitted_at = new Date().toISOString();
  const status = 'pending';

  db.run(
    'INSERT INTO form_submissions (id, form_id, data, status, submitted_at) VALUES (?, ?, ?, ?, ?)',
    [id, form_id, JSON.stringify(data), status, submitted_at],
    (err) => {
      if (err) {
        res.status(500).json({ error: 'Database error' });
        return;
      }
      res.status(201).json({ id });
    }
  );
});

router.put('/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['pending', 'processed', 'archived'].includes(status)) {
    res.status(400).json({ error: 'Invalid status' });
    return;
  }

  db.run(
    'UPDATE form_submissions SET status = ? WHERE id = ?',
    [status, id],
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

  db.run('DELETE FROM form_submissions WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
      return;
    }
    res.json({ success: true });
  });
});

module.exports = router;