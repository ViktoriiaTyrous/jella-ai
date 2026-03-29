"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/context/onboarding-context";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import Textarea from "@/components/ui/textarea";
import StepNav from "@/components/onboarding/step-nav";

const nicheOptions = [
  "Beauty", "Fashion", "Food", "Tech", "Fitness", "Travel", "Education", "Other",
].map((v) => ({ label: v, value: v.toLowerCase() }));

const regionOptions = [
  "North America", "Europe", "Asia", "Latin America", "Middle East", "Africa", "Oceania",
].map((v) => ({ label: v, value: v.toLowerCase().replace(/\s+/g, "-") }));

const languageOptions = [
  "English", "Spanish", "French", "German", "Portuguese", "Japanese", "Korean", "Chinese",
].map((v) => ({ label: v, value: v.toLowerCase() }));

export default function Step1Page() {
  const router = useRouter();
  const { data, updateField, setCurrentStep } = useOnboarding();
  const s = data.step1;
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => { setCurrentStep(1); }, [setCurrentStep]);

  const handleContinue = () => {
    const errs: Record<string, string> = {};
    if (!s.brandName.trim()) errs.brandName = "Brand name is required";
    if (!s.description.trim()) errs.description = "Description is required";
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    router.push("/onboarding/step-2");
  };

  const u = (field: keyof typeof s) => (val: string) => {
    updateField("step1", field, val);
    if (errors[field]) setErrors((p) => { const n = { ...p }; delete n[field]; return n; });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      {/* Header */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div>
          <h1
            style={{
              fontFamily: "var(--font-mona), sans-serif",
              fontWeight: 600,
              fontSize: 32,
              color: "#191e41",
              margin: 0,
            }}
          >
            Brand Basics
          </h1>
          <p
            style={{
              fontFamily: "var(--font-mona), sans-serif",
              fontWeight: 400,
              fontSize: 16,
              color: "#636788",
              margin: "8px 0 0 0",
            }}
          >
            Tell us about your business so we can personalize your experience
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            background: "white",
            borderRadius: 12,
            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            paddingBottom: 24,
          }}
        >
          {/* Section 1: URL + Auto-Fill */}
          <div style={{ padding: 24, borderBottom: "1px solid #f3f5fc" }}>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
              <div style={{ flex: 1 }}>
                <Input
                  label="Website URL"
                  optional
                  value={s.websiteUrl}
                  onChange={u("websiteUrl")}
                  placeholder="https://yourbrand.com"
                />
              </div>
              <button
                disabled
                style={{
                  height: 46,
                  padding: "12px 16px",
                  borderRadius: 8,
                  border: "none",
                  background: "#3a3546",
                  color: "white",
                  fontFamily: "var(--font-mona), sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: "not-allowed",
                  opacity: 0.5,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  whiteSpace: "nowrap",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2l1.5 3.5L13 7l-3.5 1.5L8 12l-1.5-3.5L3 7l3.5-1.5L8 2z" fill="white" opacity="0.8"/>
                </svg>
                Auto-Fill
              </button>
            </div>
          </div>

          {/* Section 2: Brand Name + Niche */}
          <div style={{ padding: 24, borderBottom: "1px solid #f3f5fc" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Input
                label="Brand Name"
                value={s.brandName}
                onChange={u("brandName")}
                placeholder="Your brand name"
                error={errors.brandName}
              />
              <Select
                label="Niche"
                value={s.niche}
                onChange={u("niche")}
                options={nicheOptions}
                placeholder="Select niche"
              />
            </div>
          </div>

          {/* Section 3: Region + Language */}
          <div style={{ padding: 24, borderBottom: "1px solid #f3f5fc" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Select
                label="Region"
                value={s.region}
                onChange={u("region")}
                options={regionOptions}
                placeholder="Select region"
              />
              <Select
                label="Language"
                value={s.language}
                onChange={u("language")}
                options={languageOptions}
                placeholder="Select language"
              />
            </div>
          </div>

          {/* Section 4: Description */}
          <div style={{ padding: "12px 24px 0 24px" }}>
            <Textarea
              label="Brand Description"
              value={s.description}
              onChange={u("description")}
              placeholder="Describe your brand, products, and target audience..."
              error={errors.description}
            />
          </div>
        </div>
      </div>

      <StepNav step={1} totalSteps={4} onContinue={handleContinue} />
    </div>
  );
}
