# Jella AI Sign-In — Premium Dark Luxe Redesign

**Date:** 2026-03-15
**Approach:** Dark Luxe
**Stack:** Vanilla HTML / CSS / JS (no framework change)
**Files to modify:** `style.css`, `index.html`, `script.js`

---

## 1. Color System — OKLCH Tokens

All colors migrate from hex to OKLCH via CSS custom properties.

### Surfaces (dark-first)
| Token | Value | Purpose |
|-------|-------|---------|
| `--surface-0` | `oklch(0.13 0.02 270)` | Page background |
| `--surface-1` | `oklch(0.17 0.02 270)` | Auth card |
| `--surface-2` | `oklch(0.21 0.02 270)` | Inputs, elevated |
| `--surface-brand` | `oklch(0.15 0.025 280)` | Brand panel (separate elevation context) |

### Borders
| Token | Value | Purpose |
|-------|-------|---------|
| `--border-subtle` | `oklch(0.28 0.02 270 / 0.5)` | Default borders |
| `--border-interactive` | `oklch(0.72 0.22 350)` | Focus rings |

### Accents
| Token | Value | Purpose |
|-------|-------|---------|
| `--accent-primary` | `oklch(0.68 0.22 350)` | Jella pink — buttons, links |
| `--accent-primary-hover` | `oklch(0.62 0.24 350)` | Hover state |
| `--accent-secondary` | `oklch(0.65 0.2 275)` | Indigo — secondary links |
| `--accent-secondary-hover` | `oklch(0.58 0.22 275)` | Indigo hover |

### Text
| Token | Value | Purpose |
|-------|-------|---------|
| `--text-primary` | `oklch(0.95 0.01 270)` | Headings, strong text |
| `--text-secondary` | `oklch(0.7 0.02 270)` | Paragraphs |
| `--text-muted` | `oklch(0.55 0.02 270)` | Placeholders, hints |

### Feedback
| Token | Value | Purpose |
|-------|-------|---------|
| `--color-success` | `oklch(0.7 0.18 155)` | Valid state |
| `--color-error` | `oklch(0.65 0.22 25)` | Error state |

### Glows
| Token | Value | Purpose |
|-------|-------|---------|
| `--glow-pink` | `oklch(0.68 0.22 350 / 0.25)` | Button glow |
| `--glow-indigo` | `oklch(0.55 0.2 275 / 0.15)` | Decorative glow |

### On-surface
| Token | Value | Purpose |
|-------|-------|---------|
| `--color-on-primary` | `oklch(1 0 0)` | Text/icons on accent-primary bg |

### Shadows (dark-theme optimized)
| Token | Value | Purpose |
|-------|-------|---------|
| `--shadow-card` | `0 2px 4px oklch(0 0 0 / 0.3), 0 8px 32px oklch(0 0 0 / 0.25), 0 0 64px oklch(0.68 0.22 350 / 0.04)` | Card elevation |
| `--shadow-card-hover` | `0 4px 8px oklch(0 0 0 / 0.35), 0 16px 48px oklch(0 0 0 / 0.3), 0 0 80px oklch(0.68 0.22 350 / 0.08)` | Card hover |
| `--shadow-input-focus` | `0 0 0 3px oklch(0.68 0.22 350 / 0.25)` | Input pink glow ring |
| `--shadow-input-error` | `0 0 0 3px oklch(0.65 0.22 25 / 0.2)` | Input error glow ring |
| `--shadow-btn-primary` | `0 2px 12px oklch(0.68 0.22 350 / 0.3)` | Primary button glow |
| `--shadow-btn-primary-hover` | `0 6px 28px oklch(0.68 0.22 350 / 0.4)` | Primary button hover glow |

### Gradients (OKLCH)
| Token | Value | Purpose |
|-------|-------|---------|
| `--gradient-brand` | `linear-gradient(180deg, oklch(0.17 0.03 280) 0%, oklch(0.14 0.02 350) 100%)` | Brand panel / footer bg |
| `--gradient-icon` | `linear-gradient(180deg, oklch(0.68 0.22 350) 0%, oklch(0.6 0.18 350) 100%)` | Icon backgrounds |

### Token Migration Map (old → new)
| Old Token | New Token |
|-----------|-----------|
| `--color-primary` | `--accent-primary` |
| `--color-primary-hover` | `--accent-primary-hover` |
| `--color-primary-light` | removed (not needed on dark) |
| `--color-primary-gradient-end` | part of `--gradient-icon` |
| `--color-secondary` | `--accent-secondary` |
| `--color-secondary-hover` | `--accent-secondary-hover` |
| `--color-success` | `--color-success` (kept) |
| `--color-error` | `--color-error` (kept) |
| `--color-title` | `--text-primary` |
| `--color-heading-dark` | `--text-primary` |
| `--color-paragraph` | `--text-secondary` |
| `--color-paragraph-secondary` | `--text-secondary` |
| `--color-input-bg` | `--surface-2` |
| `--color-input-border` | `--border-subtle` |
| `--color-input-border-hover` | `oklch(0.35 0.02 270 / 0.6)` inline |
| `--color-google-border` | `--border-subtle` |
| `--color-card-bg` | `oklch(0.2 0.02 270 / 0.4)` inline |
| `--color-card-border` | `oklch(0.35 0.03 270 / 0.3)` inline |
| `--color-page-bg` | `--surface-0` |
| `--color-white` | `--color-on-primary` (on accent bg) or `--text-primary` (on surface) |
| `--gradient-brand` | `--gradient-brand` (updated values) |
| `--gradient-icon` | `--gradient-icon` (updated values) |
| `--shadow-card` | `--shadow-card` (updated values) |
| `--shadow-card-hover` | `--shadow-card-hover` (updated values) |
| `--shadow-input-focus` | `--shadow-input-focus` (updated values) |
| `--shadow-input-error` | `--shadow-input-error` (updated values) |
| `--shadow-btn-primary` | `--shadow-btn-primary` (updated values) |
| `--shadow-btn-primary-hover` | `--shadow-btn-primary-hover` (updated values) |

---

## 2. Typography

- **Primary:** Inter (already loaded) — body, inputs, buttons
- **Display:** Wix Madefor Display (already loaded) — headings
- **Text:** Wix Madefor Text (already loaded) — subtext, testimonials
- Body weight on dark: 400 (thin strokes look cleaner on dark backgrounds)
- No font changes needed, only color/weight adjustments

---

## 3. Brand Panel (Left)

### Background
- Base: `--surface-brand` solid
- Overlay: glassmorphism layer with `backdrop-filter: blur(40px)` + `-webkit-backdrop-filter: blur(40px)` and subtle CSS noise
- Noise texture via inline SVG data URI (feTurbulence fractal noise, opacity 0.03)

### SVG Decorations
- Orbs: re-colored to OKLCH pink/indigo with higher opacity on dark
- Rings: stroke colors updated to OKLCH
- Jellyfish: preserved, colors updated
- Dot grid: brighter dots (opacity 0.08 instead of 0.03)
- Animation timing: slowed to 15-20s for orbs (more premium, less frantic)

### Feature Cards
- Background: `oklch(0.2 0.02 270 / 0.4)` with `backdrop-filter: blur(20px)`
- Border: `1px solid oklch(0.35 0.03 270 / 0.3)`
- Hover: translateY(-4px) + border brightens to `oklch(0.4 0.03 270 / 0.4)` + `0 8px 32px oklch(0 0 0 / 0.3)` shadow
- Icon backgrounds: `var(--gradient-icon)` (OKLCH values)

### Testimonials
- Text: `--text-primary` with 0.85 opacity
- Avatar: gradient border (pink → indigo) instead of solid gradient fill
- Active dot: pink glow

### Logo
- Icon bg: `--accent-primary` with glow shadow
- Text: `--text-primary`

---

## 4. Auth Card (Right)

### Card Container
- Background: `var(--surface-1)`
- Border: `1px solid var(--border-subtle)`
- Shadow: `var(--shadow-card)`
- Hover: shadow transitions to `var(--shadow-card-hover)`

### Header
- Logo: pink glow aura around jellyfish SVG icon
- Brand text: `--text-primary`
- Title: `--text-primary`, Wix Madefor Display 700

### Form Inputs
- Background: `--surface-2`
- Border: `--border-subtle`
- Text color: `--text-primary`
- Placeholder: `--text-muted`
- Icon: `--text-muted` → `--accent-primary` on focus
- Focus: pink glow ring (`0 0 0 3px var(--glow-pink)`) + border → `--border-interactive`
- Error: red glow ring + red border
- Valid: green glow ring

### Buttons
- **Sign In (primary):** gradient bg `--accent-primary` → darker, glow shadow, hover lifts + glow expands
- **Google:** `--surface-2` bg, `--border-subtle` border, white text, hover brightens border
- Active: scale(0.98) preserved

### Checkbox
- Unchecked: `--surface-2` bg, `--border-subtle` border
- Checked: `--accent-primary` bg with subtle glow
- Focus-visible: pink outline ring

### Footer
- Background: `var(--gradient-brand)`
- Legal text: `--text-muted`
- Register link: `--accent-primary`

### Disabled Button
- `opacity: 0.5` (more aggressive than light theme to stay visible on dark)
- `cursor: not-allowed`, no hover transforms

---

## 5. Animations & Micro-interactions

### Entrance (page load)
- Same stagger timing structure
- Add: initial `filter: blur(8px)` → `blur(0)` during slideUp (cinematic reveal)
- Duration slightly increased: 0.8s brand panel, 0.7s auth card

### Hover Effects
- Buttons: glow shadow expands + subtle translateY(-2px)
- Feature cards: border-glow appears + scale(1.01)
- Links: color transition + subtle underline animation

### Focus States
- Inputs: pink glow ring (smooth 0.2s transition)
- Buttons: outline ring with offset
- All interactive: consistent 2px outline ring

### Orb Animations
- Slowed to 15-20s cycles
- Added subtle scale oscillation (0.98-1.02)
- Reduced movement amplitude for elegance

---

## 6. Responsive

### Desktop (>1200px)
- Full two-panel layout, all features visible

### Narrow Desktop (<=1200px)
- Reduced padding and font sizes (existing logic preserved)
- Feature card icons slightly smaller

### Tablet (<=1024px)
- Stacked layout (column direction)
- Brand panel full width on top
- Auth card centered below

### Mobile (<=640px)
- Brand panel hidden (existing behavior)
- Auth card full-bleed with `--surface-0` background
- No border-radius, no shadow (fullscreen feel)

---

## 7. Accessibility

- **prefers-reduced-motion:** all glow/pulse/float animations disabled, only opacity transitions
- **forced-colors:** existing overrides preserved
- **Focus visible:** consistent pink outline ring 2px + offset 2px on ALL interactive elements
- **WCAG AA contrast:** all OKLCH values selected for >=4.5:1 text contrast, >=3:1 UI components
- **Screen reader:** no changes to HTML semantics or aria attributes needed

---

## 8. Files Changed

| File | Changes |
|------|---------|
| `style.css` | Complete `:root` token rewrite, all color references updated, new glow/animation properties |
| `index.html` | SVG fill/stroke colors updated to match dark theme, gradient IDs preserved |
| `script.js` | No functional changes needed — all JS logic works with CSS-driven styling |

---

## 9. What Stays the Same

- HTML structure and semantics
- Form validation logic
- Testimonial slider functionality
- Feature card IntersectionObserver
- Password toggle behavior
- Responsive breakpoints (1200px, 1024px, 640px)
- Font families (Inter, Wix Madefor Display, Wix Madefor Text)
