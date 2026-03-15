"use client";

import { useState, useRef, useEffect } from "react";

interface SelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function Select({ label, options, value, onChange, placeholder = "Select..." }: SelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }} ref={ref}>
      <label
        style={{
          fontFamily: "var(--font-mona), system-ui, sans-serif",
          fontWeight: 600,
          fontSize: "14px",
          lineHeight: 1.5,
          color: "#191e41",
        }}
      >
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <button
          type="button"
          onClick={() => setOpen(!open)}
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
            textAlign: "left" as const,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            outline: "none",
            transition: "border-color 0.2s, box-shadow 0.2s",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "rgba(234,76,137,0.3)";
            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(234,76,137,0.06)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "#f3f5fc";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <span style={{ color: value ? "#191e41" : "#636788" }}>
            {value || placeholder}
          </span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#636788"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ flexShrink: 0, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none" }}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
        {open && (
          <ul
            style={{
              position: "absolute",
              zIndex: 10,
              marginTop: "4px",
              width: "100%",
              backgroundColor: "#fff",
              border: "1px solid #f3f5fc",
              borderRadius: "12px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
              maxHeight: "240px",
              overflowY: "auto" as const,
              padding: "4px 0",
              listStyle: "none",
            }}
          >
            {options.map((option) => (
              <li key={option}>
                <button
                  type="button"
                  onClick={() => { onChange(option); setOpen(false); }}
                  style={{
                    width: "100%",
                    textAlign: "left" as const,
                    padding: "10px 16px",
                    fontFamily: "var(--font-source), system-ui, sans-serif",
                    fontSize: "14px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: value === option ? "#ea4c89" : "#191e41",
                    fontWeight: value === option ? 600 : 400,
                    transition: "background-color 0.15s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f3f5fc"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
