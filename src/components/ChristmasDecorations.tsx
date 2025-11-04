"use client";

import React, { useMemo } from "react";
import { useTheme } from "@/contexts/ThemeContext";

const ChristmasDecorations: React.FC = () => {
  const { christmasEnabled } = useTheme();

  const flakes = useMemo(() => {
    const count = 50;
    return Array.from({ length: count }, (_, i) => {
      const size = Math.random() * 4 + 2; // 2px - 6px
      const left = Math.random() * 100; // percentage
      const duration = Math.random() * 6 + 6; // 6s - 12s
      const delay = Math.random() * 6; // 0s - 6s
      const opacity = Math.random() * 0.6 + 0.4; // 0.4 - 1.0
      return { id: i, size, left, duration, delay, opacity };
    });
  }, []);

  if (!christmasEnabled) return null;

  return (
    <>
      {/* Snowy border glow */}
      <div className="pointer-events-none fixed inset-0 z-30 christmas-border" />

      {/* Falling snowflakes */}
      <div className="pointer-events-none fixed inset-0 z-30">
        {flakes.map((f) => (
          <div
            key={f.id}
            className="christmas-snowflake"
            style={{
              left: `${f.left}%`,
              width: `${f.size}px`,
              height: `${f.size}px`,
              opacity: f.opacity,
              animationDuration: `${f.duration}s`,
              animationDelay: `${f.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Top festive garland */}
      <div className="pointer-events-none fixed top-0 left-0 right-0 z-30 flex justify-center">
        <svg
          width="100%"
          height="100"
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
          className="drop-shadow-md"
        >
          {/* Garland rope */}
          <path
            d="M 0 40 Q 200 80 400 40 T 800 40 T 1200 40"
            fill="none"
            stroke="hsl(174 75% 38%)"
            strokeWidth="6"
          />
          {/* Lights */}
          {Array.from({ length: 20 }, (_, i) => {
            const x = i * 60 + 40;
            const y = 50 + Math.sin(i / 2) * 20;
            const colors = ["hsl(0 84% 60%)", "hsl(50 100% 50%)", "hsl(187 85% 43%)", "hsl(174 75% 38%)"];
            const color = colors[i % colors.length];
            return (
              <circle key={i} cx={x} cy={y} r="8" fill={color} className="animate-pulse" />
            );
          })}
          {/* Hanging ornaments */}
          {Array.from({ length: 10 }, (_, i) => {
            const x = i * 120 + 80;
            const y1 = 40;
            const y2 = 85;
            const hue = (i * 36) % 360;
            return (
              <g key={`orn-${i}`}>
                <line x1={x} y1={y1} x2={x} y2={y2} stroke="hsl(200 10% 45%)" strokeWidth="2" />
                <circle cx={x} cy={y2} r="10" fill={`hsl(${hue} 80% 55%)`} stroke="white" strokeWidth="2" />
              </g>
            );
          })}
        </svg>
      </div>
    </>
  );
};

export default ChristmasDecorations;