"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
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
const BODY = "#636788";
const BG = "#fafbff";
const CARD_BORDER = "#f3f5fc";
const FOOTER_BG = "#f3f5fc";

const heading: React.CSSProperties = { fontFamily: "var(--font-mona), system-ui, sans-serif", color: NAVY, margin: 0 };
const body: React.CSSProperties = { fontFamily: "var(--font-source), system-ui, sans-serif", color: BODY, margin: 0 };

const btnPink: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  padding: "14px 32px", borderRadius: 12, background: PINK, color: "#fff",
  fontFamily: "var(--font-mona)", fontWeight: 600, fontSize: 16,
  border: "none", cursor: "pointer", textDecoration: "none",
  transition: "transform 0.15s, box-shadow 0.15s",
};
const btnOutline: React.CSSProperties = {
  ...btnPink, background: "transparent", color: NAVY,
  border: `2px solid ${CARD_BORDER}`,
};

/* ───────── page ───────── */
export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = useCallback((id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  /* ─── NAV ─── */
  const nav = (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      boxShadow: scrolled ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
      transition: "all 0.3s ease",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Logo size="sm" />
          <span style={{ ...heading, fontSize: 20, fontWeight: 700 }}>Jella AI</span>
        </Link>

        {/* desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="nav-desktop">
          {["features", "pricing", "testimonials", "faq"].map((s) => (
            <button key={s} onClick={() => scrollTo(s)} style={{ ...body, background: "none", border: "none", cursor: "pointer", fontSize: 15, fontWeight: 500, textTransform: "capitalize" }}>{s}</button>
          ))}
          <Link href="/sign-in" style={{ ...btnOutline, padding: "10px 20px", fontSize: 14 }}>Sign In</Link>
          <Link href="/sign-up" style={{ ...btnPink, padding: "10px 20px", fontSize: 14 }}>Get Started Free</Link>
        </div>

        {/* mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 8 }} className="nav-hamburger">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="2" strokeLinecap="round">
            {menuOpen ? <><line x1="6" y1="6" x2="18" y2="18" /><line x1="6" y1="18" x2="18" y2="6" /></> : <><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></>}
          </svg>
        </button>
      </div>

      {/* mobile menu */}
      {menuOpen && (
        <div style={{ padding: "16px 24px", background: "#fff", borderTop: `1px solid ${CARD_BORDER}` }} className="nav-mobile">
          {["features", "pricing", "testimonials", "faq"].map((s) => (
            <button key={s} onClick={() => scrollTo(s)} style={{ ...body, display: "block", width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "12px 0", fontSize: 16, fontWeight: 500, textTransform: "capitalize" }}>{s}</button>
          ))}
          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            <Link href="/sign-in" style={{ ...btnOutline, padding: "10px 20px", fontSize: 14, flex: 1, textAlign: "center" }}>Sign In</Link>
            <Link href="/sign-up" style={{ ...btnPink, padding: "10px 20px", fontSize: 14, flex: 1, textAlign: "center" }}>Get Started Free</Link>
          </div>
        </div>
      )}

      {/* responsive CSS + animations */}
      <style>{`
        @media(max-width:768px){
          .nav-desktop{display:none !important}
          .nav-hamburger{display:block !important}
        }
        @media(min-width:769px){
          .nav-mobile{display:none !important}
        }
        @keyframes float1{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-20px) scale(1.05)}}
        @keyframes float2{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-15px) rotate(5deg)}}
        @keyframes float3{0%,100%{transform:translate(0,0)}50%{transform:translate(10px,-10px)}}
        @keyframes pulse{0%,100%{opacity:0.4}50%{opacity:0.8}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        .hero-glow-1{animation:float1 6s ease-in-out infinite}
        .hero-glow-2{animation:float2 8s ease-in-out infinite}
        .hero-glow-3{animation:float3 10s ease-in-out infinite}
        .hero-pulse{animation:pulse 3s ease-in-out infinite}
      `}</style>
    </nav>
  );

  /* ─── HERO ─── */
  const hero = (
    <section style={{ paddingTop: 140, paddingBottom: 80, background: `linear-gradient(180deg, ${BG} 0%, #f0eaf5 50%, ${BG} 100%)`, textAlign: "center", position: "relative", overflow: "hidden" }}>
      {/* Floating decorative glows */}
      <div className="hero-glow-1" style={{ position: "absolute", top: 60, left: "5%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(234,76,137,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div className="hero-glow-2" style={{ position: "absolute", top: 200, right: "8%", width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div className="hero-glow-3" style={{ position: "absolute", bottom: 100, left: "15%", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(234,76,137,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
      {/* Floating platform badges — large with colored icons */}
      <div className="hero-glow-1" style={{ position: "absolute", top: 180, left: "6%", padding: "12px 24px", borderRadius: 24, background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.95)", boxShadow: "0 8px 32px rgba(225,48,108,0.12)", fontSize: 15, fontWeight: 700, color: NAVY, display: "flex", alignItems: "center", gap: 10, pointerEvents: "none" }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="16" height="16" rx="5" /><circle cx="10" cy="10" r="4" /><circle cx="15" cy="5" r="1.2" fill="white" stroke="none" /></svg>
        </div>
        Instagram
      </div>
      <div className="hero-glow-2" style={{ position: "absolute", top: 300, right: "5%", padding: "12px 24px", borderRadius: 24, background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.95)", boxShadow: "0 8px 32px rgba(0,0,0,0.08)", fontSize: 15, fontWeight: 700, color: NAVY, display: "flex", alignItems: "center", gap: 10, pointerEvents: "none" }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: "#000000", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 2v9a4.5 4.5 0 11-3.5-4.38" stroke="white" strokeWidth="1.8" strokeLinecap="round" /><path d="M11 2c1.5.5 3.5 1.5 5 3.5" stroke="#25F4EE" strokeWidth="1.8" strokeLinecap="round" /></svg>
        </div>
        TikTok
      </div>
      <div className="hero-glow-3" style={{ position: "absolute", top: 160, right: "12%", padding: "12px 24px", borderRadius: 24, background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.95)", boxShadow: "0 8px 32px rgba(29,161,242,0.12)", fontSize: 15, fontWeight: 700, color: NAVY, display: "flex", alignItems: "center", gap: 10, pointerEvents: "none" }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="white"><path d="M1.5 1l5.2 6.6L1.2 15h1.2l4.8-5.8L11.3 15H15L9.5 7.9 14.7 1h-1.2L9 7l-3.6-6H1.5z" /></svg>
        </div>
        X (Twitter)
      </div>
      <div className="hero-glow-1" style={{ position: "absolute", top: 380, left: "12%", padding: "12px 24px", borderRadius: 24, background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.95)", boxShadow: "0 8px 32px rgba(0,119,181,0.12)", fontSize: 15, fontWeight: 700, color: NAVY, display: "flex", alignItems: "center", gap: 10, pointerEvents: "none" }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: "#0077B5", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="white"><path d="M2 4.5V14h3V4.5H2zM3.5 1A1.75 1.75 0 003.5 4.5 1.75 1.75 0 003.5 1zM11.5 4.3c-1.5 0-2.2.8-2.5 1.2V4.5H6V14h3V8.7c0-.3 0-.6.1-.8.3-.6.9-1.2 1.9-1.2 1.3 0 1.9 1 1.9 2.5V14h3V8.8c0-3-1.6-4.5-3.9-4.5z" /></svg>
        </div>
        LinkedIn
      </div>
      <div className="hero-glow-2" style={{ position: "absolute", top: 420, right: "15%", padding: "12px 24px", borderRadius: 24, background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.95)", boxShadow: "0 8px 32px rgba(255,0,0,0.08)", fontSize: 15, fontWeight: 700, color: NAVY, display: "flex", alignItems: "center", gap: 10, pointerEvents: "none" }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: "#FF0000", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="white"><path d="M7 12l5-3-5-3v6z" /><rect x="1" y="3" width="16" height="12" rx="4" stroke="white" strokeWidth="1.5" fill="none" /></svg>
        </div>
        YouTube
      </div>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
        <FadeIn>
          <h1 style={{ ...heading, fontSize: 52, fontWeight: 800, lineHeight: 1.12, letterSpacing: "-0.02em" }}>
            Your All-in-One Platform for{" "}
            <span style={{ background: `linear-gradient(135deg, ${PINK}, #c13584)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Social Media Growth</span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p style={{ ...body, fontSize: 20, lineHeight: 1.6, marginTop: 24, maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>
            Create AI-powered posts, schedule content, and grow your audience — all from one beautiful dashboard.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 40, flexWrap: "wrap" }}>
            <Link href="/sign-up" style={{ ...btnPink, padding: "16px 36px", fontSize: 17 }}>Get Started Free</Link>
            <button onClick={() => {}} style={{ ...btnOutline, padding: "16px 36px", fontSize: 17 }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ marginRight: 8 }}><polygon points="6,3 18,10 6,17" fill={NAVY} /></svg>
              Watch Demo
            </button>
          </div>
        </FadeIn>
      </div>

      {/* hero mockup */}
      <FadeIn delay={0.3}>
        <div style={{ maxWidth: 1000, margin: "60px auto 0", padding: "0 24px" }}>
          <div style={{
            borderRadius: 16, overflow: "hidden",
            background: "#fff", border: `1px solid ${CARD_BORDER}`,
            boxShadow: "0 24px 80px rgba(25,30,65,0.1), 0 4px 20px rgba(234,76,137,0.08)",
          }}>
            {/* browser chrome */}
            <div style={{ padding: "12px 16px", background: "#f9fafb", borderBottom: `1px solid ${CARD_BORDER}`, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
              <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
              <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
              <span style={{ flex: 1, marginLeft: 12, padding: "6px 12px", borderRadius: 8, background: "#fff", border: `1px solid ${CARD_BORDER}`, fontSize: 13, color: BODY }}>app.jella.ai/dashboard</span>
            </div>
            {/* real dashboard screenshot */}
            <img
              src="/dashboard-preview.png"
              alt="Jella AI Dashboard"
              style={{ width: "100%", display: "block" }}
            />
          </div>
        </div>
      </FadeIn>

      {/* stats row */}
      <FadeIn delay={0.4}>
        <div style={{ display: "flex", justifyContent: "center", gap: 60, marginTop: 60, flexWrap: "wrap" }}>
          {[["10K+", "Creators"], ["500K+", "Posts Generated"], ["98%", "Time Saved"]].map(([v, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <p style={{ ...heading, fontSize: 36, fontWeight: 800 }}>{v}</p>
              <p style={{ ...body, fontSize: 15, marginTop: 4 }}>{l}</p>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );

  /* ─── WHY JELLA — BENTO GRID ─── */
  const bentoCells = [
    { title: "AI Content Generator", subtitle: "Generate captions, hashtags & images with GPT-4o + DALL-E 3", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z", iconBg: "#fce4ec", col: "1 / 3", row: "1 / 2", img: "/create-preview.png" },
    { title: "Smart Analytics", subtitle: "Track engagement, growth & performance across platforms", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", iconBg: "#e8f5e9", col: "3 / 4", row: "1 / 2", img: "/analytics-preview.png" },
    { title: "Content Calendar", subtitle: "Schedule posts across all platforms in one view", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", iconBg: "#e3f2fd", col: "1 / 2", row: "2 / 3", img: "/dashboard-preview.png" },
    { title: "Kanban Board", subtitle: "Organize your content pipeline — from idea to published", icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z", iconBg: "#f3e5f5", col: "2 / 4", row: "2 / 3", img: "/dashboard-preview.png" },
  ];
  const whyJella = (
    <section style={{ padding: "100px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <FadeIn>
          <h2 style={{ ...heading, fontSize: 40, fontWeight: 800, lineHeight: 1.2 }}>Social Media Shouldn't Be This Complicated</h2>
          <p style={{ ...body, fontSize: 18, marginTop: 16 }}>Stop juggling 5 different tools. Jella handles everything.</p>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, marginTop: 56 }}>
          {bentoCells.map((cell, i) => (
            <FadeIn key={cell.title} delay={i * 0.1} style={{ gridColumn: cell.col, gridRow: cell.row }}>
              <div style={{
                background: "#fff", borderRadius: 20, overflow: "hidden",
                border: `1px solid ${CARD_BORDER}`, boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                textAlign: "left", height: "100%", display: "flex", flexDirection: "column",
                transition: "transform 0.3s ease, box-shadow 0.3s ease", cursor: "default",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 40px rgba(0,0,0,0.10)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.06)"; }}
              >
                <div style={{ padding: "28px 28px 0" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: cell.iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={cell.icon} /></svg>
                  </div>
                  <h3 style={{ ...heading, fontSize: 18, fontWeight: 600, marginTop: 16 }}>{cell.title}</h3>
                  <p style={{ ...body, fontSize: 14, lineHeight: 1.6, marginTop: 8 }}>{cell.subtitle}</p>
                </div>
                <img src={cell.img} alt={cell.title} style={{ width: "100%", height: 200, objectFit: "cover", objectPosition: "top left", display: "block", marginTop: 16 }} />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );

  /* ─── FEATURES CARDS ─── */
  const features = [
    { icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5", title: "AI Content Generator", desc: "Generate captions, hashtags, and full posts in seconds. GPT-4o powered." },
    { icon: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z", title: "Smart Scheduler", desc: "Plan and schedule posts across all platforms with an AI-optimized calendar." },
    { icon: "M15 2H9a2 2 0 00-2 2v16a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2zM3 10h2M19 10h2M12 18h.01", title: "Visual Creator", desc: "Generate stunning images with DALL-E 3 or upload your own media." },
  ];
  const featuresSection = (
    <section id="features" style={{ padding: "100px 24px", background: BG }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn><h2 style={{ ...heading, fontSize: 40, fontWeight: 800, textAlign: "center" }}>What You Can Do with Jella</h2></FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, marginTop: 56 }}>
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.1}>
              <div style={{ background: "#fff", borderRadius: 16, padding: 32, border: `1px solid ${CARD_BORDER}`, boxShadow: "0 2px 12px rgba(0,0,0,0.04)", height: "100%" }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: `${PINK}14`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={PINK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={f.icon} /></svg>
                </div>
                <h3 style={{ ...heading, fontSize: 20, fontWeight: 600, marginTop: 20 }}>{f.title}</h3>
                <p style={{ ...body, fontSize: 16, lineHeight: 1.6, marginTop: 12 }}>{f.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );

  /* ─── TESTIMONIALS CAROUSEL ─── */
  const testimonials = [
    { text: "Jella cut our content creation time by 80%. The AI suggestions are incredibly on-brand.", name: "Sarah Chen", role: "Founder, Bloom Studio", avatar: "SC" },
    { text: "We went from 3 posts a week to daily content without adding headcount.", name: "Marcus Rivera", role: "Marketing Lead, Novu", avatar: "MR" },
    { text: "The scheduling + AI combo is unbeatable. Best investment for our small team.", name: "Anna Kowalski", role: "Content Creator", avatar: "AK" },
    { text: "Finally a tool that understands our brand voice. Every post feels authentic.", name: "James Park", role: "Brand Director, Luxe", avatar: "JP" },
    { text: "The analytics alone justify the cost. We increased engagement by 340% in 3 months.", name: "Lisa Nguyen", role: "Growth Lead, Fitly", avatar: "LN" },
    { text: "I manage 12 client accounts with Jella. It would take 3 people without it.", name: "David Kim", role: "Agency Owner", avatar: "DK" },
  ];
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselMax = testimonials.length - 3;
  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev >= carouselMax ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [carouselMax]);
  const testimonialsSection = (
    <section id="testimonials" style={{ padding: "100px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn><h2 style={{ ...heading, fontSize: 40, fontWeight: 800, textAlign: "center" }}>Why People Choose Jella</h2></FadeIn>
        <div style={{ position: "relative", marginTop: 56 }}>
          {/* Left arrow */}
          <button
            onClick={() => setCarouselIndex((prev) => (prev <= 0 ? carouselMax : prev - 1))}
            style={{ position: "absolute", left: -24, top: "50%", transform: "translateY(-50%)", zIndex: 2, width: 48, height: 48, borderRadius: "50%", background: "#fff", border: `1px solid ${CARD_BORDER}`, boxShadow: "0 2px 12px rgba(0,0,0,0.08)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 5l-5 5 5 5" stroke={NAVY} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          {/* Right arrow */}
          <button
            onClick={() => setCarouselIndex((prev) => (prev >= carouselMax ? 0 : prev + 1))}
            style={{ position: "absolute", right: -24, top: "50%", transform: "translateY(-50%)", zIndex: 2, width: 48, height: 48, borderRadius: "50%", background: "#fff", border: `1px solid ${CARD_BORDER}`, boxShadow: "0 2px 12px rgba(0,0,0,0.08)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M8 5l5 5-5 5" stroke={NAVY} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          {/* Track */}
          <div style={{ overflow: "hidden" }}>
            <div style={{ display: "flex", transition: "transform 0.5s ease", transform: `translateX(-${carouselIndex * (100 / 3)}%)` }}>
              {testimonials.map((t) => (
                <div key={t.name} style={{ flex: "0 0 calc(100% / 3)", padding: "0 12px", boxSizing: "border-box" }}>
                  <div style={{ background: "#fff", borderRadius: 16, padding: 32, border: `1px solid ${CARD_BORDER}`, boxShadow: "0 2px 12px rgba(0,0,0,0.04)", height: "100%" }}>
                    <p style={{ ...body, fontSize: 16, lineHeight: 1.7, fontStyle: "italic" }}>"{t.text}"</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 24 }}>
                      <div style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg, ${PINK}, #c13584)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 14, fontFamily: "var(--font-mona)" }}>{t.avatar}</div>
                      <div>
                        <p style={{ ...heading, fontSize: 15, fontWeight: 600 }}>{t.name}</p>
                        <p style={{ ...body, fontSize: 13, marginTop: 2 }}>{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 32 }}>
            {Array.from({ length: carouselMax + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCarouselIndex(i)}
                style={{ width: carouselIndex === i ? 24 : 8, height: 8, borderRadius: 4, background: carouselIndex === i ? PINK : CARD_BORDER, border: "none", cursor: "pointer", transition: "all 0.3s ease", padding: 0 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  /* ─── STICKY SCROLL CARDS ─── */
  const stickyCards = [
    { title: "AI-Powered Post Generation", desc: "Describe your topic, pick your tone, and let AI create the perfect post. Supports Instagram, TikTok, Twitter/X, LinkedIn, Facebook, Pinterest.", dot: PINK, img: "/create-preview.png", top: 100 },
    { title: "Content Calendar & Scheduling", desc: "Drag-and-drop scheduling. See your entire month at a glance. Never miss a posting window again.", dot: "#6c63ff", img: "/dashboard-preview.png", top: 120 },
    { title: "Analytics & Insights", desc: "Track engagement, growth, and performance across every platform. Data-driven decisions made simple.", dot: "#28c840", img: "/analytics-preview.png", top: 140 },
  ];
  const deepDiveSection = (
    <section style={{ padding: "100px 24px", background: BG }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        {stickyCards.map((card) => (
          <div key={card.title} style={{ position: "sticky", top: card.top, marginBottom: 40, zIndex: card.top }}>
            <div style={{
              background: "#fff", borderRadius: 24, boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
              padding: 60, minHeight: 500, display: "flex", gap: 48, alignItems: "center", flexWrap: "wrap",
            }}>
              <div style={{ flex: "1 1 45%", minWidth: 280 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: card.dot, display: "inline-block" }} />
                  <h3 style={{ ...heading, fontSize: 32, fontWeight: 700 }}>{card.title}</h3>
                </div>
                <p style={{ ...body, fontSize: 17, lineHeight: 1.7 }}>{card.desc}</p>
              </div>
              <div style={{ flex: "1 1 55%", minWidth: 280 }}>
                <img src={card.img} alt={card.title} style={{ borderRadius: 16, boxShadow: "0 8px 40px rgba(0,0,0,0.1)", width: "100%", objectFit: "cover", maxHeight: 380, display: "block" }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  /* ─── PRICING ─── */
  const plans = [
    { name: "Free", price: "$0", period: "/mo", items: ["5 AI posts/month", "1 social platform", "Basic scheduling", "Community support"], cta: "Get Started Free", popular: false, href: "/sign-up" },
    { name: "Pro", price: "$29", period: "/mo", items: ["Unlimited AI posts", "All 6 platforms", "AI image generation (DALL-E 3)", "Advanced scheduling", "Priority support", "Analytics dashboard"], cta: "Start Pro Trial", popular: true, href: "/sign-up" },
    { name: "Team", price: "$79", period: "/mo", items: ["Everything in Pro", "5 team members", "Brand kit management", "Collaboration tools", "Custom AI training", "Dedicated support"], cta: "Contact Sales", popular: false, href: "/sign-up" },
  ];
  const pricingSection = (
    <section id="pricing" style={{ padding: "100px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <FadeIn>
          <h2 style={{ ...heading, fontSize: 40, fontWeight: 800 }}>Simple, Transparent Pricing</h2>
          <p style={{ ...body, fontSize: 18, marginTop: 12 }}>Start free. Upgrade when you're ready.</p>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, marginTop: 56 }}>
          {plans.map((p, i) => (
            <FadeIn key={p.name} delay={i * 0.1}>
              <div style={{
                background: "#fff", borderRadius: 16, padding: 32,
                border: p.popular ? `2px solid ${PINK}` : `1px solid ${CARD_BORDER}`,
                boxShadow: p.popular ? `0 8px 40px ${PINK}18` : "0 2px 12px rgba(0,0,0,0.04)",
                transform: p.popular ? "scale(1.03)" : "none",
                position: "relative", textAlign: "left", height: "100%",
                display: "flex", flexDirection: "column",
              }}>
                {p.popular && (
                  <span style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: PINK, color: "#fff", fontSize: 12, fontWeight: 700, padding: "4px 16px", borderRadius: 20, fontFamily: "var(--font-mona)" }}>POPULAR</span>
                )}
                <h3 style={{ ...heading, fontSize: 22, fontWeight: 700 }}>{p.name}</h3>
                <div style={{ marginTop: 16, display: "flex", alignItems: "baseline", gap: 4 }}>
                  <span style={{ ...heading, fontSize: 48, fontWeight: 800 }}>{p.price}</span>
                  <span style={{ ...body, fontSize: 16 }}>{p.period}</span>
                </div>
                <ul style={{ listStyle: "none", padding: 0, marginTop: 28, flex: 1 }}>
                  {p.items.map((item) => (
                    <li key={item} style={{ ...body, fontSize: 15, padding: "8px 0", display: "flex", alignItems: "center", gap: 10 }}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="9" fill={`${PINK}14`} /><path d="M6 9l2 2 4-4" stroke={PINK} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href={p.href} style={{ ...(p.popular ? btnPink : btnOutline), width: "100%", marginTop: 28, textAlign: "center", ...(p.popular ? { padding: "16px 32px", fontSize: 17 } : {}) }}>
                  {p.cta}
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );

  /* ─── INTEGRATIONS ─── */
  const platforms = ["Instagram", "TikTok", "Twitter/X", "Facebook", "LinkedIn", "Pinterest", "YouTube", "Canva", "Google Drive"];
  const integrationsSection = (
    <section style={{ padding: "100px 24px", background: BG }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <FadeIn><h2 style={{ ...heading, fontSize: 40, fontWeight: 800 }}>Connected Platforms & Integrations</h2></FadeIn>
        <FadeIn delay={0.15}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 20, marginTop: 48 }}>
            {platforms.map((p) => (
              <div key={p} style={{ width: 100, height: 100, borderRadius: 16, background: "#fff", border: `1px solid ${CARD_BORDER}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: `${PINK}10`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontWeight: 700, fontSize: 16, color: PINK }}>{p.charAt(0)}</span>
                </div>
                <span style={{ ...body, fontSize: 11, fontWeight: 500 }}>{p}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );

  /* ─── FAQ ─── */
  const faqs = [
    ["What is Jella AI?", "AI-powered social media platform for creating, scheduling, and publishing content across all major platforms."],
    ["Is there a free plan?", "Yes! The free plan includes 5 AI-generated posts per month with 1 social platform connected."],
    ["Which platforms are supported?", "Instagram, TikTok, Twitter/X, Facebook, LinkedIn, and Pinterest."],
    ["How does AI generation work?", "Powered by GPT-4o for text generation and DALL-E 3 for image creation. Just describe what you want."],
    ["Can I use my own images?", "Absolutely. Drag & drop upload is fully supported alongside AI-generated visuals."],
    ["Is my data secure?", "Yes. All data is encrypted at rest and in transit, and is never shared with third parties."],
  ];
  const faqSection = (
    <section id="faq" style={{ padding: "100px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <FadeIn><h2 style={{ ...heading, fontSize: 40, fontWeight: 800, textAlign: "center" }}>Frequently Asked Questions</h2></FadeIn>
        <div style={{ marginTop: 48 }}>
          {faqs.map(([q, a], i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div style={{ borderBottom: `1px solid ${CARD_BORDER}` }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%", padding: "20px 0", background: "none", border: "none", cursor: "pointer",
                    display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left",
                  }}
                >
                  <span style={{ ...heading, fontSize: 17, fontWeight: 600 }}>{q}</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, transform: openFaq === i ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                    <path d="M5 8l5 5 5-5" stroke={NAVY} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div style={{ maxHeight: openFaq === i ? 200 : 0, overflow: "hidden", transition: "max-height 0.3s ease" }}>
                  <p style={{ ...body, fontSize: 15, lineHeight: 1.7, paddingBottom: 20 }}>{a}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );

  /* ─── CTA ─── */
  const cta = (
    <section style={{ padding: "100px 24px", background: `linear-gradient(135deg, ${NAVY}, #0f3460)`, textAlign: "center" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <FadeIn>
          <h2 style={{ ...heading, fontSize: 40, fontWeight: 800, color: "#fff" }}>Ready to Transform Your Social Media?</h2>
          <p style={{ ...body, fontSize: 18, color: "rgba(255,255,255,0.7)", marginTop: 16 }}>Join 10,000+ creators who are saving hours every week.</p>
          <Link href="/sign-up" style={{ ...btnPink, padding: "18px 40px", fontSize: 18, marginTop: 36 }}>
            Get Started Free &rarr;
          </Link>
        </FadeIn>
      </div>
    </section>
  );

  /* ─── FOOTER ─── */
  const footerCols = [
    { title: "Product", links: [["Features", "#features"], ["Pricing", "#pricing"], ["Integrations", "#"]] },
    { title: "Company", links: [["About", "#"], ["Blog", "#"], ["Careers", "#"]] },
    { title: "Support", links: [["Help Center", "#"], ["Contact", "#"], ["Status", "#"]] },
    { title: "Legal", links: [["Privacy", "#"], ["Terms", "#"]] },
  ];
  const footer = (
    <footer style={{ padding: "60px 24px 32px", background: FOOTER_BG }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 40 }}>
          {footerCols.map((c) => (
            <div key={c.title}>
              <p style={{ ...heading, fontSize: 14, fontWeight: 700, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.05em" }}>{c.title}</p>
              {c.links.map(([label, href]) => (
                <a key={label} href={href} style={{ ...body, display: "block", fontSize: 14, marginBottom: 10, textDecoration: "none", color: BODY }}>{label}</a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 48, paddingTop: 24, borderTop: `1px solid ${CARD_BORDER}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <p style={{ ...body, fontSize: 13 }}>&copy; 2026 Jella AI. All rights reserved.</p>
          <div style={{ display: "flex", gap: 16 }}>
            {["Twitter", "LinkedIn", "Instagram"].map((s) => (
              <a key={s} href="#" style={{ ...body, fontSize: 13, textDecoration: "none" }}>{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      {nav}
      {hero}
      {whyJella}
      {featuresSection}
      {testimonialsSection}
      {deepDiveSection}
      {pricingSection}
      {integrationsSection}
      {faqSection}
      {cta}
      {footer}
    </div>
  );
}
