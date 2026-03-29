"use client";

import React from "react";

interface LogoProps {
  size?: "sm" | "lg";
  variant?: "light" | "dark";
}

export default function Logo({ size = "sm", variant = "dark" }: LogoProps) {
  const dim = size === "sm" ? 32 : 48;
  const isLight = variant === "light";
  const uid = `jl-${size}-${variant}`;

  if (size === "sm") {
    return (
      <svg width={dim} height={dim} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={`${uid}-g`} x1="4" y1="2" x2="28" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor={isLight ? "#fff" : "#ea4c89"} />
            <stop offset="0.5" stopColor={isLight ? "rgba(255,255,255,0.9)" : "#e84393"} />
            <stop offset="1" stopColor={isLight ? "rgba(255,255,255,0.7)" : "#c13584"} />
          </linearGradient>
          <radialGradient id={`${uid}-sh`} cx="11" cy="8" r="14" gradientUnits="userSpaceOnUse">
            <stop stopColor="rgba(255,255,255,0.35)" />
            <stop offset="1" stopColor="transparent" />
          </radialGradient>
          <filter id={`${uid}-glow`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" />
          </filter>
        </defs>

        {/* Soft glow behind */}
        <ellipse cx="16" cy="14" rx="10" ry="8" fill={isLight ? "rgba(255,255,255,0.15)" : "rgba(234,76,137,0.15)"} filter={`url(#${uid}-glow)`} />

        {/* Main dome — rounded bell shape */}
        <path
          d="M5.5 14.5 C5.5 5.5, 26.5 5.5, 26.5 14.5 C26.5 17.5, 23 19, 16 19 C9 19, 5.5 17.5, 5.5 14.5Z"
          fill={`url(#${uid}-g)`}
        />
        {/* Sheen overlay */}
        <path
          d="M5.5 14.5 C5.5 5.5, 26.5 5.5, 26.5 14.5 C26.5 17.5, 23 19, 16 19 C9 19, 5.5 17.5, 5.5 14.5Z"
          fill={`url(#${uid}-sh)`}
        />
        {/* Inner dome highlight */}
        <path
          d="M9 11 C9.5 7, 22.5 7, 23 11"
          stroke={isLight ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.3)"}
          strokeWidth="0.8"
          strokeLinecap="round"
          fill="none"
        />

        {/* Tentacles — 5 flowing bezier curves */}
        <path d="M8 18 C7 21.5, 6.5 24.5, 8.5 28" stroke={isLight ? "rgba(255,255,255,0.4)" : "rgba(234,76,137,0.35)"} strokeWidth="1.6" strokeLinecap="round" fill="none" />
        <path d="M11.5 18.5 C11 22, 10.5 25, 10 28.5" stroke={isLight ? "rgba(255,255,255,0.55)" : "rgba(234,76,137,0.5)"} strokeWidth="1.6" strokeLinecap="round" fill="none" />
        <path d="M16 19 C16 23, 16.5 26, 16 29" stroke={isLight ? "rgba(255,255,255,0.6)" : "#ea4c89"} strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path d="M20.5 18.5 C21 22, 21.5 25, 22 28.5" stroke={isLight ? "rgba(255,255,255,0.55)" : "rgba(234,76,137,0.5)"} strokeWidth="1.6" strokeLinecap="round" fill="none" />
        <path d="M24 18 C25 21.5, 25.5 24.5, 23.5 28" stroke={isLight ? "rgba(255,255,255,0.4)" : "rgba(234,76,137,0.35)"} strokeWidth="1.6" strokeLinecap="round" fill="none" />

        {/* Eyes — cute dots with highlights */}
        <circle cx="12.5" cy="12.5" r="1.6" fill={isLight ? "#1a1a2e" : "#fff"} />
        <circle cx="19.5" cy="12.5" r="1.6" fill={isLight ? "#1a1a2e" : "#fff"} />
        <circle cx="12" cy="12" r="0.5" fill={isLight ? "rgba(255,255,255,0.7)" : "rgba(234,76,137,0.4)"} />
        <circle cx="19" cy="12" r="0.5" fill={isLight ? "rgba(255,255,255,0.7)" : "rgba(234,76,137,0.4)"} />

        {/* Tiny smile */}
        <path
          d="M14 14.5 C14.5 15.2, 17.5 15.2, 18 14.5"
          stroke={isLight ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.4)"}
          strokeWidth="0.7"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    );
  }

  // Large variant (48x48)
  return (
    <svg width={dim} height={dim} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`${uid}-g`} x1="6" y1="3" x2="42" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor={isLight ? "#fff" : "#ea4c89"} />
          <stop offset="0.5" stopColor={isLight ? "rgba(255,255,255,0.9)" : "#e84393"} />
          <stop offset="1" stopColor={isLight ? "rgba(255,255,255,0.7)" : "#c13584"} />
        </linearGradient>
        <radialGradient id={`${uid}-sh`} cx="16" cy="12" r="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="rgba(255,255,255,0.35)" />
          <stop offset="1" stopColor="transparent" />
        </radialGradient>
        <filter id={`${uid}-glow`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" />
        </filter>
      </defs>

      {/* Soft glow */}
      <ellipse cx="24" cy="20" rx="16" ry="12" fill={isLight ? "rgba(255,255,255,0.12)" : "rgba(234,76,137,0.12)"} filter={`url(#${uid}-glow)`} />

      {/* Main dome */}
      <path
        d="M7 21 C7 7, 41 7, 41 21 C41 25.5, 36 28, 24 28 C12 28, 7 25.5, 7 21Z"
        fill={`url(#${uid}-g)`}
      />
      <path
        d="M7 21 C7 7, 41 7, 41 21 C41 25.5, 36 28, 24 28 C12 28, 7 25.5, 7 21Z"
        fill={`url(#${uid}-sh)`}
      />
      {/* Inner dome highlight arc */}
      <path
        d="M13 16 C14 10, 34 10, 35 16"
        stroke={isLight ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.25)"}
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
      />

      {/* Tentacles — 5 flowing bezier curves with varying opacity */}
      <path d="M11 27 C9.5 32, 8.5 37, 11 43" stroke={isLight ? "rgba(255,255,255,0.35)" : "rgba(234,76,137,0.3)"} strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M16 28 C15 33, 14.5 38, 14 43.5" stroke={isLight ? "rgba(255,255,255,0.5)" : "rgba(234,76,137,0.45)"} strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M24 28.5 C24 34, 24.5 39, 24 44" stroke={isLight ? "rgba(255,255,255,0.6)" : "#ea4c89"} strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <path d="M32 28 C33 33, 33.5 38, 34 43.5" stroke={isLight ? "rgba(255,255,255,0.5)" : "rgba(234,76,137,0.45)"} strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M37 27 C38.5 32, 39.5 37, 37 43" stroke={isLight ? "rgba(255,255,255,0.35)" : "rgba(234,76,137,0.3)"} strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Eyes — larger with shine highlights */}
      <circle cx="19" cy="18" r="2.4" fill={isLight ? "#1a1a2e" : "#fff"} />
      <circle cx="29" cy="18" r="2.4" fill={isLight ? "#1a1a2e" : "#fff"} />
      {/* Eye shine */}
      <circle cx="18.2" cy="17.2" r="0.8" fill={isLight ? "rgba(255,255,255,0.8)" : "rgba(234,76,137,0.35)"} />
      <circle cx="28.2" cy="17.2" r="0.8" fill={isLight ? "rgba(255,255,255,0.8)" : "rgba(234,76,137,0.35)"} />

      {/* Cute smile */}
      <path
        d="M20.5 22 C21.5 23.2, 26.5 23.2, 27.5 22"
        stroke={isLight ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.35)"}
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
      />

      {/* Tiny blush spots */}
      <circle cx="15" cy="20.5" r="1.5" fill={isLight ? "rgba(255,200,200,0.3)" : "rgba(255,182,193,0.2)"} />
      <circle cx="33" cy="20.5" r="1.5" fill={isLight ? "rgba(255,200,200,0.3)" : "rgba(255,182,193,0.2)"} />
    </svg>
  );
}
