export type FeedbackCategory = 'BUG' | 'FEATURE' | 'IMPROVEMENT' | 'GENERAL';

export interface FeedbackPayload {
  category: FeedbackCategory;
  comment: string;
}

export interface FeedbackItem {
  id: string;
  category: FeedbackCategory;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface FeedbackPagination {
  items: FeedbackItem[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface AnalyticsResponse {
  total: number;
  distribution: Array<{ category: FeedbackCategory; count: number }>;
}
