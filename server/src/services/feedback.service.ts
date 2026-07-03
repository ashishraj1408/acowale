import { AppError } from '../utils/app-error.js';
import { FeedbackRepository } from '../repositories/feedback.repository.js';
import type { FeedbackCategory } from '../types/feedback.js';

export class FeedbackService {
  constructor(private readonly feedbackRepository = new FeedbackRepository()) {}

  async createFeedback(input: { category: FeedbackCategory; comment: string }) {
    if (!input.category) {
      throw new AppError(400, 'Category is required');
    }

    if (!input.comment || input.comment.trim().length === 0) {
      throw new AppError(400, 'Comment is required');
    }

    if (input.comment.trim().length < 10) {
      throw new AppError(400, 'Comment must be at least 10 characters long');
    }

    if (input.comment.trim().length > 1000) {
      throw new AppError(400, 'Comment must be at most 1000 characters long');
    }

    return this.feedbackRepository.create({
      category: input.category,
      comment: input.comment.trim(),
    });
  }

  async listFeedback(query?: { category?: FeedbackCategory; search?: string }) {
    return this.feedbackRepository.list(query);
  }

  async getAnalytics() {
    const total = await this.feedbackRepository.count();
    const distribution = await this.feedbackRepository.analytics();

    return { total, distribution };
  }
}
