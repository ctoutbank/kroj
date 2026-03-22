"use client";

import { useState, useEffect } from "react";
import { CommandPalette } from "@/components/command-palette";
import { WelcomeTour } from "@/components/welcome-tour";

export function GlobalProviders({ children }: { children: React.ReactNode }) {
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {children}
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
      <WelcomeTour />
    </>
  );
}
