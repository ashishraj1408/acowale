import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { feedbackService } from '../services/feedback.service';

const categories = ['BUG', 'FEATURE', 'IMPROVEMENT', 'GENERAL'] as const;

export function FeedbackPage() {
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

    if (comment.trim().length < 10) {
      setError('Comment must be at least 10 characters long.');
      return;
    }

    try {
      setLoading(true);
      await feedbackService.create({ category: category as any, comment });
      setComment('');
      toast.success('Feedback submitted successfully');
    } catch (err: any) {
      const message = err?.response?.data?.error ?? 'Submission failed';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-10 text-slate-800 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-600">Feedback form</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">Share your experience with us</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
          Tell us about bugs, features, or general feedback. Your input helps us improve the product.
        </p>
      </section>

      <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="grid gap-6 md:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-slate-700">Category</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 md:col-span-2">
            <span className="text-sm font-medium text-slate-700">Comment</span>
            <textarea
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              rows={8}
              placeholder="Describe your feedback in detail..."
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none"
            />
          </label>
        </div>

        {error ? <p className="mt-4 text-sm text-rose-600">{error}</p> : null}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Submitting...' : 'Submit feedback'}
          </button>
          <span className="text-sm text-slate-500">Minimum 10 characters</span>
        </div>
      </form>
    </div>
  );
}
