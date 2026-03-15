"use client";

import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  optional?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, optional, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-[8px]">
        <label className="font-[family-name:var(--font-mona)] font-semibold text-[14px] leading-[1.5] text-[#191e41] whitespace-nowrap">
          {label}{" "}
          {optional && <span className="font-[family-name:var(--font-source)] font-normal text-[#616268]">(optional)</span>}
        </label>
        <div className={`bg-[#fafbff] border border-[#f3f5fc] rounded-[8px] flex items-center px-[16px] py-[12px] transition-all duration-200 focus-within:border-[rgba(234,76,137,0.3)] focus-within:shadow-[0_0_0_3px_rgba(234,76,137,0.06)] ${error ? "!border-red-400 !shadow-[0_0_0_3px_rgba(239,68,68,0.08)]" : ""}`}>
          <input
            ref={ref}
            className={`w-full bg-transparent font-[family-name:var(--font-mona)] font-normal text-[16px] leading-[1.5] text-[#191e41] placeholder:text-[#636788] outline-none ${className}`}
            {...props}
          />
        </div>
        {error && (
          <p className="text-red-500 text-[13px] font-[family-name:var(--font-source)] font-medium animate-[shakeIn_0.35s_ease-out]">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
