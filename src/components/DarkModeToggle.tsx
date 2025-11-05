"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonStar, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const DarkModeToggle = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : false;

  return (
    <div className="fixed top-3 left-3 z-50">
      <div className="flex items-center gap-2 rounded-full bg-card/80 backdrop-blur-md border border-border px-3 py-2 shadow-sm">
        <div className="flex items-center justify-center w-5 h-5">
          {isDark ? (
            <Sun className="w-4 h-4 text-foreground" aria-hidden="true" />
          ) : (
            <MoonStar className="w-4 h-4 text-foreground" aria-hidden="true" />
          )}
        </div>
        <Switch
          checked={isDark}
          onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
          aria-label="Toggle dark mode"
        />
      </div>
    </div>
  );
};

export default DarkModeToggle;