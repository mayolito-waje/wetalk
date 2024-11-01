import api from './helpers/api.js';
import pool from '../postgres/pool.js';
import redisClient from '../redis/client.js';
import { users, getTokenFromUser, resetDb, resetRedisDb, seedUsers } from './helpers/dbSeeder.js';

beforeEach(async () => {
  await resetDb();
  await seedUsers();
});

afterEach(async () => {
  await resetRedisDb();
  await resetDb();
});

afterAll(async () => {
  await pool.end();
  await redisClient.quit();
});

describe('GET /api/users/@me', () => {
  it('get logged in user', async () => {
    const { email, username, password } = users[0];
    const { cookies, accessToken } = await getTokenFromUser({ email, password });

    const res = await api
      .get('/api/users/@me')
      .set('Cookie', cookies)
      .auth(accessToken, { type: 'bearer' })
      .expect(200);

    expect(res.body.email).toBe(email);
    expect(res.body.username).toBe(username);
    expect(res.body.id).toBeDefined();
  });
});
