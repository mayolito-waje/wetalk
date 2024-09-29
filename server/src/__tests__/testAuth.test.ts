import fs from 'fs';
import path from 'path';
import api from './helpers/api.js';
import pool from '../postgres/pool.js';
import redisClient from '../redis/client.js';
import { resetDb, seedUsers } from './helpers/dbSeeder.js';
import { UserRegistration } from '../types/types.js';

const users: UserRegistration[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, './helpers/seeds/users.json'), 'utf-8'));

beforeEach(async () => {
  await resetDb();
  await seedUsers();
});

afterEach(async () => resetDb());

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
    expect(res.body.sessionToken).toBeDefined();
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

    expect(res.body.message).toBe('password not match');
  });

  it('does not login if user is not in database', async () => {
    const res = await api
      .post('/api/auth/login')
      .send({
        email: 'notInDb@example.com',
        password: 'password123',
      })
      .expect(401);

    expect(res.body.message).toBe('user not found');
  });
});
