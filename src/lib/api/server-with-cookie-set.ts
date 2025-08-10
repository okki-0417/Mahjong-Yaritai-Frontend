"use server";

import { API_BASE_URL } from "@/config/apiConfig";
import axios, { AxiosResponse } from "axios";
import { cookies } from "next/headers";

export async function callApiWithCookies<T = any>(
  endpoint: string,
  options: {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    data?: any;
    headers?: Record<string, string>;
  } = {},
): Promise<AxiosResponse<T>> {
  const cookieStore = await cookies();

  // 既存のCookieを取得
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  const { method = "GET", data, headers = {} } = options;

  try {
    const response = await axios({
      method,
      url: `${API_BASE_URL}${endpoint}`,
      data,
      timeout: 10000,
      headers: {
        Cookie: cookieHeader,
        Accept: "application/json",
        "Content-Type": "application/json",
        ...headers,
      },
    });

    // Set-Cookieヘッダーを処理
    const setCookieHeaders = response.headers["set-cookie"];
    if (setCookieHeaders) {
      await handleSetCookies(setCookieHeaders);
    }

    return response;
  } catch (error) {
    // エラーレスポンスでもSet-Cookieがある場合は処理
    if (axios.isAxiosError(error) && error.response?.headers["set-cookie"]) {
      await handleSetCookies(error.response.headers["set-cookie"]);
    }
    throw error;
  }
}

async function handleSetCookies(setCookieHeaders: string | string[]) {
  const cookieStore = await cookies();
  const cookieArray = Array.isArray(setCookieHeaders) ? setCookieHeaders : [setCookieHeaders];

  cookieArray.forEach(cookieString => {
    const [nameValue, ...attributes] = cookieString.split(";");
    const [name, value] = nameValue.split("=");

    if (name && value) {
      const cookieOptions = parseCookieAttributes(attributes);
      cookieStore.set(name.trim(), value.trim(), cookieOptions);
    }
  });
}

function parseCookieAttributes(attributes: string[]) {
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

  return cookieOptions;
}
