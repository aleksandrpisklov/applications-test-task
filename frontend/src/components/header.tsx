import { LogOut, ShieldCheck } from "lucide-react";

export function Header() {
  return (
    <header className="border-border bg-sidebar sticky top-0 z-30 border-b">
      <div className="mx-auto flex h-14 max-w-350 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary flex h-7 w-7 items-center justify-center rounded-md">
            <ShieldCheck className="text-primary-foreground h-3.5 w-3.5" />
          </div>
          <span className="text-foreground text-sm font-semibold tracking-tight">
            Admin
          </span>
          <span className="text-muted-foreground/40 ml-1 hidden text-xs sm:block">
            / Заявки
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-muted-foreground hidden font-mono text-xs sm:block">
            admin
          </span>
          <button className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-xs transition">
            <LogOut className="h-3.5 w-3.5" /> Выйти
          </button>
        </div>
      </div>
    </header>
  );
}
