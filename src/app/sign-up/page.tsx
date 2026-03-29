"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/ui/logo";

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "AI Content",
    desc: "Generate captions, hashtags, and visuals in seconds",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Save Time",
    desc: "Automate scheduling, posting, and analytics",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    title: "Grow Fast",
    desc: "Data-driven strategies to boost your audience",
  },
];

const testimonials = [
  {
    text: "Jella AI transformed how I manage my social media. I went from spending hours to minutes on content creation.",
    name: "Sarah Chen",
    role: "Founder, Bloom Studio",
  },
  {
    text: "The AI suggestions are incredibly on-brand. It feels like having a creative director in my pocket.",
    name: "Marcus Rivera",
    role: "Marketing Lead, Novu",
  },
  {
    text: "I tripled my engagement in two months. Jella's scheduling and analytics are game-changers.",
    name: "Aisha Patel",
    role: "Content Creator",
  },
];

export default function SignUpPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -30px) scale(1.1); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-15px, 20px) scale(0.95); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(10px, 15px); }
        }
      `}</style>
      <div className="flex min-h-screen" style={{ fontFamily: "var(--font-source), sans-serif" }}>
        {/* Left Brand Panel */}
        <div
          className="hidden lg:flex flex-col relative overflow-hidden"
          style={{
            width: "50%",
            background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
            padding: "40px 48px",
          }}
        >
          {/* Decorative orbs */}
          <div style={{
            position: "absolute", top: -80, right: -80, width: 300, height: 300,
            borderRadius: "50%", background: "radial-gradient(circle, rgba(234,76,137,0.15) 0%, transparent 70%)",
            animation: "float1 8s ease-in-out infinite",
          }} />
          <div style={{
            position: "absolute", bottom: 100, left: -60, width: 200, height: 200,
            borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
            animation: "float2 10s ease-in-out infinite",
          }} />
          <div style={{
            position: "absolute", top: "40%", right: "10%", width: 120, height: 120,
            borderRadius: "50%", border: "1px solid rgba(255,255,255,0.06)",
            animation: "float3 12s ease-in-out infinite",
          }} />

          {/* Logo */}
          <div className="flex items-center" style={{ gap: 12, marginBottom: 60 }}>
            <Logo size="lg" variant="light" />
            <span style={{
              fontFamily: "var(--font-mona), sans-serif",
              fontWeight: 700, fontSize: 24, color: "#ffffff",
            }}>
              Jella AI
            </span>
          </div>

          {/* Hero text */}
          <div style={{ marginBottom: 48 }}>
            <h1 style={{
              fontFamily: "var(--font-mona), sans-serif",
              fontWeight: 700, fontSize: 40, color: "#ffffff",
              lineHeight: 1.15, marginBottom: 16,
            }}>
              Welcome to Jella
            </h1>
            <p style={{
              fontSize: 17, color: "rgba(255,255,255,0.7)",
              lineHeight: 1.6, maxWidth: 420,
            }}>
              Your AI-powered creative workspace for content, strategy, and growth.
            </p>
          </div>

          {/* Feature cards */}
          <div className="flex flex-col" style={{ gap: 16, marginBottom: 48 }}>
            {features.map((f, i) => (
              <div
                key={i}
                style={{
                  display: "flex", alignItems: "flex-start", gap: 16,
                  padding: "20px 24px", borderRadius: 16,
                  background: "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                  background: "rgba(234,76,137,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {f.icon}
                </div>
                <div>
                  <div style={{
                    fontFamily: "var(--font-mona), sans-serif",
                    fontWeight: 600, fontSize: 15, color: "#ffffff", marginBottom: 4,
                  }}>
                    {f.title}
                  </div>
                  <div style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>
                    {f.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div style={{ marginTop: "auto" }}>
            <div style={{
              padding: "24px 28px", borderRadius: 16,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              minHeight: 130,
            }}>
              <p style={{
                fontSize: 15, color: "rgba(255,255,255,0.8)",
                lineHeight: 1.6, fontStyle: "italic", marginBottom: 16,
              }}>
                &ldquo;{testimonials[activeTestimonial].text}&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: "rgba(234,76,137,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-mona), sans-serif",
                  fontWeight: 600, fontSize: 14, color: "#ea4c89",
                }}>
                  {testimonials[activeTestimonial].name[0]}
                </div>
                <div>
                  <div style={{
                    fontFamily: "var(--font-mona), sans-serif",
                    fontWeight: 600, fontSize: 14, color: "#ffffff",
                  }}>
                    {testimonials[activeTestimonial].name}
                  </div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
                    {testimonials[activeTestimonial].role}
                  </div>
                </div>
              </div>
            </div>
            {/* Dots */}
            <div className="flex justify-center" style={{ gap: 8, marginTop: 16 }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  aria-label={`Testimonial ${i + 1}`}
                  style={{
                    width: i === activeTestimonial ? 24 : 8,
                    height: 8, borderRadius: 4, border: "none", cursor: "pointer",
                    background: i === activeTestimonial ? "#ea4c89" : "rgba(255,255,255,0.25)",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Auth Panel */}
        <div
          className="flex flex-1 items-center justify-center"
          style={{
            background: "#fafbff",
            padding: "40px 24px",
          }}
        >
          <div style={{ width: "100%", maxWidth: 420 }}>
            {/* Logo + title */}
            <div className="flex flex-col items-center" style={{ marginBottom: 32 }}>
              <Logo size="lg" variant="dark" />
              <span style={{
                fontFamily: "var(--font-mona), sans-serif",
                fontWeight: 700, fontSize: 22, color: "#191e41",
                marginTop: 12,
              }}>
                Jella
              </span>
              <p style={{
                fontSize: 15, color: "#636788", marginTop: 8,
              }}>
                Create your account
              </p>
            </div>

            {/* Google button */}
            <button
              style={{
                width: "100%", padding: "12px 16px", borderRadius: 10,
                border: "1px solid #d8dce8", background: "#ffffff",
                cursor: "pointer", display: "flex", alignItems: "center",
                justifyContent: "center", gap: 10,
                fontFamily: "var(--font-source), sans-serif",
                fontSize: 15, fontWeight: 500, color: "#191e41",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#f3f5fc"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#ffffff"; }}
            >
              <svg width="20" height="20" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24.02 24.02 0 0 0 0 21.56l7.98-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center" style={{ margin: "24px 0", gap: 16 }}>
              <div style={{ flex: 1, height: 1, background: "#e8ebf5" }} />
              <span style={{ fontSize: 13, color: "#9ca0b8" }}>or</span>
              <div style={{ flex: 1, height: 1, background: "#e8ebf5" }} />
            </div>

            {/* Full Name */}
            <label style={{ display: "block", marginBottom: 16 }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: "#3a3d56", marginBottom: 6, display: "block" }}>
                Full Name
              </span>
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "0 14px", height: 46, borderRadius: 10,
                border: "1px solid #d8dce8", background: "#ffffff",
              }}>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#9ca0b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="10" cy="7" r="4" />
                  <path d="M3 18c0-3.3 3.1-6 7-6s7 2.7 7 6" />
                </svg>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{
                    flex: 1, border: "none", outline: "none", background: "transparent",
                    fontSize: 15, color: "#191e41",
                    fontFamily: "var(--font-source), sans-serif",
                  }}
                />
              </div>
            </label>

            {/* Email */}
            <label style={{ display: "block", marginBottom: 16 }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: "#3a3d56", marginBottom: 6, display: "block" }}>
                Email
              </span>
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "0 14px", height: 46, borderRadius: 10,
                border: "1px solid #d8dce8", background: "#ffffff",
              }}>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#9ca0b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="16" height="12" rx="2" />
                  <path d="M2 4l8 6 8-6" />
                </svg>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    flex: 1, border: "none", outline: "none", background: "transparent",
                    fontSize: 15, color: "#191e41",
                    fontFamily: "var(--font-source), sans-serif",
                  }}
                />
              </div>
            </label>

            {/* Password */}
            <label style={{ display: "block", marginBottom: 16 }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: "#3a3d56", marginBottom: 6, display: "block" }}>
                Password
              </span>
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "0 14px", height: 46, borderRadius: 10,
                border: "1px solid #d8dce8", background: "#ffffff",
              }}>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#9ca0b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="9" width="12" height="9" rx="2" />
                  <path d="M7 9V6a3 3 0 0 1 6 0v3" />
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    flex: 1, border: "none", outline: "none", background: "transparent",
                    fontSize: 15, color: "#191e41",
                    fontFamily: "var(--font-source), sans-serif",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  style={{ border: "none", background: "none", cursor: "pointer", padding: 0, display: "flex" }}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#9ca0b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 1l18 18" />
                      <path d="M8.5 4.2A8.5 8.5 0 0 1 10 4c4.5 0 8 4 9 6a14.3 14.3 0 0 1-2.2 3.2" />
                      <path d="M6.7 6.7A4 4 0 0 0 10 14a4 4 0 0 0 3.3-1.7" />
                      <path d="M1 10s3.5-6 9-6" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#9ca0b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 10s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z" />
                      <circle cx="10" cy="10" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </label>

            {/* Confirm Password */}
            <label style={{ display: "block", marginBottom: 24 }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: "#3a3d56", marginBottom: 6, display: "block" }}>
                Confirm Password
              </span>
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "0 14px", height: 46, borderRadius: 10,
                border: "1px solid #d8dce8", background: "#ffffff",
              }}>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#9ca0b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="9" width="12" height="9" rx="2" />
                  <path d="M7 9V6a3 3 0 0 1 6 0v3" />
                </svg>
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{
                    flex: 1, border: "none", outline: "none", background: "transparent",
                    fontSize: 15, color: "#191e41",
                    fontFamily: "var(--font-source), sans-serif",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                  style={{ border: "none", background: "none", cursor: "pointer", padding: 0, display: "flex" }}
                >
                  {showConfirm ? (
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#9ca0b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 1l18 18" />
                      <path d="M8.5 4.2A8.5 8.5 0 0 1 10 4c4.5 0 8 4 9 6a14.3 14.3 0 0 1-2.2 3.2" />
                      <path d="M6.7 6.7A4 4 0 0 0 10 14a4 4 0 0 0 3.3-1.7" />
                      <path d="M1 10s3.5-6 9-6" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#9ca0b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 10s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z" />
                      <circle cx="10" cy="10" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </label>

            {/* Create Account button */}
            <button
              style={{
                width: "100%", padding: "13px 16px", borderRadius: 10,
                border: "none", background: "#ea4c89", color: "#ffffff",
                fontFamily: "var(--font-mona), sans-serif",
                fontSize: 16, fontWeight: 600, cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#d63f7b"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#ea4c89"; }}
            >
              Create Account
            </button>

            {/* Sign In link */}
            <p style={{
              textAlign: "center", marginTop: 24,
              fontSize: 14, color: "#636788",
            }}>
              Already have an account?{" "}
              <Link href="/sign-in" style={{ color: "#ea4c89", fontWeight: 600, textDecoration: "none" }}>
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
