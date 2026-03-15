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

Both Sign In and Onboarding use the same font pair:
- **Mona Sans** (SemiBold, Bold) — headings, labels, buttons. Replaces Inter and Wix Madefor Display.
- **Source Sans 3** (Regular, SemiBold) — body text, placeholders, descriptions. Replaces Wix Madefor Text. (Google Fonts renamed Source Sans Pro → Source Sans 3.)

Old fonts (Inter, Wix Madefor) are removed completely.

Loaded via `next/font/local` (Mona Sans — GitHub font) and `next/font/google` (Source Sans 3).

## Color System (OKLCH)

Onboarding uses a light theme. All values stored as CSS custom properties in OKLCH.

| Token | OKLCH Value | Hex Reference | Usage |
|-------|-------------|---------------|-------|
| `--bg-page` | `oklch(0.98 0.005 270)` | #FAFBFF | Page background |
| `--color-title` | `oklch(0.22 0.04 270)` | #191E41 | Headings |
| `--color-body` | `oklch(0.5 0.03 270)` | #636788 | Body text, descriptions |
| `--color-primary` | `oklch(0.65 0.24 350)` | #EA4C89 | Primary buttons, active states |
| `--color-primary-dark` | `oklch(0.3 0.03 300)` | #3A3546 | Auto-Fill button |
| `--color-border` | `oklch(0.96 0.005 270)` | #F3F5FC | Input borders, dividers |
| `--color-border-focus` | `oklch(0.65 0.24 350 / 0.2)` | rgba(234,76,137,0.2) | Focused input border |
| `--color-input-bg` | `oklch(0.98 0.005 270)` | #FAFBFF | Input background |
| `--color-white` | `oklch(1 0 0)` | #FFFFFF | Card background |
| `--color-back-border` | `oklch(0.92 0.01 270)` | #E8EBF5 | Back button border |

Sign In page keeps existing OKLCH dark/light tokens from `style.css`.

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
- Sidebar background: `linear-gradient(180deg, oklch(0.95 0.02 280) 0%, oklch(0.93 0.015 340) 100%)` with soft pink tint

### Step 1: Brand Basics

Form card with white background, `shadow-sm`, `rounded-xl`:

1. **URL field** (full width) — label "Paste your Instagram or Website Link (optional)", placeholder "e.g. https://www.instagram.com/bloomstudio/", paired with "Auto-Fill" button (dark, sparkle icon, Mona Sans Bold 14px). **Auto-Fill is disabled** (no backend) — button shows `opacity-50 cursor-not-allowed`, tooltip "Coming soon"
2. **Brand Name** (text input) + **Niche** (custom select) — two columns
3. **Region** (custom select) + **Language** (custom select) — two columns
4. **Description** — full width textarea, 140px height, pink focus border

**Select options (placeholder data):**
- **Niche:** Beauty, Fashion, Food, Tech, Fitness, Travel, Education, Other
- **Region:** North America, Europe, Asia, Latin America, Middle East, Africa, Oceania
- **Language:** English, Spanish, French, German, Portuguese, Japanese, Korean, Chinese

**Select component:** Custom styled (not native `<select>`). Trigger shows selected value + chevron-down icon. Dropdown is a positioned list with hover highlight. Rounded-lg, border `--color-border`, white background.

Bottom navigation:
- "Back" — ghost button, 2px border `var(--color-back-border)`, text `var(--color-body)`, hidden on Step 1
- "Continue →" — primary `var(--color-primary)`, white text, arrow icon

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
- Error messages:
  - Brand Name empty: "Please enter your brand name"
  - Description empty: "Please add a short description of your brand"
- Error shown below field in red (`oklch(0.55 0.22 25)`), with subtle shakeIn animation
- Focus moves to first errored field on submit
- No cross-step validation.

## Responsive Behavior

### Onboarding

| Breakpoint | Behavior |
|-----------|----------|
| >= 1024px | Sidebar 384px fixed left + content fills remaining width |
| 768-1023px | Sidebar collapses to top stepper bar (horizontal steps, icons only) + content below |
| < 768px | Top stepper bar (step numbers only, no text) + full-width content, padding reduced |

### Sign In (preserved from current CSS)

| Breakpoint | Behavior |
|-----------|----------|
| >= 1024px | Two-panel: brand left + auth right |
| < 1024px | Stacked: brand top + auth below |
| < 640px | Auth only, full-screen |

## Step Transitions

- No animated transitions between steps (instant page navigation via App Router)
- Form card fades in on mount: `opacity 0→1, translateY 8px→0, 300ms ease-out`
- Sidebar active step highlight transitions smoothly: `background-color 200ms ease`

## Step 4: Submit Behavior

- "Continue" button text changes to "Finish Setup"
- On click: `console.log(onboardingData)`, then show success state inside the card:
  - Checkmark icon (green)
  - "You're all set!" heading
  - "Your brand profile has been created." subtitle
  - "Go to Dashboard" button (disabled, shows "Coming soon" tooltip)

## Assets

- Jella AI logo: SVG inline (jellyfish icon from current project)
- Step icons: SVG inline (from Figma — briefcase, target, palette, document)
- Auto-Fill sparkle icon: SVG inline
- Arrow right icon: SVG inline
- Sidebar background: CSS gradient (see OnboardingSidebar section)

## Existing Code Preservation

- Current dark theme OKLCH color system → kept for Sign In page (separate CSS scope)
- Current animations (slideUp, fadeStagger, logoFloat) → converted to Tailwind/CSS modules
- Current form validation logic → converted to React state
- Current testimonials slider → converted to React component with useState
- Fonts changed globally: Mona Sans + Source Sans Pro replace Inter + Wix Madefor

## Non-Goals

- No shadcn/ui (Figma design has its own component style)
- No dark mode for onboarding (Figma is light-only)
- No API calls
- No authentication backend
- No i18n
