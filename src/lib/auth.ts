export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

const USERS_KEY = "jella_users";
const SESSION_KEY = "jella_session";

function getUsers(): User[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveUsers(users: User[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function signUp(name: string, email: string, password: string): { ok: boolean; error?: string } {
  const users = getUsers();
  if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return { ok: false, error: "Account with this email already exists" };
  }
  const user: User = {
    id: crypto.randomUUID(),
    name,
    email: email.toLowerCase(),
    password,
    createdAt: new Date().toISOString(),
  };
  saveUsers([...users, user]);
  localStorage.setItem(SESSION_KEY, JSON.stringify({ id: user.id, name: user.name, email: user.email }));
  return { ok: true };
}

export function signIn(email: string, password: string): { ok: boolean; error?: string } {
  const users = getUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    return { ok: false, error: "No account found with this email" };
  }
  if (user.password !== password) {
    return { ok: false, error: "Incorrect password" };
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify({ id: user.id, name: user.name, email: user.email }));
  return { ok: true };
}

export function getSession(): { id: string; name: string; email: string } | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function signOut(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function isAuthenticated(): boolean {
  return getSession() !== null;
}
