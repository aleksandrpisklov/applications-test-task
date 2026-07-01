import { useState } from "react";
import type { Status } from "../types/status";
import { getErrorMessage } from "../lib/get-error-message";
import { useMutation } from "@tanstack/react-query";
import { applicationsKey } from "../constants/query-keys";
import { updateApplicationStatusApiApplicationsApplicationIdPatch } from "../api/generated";
import { queryClient } from "../api/query-client";

export function useUpdateStatus({
  onSuccess,
  onError,
}: {
  onSuccess: (updatingId: string, status: Status) => void;
  onError: (message: string) => void;
}) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const updateApplicationStatusMutation = useMutation({
    mutationKey: applicationsKey.update(),
    mutationFn: ({ id, status }: { id: number; status: Status }) =>
      updateApplicationStatusApiApplicationsApplicationIdPatch(id, { status }),
    onSuccess: (data) => {
      if (data.status) {
        onSuccess(updatingId ?? String(data.id), data.status);
      }
      queryClient.invalidateQueries({ queryKey: applicationsKey.all });
    },
    onError: (error) => {
      onError(getErrorMessage(error));
    },
  });

  const handleStatusChange = async (id: string, status: Status) => {
    setUpdatingId(id);
    try {
      await updateApplicationStatusMutation.mutateAsync({
        id: Number(id),
        status,
      });
      onSuccess(id, status);
    } catch (error) {
      onError(getErrorMessage(error));
    } finally {
      setUpdatingId(null);
    }
  };

  return { updatingId, handleStatusChange };
}
