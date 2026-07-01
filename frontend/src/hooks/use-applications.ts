import { useQuery } from "@tanstack/react-query";
import { getApplicationsApiApplicationsGet } from "../api/generated";

export function useApplications() {
  return useQuery({
    queryKey: ["applications"],
    queryFn: () => getApplicationsApiApplicationsGet({}),
  });
}
