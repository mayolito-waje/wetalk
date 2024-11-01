import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const refreshAccessToken = (req: Request, res: Response): void => {
  if (req.cookies?.jwt) {
    const refreshToken = req.cookies.jwt;

    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string,
      );

      const accessToken = jwt.sign(decoded, process.env.JWT_ACCESS_SECRET as string);

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
