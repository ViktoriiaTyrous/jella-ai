"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface StepNavProps {
  step: number;
  totalSteps: number;
  onContinue: () => void;
  continueDisabled?: boolean;
}

export function StepNav({ step, totalSteps, onContinue, continueDisabled }: StepNavProps) {
  const router = useRouter();
  const isFirst = step === 1;
  const isLast = step === totalSteps;

  return (
    <div className="flex items-center justify-between">
      {!isFirst ? (
        <button
          onClick={() => router.push(`/onboarding/step-${step - 1}`)}
          className="inline-flex items-center justify-center h-12 px-6 rounded-xl border-2 border-[#e8ebf5] font-[family-name:var(--font-mona)] font-semibold text-base text-[#636788] bg-transparent cursor-pointer transition-all duration-200 hover:bg-[#f3f5fc]"
        >
          Back
        </button>
      ) : (
        <div />
      )}
      <button
        onClick={onContinue}
        disabled={continueDisabled}
        className="inline-flex items-center justify-center gap-1 h-12 px-4 rounded-xl bg-[#ea4c89] text-white font-[family-name:var(--font-mona)] font-bold text-base cursor-pointer transition-all duration-200 hover:brightness-90 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLast ? "Finish Setup" : "Continue"}
        {!isLast && (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        )}
      </button>
    </div>
  );
}
