import type { ReactNode } from "react";

export function Badge({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center rounded px-2 py-0.5 font-mono text-xs font-medium tracking-wide ${className}`}
    >
      {children}
    </span>
  );
}
