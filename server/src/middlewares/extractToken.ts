import type { Request, Response, NextFunction } from 'express';

const extractToken = (req: Request, _res: Response, next: NextFunction): void => {
  const authorization = req.get('authorization');

  if (authorization?.toLowerCase().startsWith('bearer')) {
    const token = authorization.substring(7);
    req.token = token;
  }

  next();
};

export default extractToken;
