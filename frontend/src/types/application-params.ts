import type { Priority } from "./priority";
import type { SortOrder, SortField } from "./sort";
import type { Status } from "./status";

export interface ApplicationParams {
  status: Status | "all";
  priority: Priority | "all";
  search?: string;
  sortField?: SortField;
  sortOrder?: SortOrder;
  page?: number;
  size?: number;
}
