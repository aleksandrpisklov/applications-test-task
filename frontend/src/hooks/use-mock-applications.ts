import { useCallback, useEffect, useState } from "react";
import type { Application } from "../types/application";
import { mockApi } from "../api/mock-api";
import { getErrorMessage } from "../lib/get-error-message";

export function useMockApplications() {
  const [applications, setApplications] = useState<Application[]>([]);

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    setApiError("");
    try {
      setApplications(await mockApi.list());
    } catch (error) {
      setApiError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchApplications();
  }, [fetchApplications]);

  return {
    applications,
    setApplications,
    loading,
    apiError,
    fetchApplications,
  };
}
