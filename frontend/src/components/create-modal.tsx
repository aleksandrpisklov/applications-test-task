import type { Priority } from "../types/priority";
import type { Status } from "../types/status";
import type { Application } from "../types/application";
import { STATUS_LABELS } from "../constants/status-labels";
import { PRIORITY_LABELS } from "../constants/priority-labels";
import { AlertCircle, Loader2, X } from "lucide-react";
import { useCreateForm } from "../hooks/use-create-form";
import {
  DESCRIPTION_MAX_LENGTH,
  TITLE_MAX_LENGTH,
} from "../constants/create-application-limit";
import { Select } from "../ui/select";

export function CreateModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (application: Application) => void;
}) {
  const {
    title,
    setTitle,
    description,
    setDescription,
    titleErr,
    status,
    setStatus,
    priority,
    setPriority,
    submit,
    error,
    loading,
  } = useCreateForm({ onCreate });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="bg-card border-border relative w-full max-w-lg rounded-xl border shadow-2xl">
        <div className="border-border flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-foreground text-base font-semibold">
            Новая заявка
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={submit} className="space-y-4 p-6">
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-muted-foreground text-xs font-medium">
                Название *
              </label>
              <span
                className={`font-mono text-xs ${titleErr ? "text-destructive" : "text-muted-foreground/50"}`}
              >
                {title.length}/{TITLE_MAX_LENGTH}
              </span>
            </div>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`bg-input-background text-foreground focus:ring-primary/50 w-full rounded-lg border px-3 py-2.5 text-sm transition focus:ring-2 focus:outline-none ${titleErr ? "border-destructive/60" : "border-border focus:border-primary/60"}`}
              placeholder="Кратко опишите проблему"
              maxLength={TITLE_MAX_LENGTH}
            />
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-muted-foreground text-xs font-medium">
                Описание
              </label>
              <span className="text-muted-foreground/50 font-mono text-xs">
                {description.length}/{DESCRIPTION_MAX_LENGTH}
              </span>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-input-background border-border text-foreground focus:ring-primary/50 focus:border-primary/60 w-full resize-none rounded-lg border px-3 py-2.5 text-sm transition focus:ring-2 focus:outline-none"
              placeholder="Подробности, шаги воспроизведения, окружение…"
              rows={4}
              maxLength={DESCRIPTION_MAX_LENGTH}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-muted-foreground mb-1.5 block text-xs font-medium">
                Статус
              </label>
              <Select
                value={status}
                options={STATUS_LABELS}
                onChange={(value) => setStatus(value as Status)}
                className="focus:border-primary/60 w-full py-2.5"
              />
            </div>
            <div>
              <label className="text-muted-foreground mb-1.5 block text-xs font-medium">
                Приоритет
              </label>
              <Select
                value={priority}
                options={PRIORITY_LABELS}
                onChange={(value) => setPriority(value as Priority)}
                className="focus:border-primary/60 w-full py-2.5"
              />
            </div>
          </div>

          {error && (
            <div className="bg-destructive/10 border-destructive/25 flex items-center gap-2 rounded-lg border px-3 py-2.5">
              <AlertCircle className="text-destructive h-4 w-4 shrink-0" />
              <p className="text-destructive text-xs">{error}</p>
            </div>
          )}

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="border-border text-foreground hover:bg-secondary flex-1 rounded-lg border py-2.5 text-sm transition"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-primary-foreground hover:bg-primary/90 flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition disabled:opacity-60"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? "Создаю..." : "Создать заявку"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
