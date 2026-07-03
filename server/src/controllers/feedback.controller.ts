import type { Request, Response, NextFunction } from 'express';
import { FeedbackService } from '../services/feedback.service.js';

export class FeedbackController {
  constructor(private readonly feedbackService = new FeedbackService()) {}

  createFeedback = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const feedback = await this.feedbackService.createFeedback(req.body);
      res.status(201).json(feedback);
    } catch (error) {
      next(error);
    }
  };

  listFeedback = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const feedback = await this.feedbackService.listFeedback({
        category: req.query.category as any,
        search: req.query.search as string | undefined,
      });
      res.status(200).json(feedback);
    } catch (error) {
      next(error);
    }
  };

  getAnalytics = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const analytics = await this.feedbackService.getAnalytics();
      res.status(200).json(analytics);
    } catch (error) {
      next(error);
    }
  };
}
