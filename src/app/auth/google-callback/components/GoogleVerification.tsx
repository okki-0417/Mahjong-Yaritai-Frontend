import { redirect } from "next/navigation";
import createApiPageClient from "@/src/lib/api/server";
import ErrorPage from "@/src/components/errors/ErrorPage";
import { isRedirectError } from "next/dist/client/components/redirect-error";

type Props = {
  code: string;
};

export default async function GoogleVerification({ code }: Props) {
  const client = await createApiPageClient();

  try {
    console.log("Google verification code:", code);
    const response = await client.createGoogleCallback({ code });
    const session = response.session;

    if (session?.is_logged_in) {
      redirect("/dashboard");
    } else {
      redirect("/users/new");
    }
  } catch (error) {
    if (isRedirectError(error)) throw error;

    /* eslint-disable-next-line no-console */
    console.error("Google verification failed:", error);

    return <ErrorPage message={error.message || "認証に失敗しました"} />;
  }
}
