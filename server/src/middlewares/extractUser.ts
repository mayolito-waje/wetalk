import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';
import pool from '../postgres/pool.js';
import dbErrorMapper from '../postgres/postgresErrorMapper.js';
import redisClient from '../redis/client.js';

const extractUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.token) {
      res.status(401).json({
        status: 401,
        message: 'access token is missing',
      });
      return;
    }

    if (!req.cookies?.jwt) {
      res.status(401).json({
        status: 401,
        message: 'refresh token is missing',
      });
      return;
    }

    const refreshToken = req.cookies.jwt;

    interface JwtPayload {
      userId: string;
    }

    const { userId } = jwt.verify(req.token, process.env.JWT_ACCESS_SECRET as string) as JwtPayload;
    const { userId: refreshTokenUserId } = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET as string,
    ) as JwtPayload;

    if (userId !== refreshTokenUserId) {
      res.status(401).json({
        status: 401,
        message: 'the access token and refresh token does not belong to same user',
      });
    }

    const tokenIsBlacklisted = await redisClient.zScore(`session-tokens:blacklisted:${userId}`, refreshToken) !== null;
    if (tokenIsBlacklisted) {
      res.status(401).json({
        status: 401,
        message: 'the session token is already logged out (blacklisted)',
      });
      return;
    }

    await redisClient.zRemRangeByScore(`session-tokens:blacklisted:${userId}`, -Infinity, Date.now());

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

    res.cookie('lastLoggedUser', req.user.id, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    next();
  } catch (error: unknown) {
    res.status(401);
    next(dbErrorMapper(error as Error));
  }
};

export default extractUser;
