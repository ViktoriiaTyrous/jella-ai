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
    <div className="flex flex-col gap-[8px]" ref={ref}>
      <label className="font-[family-name:var(--font-mona)] font-semibold text-[14px] leading-[1.5] text-[#191e41]">
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-full bg-[#fafbff] border border-[#f3f5fc] rounded-[8px] px-[16px] py-[12px] font-[family-name:var(--font-mona)] font-normal text-[16px] leading-[1.5] text-left flex items-center justify-between outline-none transition-all duration-200 focus:border-[rgba(234,76,137,0.3)] focus:shadow-[0_0_0_3px_rgba(234,76,137,0.06)]"
        >
          <span className={value ? "text-[#191e41]" : "text-[#636788]"}>
            {value || placeholder}
          </span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-[#636788] transition-transform duration-200 shrink-0 ${open ? "rotate-180" : ""}`}>
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
        {open && (
          <ul className="absolute z-10 mt-1 w-full bg-white border border-[#f3f5fc] rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] max-h-60 overflow-auto py-1">
            {options.map((option) => (
              <li key={option}>
                <button
                  type="button"
                  onClick={() => { onChange(option); setOpen(false); }}
                  className={`w-full text-left px-[16px] py-[10px] font-[family-name:var(--font-source)] text-[14px] transition-colors hover:bg-[#f3f5fc] ${value === option ? "text-[#ea4c89] font-semibold" : "text-[#191e41]"}`}
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
