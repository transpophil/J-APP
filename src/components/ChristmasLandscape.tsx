"use client";

import React from "react";
import { useTheme } from "@/contexts/ThemeContext";

const ChristmasLandscape: React.FC = () => {
  const { christmasEnabled } = useTheme();
  if (!christmasEnabled) return null;

  return (
    <div className="mx-auto max-w-4xl px-4">
      <div className="rounded-xl overflow-hidden border border-border shadow-sm bg-card/70 backdrop-blur-md">
        <svg
          viewBox="0 0 1200 180"
          width="100%"
          height="180"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="snowGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(0 0% 98%)" />
              <stop offset="100%" stopColor="hsl(210 20% 95%)" />
            </linearGradient>
            <linearGradient id="treeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(150 25% 30%)" />
              <stop offset="100%" stopColor="hsl(150 25% 20%)" />
            </linearGradient>
            <linearGradient id="woodGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="hsl(30 40% 35%)" />
              <stop offset="100%" stopColor="hsl(30 40% 25%)" />
            </linearGradient>
            <linearGradient id="roofGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(350 30% 35%)" />
              <stop offset="100%" stopColor="hsl(350 30% 25%)" />
            </linearGradient>
            <linearGradient id="windowGlow" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="hsl(50 100% 80%)" />
              <stop offset="100%" stopColor="hsl(40 100% 60%)" />
            </linearGradient>
            <linearGradient id="snowCap" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(0 0% 100%)" />
              <stop offset="100%" stopColor="hsl(210 20% 92%)" />
            </linearGradient>
          </defs>

          {/* Foreground snowy hills */}
          <path
            d="M0,135 C200,110 340,150 480,130 C610,115 750,155 900,135 C1020,120 1200,155 1200,155 L1200,180 L0,180 Z"
            fill="url(#snowGrad)"
          />
          {/* Midground gentle ridge */}
          <path
            d="M0,120 C220,100 360,120 520,105 C670,95 840,125 1000,110 C1090,102 1200,130 1200,130 L1200,160 L0,160 Z"
            fill="hsl(210 20% 92%)"
          />
          {/* Distant ridge */}
          <path
            d="M0,105 C260,90 420,100 600,88 C760,80 940,105 1100,90 C1160,85 1200,100 1200,100 L1200,140 L0,140 Z"
            fill="hsl(210 15% 88%)"
          />

          {/* Evergreen tree on the left */}
          <g transform="translate(150,40)">
            {/* snow cap on top */}
            <path d="M32,0 L48,22 L16,22 Z" fill="url(#snowCap)" />
            {/* tree layers */}
            <path d="M32,10 L80,70 L-16,70 Z" fill="url(#treeGrad)" />
            <path d="M32,40 L70,100 L-6,100 Z" fill="url(#treeGrad)" />
            <path d="M32,75 L60,130 L5,130 Z" fill="url(#treeGrad)" />
            {/* trunk */}
            <rect x="28" y="130" width="8" height="20" fill="hsl(30 25% 20%)" />
            {/* snow accents on branches */}
            <path d="M32,40 L58,76 L6,76 Z" fill="url(#snowCap)" opacity="0.85" />
            <path d="M32,75 L54,110 L10,110 Z" fill="url(#snowCap)" opacity="0.85" />
          </g>

          {/* Cozy cabin on the right */}
          <g transform="translate(900,55)">
            {/* house body */}
            <rect x="0" y="40" width="140" height="70" rx="4" fill="url(#woodGrad)" stroke="hsl(30 30% 20%)" strokeWidth="2" />
            {/* roof */}
            <path d="M-10,40 L70,0 L150,40 Z" fill="url(#roofGrad)" stroke="hsl(350 25% 18%)" strokeWidth="2" />
            {/* snow on roof */}
            <path d="M-6,38 C20,30 40,26 72,20 C100,26 130,33 156,38 L152,45 L-2,45 Z"
              fill="url(#snowCap)" />
            {/* door */}
            <rect x="18" y="62" width="28" height="48" rx="3" fill="hsl(25 30% 20%)" stroke="hsl(25 20% 15%)" />
            {/* windows */}
            <rect x="66" y="64" width="26" height="20" rx="2" fill="url(#windowGlow)" stroke="hsl(40 80% 50%)" />
            <rect x="102" y="64" width="26" height="20" rx="2" fill="url(#windowGlow)" stroke="hsl(40 80% 50%)" />
            {/* chimney */}
            <rect x="110" y="6" width="16" height="24" fill="hsl(20 20% 25%)" />
            {/* snow on chimney */}
            <rect x="108" y="0" width="20" height="8" rx="3" fill="url(#snowCap)" />
          </g>

          {/* Soft snow sparkle dots */}
          {Array.from({ length: 30 }, (_, i) => {
            const x = 30 + i * 38;
            const y = 120 + (i % 5) * 8;
            return <circle key={i} cx={x} cy={y} r="2" fill="hsl(210 25% 96%)" />;
          })}
        </svg>
      </div>
    </div>
  );
};

export default ChristmasLandscape;