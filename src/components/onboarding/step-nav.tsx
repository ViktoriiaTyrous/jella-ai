"use client";

import { useRouter } from "next/navigation";

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
    <div className="flex items-start justify-between">
      {!isFirst ? (
        <button
          onClick={() => router.push(`/onboarding/step-${step - 1}`)}
          className="flex items-center justify-center h-[48px] px-[24px] py-[12px] rounded-[12px] border-2 border-[#e8ebf5] font-[family-name:var(--font-mona)] font-semibold text-[16px] leading-[24px] text-[#636788] bg-transparent cursor-pointer transition-all duration-200 hover:bg-[#f3f5fc]"
        >
          Back
        </button>
      ) : (
        <div />
      )}
      <button
        onClick={onContinue}
        disabled={continueDisabled}
        className="flex items-center justify-center gap-[4px] px-[16px] py-[12px] rounded-[12px] bg-[#ea4c89] text-white font-[family-name:var(--font-mona)] font-bold text-[16px] leading-[1.5] cursor-pointer transition-all duration-200 hover:brightness-90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
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
