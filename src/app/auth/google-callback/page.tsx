import GoogleVerification from "@/src/app/auth/google-callback/components/GoogleVerification";
import Fallback from "@/src/components/fallbacks/Fallback";
import { Suspense } from "react";

type Props = {
  params: Promise<{
    code: string;
  }>;
};

export default async function GoogleCallbackPage({ params }: Props) {
  const { code } = await params;

  return (
    <Suspense fallback={<Fallback />}>
      <GoogleVerification code={code} />
    </Suspense>
  );
}
