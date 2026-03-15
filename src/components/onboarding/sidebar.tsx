"use client";

import { StepIndicator } from "./step-indicator";

const STEPS = [
  {
    title: "Brand Basics",
    subtitle: "Tell us about your business",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EA4C89" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="7" width="16" height="13" rx="3" />
        <path d="M8 7V5.5a4 4 0 0 1 8 0V7" />
        <circle cx="12" cy="14" r="1.5" />
      </svg>
    ),
  },
  {
    title: "Goals & Platforms",
    subtitle: "Tell us about your business",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#636788" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" fill="#636788" />
      </svg>
    ),
  },
  {
    title: "Style & Content Preferences",
    subtitle: "Tell us about your business",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#636788" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M8 12h8M12 8v8" />
      </svg>
    ),
  },
  {
    title: "Summary",
    subtitle: "Tell us about your business",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#636788" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M9 7h6M9 11h6M9 15h4" />
      </svg>
    ),
  },
];

interface SidebarProps {
  currentStep: number;
}

export function Sidebar({ currentStep }: SidebarProps) {
  return (
    <div className="h-full rounded-2xl overflow-hidden relative flex flex-col"
      style={{
        background: "linear-gradient(160deg, #f0e6f6 0%, #f5e0ec 40%, #eddef5 100%)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-[30px] pt-[23px]">
        <div className="size-12 shrink-0">
          <svg width="49" height="48" viewBox="0 0 49 48" fill="none">
            <circle cx="24" cy="18" r="10" fill="#EA4C89" />
            <path d="M14 24c0 10 4 16 10 19 6-3 10-9 10-19" stroke="#EA4C89" strokeOpacity="0.4" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        </div>
        <span className="font-[family-name:var(--font-mona)] font-semibold text-[27px] text-[#323031]">Jella AI</span>
      </div>

      {/* Divider */}
      <div className="h-px bg-white mx-px mt-[17px]" />

      {/* Steps */}
      <div className="flex flex-col px-[25px] mt-[42px]">
        {STEPS.map((step, i) => (
          <div key={step.title}>
            <StepIndicator
              icon={step.icon}
              title={step.title}
              subtitle={step.subtitle}
              active={i + 1 === currentStep}
            />
            {i < STEPS.length - 1 && (
              <div className="ml-[21px] h-8 flex items-stretch">
                <div className="w-px bg-gradient-to-b from-gray-300/60 to-gray-300/20" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function MobileStepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center gap-2 justify-center py-3">
      {[1, 2, 3, 4].map((step) => (
        <div
          key={step}
          className={`size-8 rounded-full flex items-center justify-center text-sm font-[family-name:var(--font-mona)] font-semibold transition-colors ${
            step === currentStep
              ? "bg-[var(--color-primary)] text-white"
              : step < currentStep
                ? "bg-[oklch(0.65_0.24_350/0.2)] text-[var(--color-primary)]"
                : "bg-[var(--color-border)] text-[var(--color-body)]"
          }`}
        >
          {step}
        </div>
      ))}
    </div>
  );
}
