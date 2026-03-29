"use client";

import React from "react";
import { useOnboarding } from "@/context/onboarding-context";
import Logo from "@/components/ui/logo";

const steps = [
  {
    title: "Brand Basics",
    subtitle: "Tell us about your business",
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 8.333V5.833a2.5 2.5 0 0 0-2.5-2.5h-5A2.5 2.5 0 0 0 5 5.833v2.5" stroke={active ? "#ea4c89" : "#636788"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="3.333" y="8.333" width="13.333" height="8.333" rx="1.667" stroke={active ? "#ea4c89" : "#636788"} strokeWidth="1.5"/>
        <path d="M10 11.667v2.5" stroke={active ? "#ea4c89" : "#636788"} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Goals & Platforms",
    subtitle: "Tell us about your business",
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="7.5" stroke={active ? "#ea4c89" : "#636788"} strokeWidth="1.5"/>
        <circle cx="10" cy="10" r="4.167" stroke={active ? "#ea4c89" : "#636788"} strokeWidth="1.5"/>
        <circle cx="10" cy="10" r="1.25" fill={active ? "#ea4c89" : "#636788"}/>
      </svg>
    ),
  },
  {
    title: "Style & Content",
    subtitle: "Tell us about your business",
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 3.333v3.334M10 13.333v3.334M3.333 10h3.334M13.333 10h3.334" stroke={active ? "#ea4c89" : "#636788"} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M5.286 5.286l2.357 2.357M12.357 12.357l2.357 2.357M14.714 5.286l-2.357 2.357M7.643 12.357l-2.357 2.357" stroke={active ? "#ea4c89" : "#636788"} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Summary",
    subtitle: "Tell us about your business",
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3.333" y="2.5" width="13.333" height="15" rx="2" stroke={active ? "#ea4c89" : "#636788"} strokeWidth="1.5"/>
        <path d="M7.5 7.5h5M7.5 10.833h5M7.5 14.167h3.333" stroke={active ? "#ea4c89" : "#636788"} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

function DashedConnector() {
  return (
    <svg width="59" height="32" viewBox="0 0 59 32" fill="none" style={{ marginLeft: 20 }}>
      <line x1="1" y1="0" x2="1" y2="32" stroke="white" strokeWidth="1" strokeDasharray="4 3" />
    </svg>
  );
}


export default function Sidebar() {
  const { currentStep } = useOnboarding();

  return (
    <div
      style={{
        width: 384,
        height: "100%",
        borderRadius: 16,
        overflow: "hidden",
        position: "relative",
        background: "linear-gradient(180deg, #e8edf8 0%, #f5e8f0 100%)",
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div style={{ padding: "23px 30px 0 30px", display: "flex", alignItems: "center", gap: 12 }}>
        <Logo size="lg" variant="dark" />
        <span
          style={{
            fontFamily: "var(--font-mona), sans-serif",
            fontWeight: 600,
            fontSize: 27.3,
            color: "#323031",
          }}
        >
          Jella AI
        </span>
      </div>

      {/* Divider */}
      <div style={{ margin: "17px 30px 0 30px", height: 1, background: "white" }} />

      {/* Steps */}
      <div style={{ padding: "42px 25px 0 25px", width: 325, display: "flex", flexDirection: "column" }}>
        {steps.map((step, i) => {
          const isActive = currentStep === i + 1;
          return (
            <React.Fragment key={i}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: 8,
                  borderRadius: 90,
                  background: isActive ? "rgba(255,255,255,0.4)" : "transparent",
                  border: isActive ? "1px solid white" : "1px solid transparent",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "white",
                    border: "1px solid rgba(255,166,200,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {step.icon(isActive)}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-mona), sans-serif",
                      fontWeight: 600,
                      fontSize: 16,
                      color: "#141313",
                      lineHeight: 1.3,
                    }}
                  >
                    {step.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-source), sans-serif",
                      fontWeight: 400,
                      fontSize: 14,
                      color: "#636788",
                      lineHeight: 1.3,
                    }}
                  >
                    {step.subtitle}
                  </div>
                </div>
              </div>
              {i < steps.length - 1 && <DashedConnector />}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export function MobileStepper() {
  const { currentStep } = useOnboarding();

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 8, padding: "16px 0" }}>
      {[1, 2, 3, 4].map((s) => (
        <div
          key={s}
          style={{
            width: s === currentStep ? 32 : 8,
            height: 8,
            borderRadius: 4,
            background: s === currentStep ? "#ea4c89" : "#e8ebf5",
            transition: "all 0.3s ease",
          }}
        />
      ))}
    </div>
  );
}
