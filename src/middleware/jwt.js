const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';
const DEFAULT_EXPIRY = '15m';

function signToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: DEFAULT_EXPIRY });
}

function verifyToken(token) {
  return jwt.verify(token, SECRET);
}

module.exports = { signToken, verifyToken };