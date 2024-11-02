import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const refreshAccessToken = (req: Request, res: Response): void => {
  if (req.cookies?.jwt) {
    const refreshToken = req.cookies.jwt;

    try {
      interface JwtPayload {
        userId: string;
      }

      const { userId } = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string,
      ) as JwtPayload;

      const accessToken = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET as string, { expiresIn: '10m' });

      res.json({ accessToken });
    } catch (error: unknown) {
      res.status(406).json({
        status: 406,
        message: 'Unauthorized',
      });
    }
  } else {
    res.status(406).json({
      status: 406,
      message: 'Unauthorized',
    });
  }
};

export default refreshAccessToken;
