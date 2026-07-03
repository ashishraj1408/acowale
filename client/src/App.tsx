import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { DashboardPage } from './pages/DashboardPage';
import { FeedbackPage } from './pages/FeedbackPage';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
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

      <Routes>
        <Route path="/" element={<Navigate to="/feedback" replace />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;
