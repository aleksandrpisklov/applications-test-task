import {
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  Loader2,
  Trash2,
} from "lucide-react";
import type { Sort, SortField } from "../types/sort";
import { StatusSelect } from "./status-select";
import { PRIORITY_STYLE } from "../constants/priority-style";
import { PRIORITY_LABELS } from "../constants/priority-labels";
import { formatDate } from "../lib/format-date";
import type { Application } from "../types/application";
import type { Status } from "../types/status";
import { Badge } from "../ui/badge";

export function ColumnHeader({
  field,
  label,
  sort,
  onSort,
}: {
  field?: SortField;
  label: string;
  sort?: Sort;
  onSort?: () => void;
}) {
  const sortable = sort && onSort && field;
  const active = sortable && sort?.field === field;

  if (!sortable) {
    return (
      <div className="text-muted-foreground text-xs font-medium"> {label} </div>
    );
  }

  return (
    <button
      onClick={onSort}
      className={`flex items-center gap-1 text-xs font-medium transition select-none ${active ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
    >
      {label}
      {active ? (
        sort?.order === "asc" ? (
          <ChevronUp className="h-3 w-3" />
        ) : (
          <ChevronDown className="h-3 w-3" />
        )
      ) : (
        <ChevronsUpDown className="h-3 w-3 opacity-40" />
      )}
    </button>
  );
}

function TableHeader({
  sort,
  onSort,
}: {
  sort: Sort;
  onSort: (field: SortField) => void;
}) {
  return (
    <thead>
      <tr className="border-border bg-muted/30 border-b">
        <th className="w-[38%] px-5 py-3 text-left">
          <ColumnHeader label="Заявка" />
        </th>
        <th className="px-3 py-3 text-left">
          <ColumnHeader label="Статус" />
        </th>
        <th className="px-3 py-3 text-left">
          <ColumnHeader
            field="priority"
            label="Приоритет"
            sort={sort}
            onSort={() => onSort("priority")}
          />
        </th>
        <th className="hidden px-3 py-3 text-left md:table-cell">
          <ColumnHeader
            field="created_at"
            label="Создана"
            sort={sort}
            onSort={() => onSort("created_at")}
          />
        </th>
        <th className="hidden px-3 py-3 text-left lg:table-cell">
          <ColumnHeader label="Изменена" />
        </th>
        <th className="w-11 px-3 py-3" />
      </tr>
    </thead>
  );
}

function TableBody({
  applications,
  updatingId,
  deletingId,
  onDelete,
  onChange,
}: {
  applications: Application[];
  updatingId: string | null;
  deletingId: string | null;
  onDelete: (id: string) => Promise<void>;
  onChange: (id: string, status: Status) => void;
}) {
  return (
    <tbody className="divide-border divide-y">
      {applications.map((application) => (
        <tr
          key={application.id}
          className={`group hover:bg-secondary/40 transition-colors ${updatingId === application.id || deletingId === application.id ? "pointer-events-none opacity-50" : ""}`}
        >
          {/* Title + ID */}
          <td className="px-5 py-4">
            <p className="text-foreground line-clamp-1 leading-snug font-medium">
              {application.title}
            </p>
            <div className="mt-0.5 flex items-center gap-2">
              <span className="text-muted-foreground font-mono text-xs">
                {application.id}
              </span>
              {application.description && (
                <span className="text-muted-foreground/50 line-clamp-1 max-w-60 text-xs">
                  {application.description}
                </span>
              )}
            </div>
          </td>
          {/* Status */}
          <td className="px-3 py-4">
            <StatusSelect
              id={application.id}
              status={application.status}
              onChange={onChange}
            />
          </td>
          {/* Priority */}
          <td className="px-3 py-4">
            <Badge className={PRIORITY_STYLE[application.priority]}>
              {PRIORITY_LABELS[application.priority]}
            </Badge>
          </td>
          {/* Created */}
          <td className="hidden px-3 py-4 md:table-cell">
            <span className="text-muted-foreground font-mono text-xs">
              {formatDate(application.created_at)}
            </span>
          </td>
          {/* Updated */}
          <td className="hidden px-3 py-4 lg:table-cell">
            <span className="text-muted-foreground font-mono text-xs">
              {formatDate(application.updated_at)}
            </span>
          </td>
          {/* Delete */}
          <td className="px-3 py-4 text-right">
            {deletingId === application.id ? (
              <Loader2 className="text-muted-foreground ml-auto h-4 w-4 animate-spin" />
            ) : (
              <button
                onClick={() => onDelete(application.id)}
                className="text-muted-foreground hover:text-destructive rounded p-1 opacity-0 transition group-hover:opacity-100"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export function Table({
  applications,
  sort,
  onSort,
  deletingId,
  updatingId,
  onDelete,
  onChange,
}: {
  applications: Application[];
  sort: Sort;
  onSort: (field: SortField) => void;
  deletingId: string | null;
  updatingId: string | null;
  onDelete: (id: string) => Promise<void>;
  onChange: (id: string, status: Status) => void;
}) {
  return (
    <table className="w-full min-w-200 text-sm">
      <TableHeader sort={sort} onSort={onSort} />
      <TableBody
        applications={applications}
        updatingId={updatingId}
        deletingId={deletingId}
        onDelete={onDelete}
        onChange={onChange}
      />
    </table>
  );
}
