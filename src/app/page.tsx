"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import LandingPage from "@/app/landing/page";

export default function Home() {
  const router = useRouter();
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthed(true);
      router.replace("/dashboard");
    } else {
      setAuthed(false);
    }
  }, [router]);

  if (authed === null) return null;
  if (authed) return null;
  return <LandingPage />;
}
