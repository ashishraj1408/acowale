import { FeedbackInput, ValidationResult } from '../types/feedback.js';
import { createFeedback, getFeedback } from '../repositories/feedback.repository.js';
import { validateFeedback } from '../validations/feedback.validation.js';

export const listFeedback = async (filters: { category?: string; search?: string; page?: number; limit?: number }) => {
  return getFeedback(filters);
};

export const createFeedbackEntry = async (input: FeedbackInput): Promise<ValidationResult> => {
  const validation = validateFeedback(input);

  if (!validation.success) {
    return validation;
  }

  const feedback = await createFeedback(input);
  return { success: true, data: feedback };
};
