export type SortOrder = "asc" | "desc";

export type SortField = "priority" | "created_at";

export type Sort = {
  field: SortField;
  order: SortOrder;
};
