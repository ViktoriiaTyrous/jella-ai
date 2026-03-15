# Jella AI — React Migration + Onboarding Wizard

## Summary

Migrate the existing Jella AI sign-in page from plain HTML/CSS/JS to a Next.js 15 React application, and implement the onboarding wizard (4 steps) from the Figma design.

## Scope

- **In scope:** Sign In page (rebuilt in React), Onboarding Wizard (Step 1 fully implemented from Figma, Steps 2-4 as placeholders)
- **Out of scope:** Sign Up page, Dashboard, backend/API integration, authentication logic

## Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 15 | Framework (App Router) |
| React | 19 | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | v4 | Styling |
| pnpm | 10.x | Package manager |

## Fonts

- **Mona Sans** (SemiBold, Bold) — headings, labels, buttons
- **Source Sans Pro** (Regular) — body text, placeholders, descriptions

Loaded via `next/font/google` (Source Sans Pro) and `next/font/local` (Mona Sans — GitHub font, not on Google Fonts).

## Color System (from Figma)

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-page` | `#FAFBFF` | Page background |
| `--color-title` | `#191E41` | Headings |
| `--color-body` | `#636788` | Body text, descriptions |
| `--color-primary` | `#EA4C89` | Primary buttons, active states |
| `--color-primary-dark` | `#3A3546` | Auto-Fill button |
| `--color-border` | `#F3F5FC` | Input borders, dividers |
| `--color-border-focus` | `rgba(234,76,137,0.2)` | Focused input border |
| `--color-input-bg` | `#FAFBFF` | Input background |
| `--color-white` | `#FFFFFF` | Card background, active step bg |
| `--color-back-border` | `#E8EBF5` | Back button border |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (fonts, metadata)
│   ├── page.tsx                # Redirect → /sign-in
│   ├── sign-in/
│   │   └── page.tsx            # Sign In page (rebuilt from current HTML)
│   └── onboarding/
│       ├── layout.tsx          # Shared layout: sidebar + content area
│       ├── page.tsx            # Redirect → step-1
│       ├── step-1/page.tsx     # Brand Basics (from Figma)
│       ├── step-2/page.tsx     # Goals & Platforms (placeholder)
│       ├── step-3/page.tsx     # Style & Content Preferences (placeholder)
│       └── step-4/page.tsx     # Summary (placeholder)
├── components/
│   ├── ui/
│   │   ├── button.tsx          # Button variants (primary, ghost, dark)
│   │   ├── input.tsx           # Text input with label
│   │   ├── select.tsx          # Select dropdown with chevron
│   │   └── textarea.tsx        # Textarea with label
│   ├── onboarding/
│   │   ├── sidebar.tsx         # Left sidebar with logo + steps
│   │   ├── step-indicator.tsx  # Single step row (icon, title, subtitle)
│   │   └── step-connector.tsx  # Vertical line between steps
│   └── auth/
│       ├── sign-in-form.tsx    # Email/password form
│       └── google-button.tsx   # Google SSO button
├── context/
│   └── onboarding-context.tsx  # Form state across all 4 steps
└── lib/
    └── fonts.ts                # Font configuration
```

## Components

### OnboardingSidebar

- Fixed left panel, 384px wide
- Background: gradient image from Figma (pink/purple)
- Logo: Jella AI icon + text at top
- 4 step cards with vertical connectors
- Active step: `bg-white/40`, `border-white`, pill shape (rounded-full)
- Inactive steps: transparent background
- Each step: 40px circle icon + title (Mona Sans SemiBold 16px) + subtitle (Source Sans Pro Regular 14px)
- Current step determined by URL pathname

### Step 1: Brand Basics

Form card with white background, `shadow-sm`, `rounded-xl`:

1. **URL field** (full width) — label "Paste your Instagram or Website Link (optional)", placeholder "e.g. https://www.instagram.com/bloomstudio/", paired with "Auto-Fill" button (dark `#3A3546`, sparkle icon, Mona Sans Bold 14px)
2. **Brand Name** + **Niche** — two columns, Brand Name is text input, Niche is select dropdown
3. **Region** + **Language** — two columns, both select dropdowns
4. **Description** — full width textarea, 140px height, pink focus border

Bottom navigation:
- "Back" — ghost button, 2px border `#E8EBF5`, text `#636788`, hidden on Step 1
- "Continue →" — primary `#EA4C89`, white text, arrow icon

### Steps 2-4

Placeholder pages with:
- Step title (from sidebar data)
- Subtitle
- "Coming soon" message
- Back/Continue navigation (functional — navigates between steps)

### Sign In Page

Rebuild of current `index.html`:
- Same two-panel layout (brand panel left, auth form right)
- Same dark/light theme support via OKLCH variables
- Same animations, testimonials slider, form validation
- Converted to React components

## State Management

```typescript
interface OnboardingData {
  // Step 1
  websiteUrl: string;
  brandName: string;
  niche: string;
  region: string;
  language: string;
  description: string;
  // Steps 2-4 (future)
}
```

- `OnboardingContext` with `useReducer`
- Provider wraps `/onboarding` layout
- Data persists across step navigation
- No localStorage — in-memory only

## Navigation

| From | Action | To |
|------|--------|----|
| `/` | Auto redirect | `/sign-in` |
| `/sign-in` | Sign In submit | `/onboarding/step-1` (simulated) |
| `/onboarding` | Auto redirect | `/onboarding/step-1` |
| Step 1 | Continue | Step 2 |
| Step 2 | Continue / Back | Step 3 / Step 1 |
| Step 3 | Continue / Back | Step 4 / Step 2 |
| Step 4 | Submit / Back | console.log / Step 3 |

## Validation

- **Step 1:** Brand Name required, Description required. Others optional.
- Validation runs on "Continue" click, not on blur.
- Error shown below field, red text.
- No cross-step validation.

## Assets

- Jella AI logo: SVG inline (jellyfish icon from current project)
- Step icons: SVG inline (from Figma — briefcase, target, palette, document)
- Auto-Fill sparkle icon: SVG inline
- Arrow right icon: SVG inline
- Sidebar background: CSS gradient or exported image from Figma

## Existing Code Preservation

- Current dark theme OKLCH color system → kept for Sign In page
- Current animations (slideUp, fadeStagger, logoFloat) → converted to Tailwind/CSS modules
- Current form validation logic → converted to React state
- Current testimonials slider → converted to React component with useState

## Non-Goals

- No shadcn/ui (Figma design has its own component style)
- No dark mode for onboarding (Figma is light-only)
- No API calls
- No authentication backend
- No i18n
