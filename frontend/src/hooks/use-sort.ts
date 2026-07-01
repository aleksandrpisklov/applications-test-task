import { useState } from "react";
import type { Sort, SortField } from "../types/sort";

export function useSort() {
  const [sort, setSort] = useState<Sort>({
    field: "created_at",
    dir: "desc",
  });

  const handleSort = (field: SortField) => {
    setSort((prev) =>
      prev.field === field
        ? { field, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { field, dir: "asc" },
    );
  };

  return { sort, handleSort };
}
