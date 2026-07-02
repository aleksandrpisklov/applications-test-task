import { LogIn, LogOut, SquareCheckBig } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { ROUTES } from "../constants/routes";

export function Header() {
  const { isAuth, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="border-border bg-sidebar sticky top-0 z-30 border-b">
      <div className="mx-auto flex h-14 max-w-350 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary flex h-7 w-7 items-center justify-center rounded-md">
            <SquareCheckBig className="text-primary-foreground h-3.5 w-3.5" />
          </div>
          <span className="text-foreground text-sm font-semibold tracking-tight">
            Applications
          </span>
        </div>
        <div className="flex items-center gap-4">
          {isAuth ? (
            <>
              <span className="text-muted-foreground hidden font-mono text-xs sm:block">
                admin
              </span>
              <button
                onClick={() => {
                  logout();
                  navigate(ROUTES.SIGN_IN);
                }}
                className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-xs transition"
              >
                <LogOut className="h-3.5 w-3.5" /> Выйти
              </button>
            </>
          ) : (
            <Link
              to={ROUTES.SIGN_IN}
              className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-xs transition"
            >
              <LogIn className="h-3.5 w-3.5" /> Войти
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
