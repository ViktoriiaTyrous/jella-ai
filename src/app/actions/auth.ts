"use server";

import { signIn } from "@/lib/auth-config";

export async function signInWithGoogle() {
  await signIn("google", { redirectTo: "/dashboard" });
}
