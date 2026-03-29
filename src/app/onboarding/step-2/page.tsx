"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/context/onboarding-context";
import StepNav from "@/components/onboarding/step-nav";

const goals = [
  { emoji: "🎯", label: "Growth & Awareness" },
  { emoji: "💜", label: "Engagement & Community" },
  { emoji: "🤝", label: "Brand Positioning & Strategy" },
  { emoji: "🎨", label: "Creativity & Inspiration" },
  { emoji: "💻", label: "Content Productivity" },
  { emoji: "🔍", label: "Insights & Analytics" },
];

const platforms = [
  {
    name: "Instagram",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <defs>
          <linearGradient id="ig" x1="4" y1="28" x2="28" y2="4">
            <stop offset="0%" stopColor="#feda75" />
            <stop offset="25%" stopColor="#fa7e1e" />
            <stop offset="50%" stopColor="#d62976" />
            <stop offset="75%" stopColor="#962fbf" />
            <stop offset="100%" stopColor="#4f5bd5" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="8" fill="url(#ig)" />
        <rect x="8" y="8" width="16" height="16" rx="5" stroke="white" strokeWidth="1.8" fill="none" />
        <circle cx="16" cy="16" r="4" stroke="white" strokeWidth="1.8" fill="none" />
        <circle cx="21.5" cy="10.5" r="1.2" fill="white" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="#010101" />
        <path d="M21.5 10.5a4.5 4.5 0 01-3.5-3.5h-2.5v12.5a2.5 2.5 0 11-1.75-2.38V14.5a5 5 0 104.25 4.94V14a7 7 0 003.5 1v-2.5a4.5 4.5 0 01-1.5-2z" fill="white" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="#1877F2" />
        <path d="M22 16.07C22 12.72 19.31 10 16 10s-6 2.72-6 6.07c0 3.03 2.19 5.54 5.06 6v-4.24h-1.52v-1.76h1.52v-1.34c0-1.52.89-2.36 2.26-2.36.66 0 1.34.12 1.34.12v1.49h-.75c-.75 0-.98.47-.98.95v1.14h1.66l-.27 1.76h-1.4V22.07c2.87-.46 5.08-2.97 5.08-6z" fill="white" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="#0A66C2" />
        <path d="M12.5 22h-2.5v-8h2.5v8zm-1.25-9.1a1.45 1.45 0 110-2.9 1.45 1.45 0 010 2.9zM23 22h-2.5v-3.9c0-.93-.02-2.13-1.3-2.13-1.3 0-1.5 1.02-1.5 2.06V22h-2.5v-8h2.4v1.09h.03a2.63 2.63 0 012.37-1.3c2.53 0 3 1.67 3 3.83V22z" fill="white" />
      </svg>
    ),
  },
  {
    name: "X (Formerly Twitter)",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="#000000" />
        <path d="M18.9 13.6L23.3 9h-1.04l-3.82 4L15.7 9H11l4.62 6.73L11 20.8h1.04l4.04-4.7 3.23 4.7H24L18.9 13.6zm-1.43 1.66l-.47-.67L12.6 9.85h1.6l3.01 4.3.47.67 3.91 5.6h-1.6l-3.19-4.56z" fill="white" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="#FF0000" />
        <path d="M24.37 12.4a2 2 0 00-1.41-1.42C21.57 10.6 16 10.6 16 10.6s-5.57 0-6.96.38a2 2 0 00-1.41 1.42C7.25 13.8 7.25 16 7.25 16s0 2.2.38 3.6a2 2 0 001.41 1.42c1.39.38 6.96.38 6.96.38s5.57 0 6.96-.38a2 2 0 001.41-1.42c.38-1.4.38-3.6.38-3.6s0-2.2-.38-3.6z" fill="white" />
        <path d="M14.25 18.73V13.27L19 16l-4.75 2.73z" fill="#FF0000" />
      </svg>
    ),
  },
  {
    name: "Pinterest",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="#E60023" />
        <path d="M16 9a7 7 0 00-2.55 13.52c-.07-.6-.13-1.52.03-2.18l.88-3.74s-.22-.45-.22-1.12c0-1.05.61-1.83 1.37-1.83.64 0 .95.48.95 1.06 0 .65-.41 1.62-.63 2.52a1.1 1.1 0 001.12 1.37c1.34 0 2.37-1.41 2.37-3.46 0-1.81-1.3-3.07-3.15-3.07a3.45 3.45 0 00-3.6 3.46c0 .68.26 1.41.59 1.81a.24.24 0 01.05.23l-.22.9c-.04.14-.11.17-.26.1-.99-.46-1.6-1.9-1.6-3.07 0-2.5 1.81-4.79 5.23-4.79 2.75 0 4.88 1.96 4.88 4.57 0 2.73-1.72 4.93-4.11 4.93-.8 0-1.56-.42-1.82-.91l-.49 1.88c-.18.69-.66 1.55-.99 2.08A7 7 0 1016 9z" fill="white" />
      </svg>
    ),
  },
];

function GoalChip({
  emoji,
  label,
  selected,
  onClick,
}: {
  emoji: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 20px",
        borderRadius: 999,
        border: `1px solid ${selected ? "#ea4c89" : "#f3f5fc"}`,
        background: selected ? "rgba(234,76,137,0.1)" : "white",
        color: selected ? "#ea4c89" : "#191e41",
        fontFamily: "var(--font-mona), sans-serif",
        fontWeight: 500,
        fontSize: 15,
        cursor: "pointer",
        transition: "all 0.2s",
        lineHeight: "1.4",
      }}
    >
      {selected ? (
        <span style={{ color: "#ea4c89", fontSize: 14, fontWeight: 700 }}>✓</span>
      ) : (
        <span style={{ color: "#b0b4c8", fontSize: 16 }}>+</span>
      )}
      <span>{emoji}</span>
      {label}
    </button>
  );
}

function PlatformCard({
  name,
  icon,
  selected,
  onClick,
}: {
  name: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 16px",
        borderRadius: 12,
        border: `1px solid ${selected ? "rgba(234,76,137,0.3)" : "#f3f5fc"}`,
        background: selected ? "rgba(234,76,137,0.03)" : "white",
        cursor: "pointer",
        transition: "all 0.2s",
        width: "100%",
        textAlign: "left",
      }}
    >
      <span style={{ flexShrink: 0, display: "flex" }}>{icon}</span>
      <span
        style={{
          flex: 1,
          fontFamily: "var(--font-mona), sans-serif",
          fontWeight: 500,
          fontSize: 15,
          color: "#191e41",
        }}
      >
        {name}
      </span>
      {selected ? (
        <span
          style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: "#ea4c89",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: 12,
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          ✓
        </span>
      ) : (
        <span
          style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            border: "1.5px solid #d0d3e0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#b0b4c8",
            fontSize: 14,
            flexShrink: 0,
          }}
        >
          +
        </span>
      )}
    </button>
  );
}

export default function Step2Page() {
  const router = useRouter();
  const { data, updateField, setCurrentStep } = useOnboarding();
  const s = data.step2;

  useEffect(() => {
    setCurrentStep(2);
  }, [setCurrentStep]);

  const toggleArray = (field: "goals" | "platforms", val: string) => {
    const arr = s[field];
    const next = arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
    updateField("step2", field, next);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {/* Header */}
        <div>
          <h1
            style={{
              fontFamily: "var(--font-mona), sans-serif",
              fontWeight: 600,
              fontSize: 32,
              color: "#191e41",
              margin: 0,
            }}
          >
            Goals & Platforms
          </h1>
          <p
            style={{
              fontFamily: "var(--font-mona), sans-serif",
              fontWeight: 400,
              fontSize: 16,
              color: "#636788",
              margin: "8px 0 0 0",
              lineHeight: "1.5",
            }}
          >
            Add your website or Instagram link — this helps AI understand your brand&apos;s audience, tone, and product style.
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            background: "white",
            borderRadius: 12,
            boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
            paddingBottom: 24,
          }}
        >
          {/* Section 1: Goals */}
          <div style={{ padding: 24, borderBottom: "1px solid #f3f5fc" }}>
            <div
              style={{
                fontFamily: "var(--font-mona), sans-serif",
                fontWeight: 600,
                fontSize: 16,
                color: "#191e41",
                marginBottom: 4,
              }}
            >
              What&apos;s your main focus?
            </div>
            <div
              style={{
                fontFamily: "var(--font-source), 'Source Sans 3', sans-serif",
                fontWeight: 400,
                fontSize: 14,
                color: "#636788",
                marginBottom: 16,
              }}
            >
              Tell us about your business
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {goals.map((g) => (
                <GoalChip
                  key={g.label}
                  emoji={g.emoji}
                  label={g.label}
                  selected={s.goals.includes(g.label)}
                  onClick={() => toggleArray("goals", g.label)}
                />
              ))}
            </div>
          </div>

          {/* Section 2: Platforms */}
          <div style={{ padding: 24 }}>
            <div
              style={{
                fontFamily: "var(--font-mona), sans-serif",
                fontWeight: 600,
                fontSize: 16,
                color: "#191e41",
                marginBottom: 4,
              }}
            >
              What&apos;s your main focus?
            </div>
            <div
              style={{
                fontFamily: "var(--font-source), 'Source Sans 3', sans-serif",
                fontWeight: 400,
                fontSize: 14,
                color: "#636788",
                marginBottom: 16,
              }}
            >
              Tell us about your business
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 12,
              }}
            >
              {platforms.map((p) => (
                <PlatformCard
                  key={p.name}
                  name={p.name}
                  icon={p.icon}
                  selected={s.platforms.includes(p.name)}
                  onClick={() => toggleArray("platforms", p.name)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <StepNav
        step={2}
        totalSteps={4}
        onContinue={() => router.push("/onboarding/step-3")}
        onBack={() => router.push("/onboarding/step-1")}
      />
    </div>
  );
}
