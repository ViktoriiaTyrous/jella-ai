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
      <div className="flex min-h-screen bg-[#fafbff]">
        {/* Desktop sidebar — fixed 384px + 20px padding */}
        <div className="hidden lg:block shrink-0 p-5">
          <div className="w-[384px] h-[calc(100vh-40px)]">
            <Sidebar currentStep={currentStep} />
          </div>
        </div>
        {/* Mobile stepper */}
        <div className="lg:hidden px-4 pt-4">
          <MobileStepper currentStep={currentStep} />
        </div>
        {/* Content — starts at ~27.78% from left edge on desktop */}
        <main className="flex-1 flex flex-col px-6 lg:px-10 py-10 lg:py-[69px]">
          <div className="w-full max-w-[1076px]">
            {children}
          </div>
        </main>
      </div>
    </OnboardingProvider>
  );
}
