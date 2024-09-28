import api from './helpers/api.js';
import pool from '../postgres/pool.js';
import redisClient from '../redis/client.js';
import { resetDb } from './helpers/dbSeeder.js';
import { UserRegistration } from '../types/types.js';

afterEach(async () => {
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
}

describe('user registration', () => {
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
