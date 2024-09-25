import express from 'express';
import type { RequestHandler } from 'express';
import registerUser from '../controllers/auth/register.js';
import loginUser from '../controllers/auth/login.js';

const authRouter = express.Router();

authRouter.post('/register', registerUser as RequestHandler);
authRouter.post('/login', loginUser as RequestHandler);

export default authRouter;
