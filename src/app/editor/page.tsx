"use client";

import { ChapterSidebar } from "@/components/editor/chapter-sidebar";
import { EditorArea } from "@/components/editor/editor-area";
import { EditorBottomBar } from "@/components/editor/editor-bottom-bar";
import { FormattingPanel } from "@/components/editor/formatting-panel";
import { BookDetailsDialog } from "@/components/editor/book-details-dialog";
import { FindReplaceBar } from "@/components/editor/find-replace-bar";
import { GoalsDialog } from "@/components/editor/goals-dialog";
import { SnapshotsDialog } from "@/components/editor/snapshots-dialog";
import { ExportDialog } from "@/components/editor/export-dialog";
import { CommentsPanel } from "@/components/editor/comments-panel";
import { KeyboardShortcutsDialog } from "@/components/editor/keyboard-shortcuts-dialog";
import { AiAssistantPanel } from "@/components/editor/ai-assistant-panel";
import { useEditorStore } from "@/stores/editor-store";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  ArrowLeft,
  FileText,
  Paintbrush,
  BookOpen,
  Download,
  ChevronDown,
  Settings,
  Camera,
  Search,
  Target,
  MessageCircle,
  Keyboard,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function EditorPage() {
  const { bookTitle, mode, setMode } = useEditorStore();
  const [bookDetailsOpen, setBookDetailsOpen] = useState(false);
  const [findReplaceOpen, setFindReplaceOpen] = useState(false);
  const [goalsOpen, setGoalsOpen] = useState(false);
  const [snapshotsOpen, setSnapshotsOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "f") {
        e.preventDefault();
        setFindReplaceOpen(true);
      }
      if (e.key === "Escape") {
        setFindReplaceOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "/") {
        e.preventDefault();
        setShortcutsOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      {/* Editor Top Bar */}
      <header className="flex items-center h-12 border-b bg-background px-3 shrink-0">
        {/* Left: Back + Book Title */}
        <Link href="/" className="mr-2">
          <Button variant="ghost" size="icon-sm" className="text-muted-foreground">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>

        <div className="flex items-center gap-2 mr-4">
          <BookOpen className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium text-sm truncate max-w-[200px]">{bookTitle}</span>
        </div>

        <Separator orientation="vertical" className="h-6 mr-3" />

        {/* Center: Mode Toggle */}
        <div className="flex items-center gap-0.5 bg-muted rounded-lg p-0.5">
          <Button
            variant={mode === "writing" ? "default" : "ghost"}
            size="sm"
            className={cn(
              "h-7 gap-1.5 text-xs font-medium rounded-md px-3",
              mode === "writing"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
            onClick={() => setMode("writing")}
          >
            <FileText className="h-3.5 w-3.5" />
            Writing
          </Button>
          <Button
            variant={mode === "formatting" ? "default" : "ghost"}
            size="sm"
            className={cn(
              "h-7 gap-1.5 text-xs font-medium rounded-md px-3",
              mode === "formatting"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
            onClick={() => setMode("formatting")}
          >
            <Paintbrush className="h-3.5 w-3.5" />
            Formatting
          </Button>
        </div>

        <div className="flex-1" />

        {/* Right: Actions */}
        <div className="flex items-center gap-1">
          {mode === "writing" && (
            <>
              <Button variant="ghost" size="icon-sm" className="text-muted-foreground" title="Find & Replace (⌘F)" onClick={() => setFindReplaceOpen(!findReplaceOpen)}>
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon-sm" className="text-muted-foreground" title="Writing Goals" onClick={() => setGoalsOpen(true)}>
                <Target className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon-sm" className={cn("text-muted-foreground", commentsOpen && "bg-muted text-foreground")} title="Comments" onClick={() => setCommentsOpen(!commentsOpen)}>
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon-sm" className={cn("text-muted-foreground", aiOpen && "bg-primary/10 text-primary")} title="AI Assistant" onClick={() => setAiOpen(!aiOpen)}>
                <Sparkles className="h-4 w-4" />
              </Button>
              <Separator orientation="vertical" className="h-5 mx-0.5" />
            </>
          )}
          <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs text-muted-foreground" onClick={() => setExportOpen(true)}>
            <Download className="h-3.5 w-3.5" />
            Export
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm" className="text-muted-foreground">
                <Settings className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => setBookDetailsOpen(true)}>
                <BookOpen className="h-4 w-4 mr-2" /> Book Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSnapshotsOpen(true)}>
                <Camera className="h-4 w-4 mr-2" /> Snapshots
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setShortcutsOpen(true)}>
                <Keyboard className="h-4 w-4 mr-2" /> Keyboard Shortcuts
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                Delete Book
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Editor Area */}
      <div className="flex flex-1 overflow-hidden relative">
        {mode === "writing" ? (
          <>
            <ChapterSidebar />
            <div className="flex-1 relative">
              <FindReplaceBar open={findReplaceOpen} onClose={() => setFindReplaceOpen(false)} />
              <EditorArea />
            </div>
            <CommentsPanel open={commentsOpen} onClose={() => setCommentsOpen(false)} />
            <AiAssistantPanel open={aiOpen} onClose={() => setAiOpen(false)} />
          </>
        ) : (
          <FormattingPanel />
        )}
      </div>

      {/* Bottom Bar */}
      <EditorBottomBar />

      {/* Dialogs */}
      <BookDetailsDialog open={bookDetailsOpen} onOpenChange={setBookDetailsOpen} />
      <GoalsDialog open={goalsOpen} onOpenChange={setGoalsOpen} />
      <SnapshotsDialog open={snapshotsOpen} onOpenChange={setSnapshotsOpen} />
      <ExportDialog open={exportOpen} onOpenChange={setExportOpen} />
      <KeyboardShortcutsDialog open={shortcutsOpen} onOpenChange={setShortcutsOpen} />
    </div>
  );
}
