import type { ApplicationParams } from "../types/application-params";

export const applicationsKey = {
  all: ["applications"] as const,
  list: (params: ApplicationParams) =>
    [...applicationsKey.all, params] as const,
  create: () => [...applicationsKey.all, "create"],
  delete: () => [...applicationsKey.all, "delete"],
  update: () => [...applicationsKey.all, "update"],
};
