import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  createApplicationApiApplicationsPost,
  type ApplicationCreate,
} from "../api/generated";
import { queryClient } from "../api/query-client";
import { applicationsKey } from "../constants/query-keys";
import { getErrorMessage } from "../lib/get-error-message";

export function useCreateApplication({
  onSuccess,
  onError,
}: {
  onSuccess: (application?: ApplicationCreate) => void;
  onError: (message: string) => void;
}) {
  const [showCreate, setShowCreate] = useState(false);

  const createApplicationMutation = useMutation({
    mutationKey: applicationsKey.create(),
    mutationFn: (application: ApplicationCreate) =>
      createApplicationApiApplicationsPost(application),
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries({ queryKey: applicationsKey.all });
    },
    onError: (error) => {
      onError(getErrorMessage(error));
    },
  });

  const handleCreate = async (application: ApplicationCreate) => {
    await createApplicationMutation.mutateAsync(application);
    setShowCreate(false);
  };

  return { showCreate, setShowCreate, handleCreate };
}
