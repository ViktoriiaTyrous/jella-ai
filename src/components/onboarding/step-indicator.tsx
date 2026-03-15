"use client";

interface StepIndicatorProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  active: boolean;
}

export function StepIndicator({ icon, title, subtitle, active }: StepIndicatorProps) {
  return (
    <div className={`flex items-center gap-3 p-2 rounded-full transition-colors duration-200 ${active ? "bg-white/40 border border-white" : ""}`}>
      <div className={`size-10 rounded-full flex items-center justify-center shrink-0 ${active ? "bg-white border border-pink-200/20" : "bg-white border border-white/20"}`}>
        {icon}
      </div>
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="font-[family-name:var(--font-mona)] font-semibold text-base text-[#141313] leading-tight">
          {title}
        </span>
        <span className="font-[family-name:var(--font-source)] text-sm text-[var(--color-body)] leading-tight">
          {subtitle}
        </span>
      </div>
    </div>
  );
}
