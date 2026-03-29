"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getPostsByStatus, deletePost, type Post } from "@/lib/post-store";
import { seedMockData } from "@/lib/mock-data";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getCalendarData() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  // Convert Sunday=0 to Monday-start: Sun=6, Mon=0, Tue=1...
  const firstDayOffset = firstDay === 0 ? 6 : firstDay - 1;
  const today = now.getDate();
  const monthName = now.toLocaleString("en-US", { month: "long", year: "numeric" });

  return { year, month, daysInMonth, firstDayOffset, today, monthName };
}

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }) + " at " + d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

const platformIcons: Record<string, React.ReactNode> = {
  instagram: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#e1306c" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="1" width="12" height="12" rx="3" />
      <circle cx="7" cy="7" r="3" />
    </svg>
  ),
  tiktok: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#000" strokeWidth="1.2" strokeLinecap="round">
      <path d="M9 2v7a3.5 3.5 0 11-2.5-3.35" />
      <path d="M9 2c1 .4 2.5 1.2 3.5 2.5" />
    </svg>
  ),
  twitter: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#1da1f2" strokeWidth="1.2" strokeLinecap="round">
      <path d="M2 2l4.5 5L2 12M12 2l-4.5 5L12 12" />
    </svg>
  ),
  linkedin: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#0077b5" strokeWidth="1.2">
      <rect x="2" y="2" width="10" height="10" rx="2" />
      <path d="M5 6.5v2.5M5 5v.01M8 9V7.5a1 1 0 012 0V9M8 6.5v2.5" />
    </svg>
  ),
  facebook: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#1877f2" strokeWidth="1.2">
      <circle cx="7" cy="7" r="5" />
    </svg>
  ),
  pinterest: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#e60023" strokeWidth="1.2">
      <circle cx="7" cy="7" r="5" />
    </svg>
  ),
};

export default function SchedulePage() {
  const [scheduledPosts, setScheduledPosts] = useState<Post[]>([]);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  const loadPosts = () => {
    seedMockData();
    setScheduledPosts(getPostsByStatus("scheduled"));
  };

  useEffect(() => {
    loadPosts();
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const { daysInMonth, firstDayOffset, today, monthName, month, year } = getCalendarData();

  // Days that have scheduled posts
  const scheduledDays = new Set(
    scheduledPosts
      .filter((p) => p.scheduledAt)
      .map((p) => {
        const d = new Date(p.scheduledAt!);
        if (d.getMonth() === month && d.getFullYear() === year) return d.getDate();
        return -1;
      })
      .filter((d) => d > 0)
  );

  const calendarCells: (number | null)[] = [];
  for (let i = 0; i < firstDayOffset; i++) calendarCells.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarCells.push(d);
  while (calendarCells.length % 7 !== 0) calendarCells.push(null);

  // Posts for selected day
  const postsForDay = selectedDay
    ? scheduledPosts.filter((p) => {
        if (!p.scheduledAt) return false;
        const d = new Date(p.scheduledAt);
        return d.getDate() === selectedDay && d.getMonth() === month && d.getFullYear() === year;
      })
    : [];

  const handleDelete = (id: string) => {
    deletePost(id);
    loadPosts();
  };

  return (
    <div>
      <div className="flex items-center justify-between" style={{ marginBottom: 32 }}>
        <h1
          style={{
            fontFamily: "var(--font-mona), sans-serif",
            fontWeight: 600,
            fontSize: 28,
            color: "#191e41",
            margin: 0,
          }}
        >
          Content Calendar
        </h1>
        <Link
          href="/create"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 24px",
            borderRadius: 10,
            background: "#ea4c89",
            color: "#ffffff",
            fontFamily: "var(--font-mona), sans-serif",
            fontWeight: 600,
            fontSize: 15,
            textDecoration: "none",
            border: "none",
          }}
        >
          Schedule New Post
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" style={{ marginBottom: 40 }}>
        {/* Calendar */}
        <div
          className="lg:col-span-2"
          style={{
            background: "#ffffff",
            borderRadius: 12,
            padding: 24,
            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-mona), sans-serif",
              fontWeight: 600,
              fontSize: 18,
              color: "#191e41",
              margin: "0 0 20px",
              textAlign: "center",
            }}
          >
            {monthName}
          </h3>
          <div className="grid grid-cols-7 gap-1">
            {daysOfWeek.map((d) => (
              <div
                key={d}
                className="text-center"
                style={{
                  fontFamily: "var(--font-source), sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#636788",
                  padding: "8px 0",
                }}
              >
                {d}
              </div>
            ))}
            {calendarCells.map((day, i) => (
              <button
                key={i}
                disabled={day === null}
                onClick={() => day && setSelectedDay(day)}
                className="flex flex-col items-center justify-center"
                style={{
                  height: 48,
                  border: "none",
                  borderRadius: 8,
                  background:
                    day === today
                      ? "#ea4c89"
                      : day === selectedDay
                      ? "rgba(234,76,137,0.08)"
                      : "transparent",
                  color: day === today ? "#ffffff" : day ? "#191e41" : "transparent",
                  fontFamily: "var(--font-source), sans-serif",
                  fontSize: 14,
                  cursor: day ? "pointer" : "default",
                  position: "relative",
                  padding: "4px",
                }}
              >
                {day}
                {day && scheduledDays.has(day) && (
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: day === today ? "#ffffff" : "#ea4c89",
                      position: "absolute",
                      bottom: 6,
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Selected day panel */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: 12,
            padding: 24,
            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-mona), sans-serif",
              fontWeight: 600,
              fontSize: 16,
              color: "#191e41",
              margin: "0 0 16px",
            }}
          >
            {selectedDay
              ? new Date(year, month, selectedDay).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
              : "Select a day"}
          </h3>
          {postsForDay.length > 0 ? (
            <div className="flex flex-col gap-3">
              {postsForDay.map((post) => (
                <div
                  key={post.id}
                  style={{
                    padding: 16,
                    borderRadius: 8,
                    background: "#fafbff",
                    border: "1px solid #f3f5fc",
                  }}
                >
                  <p style={{ fontFamily: "var(--font-source), sans-serif", fontSize: 14, color: "#191e41", margin: "0 0 4px", fontWeight: 600, lineHeight: 1.4 }}>
                    {post.caption.slice(0, 80)}{post.caption.length > 80 ? "..." : ""}
                  </p>
                  <p style={{ fontFamily: "var(--font-source), sans-serif", fontSize: 12, color: "#636788", margin: "0 0 8px", textTransform: "capitalize" }}>
                    {post.platform} &middot; {post.scheduledAt ? new Date(post.scheduledAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }) : ""}
                  </p>
                  <div className="flex gap-2">
                    <Link
                      href={`/create?id=${post.id}`}
                      style={{
                        padding: "4px 10px",
                        borderRadius: 6,
                        border: "1px solid #f3f5fc",
                        background: "#ffffff",
                        color: "#636788",
                        fontFamily: "var(--font-source), sans-serif",
                        fontSize: 12,
                        textDecoration: "none",
                      }}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      style={{
                        padding: "4px 10px",
                        borderRadius: 6,
                        border: "1px solid #fee2e2",
                        background: "#fff5f5",
                        color: "#dc2626",
                        fontFamily: "var(--font-source), sans-serif",
                        fontSize: 12,
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ fontFamily: "var(--font-source), sans-serif", fontSize: 14, color: "#636788", margin: 0 }}>
              {selectedDay ? "No posts scheduled" : "Click a day to see details"}
            </p>
          )}
        </div>
      </div>

      {/* Upcoming posts */}
      <div>
        <h2
          style={{
            fontFamily: "var(--font-mona), sans-serif",
            fontWeight: 600,
            fontSize: 20,
            color: "#191e41",
            margin: "0 0 20px",
          }}
        >
          Upcoming Posts
        </h2>

        {scheduledPosts.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center"
            style={{
              background: "#ffffff",
              borderRadius: 12,
              padding: "48px 24px",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-source), sans-serif",
                fontSize: 16,
                color: "#636788",
                margin: "0 0 16px",
              }}
            >
              No scheduled posts yet.
            </p>
            <Link
              href="/create"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 24px",
                borderRadius: 10,
                background: "#ea4c89",
                color: "#ffffff",
                fontFamily: "var(--font-mona), sans-serif",
                fontWeight: 600,
                fontSize: 15,
                textDecoration: "none",
              }}
            >
              Create & Schedule Post
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {scheduledPosts
              .sort((a, b) => new Date(a.scheduledAt || "").getTime() - new Date(b.scheduledAt || "").getTime())
              .map((post) => (
                <div
                  key={post.id}
                  className="flex items-center gap-4"
                  style={{
                    background: "#ffffff",
                    borderRadius: 12,
                    padding: 20,
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                  }}
                >
                  <div
                    className="shrink-0"
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 8,
                      background: "#f3f5fc",
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      style={{
                        fontFamily: "var(--font-source), sans-serif",
                        fontSize: 14,
                        color: "#191e41",
                        margin: "0 0 4px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {post.caption}
                    </p>
                    <div className="flex items-center gap-1">
                      {platformIcons[post.platform] || null}
                      <p style={{ fontFamily: "var(--font-source), sans-serif", fontSize: 13, color: "#636788", margin: 0, textTransform: "capitalize" }}>
                        {post.platform} &middot; {post.scheduledAt ? formatDateTime(post.scheduledAt) : "Not set"}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Link
                      href={`/create?id=${post.id}`}
                      style={{
                        padding: "8px 14px",
                        borderRadius: 8,
                        border: "1px solid #f3f5fc",
                        background: "#ffffff",
                        color: "#636788",
                        fontFamily: "var(--font-source), sans-serif",
                        fontSize: 13,
                        textDecoration: "none",
                      }}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      style={{
                        padding: "8px 14px",
                        borderRadius: 8,
                        border: "1px solid #fee2e2",
                        background: "#fff5f5",
                        color: "#dc2626",
                        fontFamily: "var(--font-source), sans-serif",
                        fontSize: 13,
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
