import type { Express, Request, Response } from 'express';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookierparser from 'cookie-parser';

import redisClient from './redis/client.js';
import extractToken from './middlewares/extractToken.js';
import notFound from './middlewares/notFound.js';
import errorHandler from './middlewares/error.js';
import refreshRouter from './routes/refresh.js';
import authRouter from './routes/auth.js';
import usersRouter from './routes/users.js';

redisClient.connect();

const app: Express = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookierparser());

app.use(morgan('tiny'));

app.use(extractToken);

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/refresh', refreshRouter);

app.get('/', (_req: Request, res: Response) => {
  res.send('server is running');
});

app.use(errorHandler);
app.use(notFound);

export default app;
