"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/context/onboarding-context";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
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

  return (
    <div className="animate-[fadeIn_0.3s_ease-out] flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="font-[family-name:var(--font-mona)] font-semibold text-[32px] text-[#191e41] leading-[1.3]">
          Brand Basics
        </h1>
        <p className="font-[family-name:var(--font-mona)] text-base text-[#636788] leading-[1.3] mt-0 h-7 flex items-center">
          Add your website or Instagram link — this helps AI understand your brand&apos;s audience, tone, and product style.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.05)] pb-6">
        {/* URL + Auto-Fill */}
        <div className="border-b border-[#f3f5fc] p-6">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <Input
                label="Paste your Instagram or Website link"
                optional
                placeholder="e.g. https://www.instagram.com/bloomstudio/"
                value={data.websiteUrl}
                onChange={(e) => updateField("websiteUrl", e.target.value)}
              />
            </div>
            <Button
              variant="dark"
              disabled
              title="Coming soon"
              className="h-12 shrink-0 gap-[6px] rounded-xl"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l1.5 5.5H19l-4.5 3.5 1.5 5.5L12 14l-4 3.5 1.5-5.5L5 8.5h5.5z" />
              </svg>
              <span className="font-[family-name:var(--font-mona)] font-bold text-sm">Auto-Fill</span>
            </Button>
          </div>
        </div>

        {/* Brand Name + Niche */}
        <div className="border-b border-[#f3f5fc] p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Brand Name"
              placeholder="Enter your business name"
              value={data.brandName}
              onChange={(e) => { updateField("brandName", e.target.value); setErrors((prev) => ({ ...prev, brandName: "" })); }}
              error={errors.brandName}
            />
            <Select
              label="Niche"
              options={NICHES}
              value={data.niche}
              onChange={(v) => updateField("niche", v)}
              placeholder="e.g. Beauty"
            />
          </div>
        </div>

        {/* Region + Language */}
        <div className="border-b border-[#f3f5fc] p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Region"
              options={REGIONS}
              value={data.region}
              onChange={(v) => updateField("region", v)}
              placeholder="Enter your business name"
            />
            <Select
              label="Language"
              options={LANGUAGES}
              value={data.language}
              onChange={(v) => updateField("language", v)}
              placeholder="e.g. Beauty"
            />
          </div>
        </div>

        {/* Description */}
        <div className="px-6 pt-3 pb-6">
          <Textarea
            label="Description"
            placeholder="Describe your brand in a few sentences..."
            className="h-[140px]"
            value={data.description}
            onChange={(e) => { updateField("description", e.target.value); setErrors((prev) => ({ ...prev, description: "" })); }}
            error={errors.description}
          />
        </div>
      </div>

      {/* Navigation */}
      <StepNav step={1} totalSteps={4} onContinue={handleContinue} />
    </div>
  );
}
