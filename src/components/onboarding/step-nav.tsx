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
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
      {!isFirst ? (
        <button
          onClick={() => router.push(`/onboarding/step-${step - 1}`)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "48px",
            padding: "12px 24px",
            borderRadius: "12px",
            border: "2px solid #e8ebf5",
            backgroundColor: "transparent",
            fontFamily: "var(--font-mona), system-ui, sans-serif",
            fontWeight: 600,
            fontSize: "16px",
            lineHeight: "24px",
            color: "#636788",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f3f5fc"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
        >
          Back
        </button>
      ) : (
        <div />
      )}
      <button
        onClick={onContinue}
        disabled={continueDisabled}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "4px",
          padding: "12px 16px",
          borderRadius: "12px",
          backgroundColor: "#ea4c89",
          color: "#fff",
          border: "none",
          fontFamily: "var(--font-mona), system-ui, sans-serif",
          fontWeight: 700,
          fontSize: "16px",
          lineHeight: 1.5,
          cursor: continueDisabled ? "not-allowed" : "pointer",
          opacity: continueDisabled ? 0.5 : 1,
          transition: "filter 0.2s",
        }}
        onMouseEnter={(e) => { if (!continueDisabled) e.currentTarget.style.filter = "brightness(0.9)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.filter = "none"; }}
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
