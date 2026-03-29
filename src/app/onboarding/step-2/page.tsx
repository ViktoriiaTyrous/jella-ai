"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/context/onboarding-context";
import StepNav from "@/components/onboarding/step-nav";

const goals = [
  "Grow followers",
  "Drive sales",
  "Build brand awareness",
  "Increase engagement",
  "Generate leads",
  "Educate audience",
];

const platforms = [
  { name: "Instagram", icon: "M7.8 2h8.4C19 2 21 4 21 6.8v8.4c0 2.8-2 4.8-4.8 4.8H7.8C5 20 3 18 3 15.2V6.8C3 4 5 2 7.8 2zm-.2 2C5.6 4 4 5.6 4 7.6v8.8C4 18.4 5.6 20 7.6 20h8.8c2 0 3.6-1.6 3.6-3.6V7.6C20 5.6 18.4 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z" },
  { name: "TikTok", icon: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.4a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.3 6.34 6.34 0 009.49 21.6a6.34 6.34 0 006.34-6.34V8.7a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.13z" },
  { name: "Twitter/X", icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
  { name: "Facebook", icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
  { name: "LinkedIn", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  { name: "Pinterest", icon: "M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641 0 12.017 0z" },
  { name: "YouTube", icon: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" },
];

function Chip({
  label,
  selected,
  onClick,
  icon,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  icon?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 20px",
        borderRadius: 999,
        border: `1px solid ${selected ? "#ea4c89" : "#f3f5fc"}`,
        background: selected ? "rgba(234,76,137,0.1)" : "white",
        color: selected ? "#ea4c89" : "#191e41",
        fontFamily: "var(--font-mona), sans-serif",
        fontWeight: 500,
        fontSize: 15,
        cursor: "pointer",
        transition: "all 0.2s",
      }}
    >
      {icon && (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d={icon} />
        </svg>
      )}
      {label}
    </button>
  );
}

export default function Step2Page() {
  const router = useRouter();
  const { data, updateField, setCurrentStep } = useOnboarding();
  const s = data.step2;

  useEffect(() => { setCurrentStep(2); }, [setCurrentStep]);

  const toggleArray = (field: "goals" | "platforms", val: string) => {
    const arr = s[field];
    const next = arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
    updateField("step2", field, next);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-mona), sans-serif", fontWeight: 600, fontSize: 32, color: "#191e41", margin: 0 }}>
            Goals & Platforms
          </h1>
          <p style={{ fontFamily: "var(--font-mona), sans-serif", fontWeight: 400, fontSize: 16, color: "#636788", margin: "8px 0 0 0" }}>
            What do you want to achieve and where?
          </p>
        </div>

        <div style={{ background: "white", borderRadius: 12, boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
          {/* Goals */}
          <div style={{ padding: 24, borderBottom: "1px solid #f3f5fc" }}>
            <div style={{ fontFamily: "var(--font-mona), sans-serif", fontWeight: 600, fontSize: 14, color: "#191e41", marginBottom: 12 }}>
              Goals
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {goals.map((g) => (
                <Chip key={g} label={g} selected={s.goals.includes(g)} onClick={() => toggleArray("goals", g)} />
              ))}
            </div>
          </div>

          {/* Platforms */}
          <div style={{ padding: 24 }}>
            <div style={{ fontFamily: "var(--font-mona), sans-serif", fontWeight: 600, fontSize: 14, color: "#191e41", marginBottom: 12 }}>
              Platforms
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {platforms.map((p) => (
                <Chip
                  key={p.name}
                  label={p.name}
                  icon={p.icon}
                  selected={s.platforms.includes(p.name)}
                  onClick={() => toggleArray("platforms", p.name)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <StepNav
        step={2}
        totalSteps={4}
        onContinue={() => router.push("/onboarding/step-3")}
        onBack={() => router.push("/onboarding/step-1")}
      />
    </div>
  );
}
