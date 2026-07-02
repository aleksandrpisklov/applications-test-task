import { useCallback, useEffect, useState } from "react";

const TOKEN_KEY = "accessToken";

export function useAuth() {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem(TOKEN_KEY);
  });

  const isAuth = Boolean(token);

  const login = useCallback((newToken: string) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  }, []);

  useEffect(() => {
    const handler = () => {
      setToken(localStorage.getItem(TOKEN_KEY));
    };

    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return {
    token,
    isAuth,
    login,
    logout,
  };
}
