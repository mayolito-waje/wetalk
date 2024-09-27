import redis from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const redisClient = redis.createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT as string, 10),
  },
});

redisClient.on('connect', () => {
  console.log('Redis client connected.');
});

redisClient.on('error', (error: Error) => {
  console.log('Error:', error.message);
});

export default redisClient;
