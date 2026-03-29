import { createPost, getAllPosts } from "./post-store";

const SEEDED_KEY = "jella-seeded";

export function seedMockData(): void {
  if (typeof window === "undefined") return;
  if (localStorage.getItem(SEEDED_KEY)) return;
  if (getAllPosts().length > 0) {
    localStorage.setItem(SEEDED_KEY, "1");
    return;
  }

  const now = new Date();

  const samples = [
    {
      caption: "Just dropped something special ✨ Our newest summer collection is here and we can't stop staring. Who's ready?",
      hashtags: ["#fashion", "#style", "#ootd", "#summercollection", "#newdrop", "#instagood"],
      platform: "instagram",
      status: "published" as const,
      publishedAt: new Date(now.getTime() - 2 * 86400000).toISOString(),
      engagement: { likes: 342, comments: 28, shares: 15 },
    },
    {
      caption: "POV: You just discovered the perfect skincare routine 😱 #fyp #viral #skincare",
      hashtags: ["#fyp", "#skincare", "#beauty", "#viral", "#trending", "#beautytips"],
      platform: "tiktok",
      status: "published" as const,
      publishedAt: new Date(now.getTime() - 4 * 86400000).toISOString(),
      engagement: { likes: 1250, comments: 89, shares: 203 },
    },
    {
      caption: "Hot take: Most brands overcomplicate their social media strategy. Here's the simple version 🧵",
      hashtags: ["#marketing", "#socialmedia", "#thread", "#tips"],
      platform: "twitter",
      status: "published" as const,
      publishedAt: new Date(now.getTime() - 6 * 86400000).toISOString(),
      engagement: { likes: 87, comments: 12, shares: 34 },
    },
    {
      caption: "Exciting product launch coming soon! Stay tuned for something we've been working on for months...",
      hashtags: ["#comingsoon", "#productlaunch", "#instagood", "#excited", "#newproduct"],
      platform: "instagram",
      status: "scheduled" as const,
      scheduledAt: new Date(now.getTime() + 1 * 86400000).toISOString(),
    },
    {
      caption: "Top 5 tips for growing your audience this spring 🌱",
      hashtags: ["#fyp", "#growthtips", "#socialmedia", "#trending", "#foryou"],
      platform: "tiktok",
      status: "scheduled" as const,
      scheduledAt: new Date(now.getTime() + 2 * 86400000).toISOString(),
    },
    {
      caption: "We're proud to announce our partnership with leading sustainability initiatives. Here's what this means for our community.",
      hashtags: ["#sustainability", "#leadership", "#partnership", "#professional", "#growth"],
      platform: "linkedin",
      status: "scheduled" as const,
      scheduledAt: new Date(now.getTime() + 4 * 86400000).toISOString(),
    },
    {
      caption: "Monthly recap: what worked and what didn't in our content strategy",
      hashtags: ["#contentmarketing", "#strategy", "#recap", "#marketing"],
      platform: "twitter",
      status: "draft" as const,
    },
    {
      caption: "Behind the scenes of our creative process — no filters, no edits, just the real deal 🎨",
      hashtags: ["#bts", "#behindthescenes", "#creative", "#design", "#process"],
      platform: "instagram",
      status: "draft" as const,
    },
  ];

  for (const sample of samples) {
    createPost(sample);
  }

  localStorage.setItem(SEEDED_KEY, "1");
}
