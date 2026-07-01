import { AxiosError } from "axios";

export function getErrorMessage(
  error: unknown,
  fallback = "Произошла неизвестная ошибка, попробуйте позже",
) {
  if (error instanceof AxiosError) {
    return error.response?.data?.detail || fallback;
  }
  return fallback;
}
