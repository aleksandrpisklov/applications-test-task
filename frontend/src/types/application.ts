import type { Priority } from "./priority";
import type { Status } from "./status";

export interface Application {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  created_at: string;
  updated_at: string;
}
