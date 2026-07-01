import { useState } from "react";
import { mockApi } from "../api/mock-api";
import { getErrorMessage } from "../lib/get-error-message";

export function useDelete({
  onDelete,
  onError,
}: {
  onDelete: (deletingId: string | null) => void;
  onError: (message: number) => void;
}) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await mockApi.delete(id);
      onDelete(id);
    } catch (error) {
      onError(getErrorMessage(error));
    } finally {
      setDeletingId(null);
    }
  };

  return { deletingId, handleDelete };
}
