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
| `--surface-3` | `oklch(0.15 0.025 280)` | Brand panel |

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
| `--text-muted` | `oklch(0.5 0.02 270)` | Placeholders, hints |

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
- Base: `--surface-3` solid
- Overlay: glassmorphism layer with `backdrop-filter: blur(40px)` and subtle CSS noise
- Noise texture via inline SVG data URI (2x2 fractal noise, very low opacity)

### SVG Decorations
- Orbs: re-colored to OKLCH pink/indigo with higher opacity on dark
- Rings: stroke colors updated to OKLCH
- Jellyfish: preserved, colors updated
- Dot grid: brighter dots (opacity 0.08 instead of 0.03)
- Animation timing: slowed to 15-20s for orbs (more premium, less frantic)

### Feature Cards
- Background: `oklch(0.2 0.02 270 / 0.4)` with `backdrop-filter: blur(20px)`
- Border: `1px solid oklch(0.35 0.03 270 / 0.3)`
- Hover: border brightens, subtle glow shadow appears
- Icon backgrounds: gradient preserved but using OKLCH values

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
- Background: `--surface-1`
- Border: `1px solid --border-subtle`
- Shadow: multi-layer with pink glow tint at edges
- Hover: border brightens slightly, glow intensifies

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
- Background: gradient from `--surface-1` to slightly different shade
- Legal text: `--text-muted`
- Register link: `--accent-primary`

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
