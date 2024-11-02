import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';
import pool from '../../postgres/pool.js';
import type { UserLogin } from '../../types/types.js';
import dbErrorMapper from '../../postgres/postgresErrorMapper.js';

const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const loginDetails: UserLogin = req.body;
  const { email, password } = loginDetails;

  try {
    const { rows } = await pool.query('SELECT "id", "passwordHash" FROM "user" WHERE "email" = $1', [email]);

    if (rows.length < 1) {
      res.status(401).json({
        status: 401,
        message: 'user not found',
      });
      return;
    }

    const userToLogin = rows[0];
    const isPasswordTheSame = await bcrypt.compare(password, userToLogin.passwordHash);

    if (!isPasswordTheSame) {
      res.status(401).json({
        status: 401,
        message: 'password not match',
      });
      return;
    }

    const accessToken = jwt.sign({ userId: userToLogin.id }, process.env.JWT_ACCESS_SECRET as string, { expiresIn: '10m' });
    const refreshToken = jwt.sign({ userId: userToLogin.id }, process.env.JWT_REFRESH_SECRET as string, { expiresIn: '7d' });

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: 200,
      message: 'login successful',
      accessToken,
    });
  } catch (error: unknown) {
    next(dbErrorMapper(error as Error));
  }
};

export default loginUser;
