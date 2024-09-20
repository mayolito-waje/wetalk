import type { Express, Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app: Express = express();

app.use(cors());
app.use(helmet());

app.get('/', (_req: Request, res: Response) => {
  res.send('server is running');
});

export default app;
