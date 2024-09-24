import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  port: parseInt(process.env.PG_PORT as string, 10),
  database: process.env.NODE_ENV === 'test'
    ? process.env.PG_TEST_DATABASE
    : process.env.PG_DATABASE,
});

pool.on('connect', () => {
  console.log('Connected to postgres pool connection.');
});

pool.on('error', (err: Error) => {
  console.error('Error on client', err);
  process.exit(-1);
});

export default pool;
