import pool from '../../postgres/pool.js';

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
