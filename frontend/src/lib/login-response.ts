type LoginSuccess = {
  access_token: string;
};

type LoginError = {
  status_code: number;
  detail: string;
  headers: null;
};

export function isLoginSuccess(data: unknown): data is LoginSuccess {
  return (
    typeof data === "object" &&
    data !== null &&
    "access_token" in data &&
    typeof data?.access_token === "string"
  );
}

export function isLoginError(data: unknown): data is LoginError {
  return (
    typeof data === "object" &&
    data !== null &&
    "status_code" in data &&
    "detail" in data
  );
}
