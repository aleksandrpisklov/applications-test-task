import type { Application } from "../types/application";

type FilterApplicationsParams = {
  applications: Application[];
  filterStatus: string;
  filterPriority: string;
  search: string;
  sort: {
    field: keyof Application;
    dir: "asc" | "desc";
  };
};

export const filterAndSortApplications = ({
  applications,
  filterStatus,
  filterPriority,
  search,
  sort,
}: FilterApplicationsParams) => {
  return applications
    .filter(
      (application) =>
        filterStatus === "all" || application.status === filterStatus,
    )
    .filter(
      (application) =>
        filterPriority === "all" || application.priority === filterPriority,
    )
    .filter((application) => {
      const query = search.toLowerCase();

      return (
        !query ||
        application.id.toString().includes(query) ||
        application.title.toLowerCase().includes(query) ||
        application.description.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      const dir = sort.dir === "asc" ? 1 : -1;

      const aValue = a[sort.field];
      const bValue = b[sort.field];

      return aValue < bValue ? -dir : aValue > bValue ? dir : 0;
    });
};
