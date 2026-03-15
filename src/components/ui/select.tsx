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
    <div className="flex flex-col gap-2" ref={ref}>
      <label className="font-[family-name:var(--font-mona)] font-semibold text-sm text-[var(--color-title)]">
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-full bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded-[var(--radius-sm)] px-4 py-3 font-[family-name:var(--font-source)] text-base text-left flex items-center justify-between outline-none transition-all duration-200 hover:border-[color-mix(in_oklch,var(--color-body)_30%,transparent)] focus:border-[var(--color-border-focus)] focus:shadow-[0_0_0_3px_var(--color-border-focus)]"
        >
          <span className={value ? "text-[var(--color-title)]" : "text-[var(--color-body)]"}>
            {value || placeholder}
          </span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-[var(--color-body)] transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
        {open && (
          <ul className="absolute z-10 mt-1 w-full bg-white border border-[var(--color-border)] rounded-[var(--radius-lg)] shadow-lg max-h-60 overflow-auto py-1">
            {options.map((option) => (
              <li key={option}>
                <button
                  type="button"
                  onClick={() => { onChange(option); setOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 font-[family-name:var(--font-source)] text-sm transition-colors hover:bg-[var(--color-border)] ${value === option ? "text-[var(--color-primary)] font-semibold" : "text-[var(--color-title)]"}`}
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
