"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Keyboard } from "lucide-react";

interface KeyboardShortcutsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SHORTCUT_GROUPS = [
  {
    title: "Text Formatting",
    shortcuts: [
      { keys: ["⌘", "B"], label: "Bold" },
      { keys: ["⌘", "I"], label: "Italic" },
      { keys: ["⌘", "U"], label: "Underline" },
      { keys: ["⌘", "⇧", "X"], label: "Strikethrough" },
      { keys: ["⌘", "E"], label: "Inline code" },
      { keys: ["⌘", "⇧", "H"], label: "Highlight" },
    ],
  },
  {
    title: "Paragraphs",
    shortcuts: [
      { keys: ["⌘", "⇧", "1"], label: "Heading 1" },
      { keys: ["⌘", "⇧", "2"], label: "Heading 2" },
      { keys: ["⌘", "⇧", "3"], label: "Heading 3" },
      { keys: ["⌘", "⇧", "7"], label: "Ordered list" },
      { keys: ["⌘", "⇧", "8"], label: "Bullet list" },
      { keys: ["⌘", "⇧", "B"], label: "Blockquote" },
    ],
  },
  {
    title: "Editor",
    shortcuts: [
      { keys: ["⌘", "F"], label: "Find & Replace" },
      { keys: ["⌘", "Z"], label: "Undo" },
      { keys: ["⌘", "⇧", "Z"], label: "Redo" },
      { keys: ["⌘", "A"], label: "Select all" },
      { keys: ["⌘", "S"], label: "Save" },
      { keys: ["Esc"], label: "Close panel" },
    ],
  },
  {
    title: "Navigation",
    shortcuts: [
      { keys: ["⌘", "↑"], label: "Previous chapter" },
      { keys: ["⌘", "↓"], label: "Next chapter" },
      { keys: ["⌘", "\\"], label: "Toggle sidebar" },
    ],
  },
];

export function KeyboardShortcutsDialog({ open, onOpenChange }: KeyboardShortcutsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="h-5 w-5 text-primary" /> Keyboard Shortcuts
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-2">
          {SHORTCUT_GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{group.title}</h3>
              <div className="space-y-1.5">
                {group.shortcuts.map((shortcut) => (
                  <div key={shortcut.label} className="flex items-center justify-between">
                    <span className="text-xs">{shortcut.label}</span>
                    <div className="flex items-center gap-0.5">
                      {shortcut.keys.map((key, i) => (
                        <kbd key={i} className="inline-flex h-5 min-w-5 items-center justify-center rounded border bg-muted px-1 text-[9px] font-mono font-medium text-muted-foreground">
                          {key}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Separator className="mt-2" />
        <p className="text-[10px] text-muted-foreground text-center">
          Press <kbd className="inline-flex h-4 items-center rounded border bg-muted px-1 text-[8px] font-mono">⌘</kbd> + <kbd className="inline-flex h-4 items-center rounded border bg-muted px-1 text-[8px] font-mono">/</kbd> to toggle this dialog
        </p>
      </DialogContent>
    </Dialog>
  );
}
