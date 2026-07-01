export type SortDir = "asc" | "desc";

export type SortField =
  "id" | "title" | "status" | "priority" | "created_at" | "updated_at";

export type Sort = {
  field: SortField;
  dir: SortDir;
};
