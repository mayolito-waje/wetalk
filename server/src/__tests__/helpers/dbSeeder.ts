import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';
import pool from '../../postgres/pool.js';
import type { UserRegistration } from '../../types/types.js';

export const resetDb = async () => {
  try {
    await pool.query('BEGIN');

    await pool.query('DELETE FROM "user"');
    await pool.query('DELETE FROM "group_chat"');
    await pool.query('DELETE FROM "group_chat_user"');
    await pool.query('DELETE FROM "message"');
    await pool.query('DELETE FROM "message_recipient"');

    await pool.query('COMMIT');
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log('Error:', error.message);
    }
  }
};

export const seedUsers = async () => {
  const users: UserRegistration[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, './seeds/users.json'), 'utf8'));

  await pool.query('DELETE FROM "user"');

  const populateUsers = await Promise.all(users.map(async ({ email, username, password }) => {
    const salt: string = await bcrypt.genSalt(10);
    const passwordHash: string = await bcrypt.hash(password, salt);

    return [email, username, passwordHash];
  }));

  await Promise.all(populateUsers.map((data) => pool.query('INSERT INTO "user" ("email", "username", "passwordHash") VALUES ($1, $2, $3)', data)));
};
