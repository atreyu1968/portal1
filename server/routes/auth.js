const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  db.get(
    'SELECT * FROM users WHERE username = ? AND status = ?',
    [username, 'active'],
    (err, user) => {
      if (err) {
        res.status(500).json({ error: 'Database error' });
        return;
      }

      if (!user) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }

      // Simple base64 password check (for demo only)
      if (Buffer.from(password).toString('base64') !== user.password) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }

      // Update last login
      db.run(
        'UPDATE users SET last_login = DATETIME("now") WHERE id = ?',
        [user.id]
      );

      // Remove password from response
      delete user.password;
      res.json(user);
    }
  );
});

module.exports = router;