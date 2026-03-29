"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllPosts, getPostsByStatus, type Post } from "@/lib/post-store";
import { seedMockData } from "@/lib/mock-data";

/* ─── Mock Kanban Data ─── */
const kanbanColumns = [
  {
    title: "Backlog",
    dotColor: "#9ca3af",
    cards: [
      {
        id: "b1",
        priority: "AI",
        priorityColor: "#3b82f6",
        title: "Summer collection launch carousel",
        desc: "Create a 5-slide carousel for IG showcasing new summer arrivals",
        attachments: 2,
        comments: 3,
      },
      {
        id: "b2",
        priority: "High",
        priorityColor: "#ef4444",
        title: "Brand voice guidelines video",
        desc: "Record a short TikTok explaining our brand personality",
        attachments: 1,
        comments: 0,
      },
    ],
  },
  {
    title: "To Do",
    dotColor: "#3b82f6",
    cards: [
      {
        id: "t1",
        priority: "AI Draft",
        priorityColor: "#8b5cf6",
        title: "LinkedIn thought leadership post",
        desc: "AI-generated draft about design trends 2026",
        attachments: 0,
        comments: 2,
      },
      {
        id: "t2",
        priority: "High",
        priorityColor: "#ef4444",
        title: "Product launch teaser reel",
        desc: "15s teaser for Instagram Reels with countdown",
        attachments: 3,
        comments: 1,
      },
    ],
  },
  {
    title: "In Progress",
    dotColor: "#eab308",
    cards: [
      {
        id: "p1",
        priority: "AI",
        priorityColor: "#3b82f6",
        title: "Weekly engagement recap post",
        desc: "Compile top-performing content stats for Twitter",
        attachments: 1,
        comments: 4,
        progress: 65,
      },
    ],
  },
  {
    title: "Needs Review",
    dotColor: "#ef4444",
    cards: [
      {
        id: "r1",
        priority: "High",
        priorityColor: "#ef4444",
        title: "Client testimonial graphic",
        desc: "Quote card design for Instagram feed post",
        attachments: 2,
        comments: 5,
      },
      {
        id: "r2",
        priority: "AI Draft",
        priorityColor: "#8b5cf6",
        title: "Email newsletter header design",
        desc: "Hero image for March newsletter campaign",
        attachments: 1,
        comments: 2,
      },
      {
        id: "r3",
        priority: "AI",
        priorityColor: "#3b82f6",
        title: "Pinterest pin — spring mood board",
        desc: "Curated mood board pin with product overlays",
        attachments: 4,
        comments: 1,
      },
    ],
  },
];

/* ─── Calendar mock data ─── */
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const calendarData: Record<string, string[]> = {
  Mon: ["instagram", "tiktok"],
  Tue: [],
  Wed: ["facebook", "instagram"],
  Thu: ["youtube"],
  Fri: ["instagram", "tiktok", "facebook"],
  Sat: [],
  Sun: ["instagram"],
};

const platformColors: Record<string, string> = {
  instagram: "#e1306c",
  tiktok: "#191e41",
  facebook: "#1877f2",
  youtube: "#ff0000",
};

/* ─── Platform filter chips ─── */
const platformFilters = ["All Platforms", "Instagram", "TikTok", "LinkedIn", "Twitter"];

export default function DashboardPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [mounted, setMounted] = useState(false);
  const [activeView, setActiveView] = useState<"board" | "table" | "list">("board");
  const [activeFilter, setActiveFilter] = useState("All Platforms");

  useEffect(() => {
    seedMockData();
    setPosts(getAllPosts());
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const draftCount = getPostsByStatus("draft").length || 4750;
  const scheduledCount = getPostsByStatus("scheduled").length || 18;
  const publishedCount = getPostsByStatus("published").length || 1;

  const stats = [
    {
      label: "Drafts",
      value: draftCount.toLocaleString(),
      subtitle: "3 need review",
      iconBg: "rgba(234,76,137,0.1)",
      iconColor: "#ea4c89",
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
      subtitle: "Next: Today 2PM",
      iconBg: "rgba(59,130,246,0.1)",
      iconColor: "#3b82f6",
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
      subtitle: "+12 this month",
      iconBg: "rgba(34,197,94,0.1)",
      iconColor: "#22c55e",
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
      iconColor: "#8b5cf6",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </svg>
      ),
    },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1
          style={{
            fontFamily: "var(--font-mona), sans-serif",
            fontWeight: 600,
            fontSize: 28,
            color: "#191e41",
            margin: 0,
          }}
        >
          Welcome back, Anna {"\uD83D\uDC4B"}
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

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" style={{ marginBottom: 40 }}>
        {stats.map((s) => (
          <div
            key={s.label}
            style={{
              background: "#ffffff",
              borderRadius: 12,
              padding: 24,
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
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
        {/* Content Calendar */}
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
            {weekDays.map((day) => (
              <div key={day} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "var(--font-source), sans-serif",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#636788",
                    marginBottom: 8,
                    textTransform: "uppercase",
                  }}
                >
                  {day}
                </div>
                <div
                  style={{
                    minHeight: 64,
                    borderRadius: 8,
                    background: "#f9fafb",
                    padding: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 6,
                    justifyContent: "center",
                  }}
                >
                  {calendarData[day].length > 0 ? (
                    <div className="flex flex-wrap justify-center" style={{ gap: 4 }}>
                      {calendarData[day].map((platform, i) => (
                        <span
                          key={i}
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            background: platformColors[platform] || "#636788",
                            display: "inline-block",
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <button
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
                      }}
                      aria-label={`Add post for ${day}`}
                    >
                      +
                    </button>
                  )}
                </div>
              </div>
            ))}
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
          <button
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
            }}
          >
            Generate Question Post
          </button>
        </div>
      </div>

      {/* Content Board Section */}
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
            <button
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
              }}
            >
              AI Generate Ideas
            </button>
            <button
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
              }}
            >
              New Idea
            </button>
          </div>
        </div>

        {/* View toggle + filters */}
        <div className="flex flex-wrap items-center justify-between" style={{ gap: 12, marginBottom: 24 }}>
          {/* View tabs */}
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

          {/* Platform filter chips */}
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

        {/* Kanban columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {kanbanColumns.map((col) => (
            <div
              key={col.title}
              style={{
                background: "#f9fafb",
                borderRadius: 10,
                padding: 12,
                minHeight: 200,
              }}
            >
              {/* Column header */}
              <div className="flex items-center" style={{ gap: 8, marginBottom: 12, padding: "0 4px" }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: col.dotColor,
                    display: "inline-block",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-mona), sans-serif",
                    fontWeight: 600,
                    fontSize: 14,
                    color: "#191e41",
                  }}
                >
                  {col.title}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-source), sans-serif",
                    fontSize: 12,
                    color: "#9ca3af",
                    marginLeft: "auto",
                  }}
                >
                  {col.cards.length}
                </span>
              </div>

              {/* Cards */}
              <div className="flex flex-col" style={{ gap: 8 }}>
                {col.cards.map((card) => (
                  <div
                    key={card.id}
                    style={{
                      background: "#ffffff",
                      borderRadius: 8,
                      padding: 16,
                      border: "1px solid #f3f5fc",
                    }}
                  >
                    {/* Priority badge */}
                    <span
                      style={{
                        display: "inline-block",
                        padding: "2px 8px",
                        borderRadius: 4,
                        background: `${card.priorityColor}15`,
                        color: card.priorityColor,
                        fontFamily: "var(--font-source), sans-serif",
                        fontSize: 11,
                        fontWeight: 600,
                        marginBottom: 8,
                      }}
                    >
                      {card.priority}
                    </span>

                    {/* Title */}
                    <div
                      style={{
                        fontFamily: "var(--font-mona), sans-serif",
                        fontWeight: 600,
                        fontSize: 14,
                        color: "#191e41",
                        marginBottom: 4,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {card.title}
                    </div>

                    {/* Description */}
                    <div
                      style={{
                        fontFamily: "var(--font-source), sans-serif",
                        fontSize: 13,
                        color: "#636788",
                        lineHeight: 1.4,
                        marginBottom: 12,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {card.desc}
                    </div>

                    {/* Progress bar */}
                    {"progress" in card && card.progress !== undefined && (
                      <div style={{ marginBottom: 12 }}>
                        <div className="flex items-center justify-between" style={{ marginBottom: 4 }}>
                          <span style={{ fontFamily: "var(--font-source), sans-serif", fontSize: 11, color: "#636788" }}>
                            Progress
                          </span>
                          <span style={{ fontFamily: "var(--font-source), sans-serif", fontSize: 11, color: "#ea4c89", fontWeight: 600 }}>
                            {card.progress}%
                          </span>
                        </div>
                        <div style={{ height: 4, borderRadius: 2, background: "#f3f5fc" }}>
                          <div style={{ height: 4, borderRadius: 2, background: "#ea4c89", width: `${card.progress}%` }} />
                        </div>
                      </div>
                    )}

                    {/* Bottom row */}
                    <div className="flex items-center" style={{ gap: 12 }}>
                      <div className="flex items-center" style={{ gap: 4, color: "#9ca3af" }}>
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                          <path d="M14 10l-3.5-2L14 6v4zM1 4h8a1 1 0 011 1v6a1 1 0 01-1 1H1V4z" />
                        </svg>
                        <span style={{ fontFamily: "var(--font-source), sans-serif", fontSize: 12 }}>{card.attachments}</span>
                      </div>
                      <div className="flex items-center" style={{ gap: 4, color: "#9ca3af" }}>
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 14l3-1.5L13.5 3a1.4 1.4 0 00-2-2L2 10.5z" />
                        </svg>
                        <span style={{ fontFamily: "var(--font-source), sans-serif", fontSize: 12 }}>{card.comments}</span>
                      </div>
                      <div className="flex items-center" style={{ gap: -4, marginLeft: "auto" }}>
                        <div
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: "50%",
                            background: "rgba(234,76,137,0.2)",
                            border: "1.5px solid #fff",
                          }}
                        />
                        <div
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: "50%",
                            background: "rgba(59,130,246,0.2)",
                            border: "1.5px solid #fff",
                            marginLeft: -6,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add new idea */}
                <button
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: 8,
                    border: "1.5px dashed #d1d5db",
                    background: "transparent",
                    color: "#9ca3af",
                    fontFamily: "var(--font-source), sans-serif",
                    fontSize: 13,
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                >
                  + Add new idea
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
