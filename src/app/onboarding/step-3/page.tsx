"use client";

import { useRouter } from "next/navigation";
import { StepNav } from "@/components/onboarding/step-nav";

export default function Step3Page() {
  const router = useRouter();

  return (
    <div className="animate-[fadeIn_0.3s_ease-out]">
      <h1 className="font-[family-name:var(--font-mona)] font-semibold text-[32px] text-[var(--color-title)] leading-tight">
        Style & Content Preferences
      </h1>
      <p className="font-[family-name:var(--font-source)] text-base text-[var(--color-body)] mt-1">
        Set your brand voice and visual preferences
      </p>
      <div className="mt-10 bg-white rounded-xl shadow-[0_1px_2px_oklch(0_0_0/0.05)] p-10 flex items-center justify-center min-h-[300px]">
        <p className="font-[family-name:var(--font-source)] text-[var(--color-body)] text-lg">Coming soon</p>
      </div>
      <StepNav step={3} totalSteps={4} onContinue={() => router.push("/onboarding/step-4")} />
    </div>
  );
}
