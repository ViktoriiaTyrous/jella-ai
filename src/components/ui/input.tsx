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
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <label
          style={{
            fontFamily: "var(--font-mona), system-ui, sans-serif",
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: 1.5,
            color: "#191e41",
          }}
        >
          {label}{" "}
          {optional && (
            <span style={{ fontFamily: "var(--font-source), system-ui, sans-serif", fontWeight: 400, color: "#616268" }}>
              (optional)
            </span>
          )}
        </label>
        <input
          ref={ref}
          style={{
            width: "100%",
            backgroundColor: "#fafbff",
            border: "1px solid #f3f5fc",
            borderRadius: "8px",
            padding: "12px 16px",
            fontFamily: "var(--font-mona), system-ui, sans-serif",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: 1.5,
            color: "#191e41",
            outline: "none",
            transition: "border-color 0.2s, box-shadow 0.2s",
            ...(error ? { borderColor: "#ef4444", boxShadow: "0 0 0 3px rgba(239,68,68,0.08)" } : {}),
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "rgba(234,76,137,0.3)";
            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(234,76,137,0.06)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = error ? "#ef4444" : "#f3f5fc";
            e.currentTarget.style.boxShadow = error ? "0 0 0 3px rgba(239,68,68,0.08)" : "none";
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

Input.displayName = "Input";
