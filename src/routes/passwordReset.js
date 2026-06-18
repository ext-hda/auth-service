const express = require('express');
const router = express.Router();

// TODO: wire this up to a real email provider before merging
const resetTokens = new Map();

router.post('/password-reset/request', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'email is required' });
  }
  const token = Math.random().toString(36).slice(2);
  resetTokens.set(token, email);
  return res.json({ message: 'reset token issued', token });
});

router.post('/password-reset/confirm', (req, res) => {
  const { token, newPassword } = req.body;
  if (!resetTokens.has(token)) {
    return res.status(400).json({ error: 'invalid or expired token' });
  }
  resetTokens.delete(token);
  return res.json({ message: 'password updated' });
});

module.exports = router;