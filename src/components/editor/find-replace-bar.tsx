"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Search, Replace, ChevronUp, ChevronDown, X, CaseSensitive, WholeWord } from "lucide-react";

interface FindReplaceBarProps {
  open: boolean;
  onClose: () => void;
}

export function FindReplaceBar({ open, onClose }: FindReplaceBarProps) {
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [matchCase, setMatchCase] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const [showReplace, setShowReplace] = useState(false);
  const [matchCount, setMatchCount] = useState(0);
  const [currentMatch, setCurrentMatch] = useState(0);

  useEffect(() => {
    if (findText.length > 0) {
      // Simulated match count
      setMatchCount(Math.floor(Math.random() * 8) + 1);
      setCurrentMatch(1);
    } else {
      setMatchCount(0);
      setCurrentMatch(0);
    }
  }, [findText, matchCase, wholeWord]);

  if (!open) return null;

  return (
    <div className="absolute top-0 right-4 z-50 w-[360px] bg-background border rounded-b-xl shadow-lg p-3 space-y-2 animate-in slide-in-from-top-2 duration-200">
      {/* Find Row */}
      <div className="flex items-center gap-1.5">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            value={findText}
            onChange={(e) => setFindText(e.target.value)}
            placeholder="Find in chapter..."
            className="pl-8 pr-14 h-8 text-xs"
            autoFocus
          />
          {findText && (
            <Badge variant="secondary" className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] px-1.5 py-0 h-4">
              {currentMatch}/{matchCount}
            </Badge>
          )}
        </div>
        <Button variant="ghost" size="icon-sm" className="h-7 w-7 text-muted-foreground" onClick={() => setCurrentMatch(Math.max(1, currentMatch - 1))}><ChevronUp className="h-3.5 w-3.5" /></Button>
        <Button variant="ghost" size="icon-sm" className="h-7 w-7 text-muted-foreground" onClick={() => setCurrentMatch(Math.min(matchCount, currentMatch + 1))}><ChevronDown className="h-3.5 w-3.5" /></Button>
        <Button variant="ghost" size="icon-sm" className="h-7 w-7 text-muted-foreground" onClick={onClose}><X className="h-3.5 w-3.5" /></Button>
      </div>

      {/* Options */}
      <div className="flex items-center gap-3 px-1">
        <button
          className={`flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded transition-colors ${matchCase ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"}`}
          onClick={() => setMatchCase(!matchCase)}
        >
          <CaseSensitive className="h-3 w-3" /> Match Case
        </button>
        <button
          className={`flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded transition-colors ${wholeWord ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"}`}
          onClick={() => setWholeWord(!wholeWord)}
        >
          <WholeWord className="h-3 w-3" /> Whole Word
        </button>
        <button
          className={`text-[10px] px-1.5 py-0.5 rounded transition-colors ${showReplace ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"}`}
          onClick={() => setShowReplace(!showReplace)}
        >
          <span className="flex items-center gap-1"><Replace className="h-3 w-3" /> Replace</span>
        </button>
      </div>

      {/* Replace Row */}
      {showReplace && (
        <div className="flex items-center gap-1.5">
          <div className="relative flex-1">
            <Replace className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              value={replaceText}
              onChange={(e) => setReplaceText(e.target.value)}
              placeholder="Replace with..."
              className="pl-8 h-8 text-xs"
            />
          </div>
          <Button variant="outline" size="sm" className="h-7 text-[10px] px-2">Replace</Button>
          <Button variant="outline" size="sm" className="h-7 text-[10px] px-2">All</Button>
        </div>
      )}
    </div>
  );
}
