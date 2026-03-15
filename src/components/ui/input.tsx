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
        <label className="font-[family-name:var(--font-mona)] font-semibold text-[14px] leading-[1.5] text-[#191e41]">
          {label}
          {optional && <span className="font-[family-name:var(--font-source)] font-normal text-[#616268]"> (optional)</span>}
        </label>
        <input
          ref={ref}
          className={`w-full bg-[#fafbff] border border-[#f3f5fc] rounded-[8px] px-[16px] py-[12px] font-[family-name:var(--font-mona)] text-[16px] leading-[1.5] text-[#191e41] placeholder:text-[#636788] outline-none transition-all duration-200 focus:border-[rgba(234,76,137,0.3)] focus:shadow-[0_0_0_3px_rgba(234,76,137,0.08)] ${error ? "!border-red-400 !shadow-[0_0_0_3px_rgba(239,68,68,0.1)]" : ""} ${className}`}
          {...props}
        />
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
