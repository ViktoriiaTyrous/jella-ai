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
    <div className="w-[384px] h-full rounded-[16px] overflow-hidden relative">
      {/* Background image from Figma */}
      <img
        src="/sidebar-bg.svg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Logo — left:30px top:23px */}
        <div className="flex items-center gap-[12px] px-[30px] pt-[23px]">
          <div className="w-[49px] h-[48px] shrink-0">
            <svg width="49" height="48" viewBox="0 0 49 48" fill="none">
              <circle cx="24" cy="18" r="10" fill="#EA4C89" />
              <path d="M14 24c0 10 4 16 10 19 6-3 10-9 10-19" stroke="#EA4C89" strokeOpacity="0.4" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
          </div>
          <span className="font-[family-name:var(--font-mona)] font-semibold text-[27.3px] text-[#323031] leading-[1.3]">Jella AI</span>
        </div>

        {/* Divider — top:87px */}
        <div className="h-px bg-white mx-px mt-[17px]" />

        {/* Steps — top:129px, left:25px, w:325px */}
        <div className="flex flex-col px-[25px] mt-[42px] w-[375px]">
          {STEPS.map((step, i) => (
            <div key={step.title}>
              <StepIndicator
                icon={step.icon}
                title={step.title}
                subtitle={step.subtitle}
                active={i + 1 === currentStep}
              />
              {i < STEPS.length - 1 && (
                <div className="w-[59px] h-[32px] flex items-center justify-center">
                  <svg width="59" height="33" viewBox="0 0 59 33" fill="none">
                    <line x1="29.5" y1="0" x2="29.5" y2="33" stroke="#c8c8d0" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="4 3" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
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
              ? "bg-[#ea4c89] text-white"
              : step < currentStep
                ? "bg-[rgba(234,76,137,0.2)] text-[#ea4c89]"
                : "bg-[#f3f5fc] text-[#636788]"
          }`}
        >
          {step}
        </div>
      ))}
    </div>
  );
}
