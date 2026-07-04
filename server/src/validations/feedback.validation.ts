import { FeedbackInput, ValidationResult } from '../types/feedback.js';

const allowedCategories = ['BUG', 'FEATURE', 'IMPROVEMENT', 'GENERAL'];

export const validateFeedback = (input: FeedbackInput): ValidationResult => {
  if (!input.category || !allowedCategories.includes(input.category)) {
    return { success: false, error: 'Category is required and must be BUG, FEATURE, IMPROVEMENT, or GENERAL.' };
  }

  if (!input.comment || input.comment.trim().length < 10) {
    return { success: false, error: 'Comment is required and must be at least 10 characters long.' };
  }

  return { success: true };
};
