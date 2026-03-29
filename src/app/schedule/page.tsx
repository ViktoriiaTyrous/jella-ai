"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getAllPosts, deletePost, type Post } from "@/lib/post-store";
import { seedMockData } from "@/lib/mock-data";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const platformColors: Record<string, { bg: string; dot: string }> = {
  instagram: { bg: "rgba(225,48,108,0.1)", dot: "#e1306c" },
  tiktok: { bg: "rgba(0,0,0,0.08)", dot: "#000000" },
  twitter: { bg: "rgba(29,161,242,0.1)", dot: "#1da1f2" },
  facebook: { bg: "rgba(24,119,242,0.1)", dot: "#1877f2" },
  linkedin: { bg: "rgba(0,119,181,0.1)", dot: "#0077b5" },
  pinterest: { bg: "rgba(230,0,35,0.1)", dot: "#e60023" },
};

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDow = (firstDay.getDay() + 6) % 7; // Monday = 0
  const daysInMonth = lastDay.getDate();

  const days: { date: number; inMonth: boolean }[] = [];
  const prevMonthDays = new Date(year, month, 0).getDate();
  for (let i = startDow - 1; i >= 0; i--) {
    days.push({ date: prevMonthDays - i, inMonth: false });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ date: i, inMonth: true });
  }
  while (days.length % 7 !== 0) {
    days.push({ date: days.length - daysInMonth - startDow + 1, inMonth: false });
  }
  return days;
}

function getPostsForDay(posts: Post[], year: number, month: number, day: number): Post[] {
  return posts.filter((p) => {
    const dateStr = p.scheduledAt || p.createdAt;
    if (!dateStr) return false;
    const d = new Date(dateStr);
    return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day;
  });
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

export default function SchedulePage() {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const loadPosts = () => {
    seedMockData();
    setAllPosts(getAllPosts());
  };

  useEffect(() => {
    loadPosts();
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const today = new Date();
  const isCurrentMonth = currentMonth === today.getMonth() && currentYear === today.getFullYear();
  const todayDate = today.getDate();

  const calendarDays = getCalendarDays(currentYear, currentMonth);
  const monthName = new Date(currentYear, currentMonth).toLocaleString("en-US", { month: "long", year: "numeric" });

  const postsForSelectedDay = selectedDay !== null
    ? getPostsForDay(allPosts, currentYear, currentMonth, selectedDay)
    : [];

  const upcomingPosts = allPosts
    .filter((p) => {
      const dateStr = p.scheduledAt || p.createdAt;
      if (!dateStr) return false;
      return new Date(dateStr) > new Date();
    })
    .sort((a, b) => new Date(a.scheduledAt || a.createdAt).getTime() - new Date(b.scheduledAt || b.createdAt).getTime());

  const handleDelete = (id: string) => {
    deletePost(id);
    loadPosts();
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDay(null);
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDay(null);
  };

  return (
    <div style={{ width: "100%", padding: "24px 0" }}>
      {/* Back link */}
      <Link
        href="/dashboard"
        style={{
          fontFamily: "var(--font-source), sans-serif",
          fontSize: 14,
          color: "#636788",
          textDecoration: "none",
          display: "inline-block",
          marginBottom: 16,
        }}
      >
        &larr; Back to Dashboard
      </Link>

      {/* Title row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
          marginBottom: 32,
        }}
      >
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

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={prevMonth}
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              border: "1px solid #f3f5fc",
              background: "#ffffff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              color: "#636788",
            }}
          >
            &lsaquo;
          </button>
          <span
            style={{
              fontFamily: "var(--font-mona), sans-serif",
              fontWeight: 600,
              fontSize: 18,
              color: "#191e41",
              minWidth: 160,
              textAlign: "center",
            }}
          >
            {monthName}
          </span>
          <button
            onClick={nextMonth}
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              border: "1px solid #f3f5fc",
              background: "#ffffff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              color: "#636788",
            }}
          >
            &rsaquo;
          </button>
        </div>

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

      {/* Calendar Grid */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: 12,
          boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
          marginBottom: 40,
          overflow: "hidden",
        }}
      >
        {/* Day name headers */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
          }}
        >
          {daysOfWeek.map((d) => (
            <div
              key={d}
              style={{
                fontFamily: "var(--font-source), sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: "#636788",
                padding: "12px 8px",
                textAlign: "center",
                borderBottom: "1px solid #f3f5fc",
              }}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
          }}
        >
          {calendarDays.map((day, i) => {
            const isToday = isCurrentMonth && day.inMonth && day.date === todayDate;
            const dayPosts = day.inMonth
              ? getPostsForDay(allPosts, currentYear, currentMonth, day.date)
              : [];
            const visiblePills = dayPosts.slice(0, 2);
            const extraCount = dayPosts.length - 2;

            return (
              <div
                key={i}
                onClick={() => {
                  if (day.inMonth) setSelectedDay(day.date);
                }}
                style={{
                  minHeight: 120,
                  border: "1px solid #f3f5fc",
                  borderLeft: isToday ? "3px solid #ea4c89" : "1px solid #f3f5fc",
                  padding: 8,
                  background: isToday
                    ? "rgba(234,76,137,0.05)"
                    : day.inMonth
                    ? dayPosts.length > 0
                      ? "#ffffff"
                      : "#fafbff"
                    : "#fafbff",
                  cursor: day.inMonth ? "pointer" : "default",
                  position: "relative",
                }}
              >
                {/* Day number */}
                <div
                  style={{
                    fontFamily: "var(--font-source), sans-serif",
                    fontSize: 14,
                    fontWeight: isToday ? 700 : 400,
                    color: day.inMonth ? "#191e41" : "#d1d5db",
                    marginBottom: 4,
                  }}
                >
                  {day.date}
                </div>

                {/* Post pills */}
                {visiblePills.map((post) => {
                  const colors = platformColors[post.platform] || { bg: "rgba(0,0,0,0.05)", dot: "#636788" };
                  return (
                    <div
                      key={post.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (day.inMonth) setSelectedDay(day.date);
                      }}
                      style={{
                        width: "100%",
                        marginBottom: 4,
                        padding: "4px 8px",
                        borderRadius: 6,
                        background: colors.bg,
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        cursor: "pointer",
                      }}
                    >
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: colors.dot,
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "var(--font-source), sans-serif",
                          fontSize: 11,
                          color: "#191e41",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {post.caption.length > 20 ? post.caption.slice(0, 20) + "..." : post.caption}
                      </span>
                    </div>
                  );
                })}

                {extraCount > 0 && (
                  <div
                    style={{
                      fontFamily: "var(--font-source), sans-serif",
                      fontSize: 10,
                      color: "#9ca3af",
                      paddingLeft: 4,
                    }}
                  >
                    +{extraCount} more
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Day detail modal overlay */}
      {selectedDay !== null && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 1000,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {/* Backdrop */}
          <div
            onClick={() => setSelectedDay(null)}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              background: "rgba(0,0,0,0.2)",
            }}
          />
          {/* Slide-in panel */}
          <div
            style={{
              position: "relative",
              width: 400,
              maxWidth: "90vw",
              background: "#ffffff",
              boxShadow: "-4px 0 24px rgba(0,0,0,0.1)",
              padding: 24,
              overflowY: "auto",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 24,
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-mona), sans-serif",
                  fontWeight: 600,
                  fontSize: 18,
                  color: "#191e41",
                  margin: 0,
                }}
              >
                {new Date(currentYear, currentMonth, selectedDay).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </h3>
              <button
                onClick={() => setSelectedDay(null)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  border: "1px solid #f3f5fc",
                  background: "#ffffff",
                  cursor: "pointer",
                  fontSize: 16,
                  color: "#636788",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                &times;
              </button>
            </div>

            {/* Posts for this day */}
            {postsForSelectedDay.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {postsForSelectedDay.map((post) => {
                  const colors = platformColors[post.platform] || { bg: "rgba(0,0,0,0.05)", dot: "#636788" };
                  return (
                    <div
                      key={post.id}
                      style={{
                        padding: 16,
                        borderRadius: 8,
                        background: "#fafbff",
                        border: "1px solid #f3f5fc",
                      }}
                    >
                      {/* Platform badge */}
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          padding: "4px 10px",
                          borderRadius: 20,
                          background: colors.bg,
                          marginBottom: 8,
                        }}
                      >
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: colors.dot,
                          }}
                        />
                        <span
                          style={{
                            fontFamily: "var(--font-source), sans-serif",
                            fontSize: 12,
                            fontWeight: 600,
                            color: "#191e41",
                            textTransform: "capitalize",
                          }}
                        >
                          {post.platform}
                        </span>
                      </div>

                      {/* Caption */}
                      <p
                        style={{
                          fontFamily: "var(--font-source), sans-serif",
                          fontSize: 14,
                          color: "#191e41",
                          margin: "0 0 8px",
                          lineHeight: 1.5,
                        }}
                      >
                        {post.caption}
                      </p>

                      {/* Time */}
                      <p
                        style={{
                          fontFamily: "var(--font-source), sans-serif",
                          fontSize: 12,
                          color: "#636788",
                          margin: "0 0 12px",
                        }}
                      >
                        {post.scheduledAt
                          ? new Date(post.scheduledAt).toLocaleTimeString("en-US", {
                              hour: "numeric",
                              minute: "2-digit",
                            })
                          : "No time set"}
                      </p>

                      {/* Actions */}
                      <div style={{ display: "flex", gap: 8 }}>
                        <Link
                          href={`/create?id=${post.id}`}
                          style={{
                            padding: "6px 14px",
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
                            padding: "6px 14px",
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
                  );
                })}
              </div>
            ) : (
              <p
                style={{
                  fontFamily: "var(--font-source), sans-serif",
                  fontSize: 14,
                  color: "#636788",
                  margin: "0 0 16px",
                }}
              >
                No posts scheduled for this day.
              </p>
            )}

            {/* Schedule new button */}
            <Link
              href="/create"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 20px",
                borderRadius: 8,
                background: "#ea4c89",
                color: "#ffffff",
                fontFamily: "var(--font-mona), sans-serif",
                fontWeight: 600,
                fontSize: 14,
                textDecoration: "none",
                marginTop: 16,
              }}
            >
              Schedule New
            </Link>
          </div>
        </div>
      )}

      {/* Upcoming Posts */}
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

        {upcomingPosts.length === 0 ? (
          <div
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
              No upcoming posts.
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
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {upcomingPosts.map((post) => {
              const colors = platformColors[post.platform] || { bg: "rgba(0,0,0,0.05)", dot: "#636788" };
              return (
                <div
                  key={post.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    background: "#ffffff",
                    borderRadius: 12,
                    padding: 20,
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                  }}
                >
                  {/* Platform dot */}
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      background: colors.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: colors.dot,
                      }}
                    />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
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
                    <p
                      style={{
                        fontFamily: "var(--font-source), sans-serif",
                        fontSize: 13,
                        color: "#636788",
                        margin: 0,
                        textTransform: "capitalize",
                      }}
                    >
                      {post.platform} &middot; {post.scheduledAt ? formatDateTime(post.scheduledAt) : "Not set"}
                    </p>
                  </div>

                  <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
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
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
