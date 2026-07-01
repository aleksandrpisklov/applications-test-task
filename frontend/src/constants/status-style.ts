import type { Status } from "../types/status";

export const STATUS_STYLE: Record<Status, string> = {
  new: "bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/25",
  in_progress: "bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/25",
  done: "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/25",
};
