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
    <div className="flex items-center justify-between pt-10">
      {!isFirst ? (
        <Button variant="ghost" onClick={() => router.push(`/onboarding/step-${step - 1}`)}>
          Back
        </Button>
      ) : (
        <div />
      )}
      <Button variant="primary" onClick={onContinue} disabled={continueDisabled}>
        {isLast ? "Finish Setup" : "Continue"}
        {!isLast && (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        )}
      </Button>
    </div>
  );
}
