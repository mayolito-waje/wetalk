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

    const token = jwt.sign({ userId: userToLogin.id }, process.env.JWT_SECRET as string, { expiresIn: '1d' });

    res.status(200).json({
      status: 200,
      message: 'login successful',
      sessionToken: token,
    });
  } catch (error: unknown) {
    next(dbErrorMapper(error as Error));
  }
};

export default loginUser;