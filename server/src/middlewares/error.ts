/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Request, Response, NextFunction } from 'express';

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  const statusCode = res.statusCode || 500;
  console.log(err);

  res.status(statusCode).json({
    statusCode,
    name: err.name,
    error: err.message,
  });
};

export default errorHandler;
