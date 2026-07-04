import type { FeedbackCategory } from '../../types/feedback';
import { FEEDBACK_CATEGORIES } from '../../utils/constants';

interface SearchFilterProps {
  selectedCategory: FeedbackCategory | 'ALL';
  searchInput: string;
  onCategoryChange: (category: FeedbackCategory | 'ALL') => void;
  onSearchChange: (value: string) => void;
}

export function SearchFilter({ selectedCategory, searchInput, onCategoryChange, onSearchChange }: SearchFilterProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">Recent feedback</h2>
        <p className="text-sm text-slate-600">Search and filter the latest submissions.</p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          value={searchInput}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search feedback"
          className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none"
        />
        <select
          value={selectedCategory}
          onChange={(event) => onCategoryChange(event.target.value as FeedbackCategory | 'ALL')}
          className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none"
        >
          <option value="ALL">All categories</option>
          {FEEDBACK_CATEGORIES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
