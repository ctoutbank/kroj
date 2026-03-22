"use client";

import { useEditorStore } from "@/stores/editor-store";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FileDown, Clock, FileText } from "lucide-react";
import { useState, useEffect } from "react";

export function EditorBottomBar() {
  const { chapters, activeChapterId } = useEditorStore();
  const [showBookCount, setShowBookCount] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);

  const activeChapter = chapters.find((c) => c.id === activeChapterId);
  const totalWords = chapters.reduce((sum, c) => sum + c.wordCount, 0);
  const chapterWords = activeChapter?.wordCount || 0;

  // Timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timerActive) {
      interval = setInterval(() => setTimerSeconds((s) => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    return `${m}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center h-8 border-t bg-editor-toolbar px-3 text-xs text-muted-foreground shrink-0">
      {/* Word Count */}
      <button
        className="flex items-center gap-1.5 hover:text-foreground transition-colors px-1.5 rounded"
        onClick={() => setShowBookCount(!showBookCount)}
      >
        <FileText className="h-3 w-3" />
        <span>
          {showBookCount
            ? `${totalWords.toLocaleString()} words (book)`
            : `${chapterWords.toLocaleString()} words`}
        </span>
      </button>

      <Separator orientation="vertical" className="h-4 mx-2" />

      {/* Timer */}
      <button
        className="flex items-center gap-1.5 hover:text-foreground transition-colors px-1.5 rounded"
        onClick={() => setTimerActive(!timerActive)}
      >
        <Clock className="h-3 w-3" />
        <span>{formatTime(timerSeconds)}</span>
      </button>

      <div className="flex-1" />

      {/* Auto-save indicator */}
      <span className="text-[10px] opacity-60 mr-3">
        Auto-saved
      </span>

      {/* Quick export */}
      <Button variant="ghost" size="sm" className="h-6 text-xs gap-1 px-2 text-muted-foreground">
        <FileDown className="h-3 w-3" />
        Export
      </Button>
    </div>
  );
}
