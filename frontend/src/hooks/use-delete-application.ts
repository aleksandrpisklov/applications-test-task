import { useState } from "react";
import { getErrorMessage } from "../lib/get-error-message";
import { useMutation } from "@tanstack/react-query";
import { applicationsKey } from "../constants/query-keys";
import { deleteApplicationApiApplicationsApplicationIdDelete } from "../api/generated";
import { queryClient } from "../api/query-client";

export function useDeleteApplication({
  onSuccess,
  onError,
}: {
  onSuccess: (deletingId: string | null) => void;
  onError: (message: string) => void;
}) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const deleteApplicationMutation = useMutation({
    mutationKey: applicationsKey.delete(),
    mutationFn: (id: number) =>
      deleteApplicationApiApplicationsApplicationIdDelete(id),
    onSuccess: () => {
      onSuccess(deletingId);
      queryClient.invalidateQueries({ queryKey: applicationsKey.all });
    },
    onError: (error) => {
      onError(getErrorMessage(error));
    },
  });

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteApplicationMutation.mutateAsync(Number(id));
      onSuccess(id);
    } catch (error) {
      onError(getErrorMessage(error));
    } finally {
      setDeletingId(null);
    }
  };

  return { deletingId, handleDelete };
}
