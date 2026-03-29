"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getAllPosts, type Post } from "@/lib/post-store";
import { seedMockData } from "@/lib/mock-data";

/* ── mock data ── */
const likesData = [120, 180, 150, 220, 280, 190, 310];
const commentsData = [45, 62, 38, 85, 95, 70, 110];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const platformPosts = [
  { name: "Instagram", count: 45, color: "#ea4c89" },
  { name: "TikTok", count: 28, color: "#191e41" },
  { name: "Twitter/X", count: 22, color: "#1da1f2" },
  { name: "LinkedIn", count: 15, color: "#0a66c2" },
  { name: "Facebook", count: 12, color: "#4267b2" },
  { name: "Pinterest", count: 8, color: "#e60023" },
];

const platformMetrics = [
  { platform: "Instagram", posts: 45, engagement: "4.8%", growth: "+12%" },
  { platform: "TikTok", posts: 28, engagement: "6.2%", growth: "+23%" },
  { platform: "Twitter/X", posts: 22, engagement: "2.1%", growth: "+5%" },
  { platform: "LinkedIn", posts: 15, engagement: "3.4%", growth: "+18%" },
  { platform: "Facebook", posts: 12, engagement: "1.9%", growth: "+3%" },
  { platform: "Pinterest", posts: 8, engagement: "5.1%", growth: "+31%" },
];

const heatmapData = [
  [2, 1, 3, 0, 1, 2, 0],
  [1, 0, 2, 1, 3, 1, 0],
  [0, 2, 1, 2, 0, 3, 1],
  [3, 1, 0, 1, 2, 0, 2],
];

function heatColor(v: number) {
  if (v === 0) return "#f3f5fc";
  if (v === 1) return "rgba(234,76,137,0.25)";
  if (v === 2) return "rgba(234,76,137,0.55)";
  return "#ea4c89";
}

/* ── SVG chart helpers ── */
const chartW = 600;
const chartH = 240;
const padL = 48;
const padR = 16;
const padT = 16;
const padB = 32;
const plotW = chartW - padL - padR;
const plotH = chartH - padT - padB;

function toPoints(data: number[], maxVal: number) {
  return data
    .map((v, i) => {
      const x = padL + (i / (data.length - 1)) * plotW;
      const y = padT + plotH - (v / maxVal) * plotH;
      return `${x},${y}`;
    })
    .join(" ");
}

/* ── stat card ── */
function StatCard({
  label,
  value,
  change,
  iconBg,
  icon,
}: {
  label: string;
  value: string;
  change: string;
  iconBg: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      style={{
        flex: "1 1 0",
        minWidth: 200,
        background: "#ffffff",
        borderRadius: 12,
        padding: 24,
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        border: "1px solid #f3f5fc",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: iconBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </div>
        <span
          style={{
            fontFamily: "var(--font-source), sans-serif",
            fontSize: 13,
            color: "#636788",
          }}
        >
          {label}
        </span>
      </div>
      <div
        style={{
          fontFamily: "var(--font-mona), sans-serif",
          fontWeight: 700,
          fontSize: 28,
          color: "#191e41",
          lineHeight: 1.1,
        }}
      >
        {value}
      </div>
      <span
        style={{
          fontFamily: "var(--font-source), sans-serif",
          fontSize: 13,
          color: "#22c55e",
          fontWeight: 600,
          marginTop: 4,
          display: "inline-block",
        }}
      >
        {change}
      </span>
    </div>
  );
}

/* ── page ── */
export default function AnalyticsPage() {
  const [period, setPeriod] = useState<"7D" | "30D" | "90D">("7D");
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    seedMockData();
    setPosts(getAllPosts());
  }, []);

  /* top posts sorted by engagement */
  const topPosts = [...posts]
    .filter((p) => p.engagement)
    .sort(
      (a, b) =>
        (b.engagement!.likes + b.engagement!.comments + b.engagement!.shares) -
        (a.engagement!.likes + a.engagement!.comments + a.engagement!.shares),
    )
    .slice(0, 5);

  const maxChart = Math.max(...likesData, ...commentsData);
  const yTicks = [0, Math.round(maxChart / 3), Math.round((maxChart * 2) / 3), maxChart];

  const maxBar = Math.max(...platformPosts.map((p) => p.count));

  return (
    <div style={{ maxWidth: 1120, margin: "0 auto" }}>
      {/* Back link */}
      <Link
        href="/dashboard"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontFamily: "var(--font-source), sans-serif",
          fontSize: 14,
          color: "#636788",
          textDecoration: "none",
          marginBottom: 8,
        }}
      >
        ← Back to Dashboard
      </Link>

      {/* Header */}
      <h1
        style={{
          fontFamily: "var(--font-mona), sans-serif",
          fontWeight: 600,
          fontSize: 28,
          color: "#191e41",
          margin: "0 0 4px",
        }}
      >
        Analytics
      </h1>
      <p
        style={{
          fontFamily: "var(--font-source), sans-serif",
          fontSize: 15,
          color: "#636788",
          margin: "0 0 28px",
        }}
      >
        Track your content performance and growth
      </p>

      {/* ── Section 1: Overview Stats ── */}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 28 }}>
        <StatCard
          label="Total Impressions"
          value="24.5K"
          change="↑ 12% vs last month"
          iconBg="rgba(59,130,246,0.12)"
          icon={
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="10" cy="10" r="8" />
              <path d="M10 6v4l3 2" />
            </svg>
          }
        />
        <StatCard
          label="Total Engagement"
          value="3.2K"
          change="↑ 8%"
          iconBg="rgba(234,76,137,0.12)"
          icon={
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#ea4c89" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3.5 10.5l3.5 3.5 3-3 3 3 4-7" />
            </svg>
          }
        />
        <StatCard
          label="Followers Gained"
          value="+847"
          change="↑ 23%"
          iconBg="rgba(34,197,94,0.12)"
          icon={
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="7" r="3" />
              <path d="M2 17v-1a5 5 0 0110 0v1" />
              <path d="M15 7v6M12 10h6" />
            </svg>
          }
        />
        <StatCard
          label="Best Performing"
          value="Instagram"
          change="4.8% rate"
          iconBg="rgba(139,92,246,0.12)"
          icon={
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="14" height="14" rx="4" />
              <circle cx="10" cy="10" r="3.5" />
              <circle cx="14.5" cy="5.5" r="1" fill="#8b5cf6" />
            </svg>
          }
        />
      </div>

      {/* ── Section 2: Engagement Over Time ── */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: 12,
          padding: 32,
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          border: "1px solid #f3f5fc",
          marginBottom: 28,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <h2
            style={{
              fontFamily: "var(--font-mona), sans-serif",
              fontWeight: 600,
              fontSize: 18,
              color: "#191e41",
              margin: 0,
            }}
          >
            Engagement Over Time
          </h2>
          <div style={{ display: "flex", gap: 0, borderRadius: 8, overflow: "hidden", border: "1px solid #f3f5fc" }}>
            {(["7D", "30D", "90D"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                style={{
                  padding: "6px 16px",
                  fontFamily: "var(--font-source), sans-serif",
                  fontSize: 13,
                  fontWeight: period === p ? 600 : 400,
                  color: period === p ? "#ffffff" : "#636788",
                  background: period === p ? "#ea4c89" : "#ffffff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <svg viewBox={`0 0 ${chartW} ${chartH}`} style={{ width: "100%", height: "auto" }}>
          {/* grid lines */}
          {yTicks.map((t) => {
            const y = padT + plotH - (t / maxChart) * plotH;
            return (
              <g key={t}>
                <line x1={padL} y1={y} x2={chartW - padR} y2={y} stroke="#f3f5fc" strokeWidth="1" strokeDasharray="4 4" />
                <text x={padL - 8} y={y + 4} textAnchor="end" fill="#636788" fontSize="11" fontFamily="var(--font-source), sans-serif">
                  {t}
                </text>
              </g>
            );
          })}
          {/* x labels */}
          {days.map((d, i) => {
            const x = padL + (i / (days.length - 1)) * plotW;
            return (
              <text key={d} x={x} y={chartH - 4} textAnchor="middle" fill="#636788" fontSize="11" fontFamily="var(--font-source), sans-serif">
                {d}
              </text>
            );
          })}
          {/* likes line */}
          <polyline points={toPoints(likesData, maxChart)} fill="none" stroke="#ea4c89" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* comments line */}
          <polyline points={toPoints(commentsData, maxChart)} fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* dots */}
          {likesData.map((v, i) => {
            const x = padL + (i / (likesData.length - 1)) * plotW;
            const y = padT + plotH - (v / maxChart) * plotH;
            return <circle key={`l${i}`} cx={x} cy={y} r="4" fill="#ea4c89" />;
          })}
          {commentsData.map((v, i) => {
            const x = padL + (i / (commentsData.length - 1)) * plotW;
            const y = padT + plotH - (v / maxChart) * plotH;
            return <circle key={`c${i}`} cx={x} cy={y} r="4" fill="#3b82f6" />;
          })}
        </svg>

        {/* legend */}
        <div style={{ display: "flex", gap: 24, marginTop: 12, justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 12, height: 3, borderRadius: 2, background: "#ea4c89", display: "inline-block" }} />
            <span style={{ fontFamily: "var(--font-source), sans-serif", fontSize: 12, color: "#636788" }}>Likes</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 12, height: 3, borderRadius: 2, background: "#3b82f6", display: "inline-block" }} />
            <span style={{ fontFamily: "var(--font-source), sans-serif", fontSize: 12, color: "#636788" }}>Comments</span>
          </div>
        </div>
      </div>

      {/* ── Section 3: Platform Performance ── */}
      <div style={{ display: "flex", gap: 20, marginBottom: 28, flexWrap: "wrap" }}>
        {/* Bar chart */}
        <div
          style={{
            flex: "1 1 400px",
            background: "#ffffff",
            borderRadius: 12,
            padding: 28,
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            border: "1px solid #f3f5fc",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-mona), sans-serif",
              fontWeight: 600,
              fontSize: 18,
              color: "#191e41",
              margin: "0 0 20px",
            }}
          >
            Posts by Platform
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {platformPosts.map((p) => (
              <div key={p.name}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontFamily: "var(--font-source), sans-serif", fontSize: 13, color: "#191e41" }}>{p.name}</span>
                  <span style={{ fontFamily: "var(--font-source), sans-serif", fontSize: 13, color: "#636788", fontWeight: 600 }}>{p.count}</span>
                </div>
                <div style={{ height: 28, background: "#f3f5fc", borderRadius: 4, position: "relative" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${(p.count / maxBar) * 100}%`,
                      background: p.color,
                      borderRadius: 4,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Table */}
        <div
          style={{
            flex: "1 1 400px",
            background: "#ffffff",
            borderRadius: 12,
            padding: 28,
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            border: "1px solid #f3f5fc",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-mona), sans-serif",
              fontWeight: 600,
              fontSize: 18,
              color: "#191e41",
              margin: "0 0 20px",
            }}
          >
            Platform Metrics
          </h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Platform", "Posts", "Engagement", "Growth"].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      fontFamily: "var(--font-source), sans-serif",
                      fontSize: 12,
                      color: "#636788",
                      fontWeight: 600,
                      padding: "0 0 12px",
                      borderBottom: "1px solid #f3f5fc",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {platformMetrics.map((r) => (
                <tr
                  key={r.platform}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLTableRowElement).style.background = "#fafbff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLTableRowElement).style.background = "transparent";
                  }}
                  style={{ cursor: "default" }}
                >
                  <td style={{ padding: "12px 0", fontFamily: "var(--font-source), sans-serif", fontSize: 14, color: "#191e41", borderBottom: "1px solid #f3f5fc" }}>
                    {r.platform}
                  </td>
                  <td style={{ padding: "12px 0", fontFamily: "var(--font-source), sans-serif", fontSize: 14, color: "#636788", borderBottom: "1px solid #f3f5fc" }}>
                    {r.posts}
                  </td>
                  <td style={{ padding: "12px 0", fontFamily: "var(--font-source), sans-serif", fontSize: 14, color: "#636788", borderBottom: "1px solid #f3f5fc" }}>
                    {r.engagement}
                  </td>
                  <td style={{ padding: "12px 0", fontFamily: "var(--font-source), sans-serif", fontSize: 14, color: "#22c55e", fontWeight: 600, borderBottom: "1px solid #f3f5fc" }}>
                    {r.growth}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Section 4: Top Performing Posts ── */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: 12,
          padding: 28,
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          border: "1px solid #f3f5fc",
          marginBottom: 28,
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-mona), sans-serif",
            fontWeight: 600,
            fontSize: 18,
            color: "#191e41",
            margin: "0 0 20px",
          }}
        >
          Top Performing Posts
        </h2>
        {topPosts.length === 0 && (
          <p style={{ fontFamily: "var(--font-source), sans-serif", fontSize: 14, color: "#636788" }}>
            No published posts with engagement data yet.
          </p>
        )}
        {topPosts.map((post, i) => {
          const eng = post.engagement!;
          const total = eng.likes + eng.comments + eng.shares;
          const rate = ((total / 1000) * 100).toFixed(1);
          return (
            <div
              key={post.id}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "#fafbff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "transparent";
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "14px 12px",
                borderBottom: i < topPosts.length - 1 ? "1px solid #f3f5fc" : "none",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              {/* rank */}
              <span
                style={{
                  fontFamily: "var(--font-mona), sans-serif",
                  fontWeight: 700,
                  fontSize: 18,
                  color: "#ea4c89",
                  width: 28,
                  textAlign: "center",
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </span>
              {/* platform badge */}
              <span
                style={{
                  fontFamily: "var(--font-source), sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#ffffff",
                  background: post.platform === "instagram" ? "#ea4c89" : post.platform === "tiktok" ? "#191e41" : "#3b82f6",
                  padding: "3px 10px",
                  borderRadius: 999,
                  textTransform: "capitalize",
                  flexShrink: 0,
                }}
              >
                {post.platform}
              </span>
              {/* caption */}
              <span
                style={{
                  fontFamily: "var(--font-source), sans-serif",
                  fontSize: 14,
                  color: "#191e41",
                  flex: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {post.caption}
              </span>
              {/* stats */}
              <div style={{ display: "flex", gap: 16, flexShrink: 0 }}>
                <span style={{ fontFamily: "var(--font-source), sans-serif", fontSize: 13, color: "#636788" }}>
                  {eng.likes} likes
                </span>
                <span style={{ fontFamily: "var(--font-source), sans-serif", fontSize: 13, color: "#636788" }}>
                  {eng.comments} comments
                </span>
                <span style={{ fontFamily: "var(--font-source), sans-serif", fontSize: 13, color: "#22c55e", fontWeight: 600 }}>
                  {rate}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Section 5: Posting Activity Heatmap ── */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: 12,
          padding: 28,
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          border: "1px solid #f3f5fc",
          marginBottom: 40,
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-mona), sans-serif",
            fontWeight: 600,
            fontSize: 18,
            color: "#191e41",
            margin: "0 0 20px",
          }}
        >
          Posting Activity
        </h2>
        <div style={{ display: "flex", gap: 8, flexDirection: "column" }}>
          {heatmapData.map((week, wi) => (
            <div key={wi} style={{ display: "flex", gap: 8 }}>
              {week.map((val, di) => (
                <div
                  key={di}
                  title={`${days[di]} Week ${wi + 1}: ${val} posts`}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 6,
                    background: heatColor(val),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-source), sans-serif",
                    fontSize: 11,
                    color: val >= 2 ? "#ffffff" : "#636788",
                    fontWeight: 600,
                  }}
                >
                  {val > 0 ? val : ""}
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* day labels */}
        <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
          {days.map((d) => (
            <div
              key={d}
              style={{
                width: 40,
                textAlign: "center",
                fontFamily: "var(--font-source), sans-serif",
                fontSize: 11,
                color: "#636788",
              }}
            >
              {d}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
