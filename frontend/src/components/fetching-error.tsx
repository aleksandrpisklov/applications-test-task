import { AlertCircle, RefreshCw } from "lucide-react";

export function FetchingError({
  error,
  onReload,
}: {
  error: string;
  onReload: () => Promise<void>;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <div className="bg-destructive/10 flex h-12 w-12 items-center justify-center rounded-full">
        <AlertCircle className="text-destructive h-6 w-6" />
      </div>
      <div className="text-center">
        <p className="text-foreground text-sm font-medium">Ошибка загрузки</p>
        <p className="text-muted-foreground mt-1 font-mono text-xs">{error}</p>
      </div>
      <button
        onClick={onReload}
        className="text-primary hover:text-primary/80 flex items-center gap-2 text-sm transition"
      >
        <RefreshCw className="h-4 w-4" /> Повторить запрос
      </button>
    </div>
  );
}
