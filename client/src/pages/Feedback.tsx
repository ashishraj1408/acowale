import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { PageHeader } from '../components/common/PageHeader';
import { FeedbackForm } from '../components/feedback/FeedbackForm';
import { feedbackService } from '../services/feedback.service';
import { isValidFeedbackComment, isValidCategory } from '../utils/helpers';

export function Feedback() {
  const [category, setCategory] = useState('GENERAL');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (!comment.trim()) {
      setError('Please enter a comment.');
      return;
    }

    if (!isValidFeedbackComment(comment)) {
      setError('Comment must be at least 10 characters long.');
      return;
    }

    if (!isValidCategory(category)) {
      setError('Please choose a valid category.');
      return;
    }

    try {
      setLoading(true);
      await feedbackService.create({ category, comment });
      setComment('');
      toast.success('Feedback submitted successfully');
    } catch {
      setError('Submission failed. Please try again.');
      toast.error('Submission failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-10 text-slate-800 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Feedback form"
          title="Share your experience with us"
          description="Tell us about bugs, features, or general feedback. Your input helps us improve the product."
        />

        <FeedbackForm
          category={category}
          comment={comment}
          loading={loading}
          error={error}
          onCategoryChange={setCategory}
          onCommentChange={setComment}
          onSubmit={handleSubmit}
        />
      </div>
    </DashboardLayout>
  );
}
