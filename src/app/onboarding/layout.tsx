"use client";

import React from "react";
import { OnboardingProvider } from "@/context/onboarding-context";
import Sidebar, { MobileStepper } from "@/components/onboarding/sidebar";

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <OnboardingProvider>
      {/* Desktop */}
      <div
        className="hidden lg:block"
        style={{ position: "relative", minHeight: "100vh", background: "#fafbff" }}
      >
        <div
          style={{
            position: "absolute",
            left: 20,
            top: 20,
            bottom: 20,
          }}
        >
          <Sidebar />
        </div>
        <div
          style={{
            position: "absolute",
            left: "calc(27.78% + 19.56px)",
            top: 69,
            right: 40,
            maxWidth: 1076,
            paddingBottom: 40,
          }}
        >
          {children}
        </div>
      </div>

      {/* Mobile */}
      <div
        className="lg:hidden"
        style={{ minHeight: "100vh", background: "#fafbff" }}
      >
        <MobileStepper />
        <div style={{ padding: "0 16px 32px 16px" }}>
          {children}
        </div>
      </div>
    </OnboardingProvider>
  );
}
