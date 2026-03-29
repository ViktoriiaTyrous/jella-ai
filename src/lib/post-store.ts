export interface Post {
  id: string;
  caption: string;
  hashtags: string[];
  platform: string;
  status: "draft" | "scheduled" | "published";
  scheduledAt?: string;
  publishedAt?: string;
  createdAt: string;
  mediaUrl?: string;
  engagement?: { likes: number; comments: number; shares: number };
}

const STORAGE_KEY = "jella-posts";

function readStore(): Post[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeStore(posts: Post[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export function getAllPosts(): Post[] {
  return readStore();
}

export function getPostById(id: string): Post | undefined {
  return readStore().find((p) => p.id === id);
}

export function createPost(post: Omit<Post, "id" | "createdAt">): Post {
  const posts = readStore();
  const newPost: Post = {
    ...post,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  posts.unshift(newPost);
  writeStore(posts);
  return newPost;
}

export function updatePost(id: string, updates: Partial<Post>): Post | undefined {
  const posts = readStore();
  const idx = posts.findIndex((p) => p.id === id);
  if (idx === -1) return undefined;
  posts[idx] = { ...posts[idx], ...updates };
  writeStore(posts);
  return posts[idx];
}

export function deletePost(id: string): boolean {
  const posts = readStore();
  const filtered = posts.filter((p) => p.id !== id);
  if (filtered.length === posts.length) return false;
  writeStore(filtered);
  return true;
}

export function getPostsByStatus(status: Post["status"]): Post[] {
  return readStore().filter((p) => p.status === status);
}

export function getPostsByPlatform(platform: string): Post[] {
  return readStore().filter((p) => p.platform === platform);
}
