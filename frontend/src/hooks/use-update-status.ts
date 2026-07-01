import { useState } from "react";
import type { Status } from "../types/status";
import { mockApi } from "../api/mock-api";
import type { Application } from "../types/application";
import { getErrorMessage } from "../lib/get-error-message";

export function useUpdateStatus({
  onUpdate,
  onError,
}: {
  onUpdate: (
    updatingId: string | null,
    updatedApplication: Application,
    status: Status,
  ) => void;
  onError: (message: string) => void;
}) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleStatusChange = async (id: string, status: Status) => {
    setUpdatingId(id);
    try {
      const updatedApplication = await mockApi.updateStatus(id, status);
      onUpdate(id, updatedApplication, status);
    } catch (error) {
      onError(getErrorMessage(error));
    } finally {
      setUpdatingId(null);
    }
  };

  return { updatingId, handleStatusChange };
}
