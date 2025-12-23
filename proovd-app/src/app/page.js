"use client";

import PasscodePage from "@/app/onboarding/passcode/page";
import { useEffect } from "react";
import { useRole } from "@/lib/role-context";
import { useRouter } from "next/navigation";

export default function Home() {
  const { role } = useRole();
  const router = useRouter();

  useEffect(() => {
    // If user is already in "affiliate" mode, divert them
    if (role === "affiliate") {
      router.push("/affiliate/partnerships/requests");
    }
  }, [role, router]);

  return <PasscodePage />;
}
