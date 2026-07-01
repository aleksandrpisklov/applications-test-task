import { useState } from "react";
import type { Sort, SortField } from "../types/sort";

export function useSort() {
  const [sort, setSort] = useState<Sort>({
    field: "created_at",
    order: "desc",
  });

  const handleSort = (field: SortField) => {
    setSort((prev) =>
      prev.field === field
        ? { field, order: prev.order === "asc" ? "desc" : "asc" }
        : { field, order: "asc" },
    );
  };

  return { sort, handleSort };
}
