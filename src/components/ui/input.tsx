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
        <label className="capitalize font-[family-name:var(--font-mona)] font-semibold text-sm leading-[1.5] text-[#191e41]">
          {label}
          {optional && <span className="font-[family-name:var(--font-source)] font-normal text-[#616268]"> (optional)</span>}
        </label>
        <div className="bg-[#fafbff] border border-[#f3f5fc] rounded-lg px-4 py-3">
          <input
            ref={ref}
            className={`w-full bg-transparent font-[family-name:var(--font-mona)] text-base text-[#191e41] placeholder:text-[#636788] outline-none ${className}`}
            {...props}
          />
        </div>
        {error && (
          <p className="text-[var(--color-error)] text-sm font-[family-name:var(--font-source)] font-medium animate-[shakeIn_0.35s_ease-out]">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
