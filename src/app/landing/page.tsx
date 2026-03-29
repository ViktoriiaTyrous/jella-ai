"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Logo from "@/components/ui/logo";

/* ───────── helpers ───────── */
function useOnScreen(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function FadeIn({ children, style, delay = 0 }: { children: React.ReactNode; style?: React.CSSProperties; delay?: number }) {
  const { ref, visible } = useOnScreen();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ───────── constants ───────── */
const PINK = "#ea4c89";
const NAVY = "#191e41";
const INDIGO = "#4338CA";
const BODY = "#636788";
const BG = "#fafbff";
const CARD_BORDER = "#f0f1f5";
const WHITE = "#ffffff";
const PINK_LIGHT = "#fdf2f7";
const INDIGO_LIGHT = "#eef2ff";

const heading: React.CSSProperties = { fontFamily: "var(--font-mona), system-ui, sans-serif", color: NAVY, margin: 0 };
const body: React.CSSProperties = { fontFamily: "var(--font-source), system-ui, sans-serif", color: BODY, margin: 0 };

/* ───────── icons ───────── */
function IconCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={INDIGO} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function IconArrowRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
function IconPlay() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={PINK} stroke="none">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

/* Feature card icons — indigo outline style like Figma */
function IconHome2() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={INDIGO} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
      <path d="M9 21V12h6v9" />
    </svg>
  );
}
function IconDocument() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={INDIGO} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}
function IconBriefcase2() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={INDIGO} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
    </svg>
  );
}
function IconHeart2() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={INDIGO} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  );
}
function IconUsers2() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={INDIGO} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}
function IconDollar2() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={INDIGO} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    </svg>
  );
}

/* ───────── What You Can Do tabs ───────── */
const featureTabs = [
  {
    label: "AI Content",
    title: "Write Once, Post Everywhere",
    desc: "Tell Jella your idea — it writes scroll-stopping captions, picks trending hashtags, and adapts the tone for each platform. What used to take an hour now takes seconds.",
  },
  {
    label: "Smart Scheduler",
    title: "Set It, Forget It, Grow",
    desc: "Drop posts into a visual calendar. Jella finds the best time for each platform automatically — so your content lands when your audience is most active, even while you sleep.",
  },
  {
    label: "Analytics",
    title: "Numbers That Actually Help",
    desc: "Skip the spreadsheet. See which posts drive followers, which reels get shared, and where your growth is coming from — in dashboards that make sense at a glance.",
  },
  {
    label: "Media Studio",
    title: "Scroll-Stopping Visuals in Clicks",
    desc: "Generate on-brand images with AI, resize for any platform, and build carousel templates you can reuse. No design skills needed — your feed will look like a pro made it.",
  },
];

/* ───────── testimonials ───────── */
const testimonials = [
  { text: "We cut our content production time by 70%. Jella writes drafts that actually sound like us — not like a robot.", author: "Lana Smith", role: "Marketing Director, Bloom Studio" },
  { text: "Our engagement jumped 40% in the first month. The smart scheduling alone paid for the subscription.", author: "Amir R.", role: "Content Strategist, Nomad Collective" },
  { text: "I was using Canva, Buffer, and Google Sheets. Now it's just Jella. One login, everything handled.", author: "Sofia Chen", role: "Founder, Studio Matcha" },
];

/* ───────── integrations ───────── */
const integrations = [
  { name: "Instagram", color: "#E1306C", letter: "I" },
  { name: "Jella AI", color: PINK, letter: "" },
  { name: "TikTok", color: "#000000", letter: "T" },
  { name: "LinkedIn", color: "#0A66C2", letter: "L" },
  { name: "Twitter", color: "#1DA1F2", letter: "T" },
  { name: "Facebook", color: "#1877F2", letter: "F" },
  { name: "Pinterest", color: "#E60023", letter: "P" },
];

/* ═══════════════════════════════════════════════════════ */
export default function LandingPage() {
  const [activeNav, setActiveNav] = useState("Home");
  const [activeTab, setActiveTab] = useState(0);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTestimonialIdx(i => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  const navItems = ["Home", "About", "Services", "Pricing", "Contacts"];

  return (
    <div style={{ background: BG, minHeight: "100vh", overflowX: "hidden" }}>

      {/* ════════ HEADER + HERO (pink bg) — sticky ════════ */}
      <section style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        background: "linear-gradient(180deg, #e84393 0%, #ec6fa2 40%, #f5a0c0 70%, #fce4ec 95%, #fafbff 100%)",
        marginBottom: -20,
      }}>
        {/* SVG grid pattern overlay */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: "url(/hero-bg.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }} />

        {/* Header */}
        <header style={{ position: "relative", zIndex: 10 }}>
          <div style={{ maxWidth: 1400, margin: "0 auto", padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
              <Logo size="sm" variant="light" />
              <span style={{ ...heading, fontSize: 22, fontWeight: 700, color: WHITE }}>Jella AI</span>
            </Link>

            <nav style={{ display: "flex", gap: 8, background: "rgba(255,255,255,0.12)", borderRadius: 14, padding: 6 }}>
              {navItems.map(item => (
                <button
                  key={item}
                  onClick={() => setActiveNav(item)}
                  style={{
                    padding: "8px 28px",
                    borderRadius: 10,
                    border: "none",
                    cursor: "pointer",
                    fontSize: 16,
                    fontWeight: 500,
                    fontFamily: "var(--font-source), system-ui, sans-serif",
                    background: activeNav === item ? "rgba(255,255,255,0.85)" : "transparent",
                    color: activeNav === item ? PINK : WHITE,
                    transition: "all 0.2s",
                  }}
                >
                  {item}
                </button>
              ))}
            </nav>

            <Link
              href="/sign-up"
              style={{
                padding: "12px 24px",
                background: "transparent",
                color: WHITE,
                borderRadius: 10,
                textDecoration: "none",
                fontWeight: 600,
                fontSize: 15,
                fontFamily: "var(--font-source), system-ui, sans-serif",
                border: "1px solid rgba(255,255,255,0.4)",
              }}
            >
              Get Started
            </Link>
          </div>
        </header>

        {/* Hero content */}
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1400, margin: "0 auto", padding: "160px 40px 0", textAlign: "center" }}>

          {/* Floating social badges — glassmorphism */}
          {[
            { name: "Instagram", top: 180, left: 80, right: "auto", bg: "rgba(225,48,108,0.6)", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="white" strokeWidth="2"/><circle cx="12" cy="12" r="5" fill="none" stroke="white" strokeWidth="2"/><circle cx="18" cy="6" r="1.5" fill="white"/></svg> },
            { name: "X (Twitter)", top: 40, left: "auto", right: 180, bg: "rgba(26,26,46,0.6)", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
            { name: "TikTok", top: 280, left: "auto", right: 40, bg: "rgba(26,26,46,0.6)", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.01a8.27 8.27 0 004.77 1.52V7.08a4.83 4.83 0 01-1-.39z"/></svg> },
            { name: "LinkedIn", top: 80, left: 160, right: "auto", bg: "rgba(10,102,194,0.6)", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg> },
            { name: "YouTube", top: 110, left: "auto", right: 50, bg: "rgba(255,0,0,0.6)", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
          ].map(badge => (
            <div key={badge.name} style={{ position: "absolute", top: badge.top, left: badge.left === "auto" ? undefined : badge.left, right: badge.right === "auto" ? undefined : badge.right, zIndex: 2 }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 8, padding: "10px 18px",
                background: badge.bg,
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                borderRadius: 28, color: WHITE, fontSize: 13, fontWeight: 600,
                fontFamily: "var(--font-source)",
                border: "1px solid rgba(255,255,255,0.2)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
              }}>
                {badge.icon}
                {badge.name}
              </div>
            </div>
          ))}

          <FadeIn>
            <h1 style={{
              ...heading,
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: 950,
              margin: "0 auto",
              letterSpacing: "-0.02em",
              background: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.4) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Your All-in-One Platform for Social Media Growth
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p style={{ ...body, fontSize: 18, lineHeight: 1.6, maxWidth: 600, margin: "24px auto 0", color: "rgba(255,255,255,0.7)" }}>
              Create AI-powered posts, schedule content, and grow your audience — all from one beautiful dashboard.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 36 }}>
              <Link
                href="/sign-up"
                style={{
                  padding: "14px 32px",
                  background: INDIGO,
                  color: WHITE,
                  borderRadius: 10,
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: 16,
                  fontFamily: "var(--font-source), system-ui, sans-serif",
                }}
              >
                See All Features
              </Link>
              <button
                style={{
                  padding: "14px 32px",
                  background: "rgba(255,255,255,0.15)",
                  color: WHITE,
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.3)",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: 16,
                  fontFamily: "var(--font-source), system-ui, sans-serif",
                  backdropFilter: "blur(8px)",
                }}
              >
                View Video Demo
              </button>
            </div>
          </FadeIn>

          {/* Browser Chrome with Dashboard Screenshot */}
          <FadeIn delay={0.3}>
            <div style={{ marginTop: 50, maxWidth: 1100, margin: "50px auto 0", borderRadius: 16, overflow: "hidden", boxShadow: "0 20px 80px rgba(0,0,0,0.15)", border: "1px solid rgba(255,255,255,0.2)" }}>
              {/* Browser bar */}
              <div style={{ background: "#f8f9fc", padding: "14px 20px", display: "flex", alignItems: "center", gap: 12, borderBottom: `1px solid ${CARD_BORDER}` }}>
                <div style={{ display: "flex", gap: 8 }}>
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f56" }} />
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ffbd2e" }} />
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#27c93f" }} />
                </div>
                <div style={{ flex: 1, background: WHITE, borderRadius: 8, padding: "8px 16px", border: `1px solid ${CARD_BORDER}`, textAlign: "center" }}>
                  <span style={{ ...body, fontSize: 13, color: "#9ca3af" }}>app.jella.ai/dashboard</span>
                </div>
              </div>
              {/* Dashboard preview */}
              <div style={{ background: WHITE, position: "relative" }}>
                <img src="/dashboard-preview.png" alt="Jella AI Dashboard" style={{ width: "100%", display: "block" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════ SOCIAL PROOF ════════ */}
      <section style={{ position: "relative", zIndex: 10, padding: "120px 0", background: WHITE, borderRadius: "32px 32px 0 0", boxShadow: "0 -10px 40px rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px", display: "flex", gap: 80, alignItems: "center" }}>
          <FadeIn style={{ flex: 1 }}>
            <div>
              <h2 style={{ ...heading, fontSize: 56, fontWeight: 700, lineHeight: 1.15 }}>
                Social Media Shouldn&apos;t Be This Complicated
              </h2>
              <p style={{ ...body, fontSize: 18, marginTop: 20, lineHeight: 1.6 }}>
                Stop juggling 5 different tools. Jella handles everything.
              </p>
              <Link
                href="/sign-up"
                style={{
                  display: "inline-block",
                  marginTop: 28,
                  padding: "14px 28px",
                  background: INDIGO,
                  color: WHITE,
                  borderRadius: 12,
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: 15,
                  fontFamily: "var(--font-source), system-ui, sans-serif",
                }}
              >
                See All Features
              </Link>

              <div style={{ marginTop: 60 }}>
                <div style={{ display: "flex", alignItems: "baseline" }}>
                  <span style={{
                    ...heading, fontSize: 220, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 0.85,
                    background: "linear-gradient(90deg, #d94f84 0%, #c44a8a 25%, #a855a8 50%, #9b7bc4 75%)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  }}>37K</span>
                  <span style={{
                    ...heading, fontSize: 220, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 0.85,
                    color: "rgba(147, 130, 200, 0.45)",
                  }}>+</span>
                </div>
                <div style={{ marginTop: 16, display: "inline-flex", alignItems: "center", padding: "10px 24px", background: "#f3f5f9", borderRadius: 28 }}>
                  <span style={{ ...body, fontSize: 18, color: NAVY, fontWeight: 500 }}>Creators We Aim To Support</span>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} style={{ flex: 1 }}>
            <div style={{ borderRadius: 20, overflow: "hidden", background: "#e8ecf4", height: 550 }}>
              <img src="/social-proof.png" alt="Content creators collaborating" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════ WHAT YOU CAN DO — with tabs + pink gradient card ════════ */}
      <section style={{ position: "relative", zIndex: 11, padding: "120px 0", background: "#ede9f6" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2 style={{ ...heading, fontSize: 48, fontWeight: 700 }}>
                One Dashboard. Every Tool You Need.
              </h2>
              <p style={{ ...body, fontSize: 18, marginTop: 16, maxWidth: 600, margin: "16px auto 0" }}>
                Create, schedule, analyze, and design — all without leaving Jella.
              </p>
            </div>
          </FadeIn>

          {/* Tab navigation — single white pill container */}
          <FadeIn delay={0.1}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 40 }}>
              <div style={{
                display: "inline-flex",
                padding: 4,
                background: WHITE,
                borderRadius: 12,
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              }}>
                {featureTabs.map((tab, i) => (
                  <button
                    key={tab.label}
                    onClick={() => setActiveTab(i)}
                    style={{
                      padding: "12px 28px",
                      borderRadius: 8,
                      border: "none",
                      cursor: "pointer",
                      fontSize: 15,
                      fontWeight: activeTab === i ? 600 : 500,
                      fontFamily: "var(--font-source), system-ui, sans-serif",
                      background: activeTab === i ? PINK : "transparent",
                      color: activeTab === i ? WHITE : NAVY,
                      transition: "all 0.25s ease",
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Pink gradient card with content + screenshot */}
          <FadeIn delay={0.2}>
            <div style={{
              borderRadius: 28,
              background: "linear-gradient(135deg, #e84393 0%, #ec6fa2 50%, #f5a0c0 100%)",
              padding: "56px 0 56px 56px",
              display: "flex",
              alignItems: "center",
              minHeight: 500,
              overflow: "hidden",
              position: "relative",
            }}>
              {/* Left text */}
              <div style={{ flex: "0 0 50%", maxWidth: "50%", position: "relative", zIndex: 1, paddingRight: 40 }}>
                <p style={{ ...body, fontSize: 16, color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>
                  {featureTabs[activeTab].label}
                </p>
                <h3 style={{ ...heading, fontSize: 40, fontWeight: 700, color: WHITE, marginTop: 16, lineHeight: 1.2 }}>
                  {featureTabs[activeTab].title}
                </h3>
                <p style={{ ...body, fontSize: 16, color: "rgba(255,255,255,0.8)", marginTop: 20, lineHeight: 1.7 }}>
                  {featureTabs[activeTab].desc}
                </p>
                <Link
                  href="/sign-up"
                  style={{
                    display: "inline-block",
                    marginTop: 32,
                    padding: "16px 32px",
                    background: INDIGO,
                    color: WHITE,
                    borderRadius: 12,
                    textDecoration: "none",
                    fontWeight: 600,
                    fontSize: 16,
                    fontFamily: "var(--font-source), system-ui, sans-serif",
                  }}
                >
                  Start Creating
                </Link>
              </div>

              {/* Right: dashboard screenshot — max 50% width */}
              <div style={{
                flex: "0 0 50%",
                maxWidth: "50%",
                borderRadius: "16px 0 0 16px",
                overflow: "hidden",
                boxShadow: "-8px 8px 40px rgba(0,0,0,0.12)",
                position: "relative",
                zIndex: 1,
              }}>
                <div style={{ background: WHITE, borderRadius: "16px 0 0 16px", overflow: "hidden" }}>
                  <img src="/dashboard-preview.png" alt="Jella AI Features" style={{ width: "100%", display: "block" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                </div>
              </div>

              {/* Decorative circles */}
              <div style={{ position: "absolute", top: -60, right: 280, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
              <div style={{ position: "absolute", top: 40, right: 180, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
              <div style={{ position: "absolute", bottom: -40, left: -40, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════ WHY PEOPLE CHOOSE ════════ */}
      <section style={{ position: "relative", zIndex: 12, padding: "120px 0", background: WHITE }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px" }}>
          <FadeIn>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
              <div>
                <h2 style={{ ...heading, fontSize: 48, fontWeight: 700 }}>
                  Why People Choose <span style={{ color: INDIGO }}>Jella</span>
                </h2>
                <p style={{ ...body, fontSize: 18, marginTop: 12 }}>
                  Smart tools that simplify every step of your content journey.
                </p>
              </div>
              <Link
                href="/sign-up"
                style={{
                  padding: "14px 28px",
                  background: NAVY,
                  color: WHITE,
                  borderRadius: 12,
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: 15,
                  fontFamily: "var(--font-source), system-ui, sans-serif",
                  whiteSpace: "nowrap",
                }}
              >
                Start Your Journey
              </Link>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[
              { icon: <IconHome2 />, title: "AI Post Creator", desc: "Describe your idea in one sentence. Jella writes platform-ready captions with hashtags, emojis, and the right tone." },
              { icon: <IconDocument />, title: "Visual Calendar", desc: "Drag-and-drop your posts across a weekly or monthly view. See gaps at a glance and fill them in seconds." },
              { icon: <IconBriefcase2 />, title: "Performance Analytics", desc: "Real-time dashboards show what drives followers, clicks, and shares — no CSV exports needed." },
              { icon: <IconHeart2 />, title: "Brand Templates", desc: "Save your colors, fonts, and voice. Every new post starts on-brand — just tweak and publish." },
              { icon: <IconUsers2 />, title: "Team Workspace", desc: "Invite your team, assign roles, leave feedback on drafts, and approve posts before they go live." },
              { icon: <IconDollar2 />, title: "Growth Recommendations", desc: "Jella spots patterns in your top posts and tells you exactly what to do next to grow faster." },
            ].map((card, i) => (
              <FadeIn key={card.title} delay={i * 0.08}>
                <div style={{
                  padding: 32,
                  borderRadius: 16,
                  border: `1px solid ${CARD_BORDER}`,
                  background: WHITE,
                  transition: "box-shadow 0.3s, transform 0.3s",
                  cursor: "default",
                  height: "100%",
                }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 14,
                    background: INDIGO_LIGHT,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {card.icon}
                  </div>
                  <h3 style={{ ...heading, fontSize: 20, fontWeight: 600, marginTop: 20 }}>{card.title}</h3>
                  <p style={{ ...body, fontSize: 15, lineHeight: 1.7, marginTop: 12 }}>{card.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ SEE IT IN ACTION / VIDEO ════════ */}
      <section style={{ position: "relative", zIndex: 13, padding: "120px 0", background: BG }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px", display: "flex", gap: 60, alignItems: "center" }}>
          {/* Video / Screenshot */}
          <FadeIn style={{ flex: 1 }}>
            <div style={{ borderRadius: 20, overflow: "hidden", background: "#1a1a2e", position: "relative", minHeight: 400, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src="/dashboard-preview.png" alt="Jella AI Demo" style={{ width: "100%", opacity: 0.6 }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              {/* Play button overlay */}
              <div style={{
                position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.95)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 8px 30px rgba(0,0,0,0.2)", cursor: "pointer",
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill={PINK} stroke="none">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <div style={{ position: "absolute", bottom: 20, left: 20, display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.15)", borderRadius: 8, padding: "8px 14px" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                <span style={{ color: WHITE, fontSize: 13, fontFamily: "var(--font-source)" }}>Watch the 90-second tour</span>
              </div>
            </div>
          </FadeIn>

          {/* Text content */}
          <FadeIn delay={0.15} style={{ flex: 1 }}>
            <div>
              <h2 style={{ ...heading, fontSize: 42, fontWeight: 700, lineHeight: 1.2 }}>
                Discover the Key Features of <span style={{ color: PINK }}>Jella</span>
              </h2>
              <p style={{ ...body, fontSize: 16, marginTop: 20, lineHeight: 1.7 }}>
                Jella brings all essential content creation tools into one intuitive platform — helping you create posts, schedule content, analyze performance, and grow your audience without stress.
              </p>
              <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  "Simplify your workflow with step-by-step guidance",
                  "Get personalized recommendations and alerts",
                  "Access AI-powered tools and proven templates",
                ].map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: INDIGO_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <IconCheck />
                    </div>
                    <span style={{ ...body, fontSize: 15, color: NAVY }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════ BEFORE / AFTER ════════ */}
      <section style={{ position: "relative", zIndex: 14, padding: "120px 0", background: "linear-gradient(180deg, #1a1a2e 0%, #191e41 100%)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <h2 style={{ ...heading, fontSize: 48, fontWeight: 700, color: WHITE }}>
                Compare Jella: One Platform,{"\n"}Endless Advantages
              </h2>
              <p style={{ ...body, fontSize: 18, marginTop: 16, color: "rgba(255,255,255,0.6)", maxWidth: 700, margin: "16px auto 0" }}>
                Canva for design. Buffer for scheduling. Google Analytics for data. Notion for planning. Or just Jella — for everything.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div style={{ display: "flex", gap: 40, alignItems: "flex-start" }}>
              {/* Left */}
              <div style={{ flex: "0 0 400px" }}>
                <h3 style={{ ...heading, fontSize: 14, fontWeight: 600, color: PINK, textTransform: "uppercase", letterSpacing: "0.05em" }}>Smart Content Engine</h3>
                <h4 style={{ ...heading, fontSize: 28, fontWeight: 700, color: WHITE, marginTop: 12, lineHeight: 1.3 }}>
                  One AI That Does the Work of Five Apps
                </h4>
                <p style={{ ...body, fontSize: 15, color: "rgba(255,255,255,0.6)", marginTop: 12, lineHeight: 1.7 }}>
                  Write captions, generate visuals, schedule posts, track results, and get growth tips — all inside a single dashboard built for creators who value their time.
                </p>
                <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 12 }}>
                  {["Content creation", "Scheduling & publishing", "Analytics & reporting", "Team collaboration"].map(item => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={PINK} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span style={{ ...body, fontSize: 14, color: "rgba(255,255,255,0.7)" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Dashboard */}
              <div style={{ flex: 1, borderRadius: 16, overflow: "hidden", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", minHeight: 400 }}>
                <img src="/dashboard-preview.png" alt="Jella Dashboard" style={{ width: "100%", opacity: 0.85 }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════ INTEGRATIONS ════════ */}
      <section style={{ position: "relative", zIndex: 15, padding: "120px 0", background: WHITE }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <FadeIn>
            <h2 style={{ ...heading, fontSize: 48, fontWeight: 700 }}>
              Connected Services{"\n"}& Integrations
            </h2>
            <p style={{ ...body, fontSize: 18, marginTop: 16 }}>
              Connect once — Jella handles cross-posting, format adapting, and optimal timing for each platform.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 48, flexWrap: "wrap" }}>
              {integrations.map(p => (
                <div key={p.name} style={{
                  padding: "16px 24px",
                  borderRadius: 14,
                  border: `1px solid ${p.name === "Jella AI" ? "transparent" : CARD_BORDER}`,
                  background: p.name === "Jella AI" ? PINK : WHITE,
                  display: "flex", alignItems: "center", gap: 10,
                  boxShadow: p.name === "Jella AI" ? "0 4px 20px rgba(234,76,137,0.25)" : "0 1px 4px rgba(0,0,0,0.04)",
                  cursor: "default",
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: p.name === "Jella AI" ? "rgba(255,255,255,0.2)" : `${p.color}15`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {p.name === "Jella AI" ? <Logo size="sm" variant="light" /> : (
                      <span style={{ fontSize: 16, fontWeight: 700, color: p.color }}>{p.letter}</span>
                    )}
                  </div>
                  <span style={{
                    ...body, fontWeight: 600, fontSize: 14,
                    color: p.name === "Jella AI" ? WHITE : NAVY,
                  }}>{p.name}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════ MOBILE EXPERIENCE ════════ */}
      <section style={{ position: "relative", zIndex: 16, padding: "120px 0", background: BG }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <h2 style={{ ...heading, fontSize: 48, fontWeight: 700 }}>
                Explore The Jella{"\n"}<span style={{ color: PINK }}>Mobile Experience</span>
              </h2>
              <p style={{ ...body, fontSize: 18, marginTop: 16, maxWidth: 600, margin: "16px auto 0" }}>
                Approve a post from the couch. Check analytics at the coffee shop. Jella works wherever you do.
              </p>
            </div>
          </FadeIn>

          <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
            {/* Left - iOS */}
            <FadeIn style={{ flex: 1 }}>
              <div>
                <h3 style={{ ...heading, fontSize: 24, fontWeight: 600, marginBottom: 16 }}>iPhone & iPad</h3>
                <p style={{ ...body, fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>
                  Full AI generation, scheduling, and analytics — optimized for iOS with native notifications.
                </p>
                {["Draft and publish posts on the go", "Get push alerts when posts go live", "Review team submissions with one tap"].map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: INDIGO_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <IconCheck />
                    </div>
                    <span style={{ ...body, fontSize: 14, color: NAVY }}>{item}</span>
                  </div>
                ))}
                <button style={{
                  marginTop: 20, padding: "12px 24px", background: NAVY, color: WHITE,
                  borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 14,
                  fontFamily: "var(--font-source), system-ui, sans-serif",
                }}>
                  Download for iOS
                </button>
              </div>
            </FadeIn>

            {/* Center - phone mockup */}
            <FadeIn delay={0.15} style={{ flex: "0 0 300px", textAlign: "center" }}>
              <div style={{
                width: 260, height: 520, borderRadius: 36, background: NAVY,
                margin: "0 auto", padding: 8, boxShadow: "0 20px 60px rgba(25,30,65,0.2)",
              }}>
                <div style={{
                  width: "100%", height: "100%", borderRadius: 28, background: WHITE,
                  overflow: "hidden",
                }}>
                  <img src="/dashboard-preview.png" alt="Jella Mobile" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                </div>
              </div>
            </FadeIn>

            {/* Right - Android */}
            <FadeIn delay={0.3} style={{ flex: 1 }}>
              <div>
                <h3 style={{ ...heading, fontSize: 24, fontWeight: 600, marginBottom: 16 }}>Android</h3>
                <p style={{ ...body, fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>
                  Same powerful features, built natively for Android. Your content syncs in real time across every device.
                </p>
                {["Capture ideas with voice-to-post", "Schedule content from anywhere", "Track growth metrics in real time"].map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: INDIGO_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <IconCheck />
                    </div>
                    <span style={{ ...body, fontSize: 14, color: NAVY }}>{item}</span>
                  </div>
                ))}
                <button style={{
                  marginTop: 20, padding: "12px 24px", background: NAVY, color: WHITE,
                  borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 14,
                  fontFamily: "var(--font-source), system-ui, sans-serif",
                }}>
                  Download for Android
                </button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ════════ DASHBOARD PREVIEW ════════ */}
      <section style={{ position: "relative", zIndex: 17, padding: "120px 0", background: WHITE }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <h2 style={{ ...heading, fontSize: 48, fontWeight: 700 }}>
                Seamless Access,{"\n"}Anytime & Anywhere
              </h2>
              <p style={{ ...body, fontSize: 18, marginTop: 16, maxWidth: 700, margin: "16px auto 0" }}>
                Analytics, content calendar, and AI tools — all organized so you never have to search for anything.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div style={{ borderRadius: 16, overflow: "hidden", background: "#f8f9fc", border: `1px solid ${CARD_BORDER}`, padding: 24 }}>
                <h3 style={{ ...heading, fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Analytics & Growth</h3>
                <p style={{ ...body, fontSize: 14, marginBottom: 20 }}>See what&apos;s working at a glance — followers, engagement, and top posts.</p>
                <div style={{ borderRadius: 12, overflow: "hidden", background: WHITE, height: 280, border: `1px solid ${CARD_BORDER}` }}>
                  <img src="/dashboard-preview.png" alt="Analytics dashboard" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                </div>
              </div>
              <div style={{ borderRadius: 16, overflow: "hidden", background: "#f8f9fc", border: `1px solid ${CARD_BORDER}`, padding: 24 }}>
                <h3 style={{ ...heading, fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Content Calendar</h3>
                <p style={{ ...body, fontSize: 14, marginBottom: 20 }}>Drag, drop, and schedule — your week&apos;s content in one visual timeline.</p>
                <div style={{ borderRadius: 12, overflow: "hidden", background: WHITE, height: 280, border: `1px solid ${CARD_BORDER}` }}>
                  <img src="/dashboard-preview.png" alt="Content calendar" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════ TESTIMONIALS ════════ */}
      <section style={{ position: "relative", zIndex: 18, padding: "120px 0", background: BG }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px" }}>
          <FadeIn>
            <div style={{ display: "flex", gap: 60, alignItems: "center" }}>
              {/* Left: photo */}
              <div style={{ flex: "0 0 320px" }}>
                <div style={{ width: 320, height: 380, borderRadius: 20, overflow: "hidden", background: "#e8ecf4" }}>
                  <img src="/social-proof.png" alt="Testimonial" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                </div>
              </div>

              {/* Right: text */}
              <div style={{ flex: 1 }}>
                <p style={{ ...body, fontSize: 14, color: PINK, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>Testimonials</p>
                <p style={{ ...body, fontSize: 24, lineHeight: 1.6, color: NAVY, marginTop: 24, fontWeight: 400 }}>
                  &ldquo;{testimonials[testimonialIdx].text}&rdquo;
                </p>
                <p style={{ ...body, fontSize: 15, color: BODY, marginTop: 24 }}>
                  — {testimonials[testimonialIdx].author}, {testimonials[testimonialIdx].role}
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════ CTA ════════ */}
      <section style={{ position: "relative", zIndex: 19, padding: "120px 0", background: "linear-gradient(135deg, #ea4c89 0%, #c13584 50%, #833ab4 100%)", overflow: "hidden" }}>
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: -120, right: -120, width: 400, height: 400, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px", textAlign: "center", position: "relative", zIndex: 1 }}>
          <FadeIn>
            <h2 style={{ ...heading, fontSize: 52, fontWeight: 700, color: WHITE, lineHeight: 1.15 }}>
              Stop Planning. Start Publishing.
            </h2>
            <p style={{ ...body, fontSize: 18, color: "rgba(255,255,255,0.8)", marginTop: 20, maxWidth: 560, margin: "20px auto 0" }}>
              Join 37,000+ creators who switched to Jella and got their evenings back. Free plan available — no credit card required.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 40 }}>
              <Link
                href="/sign-up"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "16px 36px", background: WHITE, color: NAVY,
                  borderRadius: 12, textDecoration: "none", fontWeight: 600, fontSize: 16,
                  fontFamily: "var(--font-source), system-ui, sans-serif",
                }}
              >
                Start Free Today <IconArrowRight />
              </Link>
              <button style={{
                padding: "16px 36px", background: "rgba(255,255,255,0.15)", color: WHITE,
                borderRadius: 12, border: "1px solid rgba(255,255,255,0.3)", cursor: "pointer",
                fontWeight: 600, fontSize: 16, fontFamily: "var(--font-source), system-ui, sans-serif",
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <IconPlay />
                Watch Demo
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════ FOOTER ════════ */}
      <footer style={{ position: "relative", zIndex: 20, padding: "60px 0 40px", background: WHITE, borderTop: `1px solid ${CARD_BORDER}` }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <Logo size="sm" />
                <span style={{ ...heading, fontSize: 20, fontWeight: 700 }}>Jella AI</span>
              </div>
              <p style={{ ...body, fontSize: 14, lineHeight: 1.6, maxWidth: 260 }}>
                The all-in-one content platform for creators who want to grow faster and work smarter.
              </p>
            </div>
            {[
              { title: "Product", links: ["Features", "Pricing", "Integrations", "Changelog"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
              { title: "Resources", links: ["Documentation", "Help Center", "Community", "Templates"] },
              { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy"] },
            ].map(col => (
              <div key={col.title}>
                <h4 style={{ ...heading, fontSize: 14, fontWeight: 600, marginBottom: 16 }}>{col.title}</h4>
                {col.links.map(link => (
                  <p key={link} style={{ ...body, fontSize: 14, marginBottom: 10, cursor: "pointer" }}>{link}</p>
                ))}
              </div>
            ))}
          </div>

          <div style={{ borderTop: `1px solid ${CARD_BORDER}`, paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ ...body, fontSize: 13 }}>© 2026 Jella AI — All rights reserved.</p>
            <p style={{ ...body, fontSize: 13 }}>Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
