import { Configuration } from "@/api-client";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const apiConfig = new Configuration({
  basePath: API_BASE_URL,
  credentials: "include",
  headers: {
    Accept: "application/json",
  },
});
