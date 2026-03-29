"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllPosts, getPostsByStatus, type Post } from "@/lib/post-store";
import { seedMockData } from "@/lib/mock-data";

const statusColors: Record<string, { bg: string; color: string }> = {
  published: { bg: "rgba(34,197,94,0.1)", color: "#16a34a" },
  scheduled: { bg: "rgba(59,130,246,0.1)", color: "#2563eb" },
  draft: { bg: "rgba(156,163,175,0.1)", color: "#6b7280" },
};

const platformIcons: Record<string, React.ReactNode> = {
  instagram: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#e1306c" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="1" width="14" height="14" rx="4" />
      <circle cx="8" cy="8" r="3.5" />
      <circle cx="12" cy="4" r="1" fill="#e1306c" stroke="none" />
    </svg>
  ),
  tiktok: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M10 2v8a4 4 0 11-3-3.87" stroke="#000" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 2c1.5.5 3 1.5 4 3" stroke="#000" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  twitter: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#1da1f2" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 2l5.5 6L2 14M14 2l-5.5 6L14 14" />
    </svg>
  ),
  facebook: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#1877f2" strokeWidth="1.2">
      <path d="M14 8a6 6 0 10-7 5.93V10H5.5V8H7V6.5A2.5 2.5 0 019.5 4h1.5v2H10a.5.5 0 00-.5.5V8H11l-.5 2H9.5v3.93A6 6 0 0014 8z" />
    </svg>
  ),
  linkedin: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#0077b5" strokeWidth="1.2">
      <rect x="2" y="2" width="12" height="12" rx="2" />
      <path d="M5.5 7v3M5.5 5.5v.01M9 10V8.25a1.25 1.25 0 012.5 0V10M9 7v3" />
    </svg>
  ),
  pinterest: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#e60023" strokeWidth="1.2">
      <circle cx="8" cy="8" r="6" />
      <path d="M6.5 11c-.4 1.5-.8 2.5-.8 2.5M6 9.5C6.5 7 7.5 5 9 5c1.5 0 1 2.5-.5 3.5-.7.6-1.5.8-2 .4" />
    </svg>
  ),
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function DashboardPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    seedMockData();
    setPosts(getAllPosts());
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const totalPosts = posts.length;
  const scheduledCount = getPostsByStatus("scheduled").length;
  const publishedCount = getPostsByStatus("published").length;
  const draftCount = getPostsByStatus("draft").length;

  const stats = [
    { label: "Total Posts", value: String(totalPosts), trend: `+${totalPosts}`, up: true },
    { label: "Scheduled", value: String(scheduledCount), trend: `+${scheduledCount}`, up: true },
    { label: "Published", value: String(publishedCount), trend: `+${publishedCount}`, up: true },
    { label: "Drafts", value: String(draftCount), trend: String(draftCount), up: true },
  ];

  const recentPosts = posts.slice(0, 6);

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
          Welcome back, Vika
        </h1>
        <p
          style={{
            fontFamily: "var(--font-source), sans-serif",
            fontSize: 16,
            color: "#636788",
            margin: "8px 0 0",
          }}
        >
          Here&apos;s what&apos;s happening with your content
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" style={{ marginBottom: 40 }}>
        {stats.map((s) => (
          <div
            key={s.label}
            style={{
              background: "#ffffff",
              borderRadius: 12,
              padding: 24,
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-source), sans-serif",
                fontSize: 14,
                color: "#636788",
                marginBottom: 8,
              }}
            >
              {s.label}
            </div>
            <div className="flex items-end gap-3">
              <span
                style={{
                  fontFamily: "var(--font-mona), sans-serif",
                  fontWeight: 700,
                  fontSize: 32,
                  color: "#191e41",
                  lineHeight: 1,
                }}
              >
                {s.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Posts */}
      <div style={{ marginBottom: 40 }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 20 }}>
          <h2
            style={{
              fontFamily: "var(--font-mona), sans-serif",
              fontWeight: 600,
              fontSize: 20,
              color: "#191e41",
              margin: 0,
            }}
          >
            Recent Posts
          </h2>
        </div>

        {recentPosts.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center"
            style={{
              background: "#ffffff",
              borderRadius: 12,
              padding: "60px 24px",
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
              No posts yet. Create your first post!
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
              Create New Post
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentPosts.map((post) => (
              <div
                key={post.id}
                style={{
                  background: "#ffffff",
                  borderRadius: 12,
                  padding: 20,
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: 120,
                    borderRadius: 8,
                    background: "#f3f5fc",
                    marginBottom: 16,
                  }}
                />
                <div className="flex items-center gap-2" style={{ marginBottom: 8 }}>
                  {platformIcons[post.platform] || null}
                  <span
                    style={{
                      fontFamily: "var(--font-source), sans-serif",
                      fontSize: 13,
                      color: "#636788",
                      textTransform: "capitalize",
                    }}
                  >
                    {post.platform}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-source), sans-serif",
                    fontSize: 14,
                    color: "#191e41",
                    margin: "0 0 12px",
                    lineHeight: 1.5,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {post.caption}
                </p>
                <div className="flex items-center justify-between">
                  <span
                    style={{
                      fontFamily: "var(--font-source), sans-serif",
                      fontSize: 13,
                      color: "#636788",
                    }}
                  >
                    {formatDate(post.publishedAt || post.scheduledAt || post.createdAt)}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-source), sans-serif",
                      fontSize: 12,
                      fontWeight: 600,
                      padding: "3px 10px",
                      borderRadius: 6,
                      ...(statusColors[post.status] || statusColors.draft),
                    }}
                  >
                    {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                  </span>
                </div>
                {post.engagement && (
                  <div className="flex gap-3" style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid #f3f5fc" }}>
                    <span style={{ fontFamily: "var(--font-source), sans-serif", fontSize: 12, color: "#636788" }}>
                      ❤️ {post.engagement.likes}
                    </span>
                    <span style={{ fontFamily: "var(--font-source), sans-serif", fontSize: 12, color: "#636788" }}>
                      💬 {post.engagement.comments}
                    </span>
                    <span style={{ fontFamily: "var(--font-source), sans-serif", fontSize: 12, color: "#636788" }}>
                      🔄 {post.engagement.shares}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
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
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
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
            Create New Post
          </Link>
          <Link
            href="/schedule"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 24px",
              borderRadius: 10,
              background: "transparent",
              color: "#ea4c89",
              fontFamily: "var(--font-mona), sans-serif",
              fontWeight: 600,
              fontSize: 15,
              textDecoration: "none",
              border: "2px solid #ea4c89",
            }}
          >
            Schedule Posts
          </Link>
        </div>
      </div>
    </div>
  );
}
