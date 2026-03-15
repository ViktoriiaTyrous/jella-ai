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
      <div className="flex flex-col gap-2">
        <label className="font-[family-name:var(--font-mona)] font-semibold text-sm leading-[1.5] text-[#191e41]">
          {label}
          {optional && <span className="font-[family-name:var(--font-source)] font-normal text-[#616268]"> (Optional)</span>}
        </label>
        <input
          ref={ref}
          className={`w-full h-[48px] bg-[#fafbff] border border-[#d8dce8] rounded-lg px-4 font-[family-name:var(--font-mona)] text-base leading-[1.5] text-[#191e41] placeholder:text-[#636788] outline-none transition-all duration-200 focus:border-[#ea4c89]/50 focus:shadow-[0_0_0_3px_rgba(234,76,137,0.08)] ${error ? "!border-red-400 !shadow-[0_0_0_3px_rgba(239,68,68,0.1)]" : ""} ${className}`}
          {...props}
        />
        {error && (
          <p className="text-red-500 text-sm font-[family-name:var(--font-source)] font-medium animate-[shakeIn_0.35s_ease-out]">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
