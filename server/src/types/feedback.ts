export interface FeedbackInput {
  category?: string;
  comment?: string;
}

export interface ValidationResult {
  success: boolean;
  error?: string;
  data?: unknown;
}
