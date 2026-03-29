"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "@/components/ui/logo";

const navItems = [
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
    label: "Create Post",
    href: "/create",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="10" r="8" />
        <line x1="10" y1="6" x2="10" y2="14" />
        <line x1="6" y1="10" x2="14" y2="10" />
      </svg>
    ),
  },
  {
    label: "Schedule",
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
    label: "Settings",
    href: "/settings",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="10" r="3" />
        <path d="M10 1v2M10 17v2M3.5 3.5l1.4 1.4M15.1 15.1l1.4 1.4M1 10h2M17 10h2M3.5 16.5l1.4-1.4M15.1 4.9l1.4-1.4" />
      </svg>
    ),
  },
];


export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

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
      <div className="flex items-center gap-3" style={{ padding: "24px 20px 32px" }}>
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

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1" style={{ padding: "0 12px" }}>
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center no-underline transition-colors"
              style={{
                gap: 12,
                padding: "12px 16px",
                borderRadius: 8,
                background: active ? "rgba(234,76,137,0.08)" : "transparent",
                color: active ? "#ea4c89" : "#636788",
                fontFamily: "var(--font-source), sans-serif",
                fontSize: 15,
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
        })}
      </nav>

      {/* User */}
      <div
        className="flex items-center gap-3"
        style={{
          padding: "16px 20px",
          borderTop: "1px solid #f3f5fc",
        }}
      >
        <div
          className="flex items-center justify-center shrink-0"
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "#f3f5fc",
            color: "#636788",
            fontFamily: "var(--font-mona), sans-serif",
            fontWeight: 600,
            fontSize: 16,
          }}
        >
          V
        </div>
        <span
          className="flex-1"
          style={{
            fontFamily: "var(--font-source), sans-serif",
            fontSize: 14,
            fontWeight: 600,
            color: "#191e41",
          }}
        >
          Vika
        </span>
        <Link href="/settings" aria-label="Settings">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#636788" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="10" cy="10" r="3" />
            <path d="M10 1v2M10 17v2M3.5 3.5l1.4 1.4M15.1 15.1l1.4 1.4M1 10h2M17 10h2M3.5 16.5l1.4-1.4M15.1 4.9l1.4-1.4" />
          </svg>
        </Link>
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
        style={{ minHeight: "100vh", marginLeft: 260, padding: "32px 40px" }}
      >
        {children}
      </main>

      {/* Mobile override */}
      <style>{`
        @media (max-width: 1023px) {
          main { margin-left: 0 !important; padding-top: 88px !important; }
        }
      `}</style>
    </div>
  );
}
