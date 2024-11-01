import express from 'express';
import type { RequestHandler } from 'express';
import refreshAccessToken from '../controllers/jwt/refresh.js';

const refreshRouter = express.Router();

refreshRouter.get('/', refreshAccessToken as RequestHandler);

export default refreshRouter;
