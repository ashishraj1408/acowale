import type { FeedbackCategory } from '../types/feedback';

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export function isValidFeedbackComment(comment: string) {
  return comment.trim().length >= 10;
}

export function isValidCategory(value: string): value is FeedbackCategory {
  return ['BUG', 'FEATURE', 'IMPROVEMENT', 'GENERAL'].includes(value);
}
