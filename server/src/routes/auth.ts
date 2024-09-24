import express from 'express';
import type { RequestHandler } from 'express';
import registerUser from '../controllers/auth/register.js';

const authRouter = express.Router();

authRouter.post('/register', registerUser as RequestHandler);

export default authRouter;
