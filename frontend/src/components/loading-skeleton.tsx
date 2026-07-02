import { cn } from "../lib/cn";

export function LoadingSkeleton() {
  return (
    <div className="divide-border divide-y">
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_44px] items-center gap-4 px-5 py-3">
        {["w-12", "w-16", "w-14", "w-14", "w-20"].map((width, index) => (
          <div
            key={index}
            className={cn("bg-muted h-3 animate-pulse rounded", width)}
          />
        ))}
        <div />
      </div>
      {Array.from({ length: 7 }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_44px] items-center gap-4 px-5 py-4"
        >
          <div className="space-y-2">
            <div
              className="bg-muted h-3.5 animate-pulse rounded"
              style={{ width: `${55 + ((i * 13) % 40)}%` }}
            />
            <div className="bg-muted/60 h-2.5 w-1/3 animate-pulse rounded" />
          </div>
          {[1, 2, 3, 4].map((j) => (
            <div key={j} className="bg-muted h-5 w-16 animate-pulse rounded" />
          ))}
          <div className="bg-muted h-7 w-7 animate-pulse rounded" />
        </div>
      ))}
    </div>
  );
}
