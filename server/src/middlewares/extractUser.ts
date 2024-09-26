import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';
import pool from '../postgres/pool.js';
import dbErrorMapper from '../postgres/postgresErrorMapper.js';

const extractUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.token) {
      res.status(401).json({
        status: 401,
        message: 'session token is missing',
      });
      return;
    }

    interface JwtPayload {
      userId: string;
    }

    const { userId } = jwt.verify(req.token, process.env.JWT_SECRET as string) as JwtPayload;

    const { rows } = await pool.query(
      'SELECT "id", "email", "username", "profilePicture", "createdAt", "isActive" FROM "user" WHERE "id" = $1',
      [userId],
    );

    if (rows.length < 1) {
      res.status(401).json({
        status: 401,
        message: 'user not found or deleted',
      });
      return;
    }

    const user = rows[0];
    req.user = user;

    next();
  } catch (error: unknown) {
    res.status(401);
    next(dbErrorMapper(error as Error));
  }
};

export default extractUser;
