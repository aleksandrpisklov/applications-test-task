export function Count({
  isLoading,
  isError,
  count,
  total,
}: {
  isLoading: boolean;
  isError: boolean;
  count: number;
  total: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <p className="text-muted-foreground text-xs">
        {isLoading ? "Загрузка…" : isError ? "" : `${count} из ${total} заявок`}
      </p>
    </div>
  );
}
