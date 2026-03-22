"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Camera, RotateCcw, Trash2, Clock, FileText, Plus } from "lucide-react";
import { useEditorStore } from "@/stores/editor-store";

interface SnapshotsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Snapshot {
  id: string;
  name: string;
  createdAt: string;
  wordCount: number;
  chapterCount: number;
}

const DEMO_SNAPSHOTS: Snapshot[] = [
  { id: "snap-3", name: "Before chapter rewrite", createdAt: "Mar 21, 2026 · 4:30 PM", wordCount: 42150, chapterCount: 12 },
  { id: "snap-2", name: "First draft complete", createdAt: "Mar 18, 2026 · 11:15 AM", wordCount: 38920, chapterCount: 10 },
  { id: "snap-1", name: "Initial outline", createdAt: "Mar 10, 2026 · 9:00 AM", wordCount: 5200, chapterCount: 5 },
];

export function SnapshotsDialog({ open, onOpenChange }: SnapshotsDialogProps) {
  const [snapshots, setSnapshots] = useState<Snapshot[]>(DEMO_SNAPSHOTS);
  const { bookTitle } = useEditorStore();

  const createSnapshot = () => {
    const newSnapshot: Snapshot = {
      id: `snap-${Date.now()}`,
      name: `Snapshot ${snapshots.length + 1}`,
      createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) + " · " + new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      wordCount: 45230,
      chapterCount: 5,
    };
    setSnapshots([newSnapshot, ...snapshots]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><Camera className="h-5 w-5 text-primary" /> Snapshots</DialogTitle>
        </DialogHeader>

        <p className="text-xs text-muted-foreground -mt-1">
          Save snapshots of your book to restore previous versions later.
        </p>

        <Button size="sm" className="w-full gap-1.5 text-xs h-8" onClick={createSnapshot}>
          <Plus className="h-3.5 w-3.5" /> Take Snapshot Now
        </Button>

        <Separator />

        <div className="space-y-2 max-h-[350px] overflow-y-auto">
          {snapshots.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Camera className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm font-medium">No snapshots yet</p>
              <p className="text-xs mt-1">Take your first snapshot to save a version of your book.</p>
            </div>
          ) : (
            snapshots.map((snap) => (
              <div key={snap.id} className="p-3 rounded-lg border group hover:border-primary/20 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{snap.name}</span>
                  <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon-sm" className="h-6 w-6" title="Restore"><RotateCcw className="h-3 w-3" /></Button>
                    <Button variant="ghost" size="icon-sm" className="h-6 w-6 text-destructive" title="Delete" onClick={() => setSnapshots(snapshots.filter((s) => s.id !== snap.id))}><Trash2 className="h-3 w-3" /></Button>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="h-2.5 w-2.5" /> {snap.createdAt}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><FileText className="h-2.5 w-2.5" /> {snap.wordCount.toLocaleString()} words</span>
                  <span>·</span>
                  <span>{snap.chapterCount} chapters</span>
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
