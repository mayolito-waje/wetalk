import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';
import pool from '../../postgres/pool.js';
import type { UserRegistration } from '../../types/types.js';
import dbErrorMapper from '../../postgres/postgresErrorMapper.js';

const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const user: UserRegistration = req.body;
  const { email, username, password, profilePicture } = user;

  const passwordRegex: RegExp = /^(?=.{8,}).*$/;
  if (!passwordRegex.test(password)) {
    res.status(400);
    next(new Error('Password should be at least 8 characters'));
    return;
  }

  const salt: string = await bcrypt.genSalt(10);
  const passwordHash: string = await bcrypt.hash(password, salt);

  try {
    const query = await pool.query(
      `INSERT INTO "user"("email", "username", "passwordHash", "profilePicture")
        VALUES ($1, $2, $3, $4)
        RETURNING "id", "email", "username", "profilePicture", "createdAt"`,
      [email, username, passwordHash, profilePicture],
    );

    const createdUser = query.rows[0];
    const token = jwt.sign({ userId: createdUser.id }, process.env.JWT_SECRET as string, { expiresIn: '1d' });

    res.status(201).json({
      status: 201,
      message: 'registered new user',
      sessionToken: token,
      userDetails: {
        id: createdUser.id,
        email: createdUser.email,
        username: createdUser.username,
        profilePicture: createdUser.profilePicture,
        createdAt: createdUser.createdAt,
      },
    });
  } catch (error) {
    res.status(400);
    next(dbErrorMapper(error as Error));
  }
};

export default registerUser;
