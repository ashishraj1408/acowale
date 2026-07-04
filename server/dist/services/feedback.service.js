import { AppError } from '../utils/app-error.js';
import { FeedbackRepository } from '../repositories/feedback.repository.js';
export class FeedbackService {
    feedbackRepository;
    constructor(feedbackRepository = new FeedbackRepository()) {
        this.feedbackRepository = feedbackRepository;
    }
    async createFeedback(input) {
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
    async listFeedback(query) {
        return this.feedbackRepository.list(query);
    }
    async getAnalytics() {
        const total = await this.feedbackRepository.count();
        const distribution = await this.feedbackRepository.analytics();
        return { total, distribution };
    }
}
