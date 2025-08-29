const express = require('express');
const jwt = require('jsonwebtoken');
const { getPool } = require('../db/mysql');
const { comparePassword } = require('../utils/password');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    const [rows] = await getPool().query(
      'SELECT id, name, email, password_hash FROM users WHERE email=? LIMIT 1',
      [email]
    );
    if (!rows.length) return res.status(401).json({ message: 'Invalid credentials' });

    const user = rows[0];
    const ok = await comparePassword(password, user.password_hash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { sub: String(user.id), email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    return res.json({ token, user: { email: user.email, name: user.name } });
  } catch (e) {
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
