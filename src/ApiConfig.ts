import axios from "axios";

export const BASEURL = process.env.NEXT_PUBLIC_API_URL;

export const apiClient = axios.create({
  baseURL: BASEURL,
  withCredentials: true,
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      console.error(error.status);
      console.error(error.message);
    } else {
      console.error(error);
    }
    return Promise.reject(error);
  },
);
