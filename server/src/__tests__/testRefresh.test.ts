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

describe('GET /api/refresh', () => {
  it('successfully refresh accessToken if user is logged in', async () => {
    const { email, password } = users[0];
    const { cookies } = await getTokenFromUser({ email, password });

    const res = await api
      .get('/api/refresh')
      .set('Cookie', cookies)
      .expect(200);

    expect(res.body.accessToken).toBeDefined();
  });

  it('do not allow refresh if there is no http cookie', async () => {
    const res = await api
      .get('/api/refresh')
      .expect(406);

    expect(res.body.error).toBe('Unauthorized');
  });
});
