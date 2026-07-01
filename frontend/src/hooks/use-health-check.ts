import { useQuery } from "@tanstack/react-query";
import { checkHealth } from "../api/check-health";

export function useHealthCheck() {
  return useQuery({
    queryKey: ["health"],
    queryFn: checkHealth,
  });
}
