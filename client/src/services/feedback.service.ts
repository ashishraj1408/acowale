import { feedbackApi } from '../api/feedback.api';
import type { FeedbackPayload, FeedbackCategory, FeedbackPagination, AnalyticsResponse } from '../types/feedback';

export const feedbackService = {
  async create(payload: FeedbackPayload) {
    return feedbackApi.create(payload);
  },

  async list(category?: FeedbackCategory | 'ALL', search?: string, page = 1, limit = 10) {
    return feedbackApi.list(category, search, page, limit);
  },

  async analytics() {
    return feedbackApi.analytics();
  },
};
