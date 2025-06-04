import axios from "axios";
import { cookies } from "next/headers";

export const apiPageClient = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
    headers: {
      Cookie: cookieHeader,
      Accept: "application/json",
    },
  });

  return instance;
};
