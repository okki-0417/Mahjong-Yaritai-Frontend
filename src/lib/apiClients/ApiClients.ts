import axios from "axios";

// export const apiClient = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
//   withCredentials: true,
//   timeout: 10000,
//   headers: {
//     Accept: "application/json",
//   },
// });

// apiClient.interceptors.response.use(
//   response => {
//     return response;
//   },
//   error => {
//     if (axios.isAxiosError(error)) {
//       console.error(
//         `API_PAGE_CLIENT_AXIOS_ERROR:\n\tSTATUS: "${error.status}"\n\tMESSAGE: "${error.message}"`,
//       );
//     } else {
//       console.error(`
//         API_PAGE_CLIENT_DEFAULT_ERROR: \n
//         ERROR: "${error}"`);
//     }
//     return Promise.reject(error);
//   },
// );
