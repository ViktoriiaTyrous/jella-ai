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
        <label className="font-[family-name:var(--font-mona)] font-semibold text-sm leading-[1.3] text-[#191e41]">
          {label}
        </label>
        <textarea
          ref={ref}
          className={`w-full bg-[#fafbff] border border-[#d8dce8] rounded-lg px-4 py-3 font-[family-name:var(--font-mona)] text-base leading-[1.5] text-[#05103c] placeholder:text-[#636788] outline-none transition-all duration-200 resize-none focus:border-[#ea4c89]/50 focus:shadow-[0_0_0_3px_rgba(234,76,137,0.08)] ${error ? "!border-red-400" : ""} ${className}`}
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

Textarea.displayName = "Textarea";
