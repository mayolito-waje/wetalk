import type { Request, Response } from 'express';

const notFound = (_req: Request, res: Response): void => {
  res.status(404).json({
    error: '404 (not found)',
  });
};

export default notFound;
