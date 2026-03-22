"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Download,
  BookOpen,
  FileText,
  Loader2,
  Check,
  AlertCircle,
  Settings,
  ChevronDown,
} from "lucide-react";
import { useEditorStore } from "@/stores/editor-store";

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type ExportStatus = "idle" | "generating" | "success" | "error";

interface EpubOptions {
  includeTableOfContents: boolean;
  includeChapterNumbers: boolean;
  embedFonts: boolean;
  coverImage: boolean;
  epubVersion: "2" | "3";
}

interface PdfOptions {
  trimSize: string;
  bleed: boolean;
  cropMarks: boolean;
  embedFonts: boolean;
  colorProfile: "rgb" | "cmyk";
  includeTableOfContents: boolean;
  pageNumbers: boolean;
  headerFooter: boolean;
}

interface DocxOptions {
  includeTableOfContents: boolean;
  trackChanges: boolean;
  compatibilityMode: "modern" | "legacy";
  includeCoverPage: boolean;
}

const TRIM_SIZES = [
  "5\" × 8\"",
  "5.25\" × 8\"",
  "5.5\" × 8.5\"",
  "6\" × 9\"",
  "8.5\" × 11\"",
];

export function ExportDialog({ open, onOpenChange }: ExportDialogProps) {
  const { bookTitle } = useEditorStore();
  const [activeTab, setActiveTab] = useState("epub");
  const [status, setStatus] = useState<ExportStatus>("idle");
  const [progress, setProgress] = useState(0);

  const [epubOpts, setEpubOpts] = useState<EpubOptions>({
    includeTableOfContents: true,
    includeChapterNumbers: true,
    embedFonts: true,
    coverImage: true,
    epubVersion: "3",
  });

  const [pdfOpts, setPdfOpts] = useState<PdfOptions>({
    trimSize: '6" × 9"',
    bleed: true,
    cropMarks: false,
    embedFonts: true,
    colorProfile: "cmyk",
    includeTableOfContents: true,
    pageNumbers: true,
    headerFooter: true,
  });

  const [docxOpts, setDocxOpts] = useState<DocxOptions>({
    includeTableOfContents: true,
    trackChanges: false,
    compatibilityMode: "modern",
    includeCoverPage: true,
  });

  const handleExport = async () => {
    setStatus("generating");
    setProgress(0);
    for (let i = 0; i <= 100; i += 5) {
      await new Promise((r) => setTimeout(r, 150));
      setProgress(i);
    }
    setStatus("success");
  };

  const reset = () => {
    setStatus("idle");
    setProgress(0);
  };

  const formatLabel = activeTab === "epub" ? "ePub" : activeTab === "pdf" ? "PDF" : "DOCX";
  const formatIcon = activeTab === "epub" ? "📘" : activeTab === "pdf" ? "📄" : "📝";

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) reset(); onOpenChange(v); }}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5 text-primary" /> Export Book
          </DialogTitle>
        </DialogHeader>

        {status === "idle" && (
          <>
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg mb-2">
              <BookOpen className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{bookTitle}</p>
                <p className="text-[10px] text-muted-foreground">5 chapters · 45,230 words</p>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full">
                <TabsTrigger value="epub" className="flex-1 gap-1.5 text-xs">📘 ePub</TabsTrigger>
                <TabsTrigger value="pdf" className="flex-1 gap-1.5 text-xs">📄 PDF</TabsTrigger>
                <TabsTrigger value="docx" className="flex-1 gap-1.5 text-xs">📝 DOCX</TabsTrigger>
              </TabsList>

              {/* ePub Options */}
              <TabsContent value="epub" className="space-y-3 mt-3">
                <p className="text-xs text-muted-foreground">Generate an ePub file compatible with Kindle, Apple Books, Kobo, and other e-readers.</p>
                <div className="space-y-2.5">
                  <OptionRow label="ePub Version" description="ePub 3 supports audio, video, and advanced CSS">
                    <div className="flex gap-1">
                      {(["2", "3"] as const).map((v) => (
                        <Button key={v} variant={epubOpts.epubVersion === v ? "default" : "outline"} size="sm" className="h-7 text-xs px-3" onClick={() => setEpubOpts({ ...epubOpts, epubVersion: v })}>v{v}</Button>
                      ))}
                    </div>
                  </OptionRow>
                  <ToggleRow label="Table of Contents" checked={epubOpts.includeTableOfContents} onChange={(v) => setEpubOpts({ ...epubOpts, includeTableOfContents: v })} />
                  <ToggleRow label="Chapter Numbers" checked={epubOpts.includeChapterNumbers} onChange={(v) => setEpubOpts({ ...epubOpts, includeChapterNumbers: v })} />
                  <ToggleRow label="Embed Fonts" checked={epubOpts.embedFonts} onChange={(v) => setEpubOpts({ ...epubOpts, embedFonts: v })} />
                  <ToggleRow label="Cover Image" checked={epubOpts.coverImage} onChange={(v) => setEpubOpts({ ...epubOpts, coverImage: v })} />
                </div>
              </TabsContent>

              {/* PDF Options */}
              <TabsContent value="pdf" className="space-y-3 mt-3">
                <p className="text-xs text-muted-foreground">Generate a print-ready PDF with professional typesetting for KDP, IngramSpark, and offset printing.</p>
                <div className="space-y-2.5">
                  <OptionRow label="Trim Size" description="Standard book dimensions">
                    <select className="h-7 text-xs border rounded-md px-2 bg-background" value={pdfOpts.trimSize} onChange={(e) => setPdfOpts({ ...pdfOpts, trimSize: e.target.value })}>
                      {TRIM_SIZES.map((size) => (<option key={size} value={size}>{size}</option>))}
                    </select>
                  </OptionRow>
                  <OptionRow label="Color Profile" description="CMYK for print, RGB for digital">
                    <div className="flex gap-1">
                      {(["cmyk", "rgb"] as const).map((v) => (
                        <Button key={v} variant={pdfOpts.colorProfile === v ? "default" : "outline"} size="sm" className="h-7 text-xs px-3 uppercase" onClick={() => setPdfOpts({ ...pdfOpts, colorProfile: v })}>{v}</Button>
                      ))}
                    </div>
                  </OptionRow>
                  <ToggleRow label="Bleed" checked={pdfOpts.bleed} onChange={(v) => setPdfOpts({ ...pdfOpts, bleed: v })} />
                  <ToggleRow label="Crop Marks" checked={pdfOpts.cropMarks} onChange={(v) => setPdfOpts({ ...pdfOpts, cropMarks: v })} />
                  <ToggleRow label="Embed Fonts" checked={pdfOpts.embedFonts} onChange={(v) => setPdfOpts({ ...pdfOpts, embedFonts: v })} />
                  <ToggleRow label="Table of Contents" checked={pdfOpts.includeTableOfContents} onChange={(v) => setPdfOpts({ ...pdfOpts, includeTableOfContents: v })} />
                  <ToggleRow label="Page Numbers" checked={pdfOpts.pageNumbers} onChange={(v) => setPdfOpts({ ...pdfOpts, pageNumbers: v })} />
                  <ToggleRow label="Headers & Footers" checked={pdfOpts.headerFooter} onChange={(v) => setPdfOpts({ ...pdfOpts, headerFooter: v })} />
                </div>
              </TabsContent>

              {/* DOCX Options */}
              <TabsContent value="docx" className="space-y-3 mt-3">
                <p className="text-xs text-muted-foreground">Export as a Microsoft Word document for editing, submissions, or further formatting.</p>
                <div className="space-y-2.5">
                  <OptionRow label="Compatibility" description="Legacy mode for older Word versions">
                    <div className="flex gap-1">
                      {(["modern", "legacy"] as const).map((v) => (
                        <Button key={v} variant={docxOpts.compatibilityMode === v ? "default" : "outline"} size="sm" className="h-7 text-xs px-3 capitalize" onClick={() => setDocxOpts({ ...docxOpts, compatibilityMode: v })}>{v}</Button>
                      ))}
                    </div>
                  </OptionRow>
                  <ToggleRow label="Table of Contents" checked={docxOpts.includeTableOfContents} onChange={(v) => setDocxOpts({ ...docxOpts, includeTableOfContents: v })} />
                  <ToggleRow label="Cover Page" checked={docxOpts.includeCoverPage} onChange={(v) => setDocxOpts({ ...docxOpts, includeCoverPage: v })} />
                  <ToggleRow label="Track Changes" checked={docxOpts.trackChanges} onChange={(v) => setDocxOpts({ ...docxOpts, trackChanges: v })} />
                </div>
              </TabsContent>
            </Tabs>

            <Separator />

            <Button className="w-full gap-2" onClick={handleExport}>
              <Download className="h-4 w-4" />
              Export as {formatLabel}
            </Button>
          </>
        )}

        {status === "generating" && (
          <div className="py-10 text-center space-y-4">
            <div className="relative mx-auto w-16 h-16">
              <Loader2 className="h-16 w-16 text-primary animate-spin" />
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">{progress}%</span>
            </div>
            <div>
              <p className="text-sm font-medium">Generating {formatLabel}...</p>
              <p className="text-[10px] text-muted-foreground mt-1">
                {progress < 30 ? "Compiling chapters..." : progress < 60 ? "Applying formatting & themes..." : progress < 90 ? "Embedding fonts & images..." : "Finalizing export..."}
              </p>
            </div>
            <div className="w-full bg-muted rounded-full h-1.5 max-w-xs mx-auto">
              <div className="bg-primary rounded-full h-1.5 transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {status === "success" && (
          <div className="py-8 text-center space-y-4">
            <div className="h-14 w-14 rounded-full bg-green-100 dark:bg-green-500/10 mx-auto flex items-center justify-center">
              <Check className="h-7 w-7 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-semibold">Export Complete!</p>
              <p className="text-xs text-muted-foreground mt-1">{bookTitle}.{activeTab === "epub" ? "epub" : activeTab === "pdf" ? "pdf" : "docx"}</p>
            </div>
            <div className="flex gap-3 justify-center text-center">
              <div><p className="text-base font-bold">5</p><p className="text-[10px] text-muted-foreground">Chapters</p></div>
              <div><p className="text-base font-bold">45.2k</p><p className="text-[10px] text-muted-foreground">Words</p></div>
              <div><p className="text-base font-bold">{activeTab === "pdf" ? "186" : activeTab === "epub" ? "—" : "94"}</p><p className="text-[10px] text-muted-foreground">{activeTab === "pdf" ? "Pages" : activeTab === "epub" ? "" : "Pages"}</p></div>
            </div>
            <div className="flex gap-2 justify-center">
              <Button variant="outline" size="sm" className="text-xs gap-1.5" onClick={reset}>Export Another</Button>
              <Button size="sm" className="text-xs gap-1.5" onClick={() => onOpenChange(false)}>
                <Download className="h-3.5 w-3.5" /> Download
              </Button>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="py-8 text-center space-y-4">
            <AlertCircle className="h-12 w-12 mx-auto text-destructive" />
            <div>
              <p className="text-sm font-medium text-destructive">Export Failed</p>
              <p className="text-xs text-muted-foreground mt-1">An error occurred during export. Please try again.</p>
            </div>
            <Button variant="outline" size="sm" className="text-xs" onClick={reset}>Try Again</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function ToggleRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-xs">{label}</span>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

function OptionRow({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-1">
      <div>
        <span className="text-xs font-medium">{label}</span>
        {description && <p className="text-[10px] text-muted-foreground">{description}</p>}
      </div>
      {children}
    </div>
  );
}
