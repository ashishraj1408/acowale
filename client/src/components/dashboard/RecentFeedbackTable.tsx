import type { FeedbackItem } from '../../types/feedback';
import { formatDate } from '../../utils/helpers';

interface RecentFeedbackTableProps {
  feedbacks: FeedbackItem[];
}

export function RecentFeedbackTable({ feedbacks }: RecentFeedbackTableProps) {
  if (feedbacks.length === 0) {
    return <p className="mt-6 text-sm text-slate-500">No feedback match the current filters.</p>;
  }

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50 text-left text-slate-700">
          <tr>
            <th className="px-4 py-3 font-medium">Category</th>
            <th className="px-4 py-3 font-medium">Comment</th>
            <th className="px-4 py-3 font-medium">Created</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {feedbacks.map((item) => (
            <tr key={item.id}>
              <td className="px-4 py-3 text-slate-700">{item.category}</td>
              <td className="px-4 py-3 text-slate-600">{item.comment}</td>
              <td className="px-4 py-3 text-slate-600">{formatDate(item.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
