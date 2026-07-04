import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="text-lg font-semibold text-slate-900">
            Acowale Feedback Portal
          </Link>
          <nav className="flex gap-3 text-sm text-slate-600">
            <Link className="transition hover:text-slate-900" to="/feedback">
              Submit Feedback
            </Link>
            <Link className="transition hover:text-slate-900" to="/dashboard">
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}
