import type { Request, Response, NextFunction } from 'express';
import redisClient from '../../redis/client.js';

const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.cookies?.jwt) {
    // refresh token cookies probably expired, so log out is already successful.
    res.json({
      status: 200,
      message: 'logout successful',
    });
  }

  const sessionToken: string = req.cookies.jwt;
  const userId: string = req.user.id;

  try {
    await redisClient.zAdd(`session-tokens:blacklisted:${userId}`, [{ value: sessionToken, score: Date.now() + (60 * 60 * 24 * 1000) }]);
    await redisClient.zRemRangeByScore(`session-tokens:blacklisted:${userId}`, -Infinity, Date.now());

    res.clearCookie('jwt');
    res.clearCookie('lastLoggedUser');

    res.json({
      status: 200,
      message: 'logout successful',
    });
  } catch (error: unknown) {
    next(error as Error);
  }
};

export default logoutUser;
