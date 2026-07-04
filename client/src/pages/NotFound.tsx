import { Link } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';

export function NotFound() {
  return (
    <DashboardLayout>
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 text-slate-800">
        <div className="max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-600">404</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">Page not found</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            The page you are looking for does not exist or may have moved.
          </p>
          <Link className="mt-6 inline-flex rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700" to="/feedback">
            Return to feedback
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
