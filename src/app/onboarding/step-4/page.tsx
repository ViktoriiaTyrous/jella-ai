"use client";

import { useState } from "react";
import { useOnboarding } from "@/context/onboarding-context";
import { Button } from "@/components/ui/button";
import { StepNav } from "@/components/onboarding/step-nav";

export default function Step4Page() {
  const { data } = useOnboarding();
  const [done, setDone] = useState(false);

  const handleFinish = () => {
    console.log("Onboarding data:", data);
    setDone(true);
  };

  if (done) {
    return (
      <div className="animate-[fadeIn_0.3s_ease-out]">
        <div className="mt-10 bg-white rounded-xl shadow-[0_1px_2px_oklch(0_0_0/0.05)] p-10 flex flex-col items-center justify-center min-h-[400px] gap-4">
          <div className="size-16 rounded-full bg-green-100 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="oklch(0.55 0.18 155)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="font-[family-name:var(--font-mona)] font-semibold text-2xl text-[var(--color-title)]">
            You&apos;re all set!
          </h2>
          <p className="font-[family-name:var(--font-source)] text-[var(--color-body)]">
            Your brand profile has been created.
          </p>
          <Button variant="primary" disabled title="Coming soon" className="mt-4">
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-[fadeIn_0.3s_ease-out]">
      <h1 className="font-[family-name:var(--font-mona)] font-semibold text-[32px] text-[var(--color-title)] leading-tight">
        Summary
      </h1>
      <p className="font-[family-name:var(--font-source)] text-base text-[var(--color-body)] mt-1">
        Review your brand profile before finishing
      </p>
      <div className="mt-10 bg-white rounded-xl shadow-[0_1px_2px_oklch(0_0_0/0.05)] p-10 flex items-center justify-center min-h-[300px]">
        <p className="font-[family-name:var(--font-source)] text-[var(--color-body)] text-lg">Coming soon</p>
      </div>
      <StepNav step={4} totalSteps={4} onContinue={handleFinish} />
    </div>
  );
}
