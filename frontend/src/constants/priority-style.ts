import type { Priority } from "../types/priority";

export const PRIORITY_STYLE: Record<Priority, string> = {
  low: "bg-slate-500/10 text-slate-400 ring-1 ring-slate-500/20",
  normal: "bg-violet-500/10 text-violet-400 ring-1 ring-violet-500/20",
  high: "bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/25",
};
