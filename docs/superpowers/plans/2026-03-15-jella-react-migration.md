# Jella AI — React Migration + Onboarding Wizard Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate Jella AI from plain HTML/CSS/JS to Next.js 15 and implement the onboarding wizard from Figma.

**Architecture:** Next.js 15 App Router with file-based routing. Sign In and Onboarding are separate route groups. Onboarding shares a sidebar layout with 4 step pages. Form state lives in React Context.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS v4 (CSS-based config via `@theme`), pnpm

**Note on Tailwind v4:** Tailwind CSS v4 uses CSS-based configuration (`@theme` in CSS), not `tailwind.config.ts`. If `create-next-app` scaffolds v3 config, upgrade to v4 with `pnpm add tailwindcss@latest @tailwindcss/postcss@latest` and switch to CSS-based config.

**Spec:** `docs/superpowers/specs/2026-03-15-jella-react-migration-design.md`

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout: fonts, metadata, global CSS
│   ├── globals.css             # OKLCH tokens, base styles, animations
│   ├── page.tsx                # Redirect → /sign-in
│   ├── sign-in/
│   │   └── page.tsx            # Sign In page (client component)
│   └── onboarding/
│       ├── layout.tsx          # Sidebar + content wrapper, OnboardingProvider
│       ├── page.tsx            # Redirect → step-1
│       ├── step-1/page.tsx     # Brand Basics form
│       ├── step-2/page.tsx     # Goals & Platforms (placeholder)
│       ├── step-3/page.tsx     # Style & Content (placeholder)
│       └── step-4/page.tsx     # Summary (placeholder)
├── components/
│   ├── ui/
│   │   ├── button.tsx          # Button: primary, ghost, dark variants
│   │   ├── input.tsx           # Text input with label + error
│   │   ├── select.tsx          # Custom select dropdown
│   │   └── textarea.tsx        # Textarea with label + error
│   ├── onboarding/
│   │   ├── sidebar.tsx         # Left sidebar: logo + step list
│   │   ├── step-indicator.tsx  # Single step row
│   │   └── step-nav.tsx        # Back/Continue bottom bar
│   └── auth/
│       ├── brand-panel.tsx     # Left brand panel (sign-in)
│       ├── sign-in-form.tsx    # Email/password form
│       └── google-button.tsx   # Google SSO button
├── context/
│   └── onboarding-context.tsx  # useReducer + Context for form data
├── lib/
│   └── fonts.ts                # Mona Sans (local) + Source Sans 3 (google)
└── public/
    └── fonts/
        ├── MonaSans-SemiBold.woff2
        └── MonaSans-Bold.woff2
```

---

## Chunk 1: Project Setup

### Task 1: Initialize Next.js project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`

- [ ] **Step 1: Create Next.js app with pnpm**

```bash
cd "/Users/viktoriatyrous/vs code/Project 1"
# Remove old files (keep .git, .claude, .vexp, docs)
# Then create Next.js app in place
pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-pnpm --no-turbopack
```

Note: When prompted about overwriting, say yes. Old HTML/CSS/JS files will be replaced.

- [ ] **Step 2: Verify dev server starts**

```bash
pnpm dev
```

Expected: Server starts on localhost:3000, shows default Next.js page.

- [ ] **Step 3: Clean default files**

Remove default content from:
- `src/app/page.tsx` — replace with empty component
- `src/app/globals.css` — clear default styles
- `src/app/layout.tsx` — keep structure, remove default font

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: initialize Next.js 15 project with TypeScript and Tailwind"
```

---

### Task 2: Configure fonts

**Files:**
- Create: `src/lib/fonts.ts`
- Create: `public/fonts/MonaSans-SemiBold.woff2`, `MonaSans-Bold.woff2`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Download Mona Sans font files**

Download from GitHub: https://github.com/github/mona-sans/releases
Extract `MonaSans-SemiBold.woff2` and `MonaSans-Bold.woff2` into `public/fonts/`.

- [ ] **Step 2: Create font configuration**

Create `src/lib/fonts.ts`:

```typescript
import localFont from "next/font/local";
import { Source_Sans_3 } from "next/font/google";

export const monaSans = localFont({
  src: [
    {
      path: "../../public/fonts/MonaSans-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/MonaSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-mona",
  display: "swap",
});

export const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-source",
  display: "swap",
});
```

- [ ] **Step 3: Apply fonts in root layout**

Update `src/app/layout.tsx`:

```tsx
import { monaSans, sourceSans } from "@/lib/fonts";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${monaSans.variable} ${sourceSans.variable}`}>
      <body className="font-source antialiased">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Add font families to Tailwind config**

In `tailwind.config.ts`, add:

```typescript
theme: {
  extend: {
    fontFamily: {
      mona: ["var(--font-mona)", "system-ui", "sans-serif"],
      source: ["var(--font-source)", "system-ui", "sans-serif"],
    },
  },
},
```

- [ ] **Step 5: Verify fonts render**

Create a test page with `<h1 className="font-mona">Test</h1>` and `<p className="font-source">Body</p>`. Check in browser.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: configure Mona Sans and Source Sans 3 fonts"
```

---

### Task 3: Set up global CSS tokens and base styles

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Write OKLCH color tokens**

```css
@import "tailwindcss";

:root {
  /* Onboarding (light) */
  --bg-page: oklch(0.98 0.005 270);
  --color-title: oklch(0.22 0.04 270);
  --color-body: oklch(0.5 0.03 270);
  --color-primary: oklch(0.65 0.24 350);
  --color-primary-dark: oklch(0.3 0.03 300);
  --color-border: oklch(0.96 0.005 270);
  --color-border-focus: oklch(0.65 0.24 350 / 0.2);
  --color-input-bg: oklch(0.98 0.005 270);
  --color-white: oklch(1 0 0);
  --color-back-border: oklch(0.92 0.01 270);
  --color-error: oklch(0.55 0.22 25);
  --color-success: oklch(0.55 0.18 155);

  /* Spacing (8px grid) */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;

  /* Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-full: 9999px;
}

/* Base reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes shakeIn {
  0% { transform: translateX(0); opacity: 0; }
  20% { transform: translateX(-6px); }
  40% { transform: translateX(5px); }
  60% { transform: translateX(-3px); }
  80% { transform: translateX(2px); opacity: 1; }
  100% { transform: translateX(0); }
}

/* Sign In page animations (scoped via .sign-in parent) */
@keyframes slideUp {
  from { opacity: 0; transform: translateY(24px); filter: blur(8px); }
  to { opacity: 1; transform: translateY(0); filter: blur(0); }
}

@keyframes fadeStagger {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes logoFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add OKLCH color tokens and base styles"
```

---

## Chunk 2: UI Components

### Task 4: Button component

**Files:**
- Create: `src/components/ui/button.tsx`

- [ ] **Step 1: Create Button with 3 variants**

```tsx
"use client";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "dark";
  children: React.ReactNode;
}

export function Button({ variant = "primary", children, className = "", ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center gap-2 h-12 rounded-[var(--radius-md)] font-mona font-semibold text-base cursor-pointer transition-all duration-200 ease-out whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2";

  const variants = {
    primary: "bg-[var(--color-primary)] text-white px-6 hover:brightness-90 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
    ghost: "bg-transparent border-2 border-[var(--color-back-border)] text-[var(--color-body)] px-6 hover:bg-[var(--color-border)]",
    dark: "bg-[var(--color-primary-dark)] text-white px-4 hover:brightness-110",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/button.tsx
git commit -m "feat: add Button component with primary/ghost/dark variants"
```

---

### Task 5: Input component

**Files:**
- Create: `src/components/ui/input.tsx`

- [ ] **Step 1: Create Input with label and error**

```tsx
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
      <div className="flex flex-col gap-2">
        <label className="font-mona font-semibold text-sm text-[var(--color-title)]">
          {label}
          {optional && <span className="font-source font-normal text-[var(--color-body)]"> (optional)</span>}
        </label>
        <input
          ref={ref}
          className={`w-full bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded-[var(--radius-sm)] px-4 py-3 font-source text-base text-[var(--color-title)] placeholder:text-[var(--color-body)] outline-none transition-all duration-200 hover:border-[var(--color-body)/0.3] focus:border-[var(--color-border-focus)] focus:shadow-[0_0_0_3px_var(--color-border-focus)] ${error ? "border-[var(--color-error)] shadow-[0_0_0_3px_oklch(0.55_0.22_25/0.12)]" : ""} ${className}`}
          {...props}
        />
        {error && (
          <p className="text-[var(--color-error)] text-sm font-source font-medium animate-[shakeIn_0.35s_ease-out]">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/input.tsx
git commit -m "feat: add Input component with label and error state"
```

---

### Task 6: Select component

**Files:**
- Create: `src/components/ui/select.tsx`

- [ ] **Step 1: Create custom Select dropdown**

```tsx
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
      <label className="font-mona font-semibold text-sm text-[var(--color-title)]">
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-full bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded-[var(--radius-sm)] px-4 py-3 font-source text-base text-left flex items-center justify-between outline-none transition-all duration-200 hover:border-[var(--color-body)/0.3] focus:border-[var(--color-border-focus)] focus:shadow-[0_0_0_3px_var(--color-border-focus)]"
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
                  className={`w-full text-left px-4 py-2.5 font-source text-sm transition-colors hover:bg-[var(--color-border)] ${value === option ? "text-[var(--color-primary)] font-semibold" : "text-[var(--color-title)]"}`}
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/select.tsx
git commit -m "feat: add custom Select dropdown component"
```

---

### Task 7: Textarea component

**Files:**
- Create: `src/components/ui/textarea.tsx`

- [ ] **Step 1: Create Textarea with label and error**

```tsx
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
        <label className="font-mona font-semibold text-sm text-[var(--color-title)]">
          {label}
        </label>
        <textarea
          ref={ref}
          className={`w-full bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded-[var(--radius-sm)] px-4 py-3 font-source text-base text-[var(--color-title)] placeholder:text-[var(--color-body)] outline-none transition-all duration-200 resize-none hover:border-[var(--color-body)/0.3] focus:border-[var(--color-border-focus)] focus:shadow-[0_0_0_3px_var(--color-border-focus)] ${error ? "border-[var(--color-error)]" : ""} ${className}`}
          {...props}
        />
        {error && (
          <p className="text-[var(--color-error)] text-sm font-source font-medium animate-[shakeIn_0.35s_ease-out]">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/textarea.tsx
git commit -m "feat: add Textarea component with label and error state"
```

---

## Chunk 3: Onboarding Context + Sidebar

### Task 8: Onboarding Context

**Files:**
- Create: `src/context/onboarding-context.tsx`

- [ ] **Step 1: Create context with useReducer**

```tsx
"use client";

import { createContext, useContext, useReducer, type ReactNode } from "react";

export interface OnboardingData {
  websiteUrl: string;
  brandName: string;
  niche: string;
  region: string;
  language: string;
  description: string;
}

const initialData: OnboardingData = {
  websiteUrl: "",
  brandName: "",
  niche: "",
  region: "",
  language: "",
  description: "",
};

type Action =
  | { type: "UPDATE_FIELD"; field: keyof OnboardingData; value: string }
  | { type: "RESET" };

function reducer(state: OnboardingData, action: Action): OnboardingData {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialData;
    default:
      return state;
  }
}

const OnboardingContext = createContext<{
  data: OnboardingData;
  updateField: (field: keyof OnboardingData, value: string) => void;
  reset: () => void;
} | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [data, dispatch] = useReducer(reducer, initialData);

  const updateField = (field: keyof OnboardingData, value: string) => {
    dispatch({ type: "UPDATE_FIELD", field, value });
  };

  const reset = () => dispatch({ type: "RESET" });

  return (
    <OnboardingContext.Provider value={{ data, updateField, reset }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error("useOnboarding must be used within OnboardingProvider");
  return ctx;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/context/onboarding-context.tsx
git commit -m "feat: add OnboardingContext with useReducer"
```

---

### Task 9: Onboarding Sidebar

**Files:**
- Create: `src/components/onboarding/sidebar.tsx`
- Create: `src/components/onboarding/step-indicator.tsx`

- [ ] **Step 1: Create StepIndicator component**

```tsx
"use client";

interface StepIndicatorProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  active: boolean;
}

export function StepIndicator({ icon, title, subtitle, active }: StepIndicatorProps) {
  return (
    <div className={`flex items-center gap-3 p-2 rounded-full transition-colors duration-200 ${active ? "bg-white/40 border border-white" : ""}`}>
      <div className={`size-10 rounded-full flex items-center justify-center shrink-0 ${active ? "bg-white border border-pink-200/20" : "bg-white border border-white/20"}`}>
        {icon}
      </div>
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="font-mona font-semibold text-base text-[var(--color-title)] leading-tight">
          {title}
        </span>
        <span className="font-source text-sm text-[var(--color-body)] leading-tight">
          {subtitle}
        </span>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create Sidebar with logo + steps + connectors**

Create `src/components/onboarding/sidebar.tsx`. Connectors are inlined (no separate file needed):

```tsx
"use client";

import { StepIndicator } from "./step-indicator";

const STEPS = [
  {
    title: "Brand Basics",
    subtitle: "Tell us about your business",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EA4C89" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="7" width="16" height="13" rx="3" />
        <path d="M8 7V5.5a4 4 0 0 1 8 0V7" />
        <circle cx="12" cy="14" r="1.5" />
      </svg>
    ),
  },
  {
    title: "Goals & Platforms",
    subtitle: "Tell us about your business",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#636788" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" fill="#636788" />
      </svg>
    ),
  },
  {
    title: "Style & Content Preferences",
    subtitle: "Tell us about your business",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#636788" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.8-.1 2.6-.4" />
        <path d="M20 16l-4-2v-4" />
        <circle cx="18" cy="18" r="4" />
      </svg>
    ),
  },
  {
    title: "Summary",
    subtitle: "Tell us about your business",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#636788" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M9 7h6M9 11h6M9 15h4" />
      </svg>
    ),
  },
];

interface SidebarProps {
  currentStep: number;
}

export function Sidebar({ currentStep }: SidebarProps) {
  return (
    <div
      className="h-full rounded-2xl overflow-hidden relative p-[30px] flex flex-col"
      style={{ background: "linear-gradient(180deg, oklch(0.95 0.02 280), oklch(0.93 0.015 340))" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="size-12">
          <svg width="49" height="48" viewBox="0 0 49 48" fill="none">
            <circle cx="24" cy="18" r="10" fill="#EA4C89" />
            <path d="M14 24c0 10 4 16 10 19 6-3 10-9 10-19" stroke="#EA4C89" strokeOpacity="0.4" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        </div>
        <span className="font-mona font-semibold text-[27px] text-[var(--color-title)]">Jella AI</span>
      </div>

      {/* Divider */}
      <div className="h-px bg-white mt-6 mb-10" />

      {/* Steps */}
      <div className="flex flex-col">
        {STEPS.map((step, i) => (
          <div key={step.title}>
            <StepIndicator
              icon={step.icon}
              title={step.title}
              subtitle={step.subtitle}
              active={i + 1 === currentStep}
            />
            {/* Connector line between steps */}
            {i < STEPS.length - 1 && (
              <div className="w-[59px] h-8 flex items-center justify-center">
                <div className="w-px h-full bg-gray-300/40" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create responsive mobile stepper**

Add to `sidebar.tsx`:

```tsx
export function MobileStepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center gap-2 justify-center py-3">
      {[1, 2, 3, 4].map((step) => (
        <div
          key={step}
          className={`size-8 rounded-full flex items-center justify-center text-sm font-mona font-semibold transition-colors ${
            step === currentStep
              ? "bg-[var(--color-primary)] text-white"
              : step < currentStep
                ? "bg-[var(--color-primary)]/20 text-[var(--color-primary)]"
                : "bg-[var(--color-border)] text-[var(--color-body)]"
          }`}
        >
          {step}
        </div>
      ))}
    </div>
  );
}
```

Use `MobileStepper` in onboarding layout for screens < lg.

- [ ] **Step 4: Commit**

```bash
git add src/components/onboarding/
git commit -m "feat: add onboarding Sidebar with step indicators"
```

---

### Task 10: Step Navigation bar

**Files:**
- Create: `src/components/onboarding/step-nav.tsx`

- [ ] **Step 1: Create StepNav with Back/Continue**

```tsx
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface StepNavProps {
  step: number;
  totalSteps: number;
  onContinue: () => void;
  continueDisabled?: boolean;
}

export function StepNav({ step, totalSteps, onContinue, continueDisabled }: StepNavProps) {
  const router = useRouter();
  const isFirst = step === 1;
  const isLast = step === totalSteps;

  return (
    <div className="flex items-center justify-between pt-6">
      {!isFirst ? (
        <Button variant="ghost" onClick={() => router.push(`/onboarding/step-${step - 1}`)}>
          Back
        </Button>
      ) : (
        <div />
      )}
      <Button variant="primary" onClick={onContinue} disabled={continueDisabled}>
        {isLast ? "Finish Setup" : "Continue"}
        {!isLast && (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        )}
      </Button>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/onboarding/step-nav.tsx
git commit -m "feat: add StepNav with Back/Continue navigation"
```

---

## Chunk 4: Onboarding Pages

### Task 11: Onboarding layout

**Files:**
- Create: `src/app/onboarding/layout.tsx`
- Create: `src/app/onboarding/page.tsx`

- [ ] **Step 1: Create onboarding layout with sidebar**

```tsx
"use client";

import { usePathname } from "next/navigation";
import { OnboardingProvider } from "@/context/onboarding-context";
import { Sidebar } from "@/components/onboarding/sidebar";

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const stepMatch = pathname.match(/step-(\d+)/);
  const currentStep = stepMatch ? parseInt(stepMatch[1]) : 1;

  return (
    <OnboardingProvider>
      <div className="flex min-h-screen bg-[var(--bg-page)]">
        {/* Desktop sidebar */}
        <div className="hidden lg:block w-96 shrink-0 p-5">
          <Sidebar currentStep={currentStep} />
        </div>
        {/* Mobile stepper — shown < lg */}
        <div className="lg:hidden px-4 pt-4">
          {/* Horizontal step indicator for mobile */}
        </div>
        {/* Content */}
        <main className="flex-1 px-6 py-16 lg:py-[69px]">
          <div className="max-w-[1076px]">
            {children}
          </div>
        </main>
      </div>
    </OnboardingProvider>
  );
}
```

- [ ] **Step 2: Create redirect page**

`src/app/onboarding/page.tsx`:

```tsx
import { redirect } from "next/navigation";

export default function OnboardingPage() {
  redirect("/onboarding/step-1");
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/onboarding/
git commit -m "feat: add onboarding layout with sidebar and redirect"
```

---

### Task 12: Step 1 — Brand Basics

**Files:**
- Create: `src/app/onboarding/step-1/page.tsx`

- [ ] **Step 1: Implement Brand Basics form from Figma**

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/context/onboarding-context";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { StepNav } from "@/components/onboarding/step-nav";

const NICHES = ["Beauty", "Fashion", "Food", "Tech", "Fitness", "Travel", "Education", "Other"];
const REGIONS = ["North America", "Europe", "Asia", "Latin America", "Middle East", "Africa", "Oceania"];
const LANGUAGES = ["English", "Spanish", "French", "German", "Portuguese", "Japanese", "Korean", "Chinese"];

export default function Step1Page() {
  const router = useRouter();
  const { data, updateField } = useOnboarding();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleContinue = () => {
    const newErrors: Record<string, string> = {};
    if (!data.brandName.trim()) newErrors.brandName = "Please enter your brand name";
    if (!data.description.trim()) newErrors.description = "Please add a short description of your brand";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Focus first errored field
      const firstKey = Object.keys(newErrors)[0];
      document.querySelector<HTMLElement>(`[data-field="${firstKey}"]`)?.focus();
      return;
    }

    setErrors({});
    router.push("/onboarding/step-2");
  };

  return (
    <div className="animate-[fadeIn_0.3s_ease-out]">
      <h1 className="font-mona font-semibold text-[32px] text-[var(--color-title)] leading-tight">
        Brand Basics
      </h1>
      <p className="font-source text-base text-[var(--color-body)] mt-1">
        Add your website or Instagram link — this helps AI understand your brand&apos;s audience, tone, and product style.
      </p>

      <div className="mt-6 bg-white rounded-xl shadow-sm">
        {/* URL + Auto-Fill */}
        <div className="border-b border-[var(--color-border)] p-6">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <Input
                label="Paste your Instagram or Website link"
                optional
                placeholder="e.g. https://www.instagram.com/bloomstudio/"
                value={data.websiteUrl}
                onChange={(e) => updateField("websiteUrl", e.target.value)}
              />
            </div>
            <Button
              variant="dark"
              disabled
              title="Coming soon"
              className="h-12 opacity-50 cursor-not-allowed"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z" />
              </svg>
              Auto-Fill
            </Button>
          </div>
        </div>

        {/* Brand Name + Niche */}
        <div className="border-b border-[var(--color-border)] p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Brand Name"
              placeholder="Enter your business name"
              value={data.brandName}
              onChange={(e) => { updateField("brandName", e.target.value); setErrors((prev) => ({ ...prev, brandName: "" })); }}
              error={errors.brandName}
              data-field="brandName"
            />
            <Select
              label="Niche"
              options={NICHES}
              value={data.niche}
              onChange={(v) => updateField("niche", v)}
              placeholder="e.g. Beauty"
            />
          </div>
        </div>

        {/* Region + Language */}
        <div className="border-b border-[var(--color-border)] p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Region"
              options={REGIONS}
              value={data.region}
              onChange={(v) => updateField("region", v)}
              placeholder="Select region"
            />
            <Select
              label="Language"
              options={LANGUAGES}
              value={data.language}
              onChange={(v) => updateField("language", v)}
              placeholder="Select language"
            />
          </div>
        </div>

        {/* Description */}
        <div className="p-6 pt-3">
          <Textarea
            label="Description"
            placeholder="Describe your brand in a few sentences..."
            className="h-[140px]"
            value={data.description}
            onChange={(e) => { updateField("description", e.target.value); setErrors((prev) => ({ ...prev, description: "" })); }}
            error={errors.description}
            data-field="description"
          />
        </div>
      </div>

      <StepNav step={1} totalSteps={4} onContinue={handleContinue} />
    </div>
  );
}
```

- [ ] **Step 2: Verify in browser**

Open http://localhost:3000/onboarding/step-1. Check:
- Form renders with all fields
- Validation fires on Continue
- Data persists in context
- Navigation to step-2 works

- [ ] **Step 3: Commit**

```bash
git add src/app/onboarding/step-1/
git commit -m "feat: implement Step 1 Brand Basics form from Figma"
```

---

### Task 13: Steps 2-4 placeholders

**Files:**
- Create: `src/app/onboarding/step-2/page.tsx`
- Create: `src/app/onboarding/step-3/page.tsx`
- Create: `src/app/onboarding/step-4/page.tsx`

- [ ] **Step 1: Create placeholder pages**

Each page follows the same pattern:

```tsx
"use client";

import { useRouter } from "next/navigation";
import { StepNav } from "@/components/onboarding/step-nav";

const STEP_INFO = {
  2: { title: "Goals & Platforms", subtitle: "Define your marketing goals and target platforms" },
  3: { title: "Style & Content Preferences", subtitle: "Set your brand voice and visual preferences" },
  4: { title: "Summary", subtitle: "Review your brand profile before finishing" },
};

export default function StepNPage() {
  const step = N; // 2, 3, or 4
  const router = useRouter();
  const info = STEP_INFO[step];

  const handleContinue = () => {
    if (step === 4) {
      // Final step — show success or console.log
      console.log("Onboarding complete");
      return;
    }
    router.push(`/onboarding/step-${step + 1}`);
  };

  return (
    <div className="animate-[fadeIn_0.3s_ease-out]">
      <h1 className="font-mona font-semibold text-[32px] text-[var(--color-title)] leading-tight">
        {info.title}
      </h1>
      <p className="font-source text-base text-[var(--color-body)] mt-1">
        {info.subtitle}
      </p>
      <div className="mt-10 bg-white rounded-xl shadow-sm p-10 flex items-center justify-center min-h-[300px]">
        <p className="font-source text-[var(--color-body)] text-lg">Coming soon</p>
      </div>
      <StepNav step={step} totalSteps={4} onContinue={handleContinue} />
    </div>
  );
}
```

Step 4 special: on "Finish Setup" click:
1. `console.log("Onboarding data:", onboardingData)` — log all form data from context
2. Show success state inside the card:

```tsx
const [done, setDone] = useState(false);
const { data } = useOnboarding();

const handleFinish = () => {
  console.log("Onboarding data:", data);
  setDone(true);
};

// When done:
<div className="flex flex-col items-center justify-center gap-4 py-16">
  <div className="size-16 rounded-full bg-green-100 flex items-center justify-center">
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="oklch(0.55 0.18 155)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </div>
  <h2 className="font-mona font-semibold text-2xl text-[var(--color-title)]">You&apos;re all set!</h2>
  <p className="font-source text-[var(--color-body)]">Your brand profile has been created.</p>
  <Button variant="primary" disabled title="Coming soon" className="opacity-50 cursor-not-allowed mt-4">
    Go to Dashboard
  </Button>
</div>
```

- [ ] **Step 2: Verify full wizard flow**

Navigate through all 4 steps using Back/Continue. Verify:
- Step indicators update in sidebar
- Back/Continue work correctly
- Step 4 shows "Finish Setup" and success state

- [ ] **Step 3: Commit**

```bash
git add src/app/onboarding/step-{2,3,4}/
git commit -m "feat: add placeholder pages for Steps 2-4"
```

---

## Chunk 5: Sign In Page Migration

### Task 14: Sign In components

**Files:**
- Create: `src/components/auth/brand-panel.tsx`
- Create: `src/components/auth/sign-in-form.tsx`
- Create: `src/components/auth/google-button.tsx`

- [ ] **Step 1: Create GoogleButton**

Google SSO button with Google SVG icon, same styling as current `btn--google`.

- [ ] **Step 2: Create SignInForm**

Convert current `auth-form` from HTML to React:
- Email input with icon + validation checkmark
- Password input with icon + toggle visibility
- Remember me checkbox
- Submit button with loading spinner
- Same validation logic (email format, password length)

- [ ] **Step 3: Create BrandPanel**

Convert current `brand-panel` from HTML to React:
- Logo, heading, subtext
- Feature cards (3 items, stagger animation)
- Testimonials slider with auto-play + dots
- SVG decoration with floating orbs
- Dark/light theme via OKLCH variables

- [ ] **Step 4: Commit**

```bash
git add src/components/auth/
git commit -m "feat: add Sign In auth components (form, brand panel, google button)"
```

---

### Task 15: Sign In page

**Files:**
- Create: `src/app/sign-in/page.tsx`
- Modify: `src/app/globals.css` (add sign-in dark theme tokens)

- [ ] **Step 1: Add sign-in scoped CSS tokens**

Add to `globals.css` a `.sign-in` scoped block with all dark theme OKLCH tokens from current `style.css` (surfaces, borders, accents, shadows, gradients) + `@media (prefers-color-scheme: light)` overrides.

- [ ] **Step 2: Create Sign In page**

Assemble BrandPanel + SignInForm in a two-panel layout:
- `<div className="sign-in flex min-h-screen p-6">`
- Brand panel 50% left
- Auth card centered right
- Responsive: stacked on tablet, auth-only on mobile
- On submit → `router.push("/onboarding/step-1")` (simulated)

- [ ] **Step 3: Verify sign-in page**

Open http://localhost:3000/sign-in. Check:
- Dark theme renders correctly
- Light theme via system preference
- Form validation works
- Testimonials auto-slide
- Responsive breakpoints (1024px, 640px)
- Submit navigates to onboarding

- [ ] **Step 4: Commit**

```bash
git add src/app/sign-in/ src/app/globals.css
git commit -m "feat: migrate Sign In page to React with dark/light theme"
```

---

### Task 16: Root redirect + metadata

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Set up root redirect**

```tsx
// src/app/page.tsx
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/sign-in");
}
```

- [ ] **Step 2: Add metadata to root layout**

```tsx
export const metadata = {
  title: "Jella AI — Your AI-powered creative workspace",
  description: "AI-powered creative workspace for content, strategy, and growth.",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#1a1a2e" },
    { media: "(prefers-color-scheme: light)", color: "#f5f5fa" },
  ],
};
```

- [ ] **Step 3: Delete old HTML/CSS/JS files**

Remove: `index.html`, `style.css`, `script.js`, `package-lock.json` (old npm lockfile).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add root redirect, metadata, remove old HTML files"
```

---

## Chunk 6: Final Verification

### Task 17: Full flow test + Playwright screenshot

- [ ] **Step 1: Run `pnpm build`**

```bash
pnpm build
```

Expected: Build succeeds with no errors.

- [ ] **Step 2: Test full flow manually**

1. Open `/sign-in` — verify layout, dark theme, form
2. Submit sign-in → lands on `/onboarding/step-1`
3. Fill out Brand Basics form → Continue
4. Navigate through Steps 2-4
5. Finish Setup on Step 4 → success state
6. Test responsive at 768px and 375px

- [ ] **Step 3: Take Playwright screenshot**

Use Playwright MCP to screenshot key pages:
- `/sign-in` (desktop)
- `/onboarding/step-1` (desktop)
- `/onboarding/step-1` (mobile 375px)

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: final verification — build passes, full flow works"
```
