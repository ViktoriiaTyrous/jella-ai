"use client";

import { forwardRef } from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <label
          style={{
            fontFamily: "var(--font-mona), system-ui, sans-serif",
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: 1.3,
            color: "#191e41",
          }}
        >
          {label}
        </label>
        <textarea
          ref={ref}
          style={{
            width: "100%",
            height: "140px",
            backgroundColor: "#fafbff",
            border: error ? "1px solid #ef4444" : "1px solid rgba(234,76,137,0.2)",
            borderRadius: "8px",
            padding: "12px 16px",
            fontFamily: "var(--font-mona), system-ui, sans-serif",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: 1.5,
            color: "#05103c",
            outline: "none",
            resize: "none" as const,
            transition: "border-color 0.2s, box-shadow 0.2s",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "rgba(234,76,137,0.4)";
            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(234,76,137,0.06)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = error ? "#ef4444" : "rgba(234,76,137,0.2)";
            e.currentTarget.style.boxShadow = "none";
          }}
          className={className}
          {...props}
        />
        {error && (
          <p style={{ color: "#ef4444", fontSize: "13px", fontFamily: "var(--font-source), system-ui, sans-serif", fontWeight: 500 }}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
