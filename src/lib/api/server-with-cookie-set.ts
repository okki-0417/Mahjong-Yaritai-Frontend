import { API_BASE_URL } from "@/config/apiConfig";
import { createApiClient } from "@/src/zodios/api";
import axios from "axios";
import { cookies } from "next/headers";

const createApiPageClientWithCookieSet = async () => {
  const cookieStore = await cookies();

  // 既存のCookieを読み込み
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
      Cookie: cookieHeader,
      Accept: "application/json",
    },
  });

  // レスポンスインターセプターでSet-Cookieを処理
  instance.interceptors.response.use(
    response => {
      // Set-Cookieヘッダーがある場合の処理
      const setCookieHeader = response.headers["set-cookie"];

      if (setCookieHeader) {
        parseCookiesAndSet(setCookieHeader, cookieStore);
      }

      return response;
    },
    error => {
      // エラーレスポンスでもSet-Cookieがある場合は処理
      if (error.response?.headers["set-cookie"]) {
        parseCookiesAndSet(error.response.headers["set-cookie"], cookieStore);
      }
      return Promise.reject(error);
    },
  );

  return createApiClient(API_BASE_URL, {
    axiosInstance: instance,
  });
};

// Cookie解析とセットのヘルパー関数
function parseCookiesAndSet(setCookieHeaders: string | string[], cookieStore: any) {
  const cookieArray = Array.isArray(setCookieHeaders) ? setCookieHeaders : [setCookieHeaders];

  cookieArray.forEach(cookieString => {
    const [nameValue, ...attributes] = cookieString.split(";");
    const [name, value] = nameValue.split("=");

    if (name && value) {
      const cookieOptions: any = {};

      attributes.forEach(attr => {
        const trimmedAttr = attr.trim().toLowerCase();

        if (trimmedAttr.startsWith("max-age=")) {
          cookieOptions.maxAge = parseInt(trimmedAttr.split("=")[1]);
        } else if (trimmedAttr === "httponly") {
          cookieOptions.httpOnly = true;
        } else if (trimmedAttr === "secure") {
          cookieOptions.secure = true;
        } else if (trimmedAttr.startsWith("samesite=")) {
          cookieOptions.sameSite = trimmedAttr.split("=")[1] as "strict" | "lax" | "none";
        } else if (trimmedAttr.startsWith("path=")) {
          cookieOptions.path = trimmedAttr.split("=")[1];
        }
      });

      cookieStore.set(name.trim(), value.trim(), cookieOptions);
    }
  });
}

export default createApiPageClientWithCookieSet;
