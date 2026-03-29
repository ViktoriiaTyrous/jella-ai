import type { Metadata } from "next";
import localFont from "next/font/local";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";

const monaSans = localFont({
  src: "../fonts/MonaSans.woff2",
  variable: "--font-mona",
  display: "swap",
  weight: "200 900",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jella AI — AI-powered social media platform",
  description: "Create, schedule, and publish social media content with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${monaSans.variable} ${sourceSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
