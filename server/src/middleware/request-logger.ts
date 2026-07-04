import { NextFunction, Request, Response } from 'express';
import { logInfo } from '../utils/logger.js';

export default function requestLogger(req: Request, _res: Response, next: NextFunction) {
  logInfo(`${req.method} ${req.originalUrl}`);
  next();
}
