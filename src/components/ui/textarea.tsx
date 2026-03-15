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
        <label className="font-[family-name:var(--font-mona)] font-semibold text-sm text-[var(--color-title)]">
          {label}
        </label>
        <textarea
          ref={ref}
          className={`w-full bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded-[var(--radius-sm)] px-4 py-3 font-[family-name:var(--font-source)] text-base text-[var(--color-title)] placeholder:text-[var(--color-body)] outline-none transition-all duration-200 resize-none hover:border-[color-mix(in_oklch,var(--color-body)_30%,transparent)] focus:border-[var(--color-border-focus)] focus:shadow-[0_0_0_3px_var(--color-border-focus)] ${error ? "border-[var(--color-error)]" : ""} ${className}`}
          {...props}
        />
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
