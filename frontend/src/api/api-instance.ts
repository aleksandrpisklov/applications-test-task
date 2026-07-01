import axios from "axios";

export const baseURL = "http://localhost:8000/";

export const apiInstance = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: "application/json",
  },
});

apiInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  const authorizationToken = accessToken ? `Bearer ${accessToken}` : "";
  config.headers.Authorization = authorizationToken;
  return config;
});
