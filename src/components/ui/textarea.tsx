"use client";

import React, { useState } from "react";

interface TextareaProps {
  label: string;
  optional?: boolean;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}

export default function Textarea({ label, optional, value, onChange, placeholder, error }: TextareaProps) {
  const [focused, setFocused] = useState(false);

  const borderColor = error
    ? "#ef4444"
    : focused
    ? "rgba(234,76,137,0.4)"
    : "rgba(234,76,137,0.2)";

  const boxShadow = focused && !error ? "0 0 0 3px rgba(234,76,137,0.06)" : "none";

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label
        style={{
          fontFamily: "var(--font-mona), sans-serif",
          fontWeight: 600,
          fontSize: 14,
          color: "#191e41",
          marginBottom: 8,
        }}
      >
        {label}
        {optional && (
          <span style={{ fontWeight: 400, color: "#616268", marginLeft: 4 }}>(optional)</span>
        )}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        style={{
          width: "100%",
          height: 140,
          resize: "none",
          background: "#fafbff",
          border: `1px solid ${borderColor}`,
          borderRadius: 8,
          padding: "12px 16px",
          fontFamily: "var(--font-mona), sans-serif",
          fontWeight: 400,
          fontSize: 16,
          color: "#191e41",
          outline: "none",
          boxShadow,
          boxSizing: "border-box",
          transition: "border-color 0.2s, box-shadow 0.2s",
        }}
      />
      {error && (
        <span style={{ fontFamily: "var(--font-source), sans-serif", fontSize: 13, color: "#ef4444", marginTop: 4 }}>
          {error}
        </span>
      )}
    </div>
  );
}
