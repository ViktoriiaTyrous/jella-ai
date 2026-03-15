"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[var(--bg-page)] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-[0_2px_4px_oklch(0_0_0/0.05),0_8px_32px_oklch(0_0_0/0.08)] p-10">
        <div className="flex flex-col items-center gap-3 mb-8">
          <svg width="48" height="48" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="12" r="7" fill="#EA4C89" fillOpacity="0.15" />
            <ellipse cx="16" cy="12" rx="5" ry="4" fill="#EA4C89" />
            <path d="M9 16c0 7 3 11 7 13 4-2 7-6 7-13" stroke="#EA4C89" strokeOpacity="0.4" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <circle cx="14" cy="11" r="1" fill="#fff" />
            <circle cx="18" cy="11" r="1" fill="#fff" />
          </svg>
          <span className="font-[family-name:var(--font-mona)] font-bold text-2xl text-[var(--color-title)]">Jella AI</span>
          <h1 className="font-[family-name:var(--font-mona)] font-semibold text-xl text-[var(--color-title)]">
            Sign In to your account
          </h1>
        </div>

        <div className="flex flex-col gap-4">
          <Button
            variant="primary"
            className="w-full"
            onClick={() => router.push("/onboarding/step-1")}
          >
            Continue to Onboarding →
          </Button>
          <p className="text-center font-[family-name:var(--font-source)] text-sm text-[var(--color-body)]">
            Full sign-in form coming soon
          </p>
        </div>
      </div>
    </div>
  );
}
