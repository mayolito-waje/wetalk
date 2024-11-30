import api from './helpers/api.js';
import redisClient from '../redis/client.js';

afterAll(async () => {
  await redisClient.quit();
});

describe('extracting access token', () => {
  it('prevent accessing auth protected endpoints without access token', async () => {
    const res = await api
      .get('/api/users/@me')
      .expect(401);

    expect(res.body.error).toBe('access token is missing');
  });
});
