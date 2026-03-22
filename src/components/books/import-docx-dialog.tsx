"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Check, AlertCircle, Loader2 } from "lucide-react";

interface ImportDocxDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type ImportStatus = "idle" | "uploading" | "processing" | "success" | "error";

export function ImportDocxDialog({ open, onOpenChange }: ImportDocxDialogProps) {
  const [status, setStatus] = useState<ImportStatus>("idle");
  const [fileName, setFileName] = useState("");
  const [progress, setProgress] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [stats, setStats] = useState({ words: 0, chapters: 0, images: 0 });

  const processFile = useCallback(async (file: File) => {
    if (!file.name.endsWith(".docx") && !file.name.endsWith(".doc")) {
      return;
    }
    setFileName(file.name);
    setStatus("uploading");
    setProgress(0);

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((r) => setTimeout(r, 100));
      setProgress(i);
    }

    setStatus("processing");

    // Simulate processing
    await new Promise((r) => setTimeout(r, 1500));

    setStats({ words: 45230, chapters: 12, images: 3 });
    setStatus("success");
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }, [processFile]);

  const reset = () => {
    setStatus("idle");
    setFileName("");
    setProgress(0);
    setStats({ words: 0, chapters: 0, images: 0 });
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) reset(); onOpenChange(v); }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><Upload className="h-5 w-5 text-primary" /> Import Document</DialogTitle>
        </DialogHeader>

        {status === "idle" && (
          <div
            className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all ${isDragOver ? "border-primary bg-primary/5" : "border-muted-foreground/20 hover:border-primary/40"}`}
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            onClick={() => document.getElementById("docx-input")?.click()}
          >
            <FileText className="h-12 w-12 mx-auto mb-3 text-muted-foreground/40" />
            <p className="text-sm font-medium mb-1">Drop your DOCX file here</p>
            <p className="text-xs text-muted-foreground">or click to browse</p>
            <div className="flex gap-1 justify-center mt-3">
              <Badge variant="secondary" className="text-[9px]">.docx</Badge>
              <Badge variant="secondary" className="text-[9px]">.doc</Badge>
            </div>
            <input id="docx-input" type="file" accept=".docx,.doc" className="hidden" onChange={handleFileSelect} />
          </div>
        )}

        {(status === "uploading" || status === "processing") && (
          <div className="py-8 text-center space-y-4">
            <Loader2 className="h-10 w-10 mx-auto text-primary animate-spin" />
            <div>
              <p className="text-sm font-medium">{status === "uploading" ? "Uploading..." : "Processing..."}</p>
              <p className="text-xs text-muted-foreground mt-1">{fileName}</p>
            </div>
            {status === "uploading" && (
              <div className="w-full bg-muted rounded-full h-1.5 max-w-xs mx-auto">
                <div className="bg-primary rounded-full h-1.5 transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
            )}
            {status === "processing" && (
              <p className="text-[10px] text-muted-foreground">Detecting chapters, parsing formatting, extracting images...</p>
            )}
          </div>
        )}

        {status === "success" && (
          <div className="py-6 text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-500/10 mx-auto flex items-center justify-center">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-semibold">Import Successful!</p>
              <p className="text-xs text-muted-foreground mt-1">{fileName}</p>
            </div>
            <div className="flex justify-center gap-4 text-center">
              <div><p className="text-lg font-bold">{stats.words.toLocaleString()}</p><p className="text-[10px] text-muted-foreground">Words</p></div>
              <div><p className="text-lg font-bold">{stats.chapters}</p><p className="text-[10px] text-muted-foreground">Chapters</p></div>
              <div><p className="text-lg font-bold">{stats.images}</p><p className="text-[10px] text-muted-foreground">Images</p></div>
            </div>
            <div className="flex gap-2 justify-center">
              <Button variant="outline" size="sm" className="text-xs" onClick={() => { reset(); onOpenChange(false); }}>Close</Button>
              <Button size="sm" className="text-xs" onClick={() => onOpenChange(false)}>Open in Editor</Button>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="py-6 text-center space-y-4">
            <AlertCircle className="h-10 w-10 mx-auto text-destructive" />
            <div>
              <p className="text-sm font-medium text-destructive">Import Failed</p>
              <p className="text-xs text-muted-foreground mt-1">This file format is not supported. Please try a .docx file.</p>
            </div>
            <Button variant="outline" size="sm" className="text-xs" onClick={reset}>Try Again</Button>
          </div>
        )}

        <p className="text-[10px] text-muted-foreground text-center">
          Kroj will attempt to detect chapters, preserve bold/italic/underline formatting, and extract images from your document.
        </p>
      </DialogContent>
    </Dialog>
  );
}
