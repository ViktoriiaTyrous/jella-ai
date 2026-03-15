"use client";

import { forwardRef } from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label className="capitalize font-[family-name:var(--font-mona)] font-semibold text-sm leading-[1.3] text-[#191e41]">
          {label}
        </label>
        <div className={`bg-[#fafbff] border border-[#f3f5fc] rounded-lg px-4 py-3 focus-within:border-[rgba(234,76,137,0.2)] transition-colors ${error ? "border-[var(--color-error)]" : ""}`}>
          <textarea
            ref={ref}
            className={`w-full bg-transparent font-[family-name:var(--font-mona)] text-base text-[#05103c] placeholder:text-[#636788] outline-none resize-none ${className}`}
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

Textarea.displayName = "Textarea";
