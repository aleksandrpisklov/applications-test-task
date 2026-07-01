import { useState } from "react";
import type { Application } from "../types/application";
import { useMutation } from "@tanstack/react-query";
import { createApplicationApiApplicationsPost } from "../api/generated";
import { queryClient } from "../api/query-client";
import { applicationsKey } from "../constants/query-keys";
import { getErrorMessage } from "../lib/get-error-message";

export function useCreateApplication({
  onSuccess,
  onError,
}: {
  onSuccess: (application?: Application) => void;
  onError: (message: string) => void;
}) {
  const [showCreate, setShowCreate] = useState(false);

  const createApplicationMutation = useMutation({
    mutationKey: applicationsKey.create(),
    mutationFn: (application: Application) =>
      createApplicationApiApplicationsPost(application),
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries({ queryKey: applicationsKey.all });
    },
    onError: (error) => {
      onError(getErrorMessage(error));
    },
  });

  const handleCreate = async (application: Application) => {
    await createApplicationMutation.mutateAsync(application);
    setShowCreate(false);
  };

  return { showCreate, setShowCreate, handleCreate };
}
