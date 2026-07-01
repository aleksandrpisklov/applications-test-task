import type { Status } from "../types/status";

export const STATUS_LABELS: Record<Status, string> = {
  new: "Новая",
  in_progress: "В работе",
  done: "Выполнена",
};
