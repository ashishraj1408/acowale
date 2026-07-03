export type FeedbackCategory = 'BUG' | 'FEATURE' | 'IMPROVEMENT' | 'GENERAL';

export interface FeedbackPayload {
  category: FeedbackCategory;
  comment: string;
}
