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
import { useDelete } from "./hooks/use-delete";
import { useUpdateStatus } from "./hooks/use-update-status";
import { filterAndSortApplications } from "./lib/filter-and-sort-applications";
import { useMockApplications } from "./hooks/use-mock-applications";
import { useToast } from "./hooks/use-toast";
import { useCreate } from "./hooks/use-create";

export function App() {
  const {
    applications,
    setApplications,
    loading,
    apiError,
    fetchApplications,
  } = useMockApplications();

  const {
    search,
    filterStatus,
    filterPriority,
    setSearch,
    setFilterStatus,
    setFilterPriority,
  } = useFilters();

  const { sort, handleSort } = useSort();

  const { toastMsg, toast } = useToast();

  const { showCreate, setShowCreate, handleCreate } = useCreate({
    onCreate: (application) => {
      setApplications((prev) => [application, ...prev]);
      toast("Заявка создана");
    },
  });

  const { deletingId, handleDelete } = useDelete({
    onDelete: (id) => {
      setApplications((prev) =>
        prev.filter((application) => application.id !== id),
      );
      toast("Заявка удалена");
    },
    onError: (message) => toast(`Ошибка: ${message}`),
  });

  const { updatingId, handleStatusChange } = useUpdateStatus({
    onUpdate: (id, updated, status) => {
      console.log({ id, updated, status });

      setApplications((prev) =>
        prev.map((application) =>
          application.id === id ? updated : application,
        ),
      );
      toast(`Статус обновлён → ${STATUS_LABELS[status]}`);
    },
    onError: (message) => toast(message),
  });

  const displayed = filterAndSortApplications({
    applications,
    filterStatus,
    filterPriority,
    search,
    sort,
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
          onFetch={fetchApplications}
        />

        <Count
          isLoading={loading}
          isError={!!apiError}
          count={displayed.length}
          total={applications.length}
        />

        <div className="border-border bg-card overflow-hidden rounded-xl border">
          {apiError && !loading && (
            <FetchingError error={apiError} onReload={fetchApplications} />
          )}

          {loading && <LoadingSkeleton />}

          {!loading && !apiError && displayed.length === 0 && (
            <EmptyState
              hasFilters={!!hasFilters}
              onReset={() => {
                setSearch("");
                setFilterStatus("all");
                setFilterPriority("all");
              }}
            />
          )}

          {!loading && !apiError && displayed.length > 0 && (
            <div className="overflow-x-auto">
              <Table
                applications={displayed}
                sort={sort}
                onSort={handleSort}
                onDelete={handleDelete}
                onChange={handleStatusChange}
                deletingId={deletingId}
                updatingId={updatingId}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
