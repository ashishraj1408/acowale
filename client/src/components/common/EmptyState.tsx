import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
}

export function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-700">
      {icon ? <div className="mb-4 inline-flex rounded-full bg-slate-100 p-4 text-slate-500">{icon}</div> : null}
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}
