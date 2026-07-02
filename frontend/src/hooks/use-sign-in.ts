import { useMutation } from "@tanstack/react-query";
import { loginApiAuthLoginPost } from "../api/generated";
import { authKey } from "../constants/query-keys";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "./use-toast";
import { getErrorMessage } from "../lib/get-error-message";
import { isLoginError, isLoginSuccess } from "../lib/login-response";
import { useAuth } from "./use-auth";
import { ROUTES } from "../constants/routes";

export function useSignIn() {
  const navigate = useNavigate();

  const { toastMsg, toast } = useToast();

  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");

  const signInMutation = useMutation({
    mutationKey: authKey.signIn,
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => loginApiAuthLoginPost({ username, password }),
    onSuccess: (data) => {
      if (isLoginSuccess(data)) {
        login(data.access_token);
        toast("Вы авторизовались");
        navigate(ROUTES.HOME);
        return;
      }

      if (isLoginError(data)) {
        toast(data.detail);
        return;
      }

      toast("Неизвестная ошибка");
    },
    onError: (error) => {
      toast(getErrorMessage(error));
    },
  });

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!username || !password) {
      setFormError("Заполните все поля.");
      return;
    }

    signInMutation.mutateAsync({ username, password });
  };

  return {
    submit,
    toastMsg,
    username,
    setUsername,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    error: signInMutation.error,
    formError,
    pending: signInMutation.isPending,
  };
}
