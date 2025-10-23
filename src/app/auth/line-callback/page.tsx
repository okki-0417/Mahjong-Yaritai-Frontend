import LineVerification from "@/src/app/auth/line-callback/components/LineVerification";
import { Suspense } from "react";

export default function LineCallbackPage() {
  return (
    <Suspense>
      <LineVerification />
    </Suspense>
  );
}
