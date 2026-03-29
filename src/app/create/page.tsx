"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { platformLimits, type GeneratedPost, type GeneratePostParams } from "@/lib/post-generator";
import { createPost, getPostById, updatePost } from "@/lib/post-store";
import Modal from "@/components/ui/modal";
import DateTimePicker from "@/components/ui/date-time-picker";

type Platform = GeneratePostParams["platform"];
type Tone = GeneratePostParams["tone"];
type ContentType = GeneratePostParams["contentType"];

const platforms: { id: Platform; label: string; icon: React.ReactNode }[] = [
  {
    id: "instagram",
    label: "Instagram",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="1" width="16" height="16" rx="4" />
        <circle cx="9" cy="9" r="4" />
        <circle cx="13.5" cy="4.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: "tiktok",
    label: "TikTok",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        <path d="M11 2v9a4.5 4.5 0 11-3.5-4.38" />
        <path d="M11 2c1.5.5 3.5 1.5 5 3.5" />
      </svg>
    ),
  },
  {
    id: "twitter",
    label: "Twitter/X",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 2l6 7L2 16M16 2l-6 7L16 16" />
      </svg>
    ),
  },
  {
    id: "facebook",
    label: "Facebook",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M16 9a7 7 0 10-8 6.93V11.5H6.5V9H8V7.25A2.75 2.75 0 0110.75 4.5h1.75v2.5h-1.5a.75.75 0 00-.75.75V9h2.25l-.5 2.5H10.25v4.43A7 7 0 0016 9z" />
      </svg>
    ),
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.3">
        <rect x="2" y="2" width="14" height="14" rx="2" />
        <path d="M6 8v4M6 6v.01M10 12v-2.5a1.5 1.5 0 013 0V12M10 8v4" />
      </svg>
    ),
  },
  {
    id: "pinterest",
    label: "Pinterest",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.3">
        <circle cx="9" cy="9" r="7" />
        <path d="M7.5 12.5c-.5 2-1 3-1 3M7 10.5C7.5 8 8.5 5.5 10 5.5c2 0 1.5 3-.5 4.5-1 .8-2 1-2.5.5" />
      </svg>
    ),
  },
];

const contentTypes: { id: ContentType; label: string; icon: string }[] = [
  { id: "product", label: "Product Showcase", icon: "📦" },
  { id: "behind-the-scenes", label: "Behind the Scenes", icon: "🎬" },
  { id: "tips", label: "Tips & Tutorial", icon: "💡" },
  { id: "testimonial", label: "Testimonial", icon: "💬" },
  { id: "promotion", label: "Promotion", icon: "🎯" },
  { id: "storytelling", label: "Storytelling", icon: "📖" },
];

const tones: { id: Tone; label: string }[] = [
  { id: "professional", label: "Professional" },
  { id: "casual", label: "Casual" },
  { id: "playful", label: "Playful" },
  { id: "bold", label: "Bold" },
  { id: "minimal", label: "Minimal" },
  { id: "luxurious", label: "Luxurious" },
];

export default function CreatePage() {
  return (
    <Suspense fallback={null}>
      <CreatePageInner />
    </Suspense>
  );
}

function CreatePageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");

  const [selectedPlatform, setSelectedPlatform] = useState<Platform>("instagram");
  const [selectedContentType, setSelectedContentType] = useState<ContentType>("product");
  const [selectedTone, setSelectedTone] = useState<Tone>("casual");
  const [topic, setTopic] = useState("");
  const [caption, setCaption] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [newHashtag, setNewHashtag] = useState("");
  const [bestTime, setBestTime] = useState("");
  const [engagement, setEngagement] = useState("");
  const [variations, setVariations] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  // Load post for editing
  useEffect(() => {
    if (editId) {
      const post = getPostById(editId);
      if (post) {
        setCaption(post.caption);
        setHashtags(post.hashtags);
        setSelectedPlatform(post.platform as Platform);
        setHasGenerated(true);
      }
    }
  }, [editId]);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    try {
      const res = await fetch("/api/generate-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform: selectedPlatform,
          topic: topic.trim(),
          tone: selectedTone,
          contentType: selectedContentType,
        }),
      });
      if (!res.ok) throw new Error("API error");
      const result: GeneratedPost = await res.json();
      setCaption(result.caption);
      setHashtags(result.hashtags);
      setBestTime(result.bestTimeToPost);
      setEngagement(result.estimatedEngagement);
      setVariations(result.variations);
      setHasGenerated(true);
    } catch {
      // Fallback to mock if API fails
      const { generatePost } = await import("@/lib/post-generator");
      const result = await generatePost({
        platform: selectedPlatform,
        topic: topic.trim(),
        tone: selectedTone,
        contentType: selectedContentType,
      });
      setCaption(result.caption);
      setHashtags(result.hashtags);
      setBestTime(result.bestTimeToPost);
      setEngagement(result.estimatedEngagement);
      setVariations(result.variations);
      setHasGenerated(true);
    }
    setIsGenerating(false);
  };

  const handleTryVariation = () => {
    if (variations.length === 0) return;
    const next = variations[0];
    setVariations((prev) => [...prev.slice(1), caption]);
    setCaption(next);
  };

  const removeHashtag = (tag: string) => {
    setHashtags((prev) => prev.filter((h) => h !== tag));
  };

  const addHashtag = () => {
    const tag = newHashtag.trim().startsWith("#") ? newHashtag.trim() : `#${newHashtag.trim()}`;
    if (tag.length > 1 && !hashtags.includes(tag)) {
      setHashtags((prev) => [...prev, tag]);
      setNewHashtag("");
    }
  };

  const showSaveMsg = (msg: string) => {
    setSaveMessage(msg);
    setTimeout(() => setSaveMessage(""), 2500);
  };

  const handleSaveDraft = () => {
    if (editId) {
      updatePost(editId, { caption, hashtags, platform: selectedPlatform, status: "draft" });
    } else {
      createPost({ caption, hashtags, platform: selectedPlatform, status: "draft" });
    }
    showSaveMsg("Saved as draft!");
  };

  const handlePublish = () => {
    if (editId) {
      updatePost(editId, {
        caption, hashtags, platform: selectedPlatform,
        status: "published", publishedAt: new Date().toISOString(),
      });
    } else {
      createPost({
        caption, hashtags, platform: selectedPlatform,
        status: "published", publishedAt: new Date().toISOString(),
      });
    }
    showSaveMsg("Published!");
    setTimeout(() => router.push("/dashboard"), 1000);
  };

  const handleSchedule = (dateTime: string) => {
    if (editId) {
      updatePost(editId, {
        caption, hashtags, platform: selectedPlatform,
        status: "scheduled", scheduledAt: dateTime,
      });
    } else {
      createPost({
        caption, hashtags, platform: selectedPlatform,
        status: "scheduled", scheduledAt: dateTime,
      });
    }
    setScheduleModalOpen(false);
    showSaveMsg("Scheduled!");
    setTimeout(() => router.push("/schedule"), 1000);
  };

  const charLimit = platformLimits[selectedPlatform] || 2200;

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
          Create New Post
        </h1>
        <p
          style={{
            fontFamily: "var(--font-source), sans-serif",
            fontSize: 16,
            color: "#636788",
            margin: "8px 0 0",
          }}
        >
          Generate AI-powered content for your social media
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left column (65%) */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          {/* Platform selector */}
          <div
            style={{
              background: "#ffffff",
              borderRadius: 12,
              padding: 24,
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            }}
          >
            <label
              style={{
                fontFamily: "var(--font-mona), sans-serif",
                fontWeight: 600,
                fontSize: 15,
                color: "#191e41",
                display: "block",
                marginBottom: 12,
              }}
            >
              Platform
            </label>
            <div className="flex flex-wrap gap-2">
              {platforms.map((p) => {
                const active = selectedPlatform === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPlatform(p.id)}
                    className="flex items-center gap-2"
                    style={{
                      padding: "8px 16px",
                      borderRadius: 20,
                      border: active ? "2px solid #ea4c89" : "2px solid #f3f5fc",
                      background: active ? "#ea4c89" : "#ffffff",
                      color: active ? "#ffffff" : "#636788",
                      fontFamily: "var(--font-source), sans-serif",
                      fontSize: 14,
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    {p.icon}
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content type selector */}
          <div
            style={{
              background: "#ffffff",
              borderRadius: 12,
              padding: 24,
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            }}
          >
            <label
              style={{
                fontFamily: "var(--font-mona), sans-serif",
                fontWeight: 600,
                fontSize: 15,
                color: "#191e41",
                display: "block",
                marginBottom: 12,
              }}
            >
              Content Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {contentTypes.map((ct) => {
                const active = selectedContentType === ct.id;
                return (
                  <button
                    key={ct.id}
                    onClick={() => setSelectedContentType(ct.id)}
                    className="flex items-center gap-2"
                    style={{
                      padding: "10px 14px",
                      borderRadius: 10,
                      border: active ? "2px solid #ea4c89" : "2px solid #f3f5fc",
                      background: active ? "rgba(234,76,137,0.06)" : "#ffffff",
                      color: active ? "#ea4c89" : "#636788",
                      fontFamily: "var(--font-source), sans-serif",
                      fontSize: 13,
                      fontWeight: 500,
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span style={{ fontSize: 18 }}>{ct.icon}</span>
                    {ct.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tone selector */}
          <div
            style={{
              background: "#ffffff",
              borderRadius: 12,
              padding: 24,
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            }}
          >
            <label
              style={{
                fontFamily: "var(--font-mona), sans-serif",
                fontWeight: 600,
                fontSize: 15,
                color: "#191e41",
                display: "block",
                marginBottom: 12,
              }}
            >
              Tone
            </label>
            <div className="flex flex-wrap gap-2">
              {tones.map((t) => {
                const active = selectedTone === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTone(t.id)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: 16,
                      border: active ? "2px solid #ea4c89" : "2px solid #f3f5fc",
                      background: active ? "#ea4c89" : "#ffffff",
                      color: active ? "#ffffff" : "#636788",
                      fontFamily: "var(--font-source), sans-serif",
                      fontSize: 13,
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Topic input */}
          <div
            style={{
              background: "#ffffff",
              borderRadius: 12,
              padding: 24,
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            }}
          >
            <label
              style={{
                fontFamily: "var(--font-mona), sans-serif",
                fontWeight: 600,
                fontSize: 15,
                color: "#191e41",
                display: "block",
                marginBottom: 8,
              }}
            >
              Topic
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="What's your post about?"
              style={{
                width: "100%",
                padding: "12px 14px",
                border: "2px solid #f3f5fc",
                borderRadius: 10,
                fontFamily: "var(--font-source), sans-serif",
                fontSize: 15,
                color: "#191e41",
                outline: "none",
                background: "#fafbff",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#ea4c89")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#f3f5fc")}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            />

            {/* Generate button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !topic.trim()}
              style={{
                marginTop: 16,
                width: "100%",
                padding: "14px 24px",
                borderRadius: 10,
                border: "none",
                background: isGenerating || !topic.trim() ? "#d1d5e0" : "#ea4c89",
                color: "#ffffff",
                fontFamily: "var(--font-mona), sans-serif",
                fontWeight: 600,
                fontSize: 16,
                cursor: isGenerating || !topic.trim() ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              {isGenerating ? (
                <>
                  <span
                    style={{
                      width: 18,
                      height: 18,
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTopColor: "#ffffff",
                      borderRadius: "50%",
                      display: "inline-block",
                      animation: "spin 0.8s linear infinite",
                    }}
                  />
                  Generating...
                </>
              ) : (
                "✨ Generate with AI"
              )}
            </button>
          </div>

          {/* Generated content */}
          {hasGenerated && (
            <>
              {/* Caption textarea */}
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: 12,
                  padding: 24,
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                }}
              >
                <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
                  <label
                    style={{
                      fontFamily: "var(--font-mona), sans-serif",
                      fontWeight: 600,
                      fontSize: 15,
                      color: "#191e41",
                    }}
                  >
                    Caption
                  </label>
                  <span
                    style={{
                      fontFamily: "var(--font-source), sans-serif",
                      fontSize: 13,
                      color: caption.length > charLimit ? "#dc2626" : "#636788",
                    }}
                  >
                    {caption.length} / {charLimit}
                  </span>
                </div>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Your generated caption will appear here..."
                  style={{
                    width: "100%",
                    minHeight: 120,
                    padding: "14px 16px",
                    border: "2px solid #f3f5fc",
                    borderRadius: 10,
                    fontFamily: "var(--font-source), sans-serif",
                    fontSize: 15,
                    color: "#191e41",
                    resize: "vertical",
                    outline: "none",
                    background: "#fafbff",
                    lineHeight: 1.6,
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#ea4c89")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#f3f5fc")}
                />
                <div className="flex flex-wrap gap-2" style={{ marginTop: 12 }}>
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    style={{
                      padding: "8px 16px",
                      borderRadius: 8,
                      border: "2px solid #ea4c89",
                      background: "transparent",
                      color: "#ea4c89",
                      fontFamily: "var(--font-mona), sans-serif",
                      fontWeight: 600,
                      fontSize: 13,
                      cursor: "pointer",
                    }}
                  >
                    Regenerate
                  </button>
                  {variations.length > 0 && (
                    <button
                      onClick={handleTryVariation}
                      style={{
                        padding: "8px 16px",
                        borderRadius: 8,
                        border: "2px solid #e8ebf5",
                        background: "transparent",
                        color: "#636788",
                        fontFamily: "var(--font-mona), sans-serif",
                        fontWeight: 600,
                        fontSize: 13,
                        cursor: "pointer",
                      }}
                    >
                      Try variation
                    </button>
                  )}
                </div>
              </div>

              {/* Hashtags */}
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: 12,
                  padding: 24,
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                }}
              >
                <label
                  style={{
                    fontFamily: "var(--font-mona), sans-serif",
                    fontWeight: 600,
                    fontSize: 15,
                    color: "#191e41",
                    display: "block",
                    marginBottom: 12,
                  }}
                >
                  Hashtags
                </label>
                <div className="flex flex-wrap gap-2" style={{ marginBottom: 12 }}>
                  {hashtags.map((h) => (
                    <span
                      key={h}
                      className="flex items-center gap-1"
                      style={{
                        padding: "4px 10px",
                        borderRadius: 14,
                        background: "rgba(234,76,137,0.08)",
                        color: "#ea4c89",
                        fontFamily: "var(--font-source), sans-serif",
                        fontSize: 13,
                      }}
                    >
                      {h}
                      <button
                        onClick={() => removeHashtag(h)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#ea4c89",
                          cursor: "pointer",
                          padding: "0 2px",
                          fontSize: 14,
                          lineHeight: 1,
                        }}
                        aria-label={`Remove ${h}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newHashtag}
                    onChange={(e) => setNewHashtag(e.target.value)}
                    placeholder="Add hashtag"
                    style={{
                      flex: 1,
                      padding: "8px 12px",
                      border: "2px solid #f3f5fc",
                      borderRadius: 8,
                      fontFamily: "var(--font-source), sans-serif",
                      fontSize: 13,
                      color: "#191e41",
                      outline: "none",
                      background: "#fafbff",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#ea4c89")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#f3f5fc")}
                    onKeyDown={(e) => e.key === "Enter" && addHashtag()}
                  />
                  <button
                    onClick={addHashtag}
                    style={{
                      padding: "8px 14px",
                      borderRadius: 8,
                      border: "2px solid #ea4c89",
                      background: "transparent",
                      color: "#ea4c89",
                      fontFamily: "var(--font-mona), sans-serif",
                      fontWeight: 600,
                      fontSize: 13,
                      cursor: "pointer",
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Best time + engagement badges */}
              {(bestTime || engagement) && (
                <div className="flex flex-wrap gap-3">
                  {bestTime && (
                    <div
                      className="flex items-center gap-2"
                      style={{
                        padding: "10px 16px",
                        borderRadius: 10,
                        background: "rgba(59,130,246,0.08)",
                        color: "#2563eb",
                        fontFamily: "var(--font-source), sans-serif",
                        fontSize: 13,
                        fontWeight: 600,
                      }}
                    >
                      🕐 Best time: {bestTime}
                    </div>
                  )}
                  {engagement && (
                    <div
                      className="flex items-center gap-2"
                      style={{
                        padding: "10px 16px",
                        borderRadius: 10,
                        background: "rgba(34,197,94,0.08)",
                        color: "#16a34a",
                        fontFamily: "var(--font-source), sans-serif",
                        fontSize: 13,
                        fontWeight: 600,
                      }}
                    >
                      📊 Est. {engagement}
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* Media upload */}
          <div
            style={{
              background: "#ffffff",
              borderRadius: 12,
              padding: 24,
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            }}
          >
            <label
              style={{
                fontFamily: "var(--font-mona), sans-serif",
                fontWeight: 600,
                fontSize: 15,
                color: "#191e41",
                display: "block",
                marginBottom: 12,
              }}
            >
              Media
            </label>
            <div
              className="flex flex-col items-center justify-center"
              style={{
                border: "2px dashed #d8dce8",
                borderRadius: 10,
                padding: "40px 24px",
                background: "#fafbff",
                cursor: "pointer",
              }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#636788" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="32" height="32" rx="4" />
                <circle cx="14" cy="16" r="3" />
                <path d="M36 28l-8-8-12 12" />
              </svg>
              <p style={{ fontFamily: "var(--font-source), sans-serif", fontSize: 15, color: "#636788", margin: "12px 0 4px" }}>
                Drag & drop images or videos
              </p>
              <button
                style={{
                  marginTop: 8,
                  padding: "8px 20px",
                  borderRadius: 8,
                  border: "2px solid #e8ebf5",
                  background: "transparent",
                  color: "#636788",
                  fontFamily: "var(--font-mona), sans-serif",
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                Browse files
              </button>
            </div>
          </div>
        </div>

        {/* Right column (35%) — Preview */}
        <div className="lg:col-span-2">
          <div
            style={{
              background: "#ffffff",
              borderRadius: 12,
              padding: 24,
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
              position: "sticky",
              top: 32,
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
              Preview
            </h3>

            {/* Phone frame */}
            <div
              style={{
                border: "2px solid #e5e7eb",
                borderRadius: 28,
                padding: 12,
                background: "#ffffff",
                maxWidth: 300,
                margin: "0 auto",
                overflow: "hidden",
              }}
            >
              {/* Status bar */}
              <div className="flex items-center justify-between" style={{ padding: "4px 8px 8px", fontSize: 11, color: "#636788", fontFamily: "var(--font-source), sans-serif" }}>
                <span>9:41</span>
                <div
                  style={{
                    width: 60,
                    height: 20,
                    borderRadius: 10,
                    background: "#191e41",
                  }}
                />
                <span style={{ fontSize: 10 }}>
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="#636788"><rect x="0" y="4" width="3" height="6" rx="1" /><rect x="4" y="2" width="3" height="8" rx="1" /><rect x="8" y="0" width="3" height="10" rx="1" /></svg>
                </span>
              </div>

              {selectedPlatform === "instagram" && (
                <>
                  <div className="flex items-center gap-2" style={{ padding: "8px 12px", borderBottom: "1px solid #f3f5fc" }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #ea4c89, #f093b0)" }} />
                    <span style={{ fontFamily: "var(--font-mona), sans-serif", fontSize: 13, fontWeight: 600, color: "#191e41" }}>your_brand</span>
                  </div>
                  <div style={{ width: "100%", aspectRatio: "1/1", background: "#f3f5fc" }} />
                  <div style={{ padding: "10px 12px" }}>
                    <div className="flex gap-3" style={{ marginBottom: 8 }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#191e41" strokeWidth="1.5"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" /></svg>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#191e41" strokeWidth="1.5"><path d="M18 10c0 4-3.333 7-8 10C5.333 17 2 14 2 10a4 4 0 018 0 4 4 0 018 0z" /></svg>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#191e41" strokeWidth="1.5"><path d="M4 12l1.5-9L12 6l6-2-1.5 9L10 10z" /></svg>
                    </div>
                    <p style={{ fontFamily: "var(--font-source), sans-serif", fontSize: 12, color: "#191e41", margin: 0, lineHeight: 1.5 }}>
                      <strong>your_brand</strong>{" "}
                      {caption || "Your caption will appear here..."}
                    </p>
                    {hashtags.length > 0 && (
                      <p style={{ fontFamily: "var(--font-source), sans-serif", fontSize: 11, color: "#3b82f6", margin: "6px 0 0", lineHeight: 1.4 }}>
                        {hashtags.slice(0, 6).join(" ")}
                      </p>
                    )}
                  </div>
                </>
              )}

              {selectedPlatform === "twitter" && (
                <div style={{ padding: 12 }}>
                  <div className="flex items-start gap-2" style={{ marginBottom: 8 }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #ea4c89, #f093b0)", flexShrink: 0 }} />
                    <div>
                      <div className="flex items-center gap-1">
                        <span style={{ fontFamily: "var(--font-mona), sans-serif", fontSize: 13, fontWeight: 600, color: "#191e41" }}>Your Brand</span>
                        <span style={{ fontFamily: "var(--font-source), sans-serif", fontSize: 12, color: "#636788" }}>@yourbrand</span>
                      </div>
                      <p style={{ fontFamily: "var(--font-source), sans-serif", fontSize: 13, color: "#191e41", margin: "4px 0 0", lineHeight: 1.5 }}>
                        {caption || "Your tweet will appear here..."}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6" style={{ paddingLeft: 44, marginTop: 8 }}>
                    <span style={{ fontSize: 12, color: "#636788" }}>💬 12</span>
                    <span style={{ fontSize: 12, color: "#636788" }}>🔄 34</span>
                    <span style={{ fontSize: 12, color: "#636788" }}>❤️ 89</span>
                  </div>
                </div>
              )}

              {selectedPlatform !== "instagram" && selectedPlatform !== "twitter" && (
                <div style={{ padding: 12 }}>
                  <div className="flex items-center gap-2" style={{ marginBottom: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #ea4c89, #f093b0)" }} />
                    <div>
                      <span style={{ fontFamily: "var(--font-mona), sans-serif", fontSize: 13, fontWeight: 600, color: "#191e41", display: "block" }}>Your Brand</span>
                      <span style={{ fontFamily: "var(--font-source), sans-serif", fontSize: 11, color: "#636788" }}>Just now</span>
                    </div>
                  </div>
                  <div style={{ width: "100%", height: 140, borderRadius: 8, background: "#f3f5fc", marginBottom: 10 }} />
                  <p style={{ fontFamily: "var(--font-source), sans-serif", fontSize: 12, color: "#191e41", margin: 0, lineHeight: 1.5 }}>
                    {caption || "Your post will appear here..."}
                  </p>
                  {hashtags.length > 0 && (
                    <p style={{ fontFamily: "var(--font-source), sans-serif", fontSize: 11, color: "#3b82f6", margin: "6px 0 0" }}>
                      {hashtags.slice(0, 5).join(" ")}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Platform label */}
            <div className="text-center" style={{ marginTop: 12 }}>
              <span
                style={{
                  fontFamily: "var(--font-source), sans-serif",
                  fontSize: 12,
                  color: "#636788",
                  textTransform: "capitalize",
                }}
              >
                {selectedPlatform} preview
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom action bar */}
      <div
        className="flex flex-wrap items-center gap-3"
        style={{
          marginTop: 32,
          paddingTop: 24,
          borderTop: "1px solid #f3f5fc",
          position: "sticky",
          bottom: 0,
          background: "#fafbff",
          paddingBottom: 24,
          zIndex: 10,
        }}
      >
        <button
          onClick={handleSaveDraft}
          disabled={!caption.trim()}
          style={{
            padding: "12px 24px",
            borderRadius: 10,
            border: "2px solid #e8ebf5",
            background: "transparent",
            color: "#636788",
            fontFamily: "var(--font-mona), sans-serif",
            fontWeight: 600,
            fontSize: 15,
            cursor: caption.trim() ? "pointer" : "not-allowed",
            opacity: caption.trim() ? 1 : 0.5,
          }}
        >
          Save as Draft
        </button>
        <button
          onClick={() => setScheduleModalOpen(true)}
          disabled={!caption.trim()}
          style={{
            padding: "12px 24px",
            borderRadius: 10,
            border: "2px solid #ea4c89",
            background: "transparent",
            color: "#ea4c89",
            fontFamily: "var(--font-mona), sans-serif",
            fontWeight: 600,
            fontSize: 15,
            cursor: caption.trim() ? "pointer" : "not-allowed",
            opacity: caption.trim() ? 1 : 0.5,
          }}
        >
          Schedule
        </button>
        <button
          onClick={handlePublish}
          disabled={!caption.trim()}
          style={{
            padding: "12px 24px",
            borderRadius: 10,
            border: "none",
            background: caption.trim() ? "#ea4c89" : "#d1d5e0",
            color: "#ffffff",
            fontFamily: "var(--font-mona), sans-serif",
            fontWeight: 600,
            fontSize: 15,
            cursor: caption.trim() ? "pointer" : "not-allowed",
          }}
        >
          Publish Now
        </button>
        {saveMessage && (
          <span
            style={{
              fontFamily: "var(--font-source), sans-serif",
              fontSize: 14,
              color: "#16a34a",
              fontWeight: 600,
              marginLeft: 8,
            }}
          >
            ✓ {saveMessage}
          </span>
        )}
      </div>

      {/* Schedule modal */}
      <Modal
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        title="Schedule Post"
      >
        <DateTimePicker
          onSchedule={handleSchedule}
          onCancel={() => setScheduleModalOpen(false)}
        />
      </Modal>

      {/* Spinner keyframes */}
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}
