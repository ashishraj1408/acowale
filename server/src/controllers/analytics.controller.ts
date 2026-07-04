import { Request, Response } from 'express';
import { getAnalyticsSummary } from '../services/analytics.service.js';

export const getAnalytics = async (_req: Request, res: Response) => {
  const analytics = await getAnalyticsSummary();
  res.json(analytics);
};
