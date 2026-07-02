import { ChevronDown } from "lucide-react";
import { cn } from "../lib/cn";

type SelectFilterProps<T extends string> = {
  value: T | "all";
  options: Record<T, string>;
  onChange: (value: T | "all") => void;
  allLabel?: string;
  className?: string;
};

export const Select = <T extends string>({
  value,
  options,
  allLabel,
  onChange,
  className = "",
}: SelectFilterProps<T>) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T | "all")}
        className={cn(
          "bg-input-background border-border text-foreground focus:ring-primary/50 w-full appearance-none rounded-lg border py-2 pr-10 pl-3 text-sm transition focus:ring-2 focus:outline-none",
          className,
        )}
      >
        {allLabel && <option value="all">{allLabel}</option>}

        {(Object.keys(options) as T[]).map((option) => (
          <option key={option} value={option}>
            {options[option]}
          </option>
        ))}
      </select>

      <ChevronDown
        size={16}
        className="text-muted-foreground pointer-events-none absolute top-1/2 right-3 -translate-y-1/2"
      />
    </div>
  );
};
