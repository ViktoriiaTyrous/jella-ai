"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/context/onboarding-context";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { StepNav } from "@/components/onboarding/step-nav";

const NICHES = ["Beauty", "Fashion", "Food", "Tech", "Fitness", "Travel", "Education", "Other"];
const REGIONS = ["North America", "Europe", "Asia", "Latin America", "Middle East", "Africa", "Oceania"];
const LANGUAGES = ["English", "Spanish", "French", "German", "Portuguese", "Japanese", "Korean", "Chinese"];

export default function Step1Page() {
  const router = useRouter();
  const { data, updateField } = useOnboarding();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleContinue = () => {
    const newErrors: Record<string, string> = {};
    if (!data.brandName.trim()) newErrors.brandName = "Please enter your brand name";
    if (!data.description.trim()) newErrors.description = "Please add a short description of your brand";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    router.push("/onboarding/step-2");
  };

  const sectionStyle: React.CSSProperties = {
    borderBottom: "1px solid #f3f5fc",
    padding: "24px",
    width: "100%",
  };

  const twoColStyle: React.CSSProperties = {
    display: "flex",
    gap: "16px",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      {/* Header + Card — gap 24px */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Header */}
        <div>
          <h1
            style={{
              fontFamily: "var(--font-mona), system-ui, sans-serif",
              fontWeight: 600,
              fontSize: "32px",
              color: "#191e41",
              lineHeight: 1.3,
              margin: 0,
            }}
          >
            Brand Basics
          </h1>
          <p
            style={{
              fontFamily: "var(--font-mona), system-ui, sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              color: "#636788",
              lineHeight: 1.3,
              height: "28px",
              display: "flex",
              alignItems: "center",
              margin: 0,
            }}
          >
            Add your website or Instagram link — this helps AI understand your brand&apos;s audience, tone, and product style.
          </p>
        </div>

        {/* Form Card */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            paddingBottom: "24px",
            width: "100%",
          }}
        >
          {/* URL + Auto-Fill */}
          <div style={sectionStyle}>
            <div style={{ display: "flex", gap: "16px", alignItems: "flex-end" }}>
              <div style={{ flex: 1 }}>
                <Input
                  label="Paste your Instagram or Website link"
                  optional
                  placeholder="e.g. https://www.instagram.com/bloomstudio/"
                  value={data.websiteUrl}
                  onChange={(e) => updateField("websiteUrl", e.target.value)}
                />
              </div>
              <button
                disabled
                title="Coming soon"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  height: "48px",
                  padding: "8px 16px",
                  borderRadius: "12px",
                  backgroundColor: "#3a3546",
                  color: "#fff",
                  border: "none",
                  cursor: "not-allowed",
                  opacity: 0.5,
                  flexShrink: 0,
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l1.5 5.5H19l-4.5 3.5 1.5 5.5L12 14l-4 3.5 1.5-5.5L5 8.5h5.5z" />
                </svg>
                <span style={{ fontFamily: "var(--font-mona), system-ui, sans-serif", fontWeight: 700, fontSize: "14px", lineHeight: 1.5 }}>
                  Auto-Fill
                </span>
              </button>
            </div>
          </div>

          {/* Brand Name + Niche */}
          <div style={sectionStyle}>
            <div style={twoColStyle}>
              <div style={{ flex: 1 }}>
                <Input
                  label="Brand Name"
                  placeholder="Enter your business name"
                  value={data.brandName}
                  onChange={(e) => { updateField("brandName", e.target.value); setErrors((prev) => ({ ...prev, brandName: "" })); }}
                  error={errors.brandName}
                />
              </div>
              <div style={{ flex: 1 }}>
                <Select
                  label="Niche"
                  options={NICHES}
                  value={data.niche}
                  onChange={(v) => updateField("niche", v)}
                  placeholder="e.g. Beauty"
                />
              </div>
            </div>
          </div>

          {/* Region + Language */}
          <div style={sectionStyle}>
            <div style={twoColStyle}>
              <div style={{ flex: 1 }}>
                <Select
                  label="Region"
                  options={REGIONS}
                  value={data.region}
                  onChange={(v) => updateField("region", v)}
                  placeholder="Enter your business name"
                />
              </div>
              <div style={{ flex: 1 }}>
                <Select
                  label="Language"
                  options={LANGUAGES}
                  value={data.language}
                  onChange={(v) => updateField("language", v)}
                  placeholder="e.g. Beauty"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div style={{ padding: "12px 24px 0 24px" }}>
            <Textarea
              label="Description"
              placeholder="Describe your brand in a few sentences..."
              value={data.description}
              onChange={(e) => { updateField("description", e.target.value); setErrors((prev) => ({ ...prev, description: "" })); }}
              error={errors.description}
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <StepNav step={1} totalSteps={4} onContinue={handleContinue} />
    </div>
  );
}
