import { Plus, RefreshCw, Search, X } from "lucide-react";
import { STATUS_LABELS } from "../constants/status-labels";
import type { Status } from "../types/status";
import { PRIORITY_LABELS } from "../constants/priority-labels";
import type { Priority } from "../types/priority";
import type { Dispatch, SetStateAction } from "react";
import { Select } from "../ui/select";

export function Toolbar({
  search,
  filterStatus,
  filterPriority,
  hasFilters,
  setSearch,
  setFilterPriority,
  setFilterStatus,
  setShowCreate,
  onFetch,
}: {
  search: string;
  filterStatus: Status | "all";
  filterPriority: "all" | Priority;
  hasFilters: string | boolean;
  setFilterPriority: Dispatch<SetStateAction<"all" | Priority>>;
  setSearch: Dispatch<SetStateAction<string>>;
  setFilterStatus: Dispatch<SetStateAction<Status | "all">>;
  setShowCreate: Dispatch<SetStateAction<boolean>>;
  onFetch: () => Promise<void>;
}) {
  return (
    <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
      <div className="flex w-full min-w-0 flex-1 flex-col gap-2 sm:w-auto sm:flex-row">
        <div className="relative min-w-0 flex-1 sm:max-w-xs">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по ID, названию, описанию…"
            className="bg-input-background border-border text-foreground focus:ring-primary/50 focus:border-primary/60 placeholder:text-muted-foreground/50 w-full rounded-lg border py-2 pr-3 pl-9 text-sm transition focus:ring-2 focus:outline-none"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2.5 -translate-y-1/2 transition"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
        <Select
          value={filterStatus}
          options={STATUS_LABELS}
          allLabel="Все статусы"
          onChange={setFilterStatus}
        />
        <Select
          value={filterPriority}
          options={PRIORITY_LABELS}
          onChange={setFilterPriority}
          allLabel="Все приоритеты"
        />
        {hasFilters && (
          <button
            onClick={() => {
              setSearch("");
              setFilterStatus("all");
              setFilterPriority("all");
            }}
            className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 px-2 text-xs transition"
          >
            <X className="h-3.5 w-3.5" /> Сбросить
          </button>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          onClick={onFetch}
          title="Обновить"
          className="border-border bg-secondary text-muted-foreground hover:text-foreground rounded-lg border p-2 transition"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
        <button
          onClick={() => setShowCreate(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition"
        >
          <Plus className="h-4 w-4" /> Создать заявку
        </button>
      </div>
    </div>
  );
}
