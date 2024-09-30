/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Request, Response, NextFunction } from 'express';
import ValidEmailError from '../postgres/errors/ValidEmailError.js';
import NoDuplicateEmailError from '../postgres/errors/NoDuplicateEmailError.js';

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  let statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  if (process.env.NODE_ENV === 'development') {
    console.log(err);
  }

  if (err instanceof ValidEmailError || err instanceof NoDuplicateEmailError) {
    statusCode = err.status;
  }

  res.status(statusCode).json({
    status: statusCode,
    errorName: err.name,
    error: err.message,
  });
};

export default errorHandler;
