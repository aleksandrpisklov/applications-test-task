import { apiInstance } from "./api-instance";

interface CheckHealthResponse {
  status: "healthy";
}

export async function checkHealth() {
  const response = await apiInstance.get<CheckHealthResponse>("/health");
  return response.data.status;
}
