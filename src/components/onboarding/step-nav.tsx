"use client";

import React from "react";

interface StepNavProps {
  step: number;
  totalSteps: number;
  onContinue: () => void;
  onBack?: () => void;
}

export default function StepNav({ step, totalSteps, onContinue, onBack }: StepNavProps) {
  const isLast = step === totalSteps;

  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 32 }}>
      {step > 1 && onBack ? (
        <button
          onClick={onBack}
          style={{
            height: 48,
            padding: "12px 24px",
            borderRadius: 12,
            border: "2px solid #e8ebf5",
            background: "transparent",
            fontFamily: "var(--font-mona), sans-serif",
            fontWeight: 600,
            fontSize: 16,
            color: "#636788",
            cursor: "pointer",
          }}
        >
          Back
        </button>
      ) : (
        <div />
      )}

      <button
        onClick={onContinue}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          padding: "12px 16px",
          borderRadius: 12,
          border: "none",
          background: "#ea4c89",
          fontFamily: "var(--font-mona), sans-serif",
          fontWeight: 700,
          fontSize: 16,
          color: "white",
          cursor: "pointer",
        }}
      >
        {isLast ? "Finish Setup" : "Continue"}
        {!isLast && (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7.5 5l5 5-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>
    </div>
  );
}
