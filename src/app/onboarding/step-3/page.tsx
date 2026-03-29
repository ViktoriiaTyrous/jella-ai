"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/context/onboarding-context";
import StepNav from "@/components/onboarding/step-nav";

const tones = ["Professional", "Casual", "Playful", "Bold", "Minimal", "Luxurious"];
const contentTypes = ["Product showcases", "Behind the scenes", "Tips & tutorials", "User testimonials", "Promotions", "Storytelling"];
const frequencies = ["Daily", "3-5x/week", "1-2x/week", "Bi-weekly"];
const presetColors = ["#ea4c89", "#6366f1", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6"];

function Chip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
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
      {label}
    </button>
  );
}

export default function Step3Page() {
  const router = useRouter();
  const { data, updateField, setCurrentStep } = useOnboarding();
  const s = data.step3;
  const [customColor, setCustomColor] = useState("");

  useEffect(() => { setCurrentStep(3); }, [setCurrentStep]);

  const toggleArray = (field: "contentTypes" | "brandColors", val: string) => {
    const arr = s[field];
    const next = arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
    updateField("step3", field, next);
  };

  const addCustomColor = () => {
    if (customColor && /^#[0-9a-fA-F]{6}$/.test(customColor) && !s.brandColors.includes(customColor)) {
      updateField("step3", "brandColors", [...s.brandColors, customColor]);
      setCustomColor("");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-mona), sans-serif", fontWeight: 600, fontSize: 32, color: "#191e41", margin: 0 }}>
            Style & Content Preferences
          </h1>
          <p style={{ fontFamily: "var(--font-mona), sans-serif", fontWeight: 400, fontSize: 16, color: "#636788", margin: "8px 0 0 0" }}>
            Define your brand&apos;s voice and content strategy
          </p>
        </div>

        <div style={{ background: "white", borderRadius: 12, boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
          {/* Tone of Voice */}
          <div style={{ padding: 24, borderBottom: "1px solid #f3f5fc" }}>
            <div style={{ fontFamily: "var(--font-mona), sans-serif", fontWeight: 600, fontSize: 14, color: "#191e41", marginBottom: 12 }}>
              Tone of Voice
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {tones.map((t) => (
                <Chip key={t} label={t} selected={s.toneOfVoice === t} onClick={() => updateField("step3", "toneOfVoice", t)} />
              ))}
            </div>
          </div>

          {/* Content Types */}
          <div style={{ padding: 24, borderBottom: "1px solid #f3f5fc" }}>
            <div style={{ fontFamily: "var(--font-mona), sans-serif", fontWeight: 600, fontSize: 14, color: "#191e41", marginBottom: 12 }}>
              Content Types
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {contentTypes.map((c) => (
                <Chip key={c} label={c} selected={s.contentTypes.includes(c)} onClick={() => toggleArray("contentTypes", c)} />
              ))}
            </div>
          </div>

          {/* Post Frequency */}
          <div style={{ padding: 24, borderBottom: "1px solid #f3f5fc" }}>
            <div style={{ fontFamily: "var(--font-mona), sans-serif", fontWeight: 600, fontSize: 14, color: "#191e41", marginBottom: 12 }}>
              Post Frequency
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {frequencies.map((f) => (
                <Chip key={f} label={f} selected={s.postFrequency === f} onClick={() => updateField("step3", "postFrequency", f)} />
              ))}
            </div>
          </div>

          {/* Brand Colors */}
          <div style={{ padding: 24 }}>
            <div style={{ fontFamily: "var(--font-mona), sans-serif", fontWeight: 600, fontSize: 14, color: "#191e41", marginBottom: 12 }}>
              Brand Colors
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
              {presetColors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => toggleArray("brandColors", c)}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: c,
                    border: s.brandColors.includes(c) ? "3px solid #191e41" : "3px solid transparent",
                    cursor: "pointer",
                    outline: s.brandColors.includes(c) ? "2px solid white" : "none",
                    outlineOffset: -5,
                    transition: "all 0.2s",
                  }}
                />
              ))}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  type="text"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  placeholder="#000000"
                  style={{
                    width: 100,
                    padding: "8px 12px",
                    borderRadius: 8,
                    border: "1px solid #f3f5fc",
                    fontFamily: "var(--font-mona), sans-serif",
                    fontSize: 14,
                    color: "#191e41",
                    background: "#fafbff",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
                <button
                  type="button"
                  onClick={addCustomColor}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 8,
                    border: "1px solid #f3f5fc",
                    background: "white",
                    fontFamily: "var(--font-mona), sans-serif",
                    fontSize: 14,
                    color: "#636788",
                    cursor: "pointer",
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <StepNav
        step={3}
        totalSteps={4}
        onContinue={() => router.push("/onboarding/step-4")}
        onBack={() => router.push("/onboarding/step-2")}
      />
    </div>
  );
}
