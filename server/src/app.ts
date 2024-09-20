import type { Express, Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import notFound from './middlewares/notFound.js';
import errorHandler from './middlewares/error.js';

const app: Express = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.send('server is running');
});

app.use(errorHandler);
app.use(notFound);

export default app;
