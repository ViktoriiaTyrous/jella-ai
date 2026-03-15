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
      <div className="flex min-h-screen bg-[var(--bg-page)]">
        {/* Desktop sidebar */}
        <div className="hidden lg:block w-96 shrink-0 p-5">
          <Sidebar currentStep={currentStep} />
        </div>
        {/* Mobile stepper */}
        <div className="lg:hidden px-4 pt-4">
          <MobileStepper currentStep={currentStep} />
        </div>
        {/* Content */}
        <main className="flex-1 px-6 py-16 lg:py-[69px]">
          <div className="max-w-[1076px]">
            {children}
          </div>
        </main>
      </div>
    </OnboardingProvider>
  );
}
