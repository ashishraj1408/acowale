import { apiClient } from '../lib/axios';

export interface FeedbackPayload {
  category: 'BUG' | 'FEATURE' | 'IMPROVEMENT' | 'GENERAL';
  comment: string;
}

export interface FeedbackItem {
  id: string;
  category: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface AnalyticsResponse {
  total: number;
  distribution: Array<{ category: string; count: number }>;
}

export const feedbackService = {
  async create(payload: FeedbackPayload) {
    const response = await apiClient.post<FeedbackItem>('/feedback', payload);
    return response.data;
  },
  async list(category?: string, search?: string) {
    const response = await apiClient.get<FeedbackItem[]>('/feedback', {
      params: { category, search },
    });
    return response.data;
  },
  async analytics() {
    const response = await apiClient.get<AnalyticsResponse>('/feedback/analytics');
    return response.data;
  },
};
