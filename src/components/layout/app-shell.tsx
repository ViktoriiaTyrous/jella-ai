"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Logo from "@/components/ui/logo";
import { signOut } from "@/lib/auth";

const mainNavItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="7" height="7" rx="1.5" />
        <rect x="11" y="2" width="7" height="7" rx="1.5" />
        <rect x="2" y="11" width="7" height="7" rx="1.5" />
        <rect x="11" y="11" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    label: "Generator",
    href: "/create",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2l1.5 4.5L16 8l-4.5 1.5L10 14l-1.5-4.5L4 8l4.5-1.5z" />
        <path d="M15 13l.75 2.25L18 16l-2.25.75L15 19l-.75-2.25L12 16l2.25-.75z" />
      </svg>
    ),
  },
  {
    label: "Studio",
    href: "/create",
    matchExact: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="7" cy="7" r="3" />
        <circle cx="14" cy="10" r="2.5" />
        <circle cx="8" cy="15" r="2" />
        <path d="M10 7l4 3M8 10l0 3" />
      </svg>
    ),
  },
  {
    label: "Calendar",
    href: "/schedule",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="16" height="15" rx="2" />
        <line x1="2" y1="8" x2="18" y2="8" />
        <line x1="6" y1="1" x2="6" y2="5" />
        <line x1="14" y1="1" x2="14" y2="5" />
      </svg>
    ),
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 18h16" />
        <rect x="3" y="10" width="3" height="8" rx="0.5" />
        <rect x="8.5" y="6" width="3" height="12" rx="0.5" />
        <rect x="14" y="3" width="3" height="15" rx="0.5" />
      </svg>
    ),
  },
  {
    label: "Integrations",
    href: "/settings",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2h-2a2 2 0 00-2 2v2H7a2 2 0 00-2 2v2H3a2 2 0 00-2 2v2a2 2 0 002 2h2v2a2 2 0 002 2h2a2 2 0 002-2v-2h2a2 2 0 002-2v-2h2a2 2 0 002-2V8a2 2 0 00-2-2h-2V4a2 2 0 00-2-2z" />
      </svg>
    ),
  },
  {
    label: "Team",
    href: "/settings",
    matchExact: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="7" cy="6" r="3" />
        <path d="M1 18v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
        <circle cx="15" cy="6" r="2" />
        <path d="M16 12h1a3 3 0 013 3v1" />
      </svg>
    ),
  },
];

const bottomNavItems = [
  {
    label: "Brand Kit",
    href: "/settings",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="16" height="16" rx="2" />
        <circle cx="7" cy="7" r="2" />
        <path d="M2 13l4-4 3 3 4-4 5 5" />
      </svg>
    ),
  },
  {
    label: "Profile",
    href: "/settings",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="7" r="4" />
        <path d="M2 19v-2a6 6 0 0112 0v2" />
      </svg>
    ),
  },
];


export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const raw = localStorage.getItem("jella_session");
    if (raw) {
      const session = JSON.parse(raw);
      setUserName(session.name || "User");
    }
  }, []);

  const isActive = (href: string) => pathname.startsWith(href);

  const renderNavLink = (item: typeof mainNavItems[0], idx: number) => {
    const active = isActive(item.href);
    return (
      <Link
        key={`${item.label}-${idx}`}
        href={item.href}
        className="flex items-center no-underline transition-colors"
        style={{
          gap: 12,
          padding: "10px 16px",
          borderRadius: 8,
          background: active ? "rgba(234,76,137,0.08)" : "transparent",
          color: active ? "#ea4c89" : "#636788",
          fontFamily: "var(--font-source), sans-serif",
          fontSize: 14,
          fontWeight: active ? 600 : 400,
        }}
        onMouseEnter={(e) => {
          if (!active) e.currentTarget.style.background = "#f3f5fc";
        }}
        onMouseLeave={(e) => {
          if (!active) e.currentTarget.style.background = "transparent";
        }}
      >
        {item.icon}
        {item.label}
      </Link>
    );
  };

  const sidebar = (
    <div
      className="flex flex-col h-full"
      style={{
        width: 260,
        background: "#ffffff",
        borderRight: "1px solid #f3f5fc",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3" style={{ padding: "24px 20px 28px" }}>
        <Logo size="sm" variant="dark" />
        <span
          style={{
            fontFamily: "var(--font-mona), sans-serif",
            fontWeight: 700,
            fontSize: 20,
            color: "#191e41",
          }}
        >
          Jella AI
        </span>
      </div>

      {/* Main Nav */}
      <nav className="flex flex-col gap-1 flex-1" style={{ padding: "0 12px" }}>
        {mainNavItems.map((item, idx) => renderNavLink(item, idx))}
      </nav>

      {/* Bottom Nav */}
      <div className="flex flex-col gap-1" style={{ padding: "0 12px", marginBottom: 8 }}>
        <div style={{ height: 1, background: "#f3f5fc", margin: "8px 4px 12px" }} />
        {bottomNavItems.map((item, idx) => renderNavLink(item, idx))}
        <button
          className="flex items-center no-underline"
          onClick={() => {
            signOut();
            window.location.href = "/sign-in";
          }}
          style={{
            gap: 12,
            padding: "10px 16px",
            borderRadius: 8,
            background: "transparent",
            color: "#636788",
            fontFamily: "var(--font-source), sans-serif",
            fontSize: 14,
            fontWeight: 400,
            border: "none",
            cursor: "pointer",
            width: "100%",
            textAlign: "left",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#f3f5fc";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 18H4a2 2 0 01-2-2V4a2 2 0 012-2h3M13 14l4-4-4-4M17 10H7" />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );

  const topBar = (
    <div
      className="flex items-center justify-between"
      style={{
        padding: "16px 0 24px",
        gap: 16,
      }}
    >
      {/* Search */}
      <div style={{ position: "relative", width: 400, maxWidth: "100%" }}>
        <svg
          width="18"
          height="18"
          viewBox="0 0 20 20"
          fill="none"
          stroke="#636788"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }}
        >
          <circle cx="9" cy="9" r="7" />
          <path d="M14 14l4 4" />
        </svg>
        <input
          type="text"
          placeholder="Search content, ideas, or templates..."
          style={{
            width: "100%",
            padding: "10px 16px 10px 44px",
            borderRadius: 999,
            border: "none",
            background: "#f3f5fc",
            fontFamily: "var(--font-source), sans-serif",
            fontSize: 14,
            color: "#191e41",
            outline: "none",
          }}
        />
      </div>

      {/* Right side */}
      <div className="flex items-center" style={{ gap: 16 }}>
        {/* Create Post button */}
        <Link
          href="/create"
          className="hidden sm:inline-flex items-center"
          style={{
            gap: 6,
            padding: "10px 20px",
            borderRadius: 999,
            background: "#ea4c89",
            color: "#ffffff",
            fontFamily: "var(--font-mona), sans-serif",
            fontWeight: 600,
            fontSize: 14,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="8" y1="2" x2="8" y2="14" />
            <line x1="2" y1="8" x2="14" y2="8" />
          </svg>
          Create Post
        </Link>

        {/* Notification bell */}
        <button
          style={{
            position: "relative",
            padding: 8,
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
          aria-label="Notifications"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#636788" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 7a5 5 0 00-10 0c0 5-2 7-2 7h14s-2-2-2-7" />
            <path d="M8.5 17a1.5 1.5 0 003 0" />
          </svg>
          <span
            style={{
              position: "absolute",
              top: 6,
              right: 6,
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#ea4c89",
              border: "2px solid #ffffff",
            }}
          />
        </button>

        {/* User avatar */}
        <div className="flex items-center" style={{ gap: 10 }}>
          <div
            className="flex items-center justify-center shrink-0"
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "rgba(234,76,137,0.15)",
              color: "#ea4c89",
              fontFamily: "var(--font-mona), sans-serif",
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            {userName[0]?.toUpperCase() || "U"}
          </div>
          <div className="hidden md:block">
            <div
              style={{
                fontFamily: "var(--font-mona), sans-serif",
                fontWeight: 600,
                fontSize: 14,
                color: "#191e41",
                lineHeight: 1.2,
              }}
            >
              {userName}
            </div>
            <span
              style={{
                fontFamily: "var(--font-source), sans-serif",
                fontSize: 11,
                fontWeight: 600,
                color: "#ea4c89",
                background: "rgba(234,76,137,0.1)",
                padding: "2px 8px",
                borderRadius: 999,
              }}
            >
              Free Plan
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ background: "#fafbff" }}>
      {/* Mobile hamburger */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center" style={{ height: 56, background: "#ffffff", borderBottom: "1px solid #f3f5fc", padding: "0 16px" }}>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          style={{ padding: "8px", border: "none", background: "none", cursor: "pointer" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#191e41" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <div className="flex items-center gap-2 ml-2">
          <Logo size="sm" variant="dark" />
          <span style={{ fontFamily: "var(--font-mona), sans-serif", fontWeight: 700, fontSize: 18, color: "#191e41" }}>Jella AI</span>
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative h-full" style={{ width: 260 }} onClick={(e) => e.stopPropagation()}>
            {sidebar}
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100%",
          zIndex: 30,
        }}
        className="hidden lg:block"
      >
        {sidebar}
      </div>

      {/* Main content */}
      <main
        style={{ minHeight: "100vh", marginLeft: 260, padding: "0 40px 32px" }}
      >
        {topBar}
        {children}
      </main>

      {/* Mobile override */}
      <style>{`
        @media (max-width: 1023px) {
          main { margin-left: 0 !important; padding-top: 72px !important; }
        }
      `}</style>
    </div>
  );
}
