import { useEffect, useMemo, useState } from 'react';
import { feedbackService } from '../services/feedback.service';
import type { AnalyticsResponse, FeedbackCategory, FeedbackItem, FeedbackPayload } from '../types/feedback';

export function useFeedback() {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsResponse>({ total: 0, distribution: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = async (category?: FeedbackCategory | 'ALL', search?: string) => {
    setLoading(true);
    setError(null);

    try {
      const [list, stats] = await Promise.all([
        feedbackService.list(category, search),
        feedbackService.analytics(),
      ]);
      setFeedbacks(list);
      setAnalytics(stats);
    } catch (err: unknown) {
      setError('Unable to load feedback data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadDashboard('ALL');
  }, []);

  const totalFeedback = useMemo(() => analytics.total, [analytics]);

  const createFeedback = async (payload: FeedbackPayload) => {
    setError(null);
    try {
      await feedbackService.create(payload);
      return true;
    } catch {
      setError('Unable to submit feedback.');
      return false;
    }
  };

  return {
    feedbacks,
    analytics,
    loading,
    error,
    totalFeedback,
    loadDashboard,
    createFeedback,
  };
}
