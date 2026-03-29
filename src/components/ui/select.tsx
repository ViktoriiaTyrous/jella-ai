"use client";

import React, { useState, useRef, useEffect } from "react";

interface SelectProps {
  label: string;
  optional?: boolean;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
  error?: string;
}

export default function Select({ label, optional, value, onChange, options, placeholder, error }: SelectProps) {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const borderColor = error
    ? "#ef4444"
    : focused || open
    ? "rgba(234,76,137,0.3)"
    : "#f3f5fc";

  const selectedLabel = options.find((o) => o.value === value)?.label;

  return (
    <div style={{ display: "flex", flexDirection: "column" }} ref={ref}>
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
      <div style={{ position: "relative" }}>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%",
            background: "#fafbff",
            border: `1px solid ${borderColor}`,
            borderRadius: 8,
            padding: "12px 16px",
            fontFamily: "var(--font-mona), sans-serif",
            fontWeight: 400,
            fontSize: 16,
            color: value ? "#191e41" : "#9ca3af",
            outline: "none",
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxSizing: "border-box",
            textAlign: "left",
            boxShadow: focused || open ? "0 0 0 3px rgba(234,76,137,0.06)" : "none",
            transition: "border-color 0.2s, box-shadow 0.2s",
          }}
        >
          <span>{selectedLabel || placeholder || "Select..."}</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
            <path d="M4 6l4 4 4-4" stroke="#636788" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {open && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 4px)",
              left: 0,
              right: 0,
              background: "white",
              border: "1px solid #f3f5fc",
              borderRadius: 12,
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
              maxHeight: 240,
              overflowY: "auto",
              zIndex: 50,
            }}
          >
            {options.map((opt) => (
              <div
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                style={{
                  padding: "10px 16px",
                  fontFamily: "var(--font-mona), sans-serif",
                  fontSize: 15,
                  color: opt.value === value ? "#ea4c89" : "#191e41",
                  cursor: "pointer",
                  background: "transparent",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#f3f5fc")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>
      {error && (
        <span style={{ fontFamily: "var(--font-source), sans-serif", fontSize: 13, color: "#ef4444", marginTop: 4 }}>
          {error}
        </span>
      )}
    </div>
  );
}
