const request = require('supertest');
const express = require('express');
const passwordResetRoutes = require('../src/routes/passwordReset');

const app = express();
app.use(express.json());
app.use('/', passwordResetRoutes);

describe('password reset routes', () => {
  it('issues a reset token for a known email', async () => {
    const res = await request(app)
      .post('/password-reset/request')
      .send({ email: 'test@ext-hda.com' });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});