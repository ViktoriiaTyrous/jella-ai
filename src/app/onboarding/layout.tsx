"use client";

import { usePathname } from "next/navigation";
import { OnboardingProvider } from "@/context/onboarding-context";
import { Sidebar, MobileStepper } from "@/components/onboarding/sidebar";

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const stepMatch = pathname.match(/step-(\d+)/);
  const currentStep = stepMatch ? parseInt(stepMatch[1]) : 1;

  return (
    <OnboardingProvider>
      {/* Desktop */}
      <div className="hidden lg:block min-h-screen bg-[#fafbff] relative">
        {/* Sidebar — Figma: left:20, top:20, w:384 */}
        <div className="absolute left-[20px] top-[20px] bottom-[20px]">
          <Sidebar currentStep={currentStep} />
        </div>
        {/* Content — Figma: left:calc(27.78%+19.56px), top:69px, w:1076px */}
        <div className="absolute left-[calc(27.78%+19.56px)] top-[69px] right-[40px] max-w-[1076px]">
          {children}
        </div>
      </div>
      {/* Mobile */}
      <div className="lg:hidden min-h-screen bg-[#fafbff]">
        <MobileStepper currentStep={currentStep} />
        <div className="px-4 pb-8">
          {children}
        </div>
      </div>
    </OnboardingProvider>
  );
}
