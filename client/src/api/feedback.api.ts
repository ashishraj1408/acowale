import { apiClient } from './axios';
import type { FeedbackCategory, FeedbackItem, FeedbackPayload, AnalyticsResponse, FeedbackPagination } from '../types/feedback';

export const feedbackApi = {
  async create(payload: FeedbackPayload) {
    const response = await apiClient.post<FeedbackItem>('/feedback', payload);
    return response.data;
  },

  async list(category?: FeedbackCategory | 'ALL', search?: string, page = 1, limit = 10) {
    const params: Record<string, string> = {
      page: page.toString(),
      limit: limit.toString(),
    };

    if (category && category !== 'ALL') {
      params.category = category;
    }

    if (search) {
      params.search = search.trim();
    }

    const response = await apiClient.get<FeedbackPagination>('/feedback', { params });
    return response.data;
  },

  async analytics() {
    const response = await apiClient.get<AnalyticsResponse>('/feedback/analytics');
    return response.data;
  },
};
