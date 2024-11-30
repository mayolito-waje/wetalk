import api from './helpers/api.js';
import pool from '../postgres/pool.js';
import redisClient from '../redis/client.js';
import { users, getTokenFromUser, resetDb, resetRedisDb, seedUsers } from './helpers/dbSeeder.js';
import { UserRegistration } from '../types/types.js';

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

const testUser: UserRegistration = {
  email: 'testUser@email.com',
  username: 'testUser',
  password: 'testUserPassword',
};

describe('POST /api/auth/register', () => {
  it('successfully register user with proper credentials', async () => {
    const res = await api
      .post('/api/auth/register')
      .send(testUser)
      .expect(201);

    expect(res.body.message).toBe('registered new user');
  });

  it('does not register with duplicate email', async () => {
    await api.post('/api/auth/register').send(testUser);

    const res = await api
      .post('/api/auth/register')
      .send(testUser)
      .expect(409);

    expect(res.body.error).toBe('email is already taken');
  });

  it('does not register with invalid password', async () => {
    const res = await api
      .post('/api/auth/register')
      .send({
        email: testUser.email,
        username: testUser.username,
        password: 're',
      })
      .expect(422);

    expect(res.body.error).toBe('Password should be at least 8 characters');
  });

  it('does not register with invalid email format', async () => {
    const res = await api
      .post('/api/auth/register')
      .send({
        email: 'invalidEmail',
        username: testUser.username,
        password: testUser.password,
      })
      .expect(422);

    expect(res.body.error).toBe('invalid email format');
  });
});

describe('POST /api/auth/login', () => {
  it('succesfully login if user is registered', async () => {
    const user = users[0];

    const res = await api
      .post('/api/auth/login')
      .send({
        email: user.email,
        password: user.password,
      })
      .expect(200);

    expect(res.body.message).toBe('login successful');
    expect(res.body.accessToken).toBeDefined();
  });

  it('does not authorize login if wrong password', async () => {
    const user = users[0];

    const res = await api
      .post('/api/auth/login')
      .send({
        email: user.email,
        password: 'wrong_password',
      })
      .expect(401);

    expect(res.body.error).toBe('password not match');
  });

  it('does not login if user is not in database', async () => {
    const res = await api
      .post('/api/auth/login')
      .send({
        email: 'notInDb@example.com',
        password: 'password123',
      })
      .expect(401);

    expect(res.body.error).toBe('user not found');
  });
});

describe('POST /api/auth/logout', () => {
  it('successfully logout if accessToken is provided', async () => {
    const { email, password } = users[0];
    const { cookies, accessToken } = await getTokenFromUser({ email, password });

    const res = await api
      .post('/api/auth/logout')
      .set('Cookie', cookies)
      .auth(accessToken, { type: 'bearer' })
      .expect(200);

    expect(res.body.message).toBe('logout successful');
  });

  it('after logout, do not allow access to auth protected endpoints', async () => {
    const { email, password } = users[0];
    const { cookies, accessToken } = await getTokenFromUser({ email, password });

    await api
      .post('/api/auth/logout')
      .set('Cookie', cookies)
      .auth(accessToken, { type: 'bearer' });

    let res = await api
      .get('/api/users/@me')
      .set('Cookie', cookies)
      .auth(accessToken, { type: 'bearer' })
      .expect(401);

    expect(res.body.error).toBe('the session token is already logged out (blacklisted)');

    res = await api
      .get('/api/users/@me')
      .auth(accessToken, { type: 'bearer' })
      .expect(401);

    expect(res.body.error).toBe('refresh token is missing');
  });
});
