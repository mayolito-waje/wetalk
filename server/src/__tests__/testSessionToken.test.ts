import api from './helpers/api.js';
import redisClient from '../redis/client.js';

afterAll(async () => {
  await redisClient.quit();
});

describe('extracting session token', () => {
  it('prevent accessing auth protected endpoints without session token', async () => {
    const res = await api
      .get('/api/users/@me')
      .expect(401);

    expect(res.body.message).toBe('session token is missing');
  });
});
