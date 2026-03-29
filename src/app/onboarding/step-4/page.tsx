"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/context/onboarding-context";
import StepNav from "@/components/onboarding/step-nav";

function SummarySection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div style={{ borderBottom: "1px solid #f3f5fc" }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          padding: "20px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          fontFamily: "var(--font-mona), sans-serif",
          fontWeight: 600,
          fontSize: 16,
          color: "#191e41",
        }}
      >
        {title}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
        >
          <path d="M4 6l4 4 4-4" stroke="#636788" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && <div style={{ padding: "0 24px 20px 24px" }}>{children}</div>}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontFamily: "var(--font-source), sans-serif", fontSize: 13, color: "#636788", marginBottom: 2 }}>
        {label}
      </div>
      <div style={{ fontFamily: "var(--font-mona), sans-serif", fontSize: 15, color: "#191e41" }}>
        {value || "—"}
      </div>
    </div>
  );
}

function Tags({ items }: { items: string[] }) {
  if (!items.length) return <span style={{ fontFamily: "var(--font-source), sans-serif", fontSize: 14, color: "#636788" }}>—</span>;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {items.map((item) => (
        <span
          key={item}
          style={{
            padding: "6px 14px",
            borderRadius: 999,
            background: "rgba(234,76,137,0.08)",
            color: "#ea4c89",
            fontFamily: "var(--font-mona), sans-serif",
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export default function Step4Page() {
  const router = useRouter();
  const { data, setCurrentStep } = useOnboarding();
  const { step1, step2, step3 } = data;

  useEffect(() => { setCurrentStep(4); }, [setCurrentStep]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-mona), sans-serif", fontWeight: 600, fontSize: 32, color: "#191e41", margin: 0 }}>
            Summary
          </h1>
          <p style={{ fontFamily: "var(--font-mona), sans-serif", fontWeight: 400, fontSize: 16, color: "#636788", margin: "8px 0 0 0" }}>
            Review your setup before finishing
          </p>
        </div>

        <div style={{ background: "white", borderRadius: 12, boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
          <SummarySection title="Brand Basics">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Field label="Brand Name" value={step1.brandName} />
              <Field label="Niche" value={step1.niche} />
              <Field label="Region" value={step1.region} />
              <Field label="Language" value={step1.language} />
              <Field label="Website" value={step1.websiteUrl} />
            </div>
            <Field label="Description" value={step1.description} />
          </SummarySection>

          <SummarySection title="Goals & Platforms">
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontFamily: "var(--font-source), sans-serif", fontSize: 13, color: "#636788", marginBottom: 8 }}>Goals</div>
              <Tags items={step2.goals} />
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-source), sans-serif", fontSize: 13, color: "#636788", marginBottom: 8 }}>Platforms</div>
              <Tags items={step2.platforms} />
            </div>
          </SummarySection>

          <SummarySection title="Style & Content">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <Field label="Tone of Voice" value={step3.toneOfVoice} />
              <Field label="Post Frequency" value={step3.postFrequency} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontFamily: "var(--font-source), sans-serif", fontSize: 13, color: "#636788", marginBottom: 8 }}>Content Types</div>
              <Tags items={step3.contentTypes} />
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-source), sans-serif", fontSize: 13, color: "#636788", marginBottom: 8 }}>Brand Colors</div>
              {step3.brandColors.length > 0 ? (
                <div style={{ display: "flex", gap: 8 }}>
                  {step3.brandColors.map((c) => (
                    <div key={c} style={{ width: 32, height: 32, borderRadius: "50%", background: c, border: "2px solid white", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }} />
                  ))}
                </div>
              ) : (
                <span style={{ fontFamily: "var(--font-source), sans-serif", fontSize: 14, color: "#636788" }}>—</span>
              )}
            </div>
          </SummarySection>
        </div>
      </div>

      <StepNav
        step={4}
        totalSteps={4}
        onContinue={() => router.push("/dashboard")}
        onBack={() => router.push("/onboarding/step-3")}
      />
    </div>
  );
}
