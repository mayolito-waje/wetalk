import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const refreshAccessToken = (req: Request, res: Response, next: NextFunction): void => {
  if (req.cookies?.jwt) {
    const refreshToken = req.cookies.jwt;

    interface JwtPayload {
      userId: string;
    }

    try {
      const { userId } = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string,
      ) as JwtPayload;

      const accessToken = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET as string, { expiresIn: '10m' });

      res.json({ accessToken });
    } catch (error: unknown) {
      if (error instanceof jwt.TokenExpiredError) {
        res.status(406);
        next(error);
      } else {
        res.status(406).json({
          status: 406,
          message: 'Unauthorized',
        });
      }
    }
  } else {
    res.status(406).json({
      status: 406,
      message: 'Unauthorized',
    });
  }
};

export default refreshAccessToken;
