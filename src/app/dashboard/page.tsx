"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAllPosts, getPostsByStatus, deletePost, type Post } from "@/lib/post-store";
import { seedMockData } from "@/lib/mock-data";

/* ─── Calendar helpers ─── */
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const platformBgColors: Record<string, string> = {
  instagram: "rgba(225,48,108,0.1)",
  tiktok: "rgba(0,0,0,0.08)",
  twitter: "rgba(29,161,242,0.1)",
  facebook: "rgba(24,119,242,0.1)",
  linkedin: "rgba(0,119,181,0.1)",
  pinterest: "rgba(230,0,35,0.1)",
};

/* ─── Platform filter chips ─── */
const platformFilters = ["All Platforms", "Instagram", "TikTok", "LinkedIn", "Twitter"];

/* ─── Kanban column config ─── */
const kanbanConfig: { title: string; dotColor: string; status: Post["status"] }[] = [
  { title: "Backlog", dotColor: "#9ca3af", status: "draft" },
  { title: "Scheduled", dotColor: "#3b82f6", status: "scheduled" },
  { title: "Published", dotColor: "#22c55e", status: "published" },
];

function getWeekDates(): Date[] {
  const now = new Date();
  const day = now.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  const monday = new Date(now);
  monday.setDate(now.getDate() + mondayOffset);
  const dates: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    dates.push(d);
  }
  return dates;
}

function getPostsForDate(posts: Post[], date: Date): Post[] {
  const dateStr = date.toISOString().slice(0, 10);
  return posts.filter((p) => {
    const pDate = p.scheduledAt || p.publishedAt || p.createdAt;
    return pDate && pDate.slice(0, 10) === dateStr;
  });
}

export default function DashboardPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [mounted, setMounted] = useState(false);
  const [activeView, setActiveView] = useState<"board" | "table" | "list">("board");
  const [activeFilter, setActiveFilter] = useState("All Platforms");
  const [userName, setUserName] = useState("there");

  useEffect(() => {
    const raw = localStorage.getItem("jella_session");
    if (raw) {
      const session = JSON.parse(raw);
      const firstName = (session.name || "").split(" ")[0];
      setUserName(firstName || "there");
    }
    seedMockData();
    setPosts(getAllPosts());
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const drafts = getPostsByStatus("draft");
  const scheduled = getPostsByStatus("scheduled");
  const published = getPostsByStatus("published");
  const allPosts = [...drafts, ...scheduled, ...published];
  const totalPosts = posts.length;

  const draftCount = drafts.length;
  const scheduledCount = scheduled.length;
  const publishedCount = published.length;

  const statCards = [
    {
      label: "Drafts",
      value: String(draftCount),
      subtitle: draftCount > 0 ? `${Math.min(draftCount, 3)} need review` : "None yet",
      iconBg: "rgba(234,76,137,0.1)",
      href: "/create",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ea4c89" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <polyline points="14,2 14,8 20,8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      ),
    },
    {
      label: "Scheduled",
      value: String(scheduledCount),
      subtitle: scheduledCount > 0 ? "Next: Today 2PM" : "None yet",
      iconBg: "rgba(59,130,246,0.1)",
      href: "/schedule",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12,6 12,12 16,14" />
        </svg>
      ),
    },
    {
      label: "Published",
      value: String(publishedCount),
      subtitle: publishedCount > 0 ? `+${publishedCount} this month` : "None yet",
      iconBg: "rgba(34,197,94,0.1)",
      href: "/dashboard",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
          <polyline points="22,4 12,14.01 9,11.01" />
        </svg>
      ),
    },
    {
      label: "Engagement Rate",
      value: "18",
      subtitle: "\u2191 +1.3% from last week",
      iconBg: "rgba(139,92,246,0.1)",
      href: "/dashboard",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </svg>
      ),
    },
  ];

  const weekDates = getWeekDates();

  /* Filter posts by platform */
  const filterByPlatform = (list: Post[]) => {
    if (activeFilter === "All Platforms") return list;
    return list.filter((p) => p.platform.toLowerCase() === activeFilter.toLowerCase());
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
        <div>
          <h1
            style={{
              fontFamily: "var(--font-mona), sans-serif",
              fontWeight: 600,
              fontSize: 28,
              color: "#191e41",
              margin: 0,
            }}
          >
            Welcome back, {userName} {"\uD83D\uDC4B"}
          </h1>
          <p
            style={{
              fontFamily: "var(--font-source), sans-serif",
              fontSize: 16,
              color: "#636788",
              margin: "8px 0 0",
            }}
          >
            Here&apos;s what&apos;s happening with your content today.
          </p>
        </div>
      </div>

      {/* Stats Row — clickable */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" style={{ marginBottom: 40 }}>
        {statCards.map((s) => (
          <div
            key={s.label}
            onClick={() => router.push(s.href)}
            style={{
              background: "#ffffff",
              borderRadius: 12,
              padding: 24,
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              cursor: "pointer",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)";
            }}
          >
            <div className="flex items-start" style={{ gap: 16 }}>
              <div
                className="flex items-center justify-center shrink-0"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: s.iconBg,
                }}
              >
                {s.icon}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mona), sans-serif",
                    fontWeight: 700,
                    fontSize: 36,
                    color: "#191e41",
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-source), sans-serif",
                    fontSize: 14,
                    color: "#636788",
                    marginTop: 4,
                  }}
                >
                  {s.label}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-source), sans-serif",
                    fontSize: 12,
                    color: "#636788",
                    marginTop: 2,
                  }}
                >
                  {s.subtitle}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Calendar + Quick Tip */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" style={{ marginBottom: 40 }}>
        {/* Content Calendar — real posts as pills */}
        <div
          className="lg:col-span-2"
          style={{
            background: "#ffffff",
            borderRadius: 12,
            padding: 24,
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          }}
        >
          <div className="flex items-center justify-between" style={{ marginBottom: 20 }}>
            <h2
              style={{
                fontFamily: "var(--font-mona), sans-serif",
                fontWeight: 600,
                fontSize: 18,
                color: "#191e41",
                margin: 0,
              }}
            >
              Content Calendar
            </h2>
            <Link
              href="/schedule"
              style={{
                fontFamily: "var(--font-source), sans-serif",
                fontSize: 14,
                fontWeight: 600,
                color: "#ea4c89",
                textDecoration: "none",
              }}
            >
              View Calendar &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {weekDates.map((date, idx) => {
              const dayPosts = getPostsForDate(posts, date);
              const visible = dayPosts.slice(0, 2);
              const extra = dayPosts.length - 2;
              return (
                <div key={idx} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-source), sans-serif",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#636788",
                      marginBottom: 4,
                      textTransform: "uppercase",
                    }}
                  >
                    {weekDays[idx]}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "#9ca3af",
                      marginBottom: 6,
                      fontFamily: "var(--font-source), sans-serif",
                    }}
                  >
                    {date.getDate()}
                  </div>
                  <div
                    style={{
                      minHeight: 80,
                      borderRadius: 8,
                      background: "#f9fafb",
                      padding: 6,
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                      justifyContent: dayPosts.length === 0 ? "center" : "flex-start",
                      alignItems: "center",
                    }}
                  >
                    {dayPosts.length === 0 ? (
                      <Link
                        href="/create"
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          border: "1.5px dashed #d1d5db",
                          background: "none",
                          color: "#9ca3af",
                          cursor: "pointer",
                          fontSize: 14,
                          lineHeight: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          textDecoration: "none",
                        }}
                        aria-label={`Add post for ${weekDays[idx]}`}
                      >
                        +
                      </Link>
                    ) : (
                      <>
                        {visible.map((p) => (
                          <Link
                            key={p.id}
                            href={`/create?id=${p.id}`}
                            style={{
                              display: "block",
                              width: "100%",
                              padding: "4px 8px",
                              borderRadius: 6,
                              background: platformBgColors[p.platform] || "rgba(0,0,0,0.05)",
                              textDecoration: "none",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              fontFamily: "var(--font-source), sans-serif",
                              fontSize: 11,
                              color: "#191e41",
                              textAlign: "left",
                            }}
                            title={p.caption}
                          >
                            {p.caption.slice(0, 15)}{p.caption.length > 15 ? "..." : ""}
                          </Link>
                        ))}
                        {extra > 0 && (
                          <span
                            style={{
                              fontFamily: "var(--font-source), sans-serif",
                              fontSize: 10,
                              color: "#9ca3af",
                            }}
                          >
                            +{extra} more
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Tip */}
        <div
          style={{
            background: "#fef9ee",
            borderRadius: 12,
            padding: 24,
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div className="flex items-center" style={{ gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 20 }}>{"\uD83D\uDCA1"}</span>
              <span
                style={{
                  fontFamily: "var(--font-mona), sans-serif",
                  fontWeight: 600,
                  fontSize: 16,
                  color: "#191e41",
                }}
              >
                Quick Tip
              </span>
            </div>
            <p
              style={{
                fontFamily: "var(--font-source), sans-serif",
                fontSize: 14,
                color: "#636788",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Posts with questions get 2x more comments. Try starting your next caption with a question!
            </p>
          </div>
          <Link
            href="/create"
            style={{
              marginTop: 20,
              padding: "10px 20px",
              borderRadius: 999,
              border: "2px solid #ea4c89",
              background: "transparent",
              color: "#ea4c89",
              fontFamily: "var(--font-mona), sans-serif",
              fontWeight: 600,
              fontSize: 13,
              cursor: "pointer",
              whiteSpace: "nowrap",
              textDecoration: "none",
              textAlign: "center",
              display: "inline-block",
            }}
          >
            Generate Question Post
          </Link>
        </div>
      </div>

      {/* Empty state OR Content Board */}
      {totalPosts === 0 ? (
        <div
          style={{
            background: "#ffffff",
            borderRadius: 12,
            padding: "64px 24px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ marginBottom: 24 }}>
            <rect x="16" y="8" width="48" height="60" rx="6" stroke="#d8dce8" strokeWidth="2" fill="#f9fafb" />
            <line x1="28" y1="24" x2="52" y2="24" stroke="#d8dce8" strokeWidth="2" strokeLinecap="round" />
            <line x1="28" y1="32" x2="48" y2="32" stroke="#d8dce8" strokeWidth="2" strokeLinecap="round" />
            <line x1="28" y1="40" x2="44" y2="40" stroke="#d8dce8" strokeWidth="2" strokeLinecap="round" />
            <circle cx="58" cy="58" r="14" fill="#ea4c89" fillOpacity="0.12" />
            <path d="M54 58h8M58 54v8" stroke="#ea4c89" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <h3
            style={{
              fontFamily: "var(--font-mona), sans-serif",
              fontWeight: 600,
              fontSize: 20,
              color: "#191e41",
              margin: "0 0 8px",
            }}
          >
            Your content board is empty
          </h3>
          <p
            style={{
              fontFamily: "var(--font-source), sans-serif",
              fontSize: 15,
              color: "#636788",
              margin: "0 0 24px",
            }}
          >
            Create your first AI-powered post to get started
          </p>
          <Link
            href="/create"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 28px",
              borderRadius: 10,
              background: "#ea4c89",
              color: "#ffffff",
              fontFamily: "var(--font-mona), sans-serif",
              fontWeight: 600,
              fontSize: 16,
              textDecoration: "none",
              border: "none",
            }}
          >
            {"\u2728"} Create Your First Post
          </Link>
        </div>
      ) : (
        <div
          style={{
            background: "#ffffff",
            borderRadius: 12,
            padding: 24,
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          }}
        >
          {/* Header row */}
          <div className="flex flex-wrap items-center justify-between" style={{ gap: 16, marginBottom: 20 }}>
            <h2
              style={{
                fontFamily: "var(--font-mona), sans-serif",
                fontWeight: 600,
                fontSize: 18,
                color: "#191e41",
                margin: 0,
              }}
            >
              Content Board
            </h2>
            <div className="flex items-center" style={{ gap: 8 }}>
              <Link
                href="/create"
                style={{
                  padding: "8px 20px",
                  borderRadius: 999,
                  border: "2px solid #ea4c89",
                  background: "transparent",
                  color: "#ea4c89",
                  fontFamily: "var(--font-mona), sans-serif",
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: "pointer",
                  textDecoration: "none",
                }}
              >
                AI Generate Ideas
              </Link>
              <Link
                href="/create"
                style={{
                  padding: "8px 20px",
                  borderRadius: 999,
                  border: "none",
                  background: "#ea4c89",
                  color: "#ffffff",
                  fontFamily: "var(--font-mona), sans-serif",
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: "pointer",
                  textDecoration: "none",
                }}
              >
                New Idea
              </Link>
            </div>
          </div>

          {/* View toggle + filters */}
          <div className="flex flex-wrap items-center justify-between" style={{ gap: 12, marginBottom: 24 }}>
            <div className="flex" style={{ gap: 0, background: "#f3f5fc", borderRadius: 8, padding: 3 }}>
              {(["board", "table", "list"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setActiveView(v)}
                  style={{
                    padding: "6px 16px",
                    borderRadius: 6,
                    border: "none",
                    background: activeView === v ? "#ea4c89" : "transparent",
                    color: activeView === v ? "#ffffff" : "#636788",
                    fontFamily: "var(--font-source), sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    textTransform: "capitalize",
                  }}
                >
                  {v}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap" style={{ gap: 8 }}>
              {platformFilters.map((p) => (
                <button
                  key={p}
                  onClick={() => setActiveFilter(p)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 999,
                    border: activeFilter === p ? "none" : "1px solid #e5e7eb",
                    background: activeFilter === p ? "#ea4c89" : "transparent",
                    color: activeFilter === p ? "#ffffff" : "#636788",
                    fontFamily: "var(--font-source), sans-serif",
                    fontSize: 12,
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* === BOARD VIEW === */}
          {activeView === "board" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {kanbanConfig.map((col) => {
                const colPosts = filterByPlatform(col.status === "draft" ? drafts : col.status === "scheduled" ? scheduled : published);
                return (
                  <div key={col.title} style={{ background: "#f9fafb", borderRadius: 10, padding: 12, minHeight: 200 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, padding: "0 4px" }}>
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: col.dotColor, display: "inline-block" }} />
                      <span style={{ fontFamily: "var(--font-mona), sans-serif", fontWeight: 600, fontSize: 14, color: "#191e41" }}>{col.title}</span>
                      <span style={{ fontFamily: "var(--font-source), sans-serif", fontSize: 12, color: "#9ca3af", marginLeft: "auto" }}>{colPosts.length}</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {colPosts.length === 0 ? (
                        <div style={{ padding: "24px 12px", textAlign: "center" }}>
                          <p style={{ fontFamily: "var(--font-source), sans-serif", fontSize: 13, color: "#9ca3af", fontStyle: "italic", margin: "0 0 8px" }}>No items yet</p>
                          <Link href="/create" style={{ fontFamily: "var(--font-mona), sans-serif", fontSize: 13, fontWeight: 600, color: "#ea4c89", textDecoration: "none" }}>+ Create</Link>
                        </div>
                      ) : colPosts.map((post) => (
                        <div key={post.id} style={{ background: "#ffffff", borderRadius: 8, padding: 16, border: "1px solid #f3f5fc", transition: "box-shadow 0.15s ease" }}
                          onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)")}
                          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}>
                          <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 4, background: platformBgColors[post.platform] || "rgba(234,76,137,0.08)", color: "#191e41", fontFamily: "var(--font-source), sans-serif", fontSize: 11, fontWeight: 600, marginBottom: 8, textTransform: "capitalize" }}>{post.platform}</span>
                          <div style={{ fontFamily: "var(--font-source), sans-serif", fontSize: 13, color: "#191e41", lineHeight: 1.4, marginBottom: 8, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{post.caption.length > 50 ? post.caption.slice(0, 50) + "..." : post.caption}</div>
                          <div style={{ fontFamily: "var(--font-source), sans-serif", fontSize: 11, color: "#9ca3af", marginBottom: 10 }}>{new Date(post.scheduledAt || post.publishedAt || post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</div>
                          <div style={{ display: "flex", gap: 8 }}>
                            <Link href={`/create?id=${post.id}`} style={{ padding: "4px 12px", borderRadius: 6, border: "1px solid #e5e7eb", background: "transparent", color: "#636788", fontFamily: "var(--font-source), sans-serif", fontSize: 12, fontWeight: 500, textDecoration: "none", cursor: "pointer" }}
                              onMouseEnter={(e) => (e.currentTarget.style.background = "#f3f5fc")}
                              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>Edit</Link>
                            <button type="button" onClick={() => { deletePost(post.id); setPosts(getAllPosts()); }} style={{ padding: "4px 12px", borderRadius: 6, border: "1px solid rgba(239,68,68,0.2)", background: "transparent", color: "#ef4444", fontFamily: "var(--font-source), sans-serif", fontSize: 12, fontWeight: 500, cursor: "pointer" }}
                              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(239,68,68,0.05)")}
                              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>Delete</button>
                          </div>
                        </div>
                      ))}
                      <Link href="/create" style={{ width: "100%", padding: 10, borderRadius: 8, border: "1.5px dashed #d1d5db", background: "transparent", color: "#9ca3af", fontFamily: "var(--font-source), sans-serif", fontSize: 13, cursor: "pointer", textAlign: "center", textDecoration: "none", display: "block" }}>+ Add new idea</Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* === TABLE VIEW === */}
          {activeView === "table" && (
            <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #f3f5fc", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-source), sans-serif", fontSize: 14 }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #f3f5fc" }}>
                    {["Caption", "Platform", "Status", "Date", ""].map((h) => (
                      <th key={h} style={{ padding: "14px 16px", textAlign: "left", fontFamily: "var(--font-mona), sans-serif", fontSize: 12, fontWeight: 600, color: "#636788", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filterByPlatform(allPosts).map((post) => (
                    <tr key={post.id} style={{ borderBottom: "1px solid #f3f5fc", transition: "background 0.15s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#fafbff")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                      <td style={{ padding: "14px 16px", color: "#191e41", maxWidth: 400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{post.caption.slice(0, 80)}{post.caption.length > 80 ? "..." : ""}</td>
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 4, background: platformBgColors[post.platform] || "#f3f5fc", fontSize: 12, fontWeight: 600, textTransform: "capitalize", color: "#191e41" }}>{post.platform}</span>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 12, fontSize: 12, fontWeight: 600, background: post.status === "published" ? "rgba(34,197,94,0.1)" : post.status === "scheduled" ? "rgba(59,130,246,0.1)" : "rgba(156,163,175,0.1)", color: post.status === "published" ? "#16a34a" : post.status === "scheduled" ? "#2563eb" : "#6b7280", textTransform: "capitalize" }}>{post.status}</span>
                      </td>
                      <td style={{ padding: "14px 16px", color: "#9ca3af", fontSize: 13 }}>{new Date(post.scheduledAt || post.publishedAt || post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>
                      <td style={{ padding: "14px 16px" }}>
                        <Link href={`/create?id=${post.id}`} style={{ color: "#ea4c89", fontWeight: 600, fontSize: 13, textDecoration: "none" }}>Edit</Link>
                      </td>
                    </tr>
                  ))}
                  {filterByPlatform(allPosts).length === 0 && (
                    <tr><td colSpan={5} style={{ padding: 40, textAlign: "center", color: "#9ca3af", fontStyle: "italic" }}>No posts yet</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* === LIST VIEW === */}
          {activeView === "list" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {filterByPlatform(allPosts).length === 0 ? (
                <div style={{ padding: 40, textAlign: "center", color: "#9ca3af", fontStyle: "italic", fontFamily: "var(--font-source), sans-serif" }}>No posts yet</div>
              ) : filterByPlatform(allPosts).map((post) => (
                <Link key={post.id} href={`/create?id=${post.id}`} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", background: "#fff", borderRadius: 12, border: "1px solid #f3f5fc", textDecoration: "none", transition: "box-shadow 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.06)")}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}>
                  <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 10, background: platformBgColors[post.platform] || "#f3f5fc", fontFamily: "var(--font-mona), sans-serif", fontSize: 11, fontWeight: 700, color: "#191e41", textTransform: "uppercase", flexShrink: 0 }}>{post.platform.slice(0, 2)}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "var(--font-source), sans-serif", fontSize: 14, color: "#191e41", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{post.caption}</div>
                    <div style={{ fontFamily: "var(--font-source), sans-serif", fontSize: 12, color: "#9ca3af", marginTop: 2 }}>{post.platform} · {new Date(post.scheduledAt || post.publishedAt || post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</div>
                  </div>
                  <span style={{ display: "inline-block", padding: "4px 12px", borderRadius: 12, fontSize: 12, fontWeight: 600, fontFamily: "var(--font-source), sans-serif", background: post.status === "published" ? "rgba(34,197,94,0.1)" : post.status === "scheduled" ? "rgba(59,130,246,0.1)" : "rgba(156,163,175,0.1)", color: post.status === "published" ? "#16a34a" : post.status === "scheduled" ? "#2563eb" : "#6b7280", textTransform: "capitalize", flexShrink: 0 }}>{post.status}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
