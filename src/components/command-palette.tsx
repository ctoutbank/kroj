"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Settings,
  Search,
  BookOpen,
  PenTool,
  BarChart3,
  Palette,
  Download,
  Users,
  Sparkles,
  Camera,
  Target,
  Command,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ElementType;
  category: string;
  shortcut?: string;
  action: () => void;
}

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const commands: CommandItem[] = [
    { id: "home", label: "Go to Home", icon: BookOpen, category: "Navigation", action: () => router.push("/") },
    { id: "editor", label: "Open Editor", icon: PenTool, category: "Navigation", shortcut: "⌘E", action: () => router.push("/editor") },
    { id: "books", label: "My Books", icon: FileText, category: "Navigation", action: () => router.push("/books") },
    { id: "analytics", label: "Writing Analytics", icon: BarChart3, category: "Navigation", action: () => router.push("/analytics") },
    { id: "themes", label: "Theme Marketplace", icon: Palette, category: "Navigation", action: () => router.push("/themes") },
    { id: "collab", label: "Collaboration", icon: Users, category: "Navigation", action: () => router.push("/collaboration") },
    { id: "settings", label: "Settings", icon: Settings, category: "Navigation", action: () => router.push("/settings") },
    { id: "export", label: "Export Book", icon: Download, category: "Actions", shortcut: "⌘⇧E", action: () => {} },
    { id: "snapshot", label: "Create Snapshot", icon: Camera, category: "Actions", action: () => {} },
    { id: "goals", label: "Writing Goals", icon: Target, category: "Actions", action: () => {} },
    { id: "ai", label: "AI Assistant", icon: Sparkles, category: "Actions", shortcut: "⌘J", action: () => router.push("/editor") },
    { id: "find", label: "Find & Replace", icon: Search, category: "Editor", shortcut: "⌘F", action: () => router.push("/editor") },
  ];

  const filtered = query
    ? commands.filter(
        (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          c.category.toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  const grouped = filtered.reduce((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {} as Record<string, CommandItem[]>);

  useEffect(() => {
    setSelectedIndex(0);
    if (open) setQuery("");
  }, [open, query]);

  const runCommand = useCallback(
    (cmd: CommandItem) => {
      onOpenChange(false);
      cmd.action();
    },
    [onOpenChange]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      runCommand(filtered[selectedIndex]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0 gap-0 overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center gap-2 px-3 border-b">
          <Command className="h-4 w-4 text-muted-foreground shrink-0" />
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or search..."
            className="h-11 border-0 shadow-none focus-visible:ring-0 text-sm"
            autoFocus
          />
        </div>

        {/* Command List */}
        <div className="max-h-72 overflow-y-auto py-1">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <div className="px-3 py-1.5">
                <span className="text-[9px] font-semibold text-muted-foreground uppercase tracking-wider">{category}</span>
              </div>
              {items.map((cmd) => {
                const globalIndex = filtered.indexOf(cmd);
                return (
                  <button
                    key={cmd.id}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left transition-colors ${
                      globalIndex === selectedIndex ? "bg-muted" : "hover:bg-muted/50"
                    }`}
                    onClick={() => runCommand(cmd)}
                    onMouseEnter={() => setSelectedIndex(globalIndex)}
                  >
                    <cmd.icon className="h-4 w-4 text-muted-foreground shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-medium">{cmd.label}</span>
                      {cmd.description && (
                        <span className="text-[10px] text-muted-foreground ml-2">{cmd.description}</span>
                      )}
                    </div>
                    {cmd.shortcut && (
                      <kbd className="text-[9px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded border font-mono">{cmd.shortcut}</kbd>
                    )}
                    <ArrowRight className="h-3 w-3 text-muted-foreground/50" />
                  </button>
                );
              })}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="py-8 text-center">
              <Search className="h-8 w-8 mx-auto text-muted-foreground/30 mb-2" />
              <p className="text-xs text-muted-foreground">No commands found</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-3 py-1.5 border-t bg-muted/30 text-[9px] text-muted-foreground">
          <span>↑↓ Navigate</span>
          <span>↵ Select</span>
          <span>Esc Close</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
