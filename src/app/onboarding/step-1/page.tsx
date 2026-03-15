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

  return (
    <div className="animate-[fadeIn_0.3s_ease-out] flex flex-col gap-[40px]">
      {/* Header + Form Card — gap 24px */}
      <div className="flex flex-col gap-[24px]">
        {/* Header */}
        <div className="flex flex-col">
          <h1 className="font-[family-name:var(--font-mona)] font-semibold text-[32px] text-[#191e41] leading-[1.3]">
            Brand Basics
          </h1>
          <p className="font-[family-name:var(--font-mona)] text-[16px] text-[#636788] leading-[1.3] h-[28px] flex items-center">
            Add your website or Instagram link — this helps AI understand your brand&apos;s audience, tone, and product style.
          </p>
        </div>

        {/* Form Card — exact Figma: bg-white rounded-[12px] shadow pb-[24px] */}
        <div className="bg-white rounded-[12px] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
          {/* URL + Auto-Fill — p-[24px] border-b */}
          <div className="border-b border-[#f3f5fc] p-[24px]">
            <div className="flex gap-[16px] items-end">
              <div className="flex-1">
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
                className="flex items-center justify-center gap-[6px] h-[48px] px-[16px] py-[8px] rounded-[12px] bg-[#3a3546] text-white shrink-0 opacity-50 cursor-not-allowed"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l1.5 5.5H19l-4.5 3.5 1.5 5.5L12 14l-4 3.5 1.5-5.5L5 8.5h5.5z" />
                </svg>
                <span className="font-[family-name:var(--font-mona)] font-bold text-[14px] leading-[1.5]">Auto-Fill</span>
              </button>
            </div>
          </div>

          {/* Brand Name + Niche — p-[24px] border-b gap-[16px] */}
          <div className="border-b border-[#f3f5fc] p-[24px]">
            <div className="flex gap-[16px]">
              <div className="flex-1">
                <Input
                  label="Brand Name"
                  placeholder="Enter your business name"
                  value={data.brandName}
                  onChange={(e) => { updateField("brandName", e.target.value); setErrors((prev) => ({ ...prev, brandName: "" })); }}
                  error={errors.brandName}
                />
              </div>
              <div className="flex-1">
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

          {/* Region + Language — p-[24px] border-b gap-[16px] */}
          <div className="border-b border-[#f3f5fc] p-[24px]">
            <div className="flex gap-[16px]">
              <div className="flex-1">
                <Select
                  label="Region"
                  options={REGIONS}
                  value={data.region}
                  onChange={(v) => updateField("region", v)}
                  placeholder="Enter your business name"
                />
              </div>
              <div className="flex-1">
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

          {/* Description — pt-[12px] px-[24px] pb-[24px] */}
          <div className="pt-[12px] px-[24px] pb-[24px]">
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
      </div>

      {/* Navigation — gap-[40px] from card */}
      <StepNav step={1} totalSteps={4} onContinue={handleContinue} />
    </div>
  );
}
