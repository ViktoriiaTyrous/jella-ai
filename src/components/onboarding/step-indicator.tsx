"use client";

interface StepIndicatorProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  active: boolean;
}

export function StepIndicator({ icon, title, subtitle, active }: StepIndicatorProps) {
  return (
    <div
      className={`flex gap-[12px] items-center p-[8px] rounded-[90px] w-[325px] transition-all duration-200 ${
        active
          ? "bg-[rgba(255,255,255,0.4)] border border-white"
          : ""
      }`}
    >
      <div
        className={`size-[40px] rounded-[56px] flex items-center justify-center shrink-0 overflow-hidden ${
          active
            ? "bg-white border border-[rgba(255,166,200,0.2)]"
            : "bg-white border border-[rgba(255,255,255,0.2)]"
        }`}
      >
        {icon}
      </div>
      <div className="flex flex-col gap-[2px] flex-1 min-w-0">
        <p className="font-[family-name:var(--font-mona)] font-semibold text-[16px] text-[#141313] leading-[1.3]">
          {title}
        </p>
        <p className="font-[family-name:var(--font-source)] font-normal text-[14px] text-[#636788] leading-[1.3]">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
