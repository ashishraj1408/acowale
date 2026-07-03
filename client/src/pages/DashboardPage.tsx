import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { feedbackService, type FeedbackItem } from '../services/feedback.service';

const categories = ['BUG', 'FEATURE', 'IMPROVEMENT', 'GENERAL'] as const;

export function DashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') ?? 'ALL';
  const initialSearch = searchParams.get('search') ?? '';

  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [analytics, setAnalytics] = useState<{ total: number; distribution: Array<{ category: string; count: number }> }>({ total: 0, distribution: [] });
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchInput, setSearchInput] = useState(initialSearch);
  const [appliedSearch, setAppliedSearch] = useState(initialSearch);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const category = searchParams.get('category') ?? 'ALL';
    const query = searchParams.get('search') ?? '';

    setSelectedCategory(category);
    setSearchInput(query);
    setAppliedSearch(query);
  }, [searchParams]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setAppliedSearch(searchInput.trim());
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [searchInput]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedCategory !== 'ALL') {
      params.set('category', selectedCategory);
    }

    if (appliedSearch !== '') {
      params.set('search', appliedSearch);
    }

    setSearchParams(params, { replace: true });
  }, [selectedCategory, appliedSearch, setSearchParams]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [list, stats] = await Promise.all([
          feedbackService.list(selectedCategory === 'ALL' ? undefined : selectedCategory, appliedSearch),
          feedbackService.analytics(),
        ]);
        setFeedbacks(list);
        setAnalytics(stats);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [selectedCategory, appliedSearch]);

  const distribution = useMemo(() => analytics.distribution, [analytics]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 text-slate-800 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-600">Admin dashboard</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">Feedback insights</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">Monitor submissions, search entries, and inspect category distribution.</p>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Total feedback</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{analytics.total}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:col-span-2">
          <p className="text-sm text-slate-500">Category distribution</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {distribution.length === 0 ? <span className="text-sm text-slate-500">No data yet</span> : distribution.map((item) => (
              <div key={item.category} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                {item.category}: {item.count}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Recent feedback</h2>
            <p className="text-sm text-slate-600">Search and filter the latest submissions.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search feedback"
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none"
            />
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none"
            >
              <option value="ALL">All categories</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? <div className="mt-6 text-sm text-slate-500">Loading feedback...</div> : null}

        {!loading && feedbacks.length === 0 ? <div className="mt-6 text-sm text-slate-500">No feedback match the current filters.</div> : null}

        {!loading && feedbacks.length > 0 ? (
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
                    <td className="px-4 py-3 text-slate-600">{new Date(item.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </section>
    </div>
  );
}
