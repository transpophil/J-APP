"use client";

import React from "react";
import { useTheme } from "@/contexts/ThemeContext";

const ChristmasDecorations: React.FC = () => {
  const { christmasEnabled } = useTheme();

  if (!christmasEnabled) return null;

  return (
    <>
      {/* Soft snowy border glow */}
      <div className="pointer-events-none fixed inset-0 z-40 christmas-border" />
    </>
  );
};

export default ChristmasDecorations;