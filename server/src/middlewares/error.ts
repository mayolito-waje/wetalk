/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Request, Response, NextFunction } from 'express';
import type { ExpressError } from '../types/expressTypes';

const errorHandler = (
  err: ExpressError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  res.status(err.status ?? 500).json({
    error: err.message,
  });
};

export default errorHandler;
