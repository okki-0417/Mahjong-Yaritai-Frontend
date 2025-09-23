import GoogleVerification from "@/src/app/auth/google-callback/GoogleVerification";
import { Suspense } from "react";

export default function GoogleCallbackPage() {
  return (
    <Suspense>
      <GoogleVerification />
    </Suspense>
  );
}
