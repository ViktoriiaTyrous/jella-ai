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
  { id: "product", label: "Product Showcase", icon: "\u{1F4E6}" },
  { id: "behind-the-scenes", label: "Behind the Scenes", icon: "\u{1F3AC}" },
  { id: "tips", label: "Tips & Tutorial", icon: "\u{1F4A1}" },
  { id: "testimonial", label: "Testimonial", icon: "\u{1F4AC}" },
  { id: "promotion", label: "Promotion", icon: "\u{1F3AF}" },
  { id: "storytelling", label: "Storytelling", icon: "\u{1F4D6}" },
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
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [imagePrompt, setImagePrompt] = useState("");

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

  const handleGenerateImage = async () => {
    if (!imagePrompt.trim()) return;
    setIsGeneratingImage(true);
    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: imagePrompt.trim(),
          platform: selectedPlatform,
        }),
      });
      if (!res.ok) throw new Error("Failed to generate image");
      const data = await res.json();
      if (data.imageUrl) {
        setImageUrl(data.imageUrl);
      }
    } catch (err) {
      console.error("Image generation error:", err);
    }
    setIsGeneratingImage(false);
  };

  const handleSaveDraft = () => {
    if (editId) {
      updatePost(editId, { caption, hashtags, platform: selectedPlatform, status: "draft", mediaUrl: imageUrl });
    } else {
      createPost({ caption, hashtags, platform: selectedPlatform, status: "draft", mediaUrl: imageUrl });
    }
    showSaveMsg("Saved as draft!");
  };

  const handlePublish = () => {
    if (editId) {
      updatePost(editId, {
        caption, hashtags, platform: selectedPlatform,
        status: "published", publishedAt: new Date().toISOString(), mediaUrl: imageUrl,
      });
    } else {
      createPost({
        caption, hashtags, platform: selectedPlatform,
        status: "published", publishedAt: new Date().toISOString(), mediaUrl: imageUrl,
      });
    }
    showSaveMsg("Published!");
    setTimeout(() => router.push("/dashboard"), 1000);
  };

  const handleSchedule = (dateTime: string) => {
    if (editId) {
      updatePost(editId, {
        caption, hashtags, platform: selectedPlatform,
        status: "scheduled", scheduledAt: dateTime, mediaUrl: imageUrl,
      });
    } else {
      createPost({
        caption, hashtags, platform: selectedPlatform,
        status: "scheduled", scheduledAt: dateTime, mediaUrl: imageUrl,
      });
    }
    setScheduleModalOpen(false);
    showSaveMsg("Scheduled!");
    setTimeout(() => router.push("/schedule"), 1000);
  };

  const charLimit = platformLimits[selectedPlatform] || 2200;

  const cardStyle: React.CSSProperties = {
    background: "#ffffff",
    borderRadius: 12,
    padding: 24,
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
  };

  const sectionLabel: React.CSSProperties = {
    fontFamily: "'Mona Sans', var(--font-mona), sans-serif",
    fontWeight: 600,
    fontSize: 15,
    color: "#191e41",
    display: "block",
    marginBottom: 12,
    background: "transparent",
    lineHeight: "1.4",
  };

  return (
    <div style={{ background: "transparent" }}>
      {/* Header */}
      <div style={{ marginBottom: 32, background: "transparent" }}>
        <h1
          style={{
            fontFamily: "'Mona Sans', var(--font-mona), sans-serif",
            fontWeight: 600,
            fontSize: 28,
            color: "#191e41",
            margin: 0,
            display: "block",
            lineHeight: "1.3",
            background: "transparent",
          }}
        >
          Create New Post
        </h1>
        <p
          style={{
            fontFamily: "'Source Sans 3', var(--font-source), sans-serif",
            fontSize: 16,
            color: "#636788",
            margin: "8px 0 0",
            display: "block",
            lineHeight: "1.5",
            background: "transparent",
          }}
        >
          Generate AI-powered content for your social media
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 32,
        }}
      >
        {/* Main layout: left + right */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "3fr 2fr",
            gap: 32,
          }}
        >
          {/* Left column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Platform selector */}
            <div style={cardStyle}>
              <label style={sectionLabel}>Platform</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {platforms.map((p) => {
                  const active = selectedPlatform === p.id;
                  return (
                    <button
                      type="button"
                      key={p.id}
                      onClick={() => setSelectedPlatform(p.id)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "8px 16px",
                        borderRadius: 20,
                        border: active ? "2px solid #ea4c89" : "2px solid #f3f5fc",
                        background: active ? "#ea4c89" : "#ffffff",
                        color: active ? "#ffffff" : "#636788",
                        fontFamily: "'Source Sans 3', var(--font-source), sans-serif",
                        fontSize: 14,
                        fontWeight: 500,
                        cursor: "pointer",
                        lineHeight: "1.4",
                      }}
                    >
                      {p.icon}
                      <span style={{ color: active ? "#ffffff" : "#636788", fontSize: 14, fontFamily: "'Source Sans 3', var(--font-source), sans-serif" }}>{p.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content type selector */}
            <div style={cardStyle}>
              <label style={sectionLabel}>Content Type</label>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 8,
                }}
              >
                {contentTypes.map((ct) => {
                  const active = selectedContentType === ct.id;
                  return (
                    <button
                      type="button"
                      key={ct.id}
                      onClick={() => setSelectedContentType(ct.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "10px 14px",
                        borderRadius: 10,
                        border: active ? "2px solid #ea4c89" : "2px solid #f3f5fc",
                        background: active ? "rgba(234,76,137,0.06)" : "#ffffff",
                        color: active ? "#ea4c89" : "#636788",
                        fontFamily: "'Source Sans 3', var(--font-source), sans-serif",
                        fontSize: 13,
                        fontWeight: 500,
                        cursor: "pointer",
                        textAlign: "left",
                        lineHeight: "1.4",
                      }}
                    >
                      <span style={{ fontSize: 18, lineHeight: "1" }}>{ct.icon}</span>
                      <span style={{ color: active ? "#ea4c89" : "#636788", fontSize: 13, fontFamily: "'Source Sans 3', var(--font-source), sans-serif" }}>{ct.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tone selector */}
            <div style={cardStyle}>
              <label style={sectionLabel}>Tone</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {tones.map((t) => {
                  const active = selectedTone === t.id;
                  return (
                    <button
                      type="button"
                      key={t.id}
                      onClick={() => setSelectedTone(t.id)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "6px 14px",
                        borderRadius: 16,
                        border: active ? "2px solid #ea4c89" : "2px solid #f3f5fc",
                        background: active ? "#ea4c89" : "#ffffff",
                        color: active ? "#ffffff" : "#636788",
                        fontFamily: "'Source Sans 3', var(--font-source), sans-serif",
                        fontSize: 13,
                        fontWeight: 500,
                        cursor: "pointer",
                        lineHeight: "1.4",
                      }}
                    >
                      <span style={{ color: active ? "#ffffff" : "#636788", fontSize: 13, fontFamily: "'Source Sans 3', var(--font-source), sans-serif" }}>{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Topic input */}
            <div style={cardStyle}>
              <label style={{ ...sectionLabel, marginBottom: 8 }}>Topic</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="What's your post about?"
                style={{
                  display: "block",
                  width: "100%",
                  padding: "12px 14px",
                  border: "2px solid #d8dce8",
                  borderRadius: 10,
                  fontFamily: "'Source Sans 3', var(--font-source), sans-serif",
                  fontSize: 15,
                  color: "#191e41",
                  outline: "none",
                  background: "#fafbff",
                  lineHeight: "1.5",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#ea4c89")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#d8dce8")}
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              />

              {/* Generate button */}
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating || !topic.trim()}
                style={{
                  marginTop: 16,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  padding: "14px 24px",
                  borderRadius: 10,
                  border: "none",
                  background: isGenerating || !topic.trim() ? "#d1d5e0" : "#ea4c89",
                  color: "#ffffff",
                  fontFamily: "'Mona Sans', var(--font-mona), sans-serif",
                  fontWeight: 600,
                  fontSize: 16,
                  cursor: isGenerating || !topic.trim() ? "not-allowed" : "pointer",
                  lineHeight: "1.4",
                  height: "auto",
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
                    <span style={{ color: "#ffffff", fontSize: 16, fontFamily: "'Mona Sans', var(--font-mona), sans-serif" }}>Generating...</span>
                  </>
                ) : (
                  <span style={{ color: "#ffffff", fontSize: 16, fontFamily: "'Mona Sans', var(--font-mona), sans-serif" }}>{"\u2728"} Generate with AI</span>
                )}
              </button>
            </div>

            {/* Generated content */}
            {hasGenerated && (
              <>
                {/* Caption textarea */}
                <div style={cardStyle}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    <label
                      style={{
                        fontFamily: "'Mona Sans', var(--font-mona), sans-serif",
                        fontWeight: 600,
                        fontSize: 15,
                        color: "#191e41",
                        display: "block",
                        background: "transparent",
                        lineHeight: "1.4",
                      }}
                    >
                      Caption
                    </label>
                    <span
                      style={{
                        fontFamily: "'Source Sans 3', var(--font-source), sans-serif",
                        fontSize: 13,
                        color: caption.length > charLimit ? "#dc2626" : "#636788",
                        lineHeight: "1.4",
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
                      display: "block",
                      width: "100%",
                      minHeight: 120,
                      padding: "14px 16px",
                      border: "2px solid #d8dce8",
                      borderRadius: 10,
                      fontFamily: "'Source Sans 3', var(--font-source), sans-serif",
                      fontSize: 15,
                      color: "#191e41",
                      resize: "vertical",
                      outline: "none",
                      background: "#fafbff",
                      lineHeight: 1.6,
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#ea4c89")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#d8dce8")}
                  />
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
                    <button
                      type="button"
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "8px 16px",
                        borderRadius: 8,
                        border: "2px solid #ea4c89",
                        background: "transparent",
                        color: "#ea4c89",
                        fontFamily: "'Mona Sans', var(--font-mona), sans-serif",
                        fontWeight: 600,
                        fontSize: 13,
                        cursor: "pointer",
                        lineHeight: "1.4",
                      }}
                    >
                      <span style={{ color: "#ea4c89", fontSize: 13, fontFamily: "'Mona Sans', var(--font-mona), sans-serif" }}>Regenerate</span>
                    </button>
                    {variations.length > 0 && (
                      <button
                        type="button"
                        onClick={handleTryVariation}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          padding: "8px 16px",
                          borderRadius: 8,
                          border: "2px solid #e8ebf5",
                          background: "transparent",
                          color: "#636788",
                          fontFamily: "'Mona Sans', var(--font-mona), sans-serif",
                          fontWeight: 600,
                          fontSize: 13,
                          cursor: "pointer",
                          lineHeight: "1.4",
                        }}
                      >
                        <span style={{ color: "#636788", fontSize: 13, fontFamily: "'Mona Sans', var(--font-mona), sans-serif" }}>Try variation</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Hashtags */}
                <div style={cardStyle}>
                  <label style={sectionLabel}>Hashtags</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                    {hashtags.map((h) => (
                      <span
                        key={h}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          padding: "4px 10px",
                          borderRadius: 14,
                          background: "rgba(234,76,137,0.08)",
                          color: "#ea4c89",
                          fontFamily: "'Source Sans 3', var(--font-source), sans-serif",
                          fontSize: 13,
                          lineHeight: "1.4",
                        }}
                      >
                        <span style={{ color: "#ea4c89", fontSize: 13 }}>{h}</span>
                        <button
                          type="button"
                          onClick={() => removeHashtag(h)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#ea4c89",
                            cursor: "pointer",
                            padding: "0 2px",
                            fontSize: 14,
                            lineHeight: 1,
                            display: "inline-flex",
                            alignItems: "center",
                          }}
                          aria-label={`Remove ${h}`}
                        >
                          <span style={{ color: "#ea4c89", fontSize: 14 }}>{"\u00d7"}</span>
                        </button>
                      </span>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <input
                      type="text"
                      value={newHashtag}
                      onChange={(e) => setNewHashtag(e.target.value)}
                      placeholder="Add hashtag"
                      style={{
                        flex: 1,
                        padding: "8px 12px",
                        border: "2px solid #d8dce8",
                        borderRadius: 8,
                        fontFamily: "'Source Sans 3', var(--font-source), sans-serif",
                        fontSize: 13,
                        color: "#191e41",
                        outline: "none",
                        background: "#fafbff",
                        lineHeight: "1.4",
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#ea4c89")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#d8dce8")}
                      onKeyDown={(e) => e.key === "Enter" && addHashtag()}
                    />
                    <button
                      type="button"
                      onClick={addHashtag}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "8px 14px",
                        borderRadius: 8,
                        border: "2px solid #ea4c89",
                        background: "transparent",
                        color: "#ea4c89",
                        fontFamily: "'Mona Sans', var(--font-mona), sans-serif",
                        fontWeight: 600,
                        fontSize: 13,
                        cursor: "pointer",
                        lineHeight: "1.4",
                      }}
                    >
                      <span style={{ color: "#ea4c89", fontSize: 13, fontFamily: "'Mona Sans', var(--font-mona), sans-serif" }}>Add</span>
                    </button>
                  </div>
                </div>

                {/* Best time + engagement badges */}
                {(bestTime || engagement) && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                    {bestTime && (
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "10px 16px",
                          borderRadius: 10,
                          background: "rgba(59,130,246,0.08)",
                          color: "#2563eb",
                          fontFamily: "'Source Sans 3', var(--font-source), sans-serif",
                          fontSize: 13,
                          fontWeight: 600,
                          lineHeight: "1.4",
                        }}
                      >
                        <span style={{ color: "#2563eb", fontSize: 13 }}>{"\u{1F550}"} Best time: {bestTime}</span>
                      </div>
                    )}
                    {engagement && (
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "10px 16px",
                          borderRadius: 10,
                          background: "rgba(34,197,94,0.08)",
                          color: "#16a34a",
                          fontFamily: "'Source Sans 3', var(--font-source), sans-serif",
                          fontSize: 13,
                          fontWeight: 600,
                          lineHeight: "1.4",
                        }}
                      >
                        <span style={{ color: "#16a34a", fontSize: 13 }}>{"\u{1F4CA}"} Est. {engagement}</span>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {/* Media */}
            <div style={cardStyle}>
              <label style={sectionLabel}>Media</label>
              {imageUrl ? (
                <div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageUrl}
                    alt="Generated image"
                    style={{
                      width: "100%",
                      maxWidth: "100%",
                      borderRadius: 8,
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                    <button
                      type="button"
                      onClick={handleGenerateImage}
                      disabled={isGeneratingImage}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "10px 20px",
                        borderRadius: 10,
                        border: "2px solid #e8ebf5",
                        background: "transparent",
                        color: "#636788",
                        fontFamily: "'Mona Sans', var(--font-mona), sans-serif",
                        fontWeight: 600,
                        fontSize: 13,
                        cursor: "pointer",
                        lineHeight: "1.4",
                      }}
                    >
                      <span style={{ color: "#636788", fontSize: 13, fontFamily: "'Mona Sans', var(--font-mona), sans-serif" }}>Regenerate</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageUrl("")}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "10px 20px",
                        borderRadius: 10,
                        border: "2px solid #e8ebf5",
                        background: "transparent",
                        color: "#dc2626",
                        fontFamily: "'Mona Sans', var(--font-mona), sans-serif",
                        fontWeight: 600,
                        fontSize: 13,
                        cursor: "pointer",
                        lineHeight: "1.4",
                      }}
                    >
                      <span style={{ color: "#dc2626", fontSize: 13, fontFamily: "'Mona Sans', var(--font-mona), sans-serif" }}>Remove</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  {/* AI Generate */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                      border: "2px dashed #d8dce8",
                      borderRadius: 10,
                      padding: 20,
                      background: "#fafbff",
                    }}
                  >
                    <span style={{ fontFamily: "'Mona Sans', var(--font-mona), sans-serif", fontSize: 13, fontWeight: 600, color: "#191e41" }}>AI Generate</span>
                    <input
                      type="text"
                      value={imagePrompt}
                      onChange={(e) => setImagePrompt(e.target.value)}
                      placeholder="Describe the image you want..."
                      style={{
                        display: "block",
                        width: "100%",
                        padding: "10px 12px",
                        border: "2px solid #d8dce8",
                        borderRadius: 8,
                        fontFamily: "'Source Sans 3', var(--font-source), sans-serif",
                        fontSize: 13,
                        color: "#191e41",
                        outline: "none",
                        background: "#ffffff",
                        lineHeight: "1.4",
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#ea4c89")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#d8dce8")}
                      onKeyDown={(e) => e.key === "Enter" && handleGenerateImage()}
                    />
                    <button
                      type="button"
                      onClick={handleGenerateImage}
                      disabled={isGeneratingImage || !imagePrompt.trim()}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                        padding: "10px 20px",
                        borderRadius: 10,
                        border: "none",
                        background: isGeneratingImage || !imagePrompt.trim() ? "#d1d5e0" : "#3a3546",
                        color: "#ffffff",
                        fontFamily: "'Mona Sans', var(--font-mona), sans-serif",
                        fontWeight: 600,
                        fontSize: 13,
                        cursor: isGeneratingImage || !imagePrompt.trim() ? "not-allowed" : "pointer",
                        lineHeight: "1.4",
                      }}
                    >
                      {isGeneratingImage ? (
                        <>
                          <span
                            style={{
                              width: 14,
                              height: 14,
                              border: "2px solid rgba(255,255,255,0.3)",
                              borderTopColor: "#ffffff",
                              borderRadius: "50%",
                              display: "inline-block",
                              animation: "spin 0.8s linear infinite",
                            }}
                          />
                          <span style={{ color: "#ffffff", fontSize: 13 }}>Generating...</span>
                        </>
                      ) : (
                        <span style={{ color: "#ffffff", fontSize: 13 }}>{"\uD83C\uDFA8"} Generate Image</span>
                      )}
                    </button>
                  </div>
                  {/* Upload area */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "2px dashed #d8dce8",
                      borderRadius: 10,
                      padding: 20,
                      background: "#fafbff",
                      cursor: "pointer",
                    }}
                  >
                    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" stroke="#636788" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="4" y="4" width="32" height="32" rx="4" />
                      <circle cx="14" cy="16" r="3" />
                      <path d="M36 28l-8-8-12 12" />
                    </svg>
                    <p style={{ fontFamily: "'Source Sans 3', var(--font-source), sans-serif", fontSize: 13, color: "#636788", margin: "8px 0 4px", display: "block", lineHeight: "1.4", textAlign: "center" }}>
                      Drag & drop images or videos
                    </p>
                    <button
                      type="button"
                      style={{
                        marginTop: 4,
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "8px 16px",
                        borderRadius: 8,
                        border: "2px solid #e8ebf5",
                        background: "transparent",
                        color: "#636788",
                        fontFamily: "'Mona Sans', var(--font-mona), sans-serif",
                        fontWeight: 600,
                        fontSize: 13,
                        cursor: "pointer",
                        lineHeight: "1.4",
                      }}
                    >
                      <span style={{ color: "#636788", fontSize: 13, fontFamily: "'Mona Sans', var(--font-mona), sans-serif" }}>Browse files</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right column — Preview */}
          <div>
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
                  fontFamily: "'Mona Sans', var(--font-mona), sans-serif",
                  fontWeight: 600,
                  fontSize: 16,
                  color: "#191e41",
                  margin: "0 0 16px",
                  display: "block",
                  lineHeight: "1.4",
                  background: "transparent",
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
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 8px 8px", fontSize: 11, color: "#636788", fontFamily: "'Source Sans 3', var(--font-source), sans-serif" }}>
                  <span style={{ color: "#636788", fontSize: 11 }}>9:41</span>
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
                    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderBottom: "1px solid #f3f5fc" }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #ea4c89, #f093b0)" }} />
                      <span style={{ fontFamily: "'Mona Sans', var(--font-mona), sans-serif", fontSize: 13, fontWeight: 600, color: "#191e41" }}>your_brand</span>
                    </div>
                    {imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={imageUrl} alt="Preview" style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover", display: "block" }} />
                    ) : (
                      <div style={{ width: "100%", aspectRatio: "1/1", background: "#f3f5fc" }} />
                    )}
                    <div style={{ padding: "10px 12px" }}>
                      <div style={{ display: "flex", gap: 12, marginBottom: 8 }}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#191e41" strokeWidth="1.5"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" /></svg>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#191e41" strokeWidth="1.5"><path d="M18 10c0 4-3.333 7-8 10C5.333 17 2 14 2 10a4 4 0 018 0 4 4 0 018 0z" /></svg>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#191e41" strokeWidth="1.5"><path d="M4 12l1.5-9L12 6l6-2-1.5 9L10 10z" /></svg>
                      </div>
                      <p style={{ fontFamily: "'Source Sans 3', var(--font-source), sans-serif", fontSize: 12, color: "#191e41", margin: 0, lineHeight: 1.5, display: "block" }}>
                        <strong style={{ color: "#191e41", fontWeight: 700 }}>your_brand</strong>{" "}
                        <span style={{ color: "#191e41", fontSize: 12 }}>{caption || "Your caption will appear here..."}</span>
                      </p>
                      {hashtags.length > 0 && (
                        <p style={{ fontFamily: "'Source Sans 3', var(--font-source), sans-serif", fontSize: 11, color: "#3b82f6", margin: "6px 0 0", lineHeight: 1.4, display: "block" }}>
                          {hashtags.slice(0, 6).join(" ")}
                        </p>
                      )}
                    </div>
                  </>
                )}

                {selectedPlatform === "twitter" && (
                  <div style={{ padding: 12 }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                      <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #ea4c89, #f093b0)", flexShrink: 0 }} />
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <span style={{ fontFamily: "'Mona Sans', var(--font-mona), sans-serif", fontSize: 13, fontWeight: 600, color: "#191e41" }}>Your Brand</span>
                          <span style={{ fontFamily: "'Source Sans 3', var(--font-source), sans-serif", fontSize: 12, color: "#636788" }}>@yourbrand</span>
                        </div>
                        <p style={{ fontFamily: "'Source Sans 3', var(--font-source), sans-serif", fontSize: 13, color: "#191e41", margin: "4px 0 0", lineHeight: 1.5, display: "block" }}>
                          <span style={{ color: "#191e41", fontSize: 13 }}>{caption || "Your tweet will appear here..."}</span>
                        </p>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 24, paddingLeft: 44, marginTop: 8 }}>
                      <span style={{ fontSize: 12, color: "#636788" }}>{"\u{1F4AC}"} 12</span>
                      <span style={{ fontSize: 12, color: "#636788" }}>{"\u{1F504}"} 34</span>
                      <span style={{ fontSize: 12, color: "#636788" }}>{"\u2764\uFE0F"} 89</span>
                    </div>
                  </div>
                )}

                {selectedPlatform !== "instagram" && selectedPlatform !== "twitter" && (
                  <div style={{ padding: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #ea4c89, #f093b0)" }} />
                      <div>
                        <span style={{ fontFamily: "'Mona Sans', var(--font-mona), sans-serif", fontSize: 13, fontWeight: 600, color: "#191e41", display: "block" }}>Your Brand</span>
                        <span style={{ fontFamily: "'Source Sans 3', var(--font-source), sans-serif", fontSize: 11, color: "#636788" }}>Just now</span>
                      </div>
                    </div>
                    {imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={imageUrl} alt="Preview" style={{ width: "100%", height: 140, borderRadius: 8, objectFit: "cover", marginBottom: 10, display: "block" }} />
                    ) : (
                      <div style={{ width: "100%", height: 140, borderRadius: 8, background: "#f3f5fc", marginBottom: 10 }} />
                    )}
                    <p style={{ fontFamily: "'Source Sans 3', var(--font-source), sans-serif", fontSize: 12, color: "#191e41", margin: 0, lineHeight: 1.5, display: "block" }}>
                      <span style={{ color: "#191e41", fontSize: 12 }}>{caption || "Your post will appear here..."}</span>
                    </p>
                    {hashtags.length > 0 && (
                      <p style={{ fontFamily: "'Source Sans 3', var(--font-source), sans-serif", fontSize: 11, color: "#3b82f6", margin: "6px 0 0", display: "block" }}>
                        {hashtags.slice(0, 5).join(" ")}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Platform label */}
              <div style={{ textAlign: "center", marginTop: 12 }}>
                <span
                  style={{
                    fontFamily: "'Source Sans 3', var(--font-source), sans-serif",
                    fontSize: 12,
                    color: "#636788",
                    textTransform: "capitalize",
                    display: "inline-block",
                    lineHeight: "1.4",
                  }}
                >
                  {selectedPlatform} preview
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom action bar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 12,
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
          type="button"
          onClick={handleSaveDraft}
          disabled={!caption.trim()}
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "12px 24px",
            borderRadius: 10,
            border: "2px solid #e8ebf5",
            background: "transparent",
            color: "#636788",
            fontFamily: "'Mona Sans', var(--font-mona), sans-serif",
            fontWeight: 600,
            fontSize: 15,
            cursor: caption.trim() ? "pointer" : "not-allowed",
            opacity: caption.trim() ? 1 : 0.5,
            lineHeight: "1.4",
          }}
        >
          <span style={{ color: "#636788", fontSize: 15, fontFamily: "'Mona Sans', var(--font-mona), sans-serif" }}>Save as Draft</span>
        </button>
        <button
          type="button"
          onClick={() => setScheduleModalOpen(true)}
          disabled={!caption.trim()}
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "12px 24px",
            borderRadius: 10,
            border: "2px solid #ea4c89",
            background: "transparent",
            color: "#ea4c89",
            fontFamily: "'Mona Sans', var(--font-mona), sans-serif",
            fontWeight: 600,
            fontSize: 15,
            cursor: caption.trim() ? "pointer" : "not-allowed",
            opacity: caption.trim() ? 1 : 0.5,
            lineHeight: "1.4",
          }}
        >
          <span style={{ color: "#ea4c89", fontSize: 15, fontFamily: "'Mona Sans', var(--font-mona), sans-serif" }}>Schedule</span>
        </button>
        <button
          type="button"
          onClick={handlePublish}
          disabled={!caption.trim()}
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "12px 24px",
            borderRadius: 10,
            border: "none",
            background: caption.trim() ? "#ea4c89" : "#d1d5e0",
            color: "#ffffff",
            fontFamily: "'Mona Sans', var(--font-mona), sans-serif",
            fontWeight: 600,
            fontSize: 15,
            cursor: caption.trim() ? "pointer" : "not-allowed",
            lineHeight: "1.4",
          }}
        >
          <span style={{ color: "#ffffff", fontSize: 15, fontFamily: "'Mona Sans', var(--font-mona), sans-serif" }}>Publish Now</span>
        </button>
        {saveMessage && (
          <span
            style={{
              fontFamily: "'Source Sans 3', var(--font-source), sans-serif",
              fontSize: 14,
              color: "#16a34a",
              fontWeight: 600,
              marginLeft: 8,
              display: "inline-block",
              lineHeight: "1.4",
            }}
          >
            {"\u2713"} {saveMessage}
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
