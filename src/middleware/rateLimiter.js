const attempts = new Map();
const WINDOW_MS = 60 * 1000;
const MAX_ATTEMPTS = 5;

function rateLimitLogin(req, res, next) {
  const key = req.body.email || req.ip;
  const now = Date.now();
  const record = attempts.get(key) || { count: 0, windowStart: now };

  if (now - record.windowStart > WINDOW_MS) {
    record.count = 0;
    record.windowStart = now;
  }

  record.count += 1;
  attempts.set(key, record);

  if (record.count > MAX_ATTEMPTS) {
    return res.status(429).json({ error: 'too many login attempts, try again shortly' });
  }
  return next();
}

module.exports = { rateLimitLogin };
