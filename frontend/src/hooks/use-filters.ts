import { useState } from "react";
import type { Status } from "../types/status";
import type { Priority } from "../types/priority";

export function useFilters() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<Status | "all">("all");
  const [filterPriority, setFilterPriority] = useState<Priority | "all">("all");

  return {
    search,
    setSearch,
    filterStatus,
    setFilterStatus,
    filterPriority,
    setFilterPriority,
  };
}
