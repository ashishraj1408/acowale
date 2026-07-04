import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { PageHeader } from "../components/common/PageHeader";
import { SearchFilter } from "../components/dashboard/SearchFilter";
import { StatsCards } from "../components/dashboard/StatsCards";
import { CategoryChart } from "../components/dashboard/CategoryChart";
import { RecentFeedbackTable } from "../components/dashboard/RecentFeedbackTable";
import { EmptyState } from "../components/common/EmptyState";
import { Loader } from "../components/common/Loader";
import { feedbackService } from "../services/feedback.service";
import type {
  FeedbackCategory,
  FeedbackItem,
  AnalyticsResponse,
} from "../types/feedback";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory =
    (searchParams.get("category") as FeedbackCategory | "ALL") ?? "ALL";
  const appliedSearch = searchParams.get("search") ?? "";
  const currentPageParam = searchParams.get("page");
  const currentPage = Math.max(1, Number(currentPageParam ?? "1"));

  const [searchInput, setSearchInput] = useState(appliedSearch);
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsResponse>({
    total: 0,
    distribution: [],
  });
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setSearchInput(appliedSearch);
  }, [appliedSearch]);

  // Keep pageSize in sync when `limit` is present in the URL
  useEffect(() => {
    const limitParam = Number(searchParams.get("limit") ?? "10");
    if (
      !Number.isNaN(limitParam) &&
      limitParam > 0 &&
      limitParam !== pageSize
    ) {
      setPageSize(limitParam);
    }
  }, [searchParams]);

  const updateRoute = (
    page: number,
    category: FeedbackCategory | "ALL",
    search: string,
    limit?: number,
  ) => {
    const params = new URLSearchParams();
    if (category !== "ALL") {
      params.set("category", category);
    }
    if (search) {
      params.set("search", search);
    }

    // Only include the `page` query param when it's greater than 1.
    if (page !== 1) {
      params.set("page", page.toString());
    }

    const effectiveLimit = typeof limit === "number" ? limit : pageSize;
    // Include limit only when different from default (10)
    if (effectiveLimit !== 10) {
      params.set("limit", effectiveLimit.toString());
    }

    setSearchParams(params, { replace: true });
  };

  const handleCategoryChange = (category: FeedbackCategory | "ALL") => {
    updateRoute(1, category, appliedSearch);
  };

  const handlePageChange = (page: number) => {
    updateRoute(page, selectedCategory, appliedSearch);
  };

  const handleLimitChange = (limit: number) => {
    setPageSize(limit);
    // reset to page 1 when limit changes
    updateRoute(1, selectedCategory, appliedSearch, limit);
  };

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const trimmed = searchInput.trim();
      if (trimmed === appliedSearch) {
        return;
      }

      updateRoute(1, selectedCategory, trimmed);
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [searchInput, selectedCategory, appliedSearch]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const [list, stats] = await Promise.all([
          feedbackService.list(
            selectedCategory,
            appliedSearch,
            currentPage,
            pageSize,
          ),
          feedbackService.analytics(),
        ]);
        setFeedbacks(list.items);
        setTotalItems(list.total);
        setTotalPages(list.totalPages);
        setAnalytics(stats);
      } catch {
        setError("Unable to load feedback data.");
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [selectedCategory, appliedSearch, currentPage, pageSize]);

  const distribution = useMemo(() => analytics.distribution, [analytics]);

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl px-4 py-10 text-slate-800 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Admin dashboard"
          title="Feedback insights"
          description="Monitor submissions, search entries, and inspect category distribution."
        />

        <div className="mt-8 w-full flex flex-col gap-6 sm:flex-row sm:items-center  ">
          <div className="flex-1">
            <StatsCards analytics={analytics} />
            </div>
          
            <div className="flex-1">
                <CategoryChart analytics={analytics} />
            </div>
        </div>

        <div className="mt-6"></div>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-4">
            <SearchFilter
              selectedCategory={selectedCategory}
              searchInput={searchInput}
              onCategoryChange={handleCategoryChange}
              onSearchChange={setSearchInput}
            />
          </div>

          {loading ? (
            <div className="mt-6">
              <Loader />
            </div>
          ) : null}
          {error ? (
            <div className="mt-6 text-sm text-rose-600">{error}</div>
          ) : null}

          {!loading && !error && feedbacks.length === 0 ? (
            <div className="mt-6">
              <EmptyState
                title="No feedback found"
                description="Try a different search term or category filter."
              />
            </div>
          ) : null}

          {!loading && feedbacks.length > 0 ? (
            <>
              <div className="overflow-x-auto rounded-md border border-slate-100 bg-white shadow-sm">
                <RecentFeedbackTable feedbacks={feedbacks} />
              </div>

              <div className="mt-6 flex flex-col gap-4 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1 text-sm text-slate-600 sm:space-y-0 sm:space-x-2 sm:text-base">
                  <p>
                    Showing page <span className="font-semibold text-slate-900">{currentPage}</span> of <span className="font-semibold text-slate-900">{totalPages}</span> · <span className="font-medium">{totalItems}</span> submissions
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={currentPage <= 1}
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  <button
                    type="button"
                    disabled={currentPage >= totalPages}
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label="Next page"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </>
          ) : null}
        </section>
      </div>
    </DashboardLayout>
  );
}
