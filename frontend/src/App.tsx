import { useEffect } from "react";
import { CreateModal } from "./components/create-modal";
import { STATUS_LABELS } from "./constants/status-labels";
import { Toast } from "./ui/toast";
import { Header } from "./components/header";
import { Toolbar } from "./components/toolbar";
import { Count } from "./components/count";
import { FetchingError } from "./components/fetching-error";
import { useFilters } from "./hooks/use-filters";
import { LoadingSkeleton } from "./components/loading-skeleton";
import { EmptyState } from "./components/empty-state";
import { useSort } from "./hooks/use-sort";
import { Table } from "./components/table";
import { PaginationFooter } from "./components/pagination-footer";
import { useDeleteApplication } from "./hooks/use-delete-application";
import { useUpdateStatus } from "./hooks/use-update-status";
import { useToast } from "./hooks/use-toast";
import { useCreateApplication } from "./hooks/use-create-application";
import { useApplications } from "./hooks/use-applications";
import { usePagination } from "./hooks/use-pagination";
import { getErrorMessage } from "./lib/get-error-message";

export function App() {
  const {
    search,
    filterStatus,
    filterPriority,
    setSearch,
    setFilterStatus,
    setFilterPriority,
  } = useFilters();

  const { sort, handleSort } = useSort();

  const { page, setPage, perPage, setPerPage } = usePagination();

  const {
    applications,
    total,
    totalPages,
    error,
    reloadApplications,
    isLoading,
    isError,
  } = useApplications({
    search,
    status: filterStatus,
    priority: filterPriority,
    sortField: sort.field,
    sortOrder: sort.order,
    page,
    size: perPage,
  });

  useEffect(() => {
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filterStatus, filterPriority, sort.field, sort.order]);

  const { toastMsg, toast } = useToast();

  const { showCreate, setShowCreate, handleCreate } = useCreateApplication({
    onSuccess: () => toast("Заявка создана"),
    onError: (message) => toast(message),
  });

  const { deletingId, handleDelete } = useDeleteApplication({
    onSuccess: (id) => toast(`Заявка №${id} удалена`),
    onError: (message) => toast(message),
  });

  const { updatingId, handleStatusChange } = useUpdateStatus({
    onSuccess: (id, status) => {
      toast(`Статус заявки №${id} обновлён → ${STATUS_LABELS[status]}`);
    },
    onError: (message) => toast(message),
  });

  const hasFilters =
    search || filterStatus !== "all" || filterPriority !== "all";

  return (
    <div className="bg-background min-h-screen">
      {toastMsg && <Toast message={toastMsg} />}

      {showCreate && (
        <CreateModal
          onClose={() => setShowCreate(false)}
          onCreate={handleCreate}
        />
      )}

      <Header />

      <main className="mx-auto max-w-350 space-y-4 px-4 py-6 sm:px-6">
        <Toolbar
          search={search}
          setSearch={setSearch}
          filterStatus={filterStatus}
          filterPriority={filterPriority}
          setFilterPriority={setFilterPriority}
          setFilterStatus={setFilterStatus}
          setShowCreate={setShowCreate}
          hasFilters={hasFilters}
          onFetch={reloadApplications}
        />

        <Count
          isLoading={isLoading}
          isError={isError}
          count={applications?.length ?? 0}
          total={total ?? 0}
        />

        <div className="border-border bg-card overflow-hidden rounded-xl border">
          {isError ? (
            <FetchingError
              error={getErrorMessage(error)}
              onReload={reloadApplications}
            />
          ) : isLoading ? (
            <LoadingSkeleton />
          ) : applications?.length ? (
            <>
              <div className="overflow-x-auto">
                <Table
                  applications={applications}
                  sort={sort}
                  onSort={handleSort}
                  onDelete={handleDelete}
                  onChange={handleStatusChange}
                  deletingId={deletingId}
                  updatingId={updatingId}
                />
              </div>

              <PaginationFooter
                page={page}
                perPage={perPage}
                totalPages={totalPages}
                totalItems={total ?? 0}
                onPageChange={setPage}
                onPerPageChange={setPerPage}
              />
            </>
          ) : (
            <EmptyState
              hasFilters={!!hasFilters}
              onReset={() => {
                setPage(1);
                setSearch("");
                setFilterStatus("all");
                setFilterPriority("all");
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
