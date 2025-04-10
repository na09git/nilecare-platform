"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (status === "loading") {
      return; // Still loading, wait...
    }

    setIsChecking(false);

    if (session) {
      router.push(`/onboarding/${session.user.id}`);
    }
  }, [session, status, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <h2>
        {isChecking
          ? "Verifying Session please wait..."
          : "Verifying Session please wait..."}
      </h2>
    </div>
  );
}
