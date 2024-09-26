import express from 'express';
import type { RequestHandler } from 'express';
import extractUser from '../middlewares/extractUser.js';
import getLoggedInUser from '../controllers/users/getLoggedInUser.js';

const usersRouter = express.Router();

usersRouter.get('/@me', extractUser, getLoggedInUser as RequestHandler);

export default usersRouter;
