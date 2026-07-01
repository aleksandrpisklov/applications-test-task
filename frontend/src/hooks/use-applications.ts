import { useQuery } from "@tanstack/react-query";
import { getApplicationsApiApplicationsGet } from "../api/generated";
import { mapApplications } from "../lib/map-application";
import { applicationsKey } from "../constants/query-keys";
import type { ApplicationParams } from "../types/application-params";

export function useApplications({
  status,
  priority,
  search,
  sortField,
  sortOrder,
  page,
  size,
}: ApplicationParams) {
  const applicationsQuery = useQuery({
    queryKey: applicationsKey.list({
      status,
      priority,
      search,
      sortOrder,
      sortField,
      page,
      size,
    }),
    queryFn: () =>
      getApplicationsApiApplicationsGet({
        status: status !== "all" ? status : undefined,
        priority: priority !== "all" ? priority : undefined,
        search,
        sort_order: sortOrder,
        sort_by: sortField,
        page,
        size,
      }),
  });

  const reloadApplications = async () => {
    await applicationsQuery.refetch();
  };

  return {
    applications: mapApplications(applicationsQuery.data?.items ?? []),
    total: applicationsQuery.data?.total,
    reloadApplications,
    ...applicationsQuery,
  };
}
