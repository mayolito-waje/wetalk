import * as redis from 'redis';
import dotenv from 'dotenv';
import logger from '../utils/logger.js';

dotenv.config();

const redisClient = redis.createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT as string, 10),
  },
});

redisClient.on('connect', () => {
  logger('Redis client connected.');
});

redisClient.on('error', (error: Error) => {
  logger('Error:', error.message);
});

export default redisClient;
