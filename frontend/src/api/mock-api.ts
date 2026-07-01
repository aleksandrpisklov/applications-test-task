import { INITIAL_APPLICATIONS } from "../constants/initial-applications";
import type { Application } from "../types/application";
import type { Status } from "../types/status";

let store: Application[] = [...INITIAL_APPLICATIONS];
let shouldFailNext = false;

export const mockApi = {
  list: (): Promise<Application[]> =>
    new Promise((res, rej) =>
      setTimeout(() => {
        if (shouldFailNext) {
          shouldFailNext = false;
          return rej(new Error("500 Internal Server Error"));
        }
        res([...store]);
      }, 700),
    ),
  create: (
    data: Omit<Application, "id" | "created_at" | "updated_at">,
  ): Promise<Application> =>
    new Promise((res, rej) =>
      setTimeout(() => {
        if (shouldFailNext) {
          shouldFailNext = false;
          return rej(new Error("503 Service Unavailable"));
        }
        const now = new Date().toISOString();
        const t: Application = {
          ...data,
          id: `TKT-${String(store.length + 1).padStart(3, "0")}`,
          created_at: now,
          updated_at: now,
        };
        store = [t, ...store];
        res(t);
      }, 500),
    ),
  updateStatus: (id: string, status: Status): Promise<Application> =>
    new Promise((res, rej) =>
      setTimeout(() => {
        if (shouldFailNext) {
          shouldFailNext = false;
          return rej(new Error("404 Not Found"));
        }
        const idx = store.findIndex((t) => t.id === id);
        if (idx === -1) return rej(new Error("Application not found"));
        store[idx] = {
          ...store[idx],
          status,
          updated_at: new Date().toISOString(),
        };
        res({ ...store[idx] });
      }, 300),
    ),
  delete: (id: string): Promise<void> =>
    new Promise((res, rej) =>
      setTimeout(() => {
        if (shouldFailNext) {
          shouldFailNext = false;
          return rej(new Error("403 Forbidden"));
        }
        store = store.filter((t) => t.id !== id);
        res();
      }, 300),
    ),
};
