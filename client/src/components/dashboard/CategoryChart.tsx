import type { AnalyticsResponse } from '../../types/feedback';

interface CategoryChartProps {
  analytics: AnalyticsResponse;
}

export function CategoryChart({ analytics }: CategoryChartProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">Category distribution</p>
      <div className="mt-4 flex flex-wrap gap-3">
        {analytics.distribution.length === 0 ? (
          <span className="text-sm text-slate-500">No categories available</span>
        ) : (
          analytics.distribution.map((item) => (
            <div key={item.category} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
              {item.category}: {item.count}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
