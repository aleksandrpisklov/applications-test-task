import { useEffect, useRef, useState } from "react";
import type { Status } from "../types/status";
import { STATUS_LABELS } from "../constants/status-labels";
import { STATUS_STYLE } from "../constants/status-style";
import { cn } from "../lib/cn";

export function StatusSelect({
  id,
  status,
  onChange,
}: {
  id: string;
  status: Status;
  onChange: (id: string, status: Status) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex cursor-pointer items-center rounded px-2 py-0.5 font-mono text-xs font-medium tracking-wide transition hover:opacity-80",
          STATUS_STYLE[status],
        )}
      >
        {STATUS_LABELS[status]}
      </button>
      {open && (
        <div className="bg-popover border-border absolute top-full left-0 z-20 mt-1 min-w-32.5 overflow-hidden rounded-lg border shadow-xl">
          {(Object.keys(STATUS_LABELS) as Status[]).map((s) => (
            <button
              key={s}
              onClick={() => {
                onChange(id, s);
                setOpen(false);
              }}
              className={cn(
                "w-full px-3 py-2 text-left font-mono text-xs transition",
                s === status ? "bg-secondary" : "hover:bg-secondary",
              )}
            >
              <span
                className={cn(
                  "inline-flex items-center rounded px-1.5 py-0.5",
                  STATUS_STYLE[s],
                )}
              >
                {STATUS_LABELS[s]}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
