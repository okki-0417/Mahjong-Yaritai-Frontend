import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL } from "@/config/apiConfig";
import axios from "axios";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { code } = body;

  console.log("[DEBUG] Google callback - received code:", code ? "present" : "missing");

  if (!code) {
    return NextResponse.json({ error: "認証コードが見つかりません" }, { status: 400 });
  }

  const cookieStore = await cookies();
  const existingCookies = cookieStore.getAll();
  console.log(
    "[DEBUG] Existing cookies:",
    existingCookies.map(c => c.name),
  );

  const cookieHeader = existingCookies.map(({ name, value }) => `${name}=${value}`).join("; ");

  try {
    console.log("[DEBUG] Calling backend API:", `${API_BASE_URL}/auth/google/callback`);

    const response = await axios({
      method: "POST",
      url: `${API_BASE_URL}/auth/google/callback`,
      data: { code },
      timeout: 10000,
      headers: {
        Cookie: cookieHeader,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    console.log("[DEBUG] Backend response status:", response.status);
    console.log("[DEBUG] Response headers:", response.headers);

    const setCookieHeaders = response.headers["set-cookie"];
    console.log("[DEBUG] Set-Cookie headers from backend:", setCookieHeaders);

    if (setCookieHeaders) {
      const cookieArray = Array.isArray(setCookieHeaders) ? setCookieHeaders : [setCookieHeaders];

      cookieArray.forEach(cookieString => {
        console.log("[DEBUG] Processing cookie string:", cookieString);
        const [nameValue, ...attributes] = cookieString.split(";");
        const [name, value] = nameValue.split("=");

        if (name && value) {
          const cookieOptions = parseCookieAttributes(attributes);
          console.log("[DEBUG] Setting cookie:", name.trim(), "with options:", cookieOptions);
          cookieStore.set(name.trim(), value.trim(), cookieOptions);
        }
      });
    }

    console.log("[DEBUG] Returning response data:", response.data);
    return NextResponse.json(response.data);
  } catch (error) {
    console.log("[DEBUG] Error occurred:", error);

    if (axios.isAxiosError(error)) {
      console.log("[DEBUG] Axios error response:", error.response?.data);
      console.log("[DEBUG] Axios error headers:", error.response?.headers);

      const setCookieHeaders = error.response?.headers["set-cookie"];
      if (setCookieHeaders) {
        const cookieArray = Array.isArray(setCookieHeaders) ? setCookieHeaders : [setCookieHeaders];

        cookieArray.forEach(cookieString => {
          console.log("[DEBUG] Processing error cookie string:", cookieString);
          const [nameValue, ...attributes] = cookieString.split(";");
          const [name, value] = nameValue.split("=");

          if (name && value) {
            const cookieOptions = parseCookieAttributes(attributes);
            console.log(
              "[DEBUG] Setting error cookie:",
              name.trim(),
              "with options:",
              cookieOptions,
            );
            cookieStore.set(name.trim(), value.trim(), cookieOptions);
          }
        });
      }

      return NextResponse.json(
        { error: error.response?.data?.message || "認証に失敗しました" },
        { status: error.response?.status || 500 },
      );
    }

    return NextResponse.json({ error: "不明なエラーが発生しました" }, { status: 500 });
  }
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
