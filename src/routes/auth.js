const express = require('express');
const bcrypt = require('bcryptjs');
const { signToken, verifyToken } = require('../middleware/jwt');

const router = express.Router();

// In-memory store for demo purposes only
const users = new Map();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' });
  }
  if (users.has(email)) {
    return res.status(409).json({ error: 'user already exists' });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  users.set(email, { email, passwordHash });
  return res.status(201).json({ email });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.get(email);
  if (!user) {
    return res.status(401).json({ error: 'invalid credentials' });
  }
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ error: 'invalid credentials' });
  }
  const token = signToken({ email: user.email });
  return res.json({ token });
});

router.get('/verify', (req, res) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');
  try {
    const payload = verifyToken(token);
    return res.json({ valid: true, user: payload });
  } catch (err) {
    return res.status(401).json({ valid: false, error: 'invalid token' });
  }
});

module.exports = router;
