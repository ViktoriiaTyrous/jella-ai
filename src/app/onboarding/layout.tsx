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
      <div className="relative min-h-screen bg-[#fafbff]">
        {/* Desktop sidebar — exact Figma position */}
        <div className="hidden lg:block absolute left-[20px] top-[20px] w-[384px] h-[calc(100vh-40px)]">
          <Sidebar currentStep={currentStep} />
        </div>
        {/* Mobile stepper */}
        <div className="lg:hidden px-4 pt-4">
          <MobileStepper currentStep={currentStep} />
        </div>
        {/* Content — exact Figma position */}
        <main className="lg:absolute lg:left-[calc(27.78%+19.56px)] lg:top-[69px] lg:w-[1076px] px-6 py-10 lg:p-0">
          {children}
        </main>
      </div>
    </OnboardingProvider>
  );
}
