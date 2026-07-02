import {
  AlertCircle,
  Eye,
  EyeOff,
  Loader2,
  SquareCheckBig,
} from "lucide-react";
import { useSignIn } from "../hooks/use-sign-in";
import { Toast } from "../ui/toast";

export function SignIn() {
  const {
    submit,
    username,
    setUsername,
    showPassword,
    password,
    setPassword,
    setShowPassword,
    pending,
    formError,
    toastMsg,
  } = useSignIn();

  return (
    <div className="bg-background flex min-h-screen">
      {toastMsg && <Toast message={toastMsg} />}

      <div className="bg-sidebar border-border hidden flex-col justify-between border-r p-12 lg:flex lg:w-120">
        <div className="flex items-center gap-3">
          <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
            <SquareCheckBig className="text-primary-foreground h-4 w-4" />
          </div>
          <span className="text-foreground font-semibold tracking-tight">
            Applications
          </span>
        </div>
        <div>
          <p className="text-foreground text-2xl leading-snug font-semibold">
            Управление заявками
            <br />в одном месте
          </p>
          <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
            Отслеживайте, приоритизируйте и закрывайте задачи команды без лишних
            инструментов.
          </p>
        </div>
        <div className="space-y-3">
          {(
            [
              "Централизованная очередь заявок",
              "Приоритеты и статусы в реальном времени",
              "Ролевой доступ для администраторов",
            ] as const
          ).map((feature) => (
            <div
              key={feature}
              className="text-muted-foreground flex items-center gap-2.5 text-sm"
            >
              <div className="bg-primary h-1.5 w-1.5 rounded-full" />
              {feature}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-foreground text-2xl font-semibold tracking-tight">
              Вход в систему
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Только для администраторов
            </p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-muted-foreground mb-1.5 block text-xs font-medium">
                Логин
              </label>
              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="bg-input-background border-border text-foreground focus:ring-primary/50 focus:border-primary/60 placeholder:text-muted-foreground/50 w-full rounded-lg border px-3 py-2.5 text-sm transition focus:ring-2 focus:outline-none"
                autoComplete="login"
              />
            </div>
            <div>
              <label className="text-muted-foreground mb-1.5 block text-xs font-medium">
                Пароль
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="bg-input-background border-border text-foreground focus:ring-primary/50 focus:border-primary/60 placeholder:text-muted-foreground/50 w-full rounded-lg border px-3 py-2.5 pr-10 text-sm transition focus:ring-2 focus:outline-none"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {formError && (
              <div className="bg-destructive/10 border-destructive/25 flex items-center gap-2 rounded-lg border px-3 py-2.5">
                <AlertCircle className="text-destructive h-4 w-4 shrink-0" />
                <p className="text-destructive text-xs">{formError}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={pending}
              className="bg-primary hover:bg-primary/90 text-primary-foreground flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition disabled:opacity-60"
            >
              {pending && <Loader2 className="h-4 w-4 animate-spin" />}
              {pending ? "Вхожу..." : "Войти"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
