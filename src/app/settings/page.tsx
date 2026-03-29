"use client";

import { useState } from "react";

const connectedPlatforms = [
  { name: "Instagram", connected: true },
  { name: "TikTok", connected: true },
  { name: "Twitter/X", connected: false },
  { name: "Facebook", connected: false },
  { name: "LinkedIn", connected: false },
];

const notifications = [
  { label: "Post published", key: "published", on: true },
  { label: "Scheduled post reminders", key: "reminders", on: true },
  { label: "Weekly analytics report", key: "analytics", on: false },
  { label: "New feature updates", key: "updates", on: true },
];

export default function SettingsPage() {
  const [notifState, setNotifState] = useState<Record<string, boolean>>(
    Object.fromEntries(notifications.map((n) => [n.key, n.on]))
  );

  const toggleNotif = (key: string) => {
    setNotifState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const cardStyle: React.CSSProperties = {
    background: "#ffffff",
    borderRadius: 12,
    padding: 24,
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
    marginBottom: 24,
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-mona), sans-serif",
    fontWeight: 600,
    fontSize: 13,
    color: "#636788",
    display: "block",
    marginBottom: 6,
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    border: "2px solid #f3f5fc",
    borderRadius: 10,
    fontFamily: "var(--font-source), sans-serif",
    fontSize: 15,
    color: "#191e41",
    outline: "none",
    background: "#fafbff",
  };

  return (
    <div style={{ maxWidth: 720 }}>
      <h1
        style={{
          fontFamily: "var(--font-mona), sans-serif",
          fontWeight: 600,
          fontSize: 28,
          color: "#191e41",
          margin: "0 0 32px",
        }}
      >
        Settings
      </h1>

      {/* Profile */}
      <div style={cardStyle}>
        <h2 style={{ fontFamily: "var(--font-mona), sans-serif", fontWeight: 600, fontSize: 18, color: "#191e41", margin: "0 0 20px" }}>
          Profile
        </h2>
        <div className="flex items-center gap-4" style={{ marginBottom: 20 }}>
          <div
            className="flex items-center justify-center shrink-0"
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "#f3f5fc",
              color: "#636788",
              fontFamily: "var(--font-mona), sans-serif",
              fontWeight: 600,
              fontSize: 24,
            }}
          >
            V
          </div>
          <button
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              border: "2px solid #f3f5fc",
              background: "#ffffff",
              color: "#636788",
              fontFamily: "var(--font-source), sans-serif",
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Upload Photo
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label style={labelStyle}>Name</label>
            <input type="text" defaultValue="Vika" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Email</label>
            <input type="email" defaultValue="vika@example.com" style={inputStyle} />
          </div>
        </div>
      </div>

      {/* Connected Platforms */}
      <div style={cardStyle}>
        <h2 style={{ fontFamily: "var(--font-mona), sans-serif", fontWeight: 600, fontSize: 18, color: "#191e41", margin: "0 0 20px" }}>
          Connected Platforms
        </h2>
        <div className="flex flex-col gap-3">
          {connectedPlatforms.map((p) => (
            <div
              key={p.name}
              className="flex items-center justify-between"
              style={{
                padding: "14px 16px",
                borderRadius: 10,
                border: "1px solid #f3f5fc",
              }}
            >
              <span style={{ fontFamily: "var(--font-source), sans-serif", fontSize: 15, color: "#191e41" }}>
                {p.name}
              </span>
              <button
                style={{
                  padding: "8px 16px",
                  borderRadius: 8,
                  border: p.connected ? "1px solid #fee2e2" : "2px solid #ea4c89",
                  background: p.connected ? "#fff5f5" : "rgba(234,76,137,0.08)",
                  color: p.connected ? "#dc2626" : "#ea4c89",
                  fontFamily: "var(--font-source), sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {p.connected ? "Disconnect" : "Connect"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Settings */}
      <div style={cardStyle}>
        <h2 style={{ fontFamily: "var(--font-mona), sans-serif", fontWeight: 600, fontSize: 18, color: "#191e41", margin: "0 0 20px" }}>
          Brand Settings
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label style={labelStyle}>Brand Name</label>
            <input type="text" defaultValue="My Brand" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Niche</label>
            <input type="text" defaultValue="Design & Creative" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Primary Color</label>
            <div className="flex items-center gap-3">
              <div style={{ width: 36, height: 36, borderRadius: 8, background: "#ea4c89", border: "2px solid #f3f5fc" }} />
              <input type="text" defaultValue="#ea4c89" style={{ ...inputStyle, flex: 1 }} />
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div style={cardStyle}>
        <h2 style={{ fontFamily: "var(--font-mona), sans-serif", fontWeight: 600, fontSize: 18, color: "#191e41", margin: "0 0 20px" }}>
          Notifications
        </h2>
        <div className="flex flex-col gap-4">
          {notifications.map((n) => (
            <div key={n.key} className="flex items-center justify-between">
              <span style={{ fontFamily: "var(--font-source), sans-serif", fontSize: 15, color: "#191e41" }}>
                {n.label}
              </span>
              <button
                onClick={() => toggleNotif(n.key)}
                style={{
                  width: 48,
                  height: 28,
                  borderRadius: 14,
                  border: "none",
                  background: notifState[n.key] ? "#ea4c89" : "#d8dce8",
                  position: "relative",
                  cursor: "pointer",
                  transition: "background 0.2s",
                  padding: 0,
                }}
                aria-label={`Toggle ${n.label}`}
              >
                <span
                  style={{
                    position: "absolute",
                    top: 3,
                    left: notifState[n.key] ? 23 : 3,
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: "#ffffff",
                    transition: "left 0.2s",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  }}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Billing */}
      <div style={cardStyle}>
        <h2 style={{ fontFamily: "var(--font-mona), sans-serif", fontWeight: 600, fontSize: 18, color: "#191e41", margin: "0 0 20px" }}>
          Billing
        </h2>
        <div className="flex items-center justify-between">
          <div>
            <p style={{ fontFamily: "var(--font-source), sans-serif", fontSize: 15, color: "#191e41", margin: "0 0 4px", fontWeight: 600 }}>
              Free Plan
            </p>
            <p style={{ fontFamily: "var(--font-source), sans-serif", fontSize: 13, color: "#636788", margin: 0 }}>
              10 posts/month &middot; 1 platform
            </p>
          </div>
          <button
            style={{
              padding: "12px 24px",
              borderRadius: 10,
              border: "none",
              background: "#ea4c89",
              color: "#ffffff",
              fontFamily: "var(--font-mona), sans-serif",
              fontWeight: 600,
              fontSize: 15,
              cursor: "pointer",
            }}
          >
            Upgrade
          </button>
        </div>
      </div>
    </div>
  );
}
