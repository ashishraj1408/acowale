import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/app-error.js';

export default function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ success: false, error: err.message });
  }

  console.error(err);
  res.status(500).json({ success: false, error: 'Internal server error' });
}
