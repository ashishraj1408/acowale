import { Request, Response } from 'express';
import { createFeedbackEntry, listFeedback } from '../services/feedback.service.js';

export const getFeedback = async (req: Request, res: Response) => {
  const category = req.query.category?.toString();
  const search = req.query.search?.toString();
  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 10);
  const feedback = await listFeedback({ category, search, page, limit });
  res.json(feedback);
};

export const createFeedback = async (req: Request, res: Response) => {
  const result = await createFeedbackEntry(req.body);

  if (!result.success) {
    return res.status(400).json(result);
  }

  res.status(201).json(result.data);
};
