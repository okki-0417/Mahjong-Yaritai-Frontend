import axios from "axios";
import { createApiClient } from "@/src/zodios/api";
import { API_BASE_URL } from "@/config/apiConfig";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    Accept: "application/json",
  },
});

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (axios.isAxiosError(error)) {
      console.error(
        `API_PAGE_CLIENT_AXIOS_ERROR:\n\tSTATUS: "${error.status}"\n\tMESSAGE: "${error.message}"`,
      );
    } else {
      console.error(`
        API_PAGE_CLIENT_DEFAULT_ERROR: \n
        ERROR: "${error}"`);
    }
    return Promise.reject(error);
  },
);

export const apiClient = createApiClient(API_BASE_URL, { axiosInstance });
