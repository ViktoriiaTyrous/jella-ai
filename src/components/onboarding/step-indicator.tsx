"use client";

interface StepIndicatorProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  active: boolean;
}

export function StepIndicator({ icon, title, subtitle, active }: StepIndicatorProps) {
  return (
    <div className={`flex items-center gap-3 p-2 rounded-[90px] w-[325px] transition-colors duration-200 ${active ? "bg-white/40 border border-white" : ""}`}>
      <div className={`size-10 rounded-full flex items-center justify-center shrink-0 ${active ? "bg-white border border-[rgba(255,166,200,0.2)]" : "bg-white border border-white/20"}`}>
        {icon}
      </div>
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <span className="font-[family-name:var(--font-mona)] font-semibold text-base text-[#141313] leading-[1.3]">
          {title}
        </span>
        <span className="font-[family-name:var(--font-source)] text-sm text-[#636788] leading-[1.3]">
          {subtitle}
        </span>
      </div>
    </div>
  );
}
