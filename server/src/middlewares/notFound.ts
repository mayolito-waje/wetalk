import type { Request, Response } from 'express';

const notFound = (_req: Request, res: Response): void => {
  res.status(404).json({
    status: 404,
    error: 'resource not found',
  });
};

export default notFound;
