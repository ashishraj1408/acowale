import type { AnalyticsResponse } from '../../types/feedback';

interface StatsCardsProps {
  analytics: AnalyticsResponse;
}

export function StatsCards({ analytics }: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-500">Total feedback</p>
        <p className="mt-2 text-3xl font-semibold text-slate-900">{analytics.total}</p>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:col-span-2">
        <p className="text-sm text-slate-500">Tracked categories</p>
        <p className="mt-2 text-3xl font-semibold text-slate-900">{analytics.distribution.length}</p>
      </div>
    </div>
  );
}
