import { NextFunction, Request, Response } from 'express';
import { validateFeedback } from '../validations/feedback.validation.js';

export default function validateRequest(req: Request, res: Response, next: NextFunction) {
  if (req.path === '/feedback' && req.method === 'POST') {
    const validation = validateFeedback(req.body);

    if (!validation.success) {
      return res.status(400).json(validation);
    }
  }

  next();
}
