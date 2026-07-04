import { Button } from '../common/Button';
import { FEEDBACK_CATEGORIES } from '../../utils/constants';

interface FeedbackFormProps {
  category: string;
  comment: string;
  loading: boolean;
  error: string;
  onCategoryChange: (value: string) => void;
  onCommentChange: (value: string) => void;
  onSubmit: (event: React.FormEvent) => void;
}

export function FeedbackForm({
  category,
  comment,
  loading,
  error,
  onCategoryChange,
  onCommentChange,
  onSubmit,
}: FeedbackFormProps) {
  return (
    <form onSubmit={onSubmit} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="grid gap-6 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700">Category</span>
          <select
            value={category}
            onChange={(event) => onCategoryChange(event.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none"
          >
            {FEEDBACK_CATEGORIES.map((item) => (
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
            onChange={(event) => onCommentChange(event.target.value)}
            rows={8}
            placeholder="Describe your feedback in detail..."
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none"
          />
        </label>
      </div>

      {error ? <p className="mt-4 text-sm text-rose-600">{error}</p> : null}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit feedback'}
        </Button>
        <span className="text-sm text-slate-500">Minimum 10 characters</span>
      </div>
    </form>
  );
}
