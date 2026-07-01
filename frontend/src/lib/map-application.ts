import type { ApplicationResponse } from "../api/generated";
import type { Application } from "../types/application";

export function mapApplication(application: ApplicationResponse): Application {
  return {
    id: String(application.id),
    title: application.title,
    description: application.description ?? "",
    status: application.status ?? "new",
    priority: application.priority ?? "normal",
    created_at: application.created_at,
    updated_at: application.updated_at,
  };
}

export function mapApplications(
  applications: ApplicationResponse[],
): Application[] {
  return applications.map(mapApplication);
}
