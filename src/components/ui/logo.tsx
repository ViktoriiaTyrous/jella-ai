"use client";

import React from "react";

interface LogoProps {
  size?: "sm" | "lg";
  variant?: "light" | "dark";
}

export default function Logo({ size = "sm", variant = "dark" }: LogoProps) {
  const dim = size === "sm" ? 32 : 48;
  const isLight = variant === "light";

  const mainColor = isLight ? "#ffffff" : "#ea4c89";
  const lightColor = isLight ? "rgba(255,255,255,0.6)" : "#f9a8d4";
  const eyeColor = isLight ? "#1a1a2e" : "#ffffff";
  const gradId = `jelly-grad-${size}-${variant}`;
  const sheenId = `jelly-sheen-${size}-${variant}`;

  if (size === "sm") {
    return (
      <svg width={dim} height={dim} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={gradId} x1="6" y1="3" x2="26" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor={mainColor} />
            <stop offset="1" stopColor={isLight ? "rgba(255,255,255,0.7)" : "#c13584"} />
          </linearGradient>
          <radialGradient id={sheenId} cx="12" cy="8" r="10" gradientUnits="userSpaceOnUse">
            <stop stopColor={isLight ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.25)"} />
            <stop offset="1" stopColor="transparent" />
          </radialGradient>
        </defs>
        {/* Dome / bell */}
        <path
          d="M6 15 C6 6, 26 6, 26 15 C26 17, 24 18, 16 18 C8 18, 6 17, 6 15Z"
          fill={`url(#${gradId})`}
        />
        <path
          d="M6 15 C6 6, 26 6, 26 15 C26 17, 24 18, 16 18 C8 18, 6 17, 6 15Z"
          fill={`url(#${sheenId})`}
        />
        {/* Tentacles */}
        <path d="M9 17 C8 21, 7.5 25, 9 28" stroke={lightColor} strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path d="M13 18 C12.5 22, 13 26, 12 29" stroke={mainColor} strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path d="M19 18 C19.5 22, 19 26, 20 29" stroke={mainColor} strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path d="M23 17 C24 21, 24.5 25, 23 28" stroke={lightColor} strokeWidth="1.8" strokeLinecap="round" fill="none" />
        {/* Eyes */}
        <circle cx="13" cy="12" r="1.4" fill={eyeColor} />
        <circle cx="19" cy="12" r="1.4" fill={eyeColor} />
      </svg>
    );
  }

  // Large variant (48x48)
  return (
    <svg width={dim} height={dim} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gradId} x1="8" y1="4" x2="40" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor={mainColor} />
          <stop offset="1" stopColor={isLight ? "rgba(255,255,255,0.7)" : "#c13584"} />
        </linearGradient>
        <radialGradient id={sheenId} cx="18" cy="11" r="16" gradientUnits="userSpaceOnUse">
          <stop stopColor={isLight ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.25)"} />
          <stop offset="1" stopColor="transparent" />
        </radialGradient>
      </defs>
      {/* Dome / bell shape */}
      <path
        d="M8 22 C8 8, 40 8, 40 22 C40 25, 37 27, 24 27 C11 27, 8 25, 8 22Z"
        fill={`url(#${gradId})`}
      />
      <path
        d="M8 22 C8 8, 40 8, 40 22 C40 25, 37 27, 24 27 C11 27, 8 25, 8 22Z"
        fill={`url(#${sheenId})`}
      />
      {/* Tentacles — 4 flowing curves */}
      <path d="M13 26 C11 32, 10 38, 13 43" stroke={lightColor} strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M19 27 C18 33, 19 39, 17.5 44" stroke={mainColor} strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M29 27 C30 33, 29 39, 30.5 44" stroke={mainColor} strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M35 26 C37 32, 38 38, 35 43" stroke={lightColor} strokeWidth="2.2" strokeLinecap="round" fill="none" />
      {/* Eyes */}
      <circle cx="19" cy="17" r="2" fill={eyeColor} />
      <circle cx="29" cy="17" r="2" fill={eyeColor} />
    </svg>
  );
}
