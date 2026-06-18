const request = require('supertest');
const app = require('../src/index');

describe('auth routes', () => {
  it('registers a new user', async () => {
    const res = await request(app)
      .post('/register')
      .send({ email: 'test@ext-hda.com', password: 'password123' });
    expect(res.statusCode).toBe(201);
  });

  it('rejects login with bad credentials', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: 'nobody@ext-hda.com', password: 'wrong' });
    expect(res.statusCode).toBe(401);
  });
});
