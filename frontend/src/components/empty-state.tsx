import { Inbox } from "lucide-react";

export function EmptyState({
  hasFilters,
  onReset,
}: {
  hasFilters: boolean;
  onReset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24">
      <div className="bg-muted flex h-12 w-12 items-center justify-center rounded-full">
        <Inbox className="text-muted-foreground h-6 w-6" />
      </div>
      <div className="text-center">
        <p className="text-foreground text-sm font-medium">
          {hasFilters ? "Заявок не найдено" : "Нет заявок"}
        </p>
        <p className="text-muted-foreground mt-1 text-xs">
          {hasFilters
            ? "Попробуйте изменить фильтры или поисковый запрос"
            : "Создайте первую заявку, нажав «Создать заявку»"}
        </p>
      </div>
      {hasFilters && (
        <button
          onClick={onReset}
          className="text-primary hover:text-primary/80 text-xs transition"
        >
          Сбросить фильтры
        </button>
      )}
    </div>
  );
}
