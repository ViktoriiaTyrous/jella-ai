import type { Metadata } from "next";
import { monaSans, sourceSans } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jella AI — Your AI-powered creative workspace",
  description: "AI-powered creative workspace for content, strategy, and growth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${monaSans.variable} ${sourceSans.variable}`}>
      <body className="font-[family-name:var(--font-source)] antialiased">
        {children}
      </body>
    </html>
  );
}
