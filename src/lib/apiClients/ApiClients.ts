import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    Accept: "application/json",
  },
});

apiClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (axios.isAxiosError(error)) {
      console.error(error.status);
      console.error(error.message);

      if (window.location.hostname != "murai.local") {
        console.error("murai.localにしてください！！！！！！！！！！！！");
      }
    } else {
      console.error(error);
    }
    return Promise.reject(error);
  },
);
