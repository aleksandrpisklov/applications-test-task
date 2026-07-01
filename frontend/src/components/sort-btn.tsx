import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import type { SortDir, SortField } from "../types/sort";

export function SortBtn({
  field,
  label,
  sort,
  onSort,
}: {
  field: SortField;
  label: string;
  sort: { field: SortField; dir: SortDir };
  onSort: (field: SortField) => void;
}) {
  const active = sort.field === field;
  return (
    <button
      onClick={() => onSort(field)}
      className={`flex items-center gap-1 text-xs font-medium transition select-none ${active ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
    >
      {label}
      {active ? (
        sort.dir === "asc" ? (
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
