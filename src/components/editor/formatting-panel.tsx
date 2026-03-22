"use client";

import { useFormattingStore, FORMATTING_SECTIONS } from "@/stores/formatting-store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Monitor, Smartphone, Tablet, BookOpen } from "lucide-react";

export function FormattingPanel() {
  const { activeSection, setActiveSection, previewDevice, setPreviewDevice } = useFormattingStore();

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Left: Controls */}
      <div className="w-72 shrink-0 border-r bg-editor-sidebar flex flex-col h-full overflow-hidden">
        {/* Section Nav */}
        <div className="p-2 space-y-0.5 border-b overflow-y-auto max-h-[40vh]">
          {FORMATTING_SECTIONS.map((section) => (
            <button
              key={section.id}
              className={cn(
                "w-full flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors text-left",
                activeSection === section.id
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-foreground/70 hover:bg-muted hover:text-foreground"
              )}
              onClick={() => setActiveSection(section.id)}
            >
              <span className="w-5 text-center text-xs">{section.icon}</span>
              {section.label}
            </button>
          ))}
        </div>

        {/* Section Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <SectionContent />
        </div>
      </div>

      {/* Right: Preview */}
      <div className="flex-1 flex flex-col bg-muted/30 overflow-hidden">
        {/* Preview Device Bar */}
        <div className="flex items-center justify-center gap-1 p-2 border-b bg-background">
          {(["print", "ereader", "tablet", "phone"] as const).map((device) => (
            <Button
              key={device}
              variant={previewDevice === device ? "default" : "ghost"}
              size="sm"
              className={cn("h-7 text-xs gap-1.5 px-3", previewDevice === device ? "bg-primary/10 text-primary shadow-none" : "text-muted-foreground")}
              onClick={() => setPreviewDevice(device)}
            >
              {device === "print" && <BookOpen className="h-3.5 w-3.5" />}
              {device === "ereader" && <Monitor className="h-3.5 w-3.5" />}
              {device === "tablet" && <Tablet className="h-3.5 w-3.5" />}
              {device === "phone" && <Smartphone className="h-3.5 w-3.5" />}
              {device.charAt(0).toUpperCase() + device.slice(1).replace("reader", "-Reader")}
            </Button>
          ))}
        </div>

        {/* Book Preview */}
        <div className="flex-1 overflow-auto flex items-start justify-center p-8">
          <BookPreview />
        </div>
      </div>
    </div>
  );
}

function SectionContent() {
  const { activeSection, activeThemeId, themes, setActiveTheme, updateThemeConfig } = useFormattingStore();
  const activeTheme = themes.find((t) => t.id === activeThemeId);
  const config = activeTheme?.config;

  if (activeSection === "themes") {
    return (
      <div>
        <h3 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Select Theme</h3>
        <div className="grid grid-cols-2 gap-2">
          {themes.map((theme) => (
            <button
              key={theme.id}
              className={cn(
                "rounded-lg overflow-hidden border-2 transition-all hover:scale-[1.02]",
                activeThemeId === theme.id ? "border-primary shadow-md" : "border-transparent hover:border-border"
              )}
              onClick={() => setActiveTheme(theme.id)}
            >
              <div className="h-16 w-full" style={{ background: theme.preview }} />
              <div className="px-2 py-1.5 bg-background">
                <span className="text-[11px] font-medium">{theme.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (!config) return null;

  if (activeSection === "chapter-heading") {
    return (
      <div className="space-y-5">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Chapter Heading</h3>
        <FormField label="Heading Font">
          <FontDropdown value={config.chapterHeadingFont} onChange={(v) => updateThemeConfig(activeThemeId, { chapterHeadingFont: v })} />
        </FormField>
        <FormField label="Heading Size">
          <Slider value={[config.chapterHeadingSize]} min={18} max={60} step={1} onValueChange={([v]) => updateThemeConfig(activeThemeId, { chapterHeadingSize: v })} />
          <span className="text-xs text-muted-foreground mt-1">{config.chapterHeadingSize}px</span>
        </FormField>
        <FormField label="Alignment">
          <div className="flex gap-1">
            {(["left", "center", "right"] as const).map((a) => (
              <Button key={a} variant={config.chapterHeadingAlign === a ? "default" : "outline"} size="sm" className="flex-1 h-7 text-xs" onClick={() => updateThemeConfig(activeThemeId, { chapterHeadingAlign: a })}>
                {a.charAt(0).toUpperCase() + a.slice(1)}
              </Button>
            ))}
          </div>
        </FormField>
        <FormField label="Chapter Numbering">
          <div className="flex gap-1">
            {(["numeric", "words", "roman", "none"] as const).map((s) => (
              <Button key={s} variant={config.chapterNumberStyle === s ? "default" : "outline"} size="sm" className="flex-1 h-7 text-[10px]" onClick={() => updateThemeConfig(activeThemeId, { chapterNumberStyle: s })}>
                {s === "numeric" ? "1, 2" : s === "words" ? "One" : s === "roman" ? "I, II" : "None"}
              </Button>
            ))}
          </div>
        </FormField>
        <FormField label="Ornament">
          <div className="flex gap-1 flex-wrap">
            {["✦", "❦", "✿", "☽", "⁂", "—", ""].map((o) => (
              <Button key={o || "none"} variant={config.chapterHeadingOrnament === o ? "default" : "outline"} size="icon-sm" onClick={() => updateThemeConfig(activeThemeId, { chapterHeadingOrnament: o })}>
                {o || "×"}
              </Button>
            ))}
          </div>
        </FormField>
      </div>
    );
  }

  if (activeSection === "typography") {
    return (
      <div className="space-y-5">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Typography</h3>
        <FormField label="Body Font">
          <FontDropdown value={config.bodyFont} onChange={(v) => updateThemeConfig(activeThemeId, { bodyFont: v })} />
        </FormField>
        <FormField label={`Font Size: ${config.bodyFontSize}pt`}>
          <Slider value={[config.bodyFontSize]} min={8} max={18} step={0.5} onValueChange={([v]) => updateThemeConfig(activeThemeId, { bodyFontSize: v })} />
        </FormField>
        <FormField label={`Line Height: ${config.lineHeight}`}>
          <Slider value={[config.lineHeight]} min={1} max={2.5} step={0.05} onValueChange={([v]) => updateThemeConfig(activeThemeId, { lineHeight: v })} />
        </FormField>
        <FormField label={`First Line Indent: ${config.firstLineIndent}em`}>
          <Slider value={[config.firstLineIndent]} min={0} max={4} step={0.25} onValueChange={([v]) => updateThemeConfig(activeThemeId, { firstLineIndent: v })} />
        </FormField>
      </div>
    );
  }

  if (activeSection === "paragraph") {
    return (
      <div className="space-y-5">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Paragraph</h3>
        <FormField label="Drop Cap">
          <div className="flex items-center justify-between">
            <span className="text-sm">Enable drop caps</span>
            <Switch checked={config.dropCap} onCheckedChange={(v) => updateThemeConfig(activeThemeId, { dropCap: v })} />
          </div>
        </FormField>
        {config.dropCap && (
          <FormField label={`Drop Cap Lines: ${config.dropCapLines}`}>
            <Slider value={[config.dropCapLines]} min={2} max={5} step={1} onValueChange={([v]) => updateThemeConfig(activeThemeId, { dropCapLines: v })} />
          </FormField>
        )}
        <FormField label="First Sentence Small Caps">
          <div className="flex items-center justify-between">
            <span className="text-sm">Small caps</span>
            <Switch checked={config.firstSentenceSmallCaps} onCheckedChange={(v) => updateThemeConfig(activeThemeId, { firstSentenceSmallCaps: v })} />
          </div>
        </FormField>
      </div>
    );
  }

  if (activeSection === "scene-breaks") {
    return (
      <div className="space-y-5">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Scene Breaks</h3>
        <FormField label="Style">
          <div className="flex gap-1 flex-wrap">
            {(["ornament", "blank", "asterisks", "line"] as const).map((s) => (
              <Button key={s} variant={config.sceneBreakStyle === s ? "default" : "outline"} size="sm" className="h-7 text-xs" onClick={() => updateThemeConfig(activeThemeId, { sceneBreakStyle: s })}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </Button>
            ))}
          </div>
        </FormField>
        {config.sceneBreakStyle === "ornament" && (
          <FormField label="Ornament">
            <div className="flex gap-1 flex-wrap">
              {["⁂", "❦", "✿", "✦", "※", "~•~", "—"].map((o) => (
                <Button key={o} variant={config.sceneBreakOrnament === o ? "default" : "outline"} size="icon-sm" onClick={() => updateThemeConfig(activeThemeId, { sceneBreakOrnament: o })}>
                  {o}
                </Button>
              ))}
            </div>
          </FormField>
        )}
      </div>
    );
  }

  if (activeSection === "print-layout") {
    return (
      <div className="space-y-5">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Print Layout</h3>
        <FormField label="Start Chapters On">
          <div className="flex gap-1">
            {(["right", "left", "any"] as const).map((s) => (
              <Button key={s} variant={config.startChapterOn === s ? "default" : "outline"} size="sm" className="flex-1 h-7 text-xs" onClick={() => updateThemeConfig(activeThemeId, { startChapterOn: s })}>
                {s.charAt(0).toUpperCase() + s.slice(1)} page
              </Button>
            ))}
          </div>
        </FormField>
      </div>
    );
  }

  if (activeSection === "headers-footers") {
    return (
      <div className="space-y-5">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Headers & Footers</h3>
        <FormField label="Header Content">
          <div className="flex gap-1 flex-wrap">
            {(["title", "author", "chapter", "none"] as const).map((h) => (
              <Button key={h} variant={config.headerContent === h ? "default" : "outline"} size="sm" className="h-7 text-xs" onClick={() => updateThemeConfig(activeThemeId, { headerContent: h })}>
                {h.charAt(0).toUpperCase() + h.slice(1)}
              </Button>
            ))}
          </div>
        </FormField>
        <FormField label="Page Numbers">
          <div className="flex gap-1 flex-wrap">
            {(["bottom_center", "bottom_outside", "top_outside"] as const).map((p) => (
              <Button key={p} variant={config.pageNumberPosition === p ? "default" : "outline"} size="sm" className="h-7 text-[10px]" onClick={() => updateThemeConfig(activeThemeId, { pageNumberPosition: p })}>
                {p.replace(/_/g, " ")}
              </Button>
            ))}
          </div>
        </FormField>
      </div>
    );
  }

  if (activeSection === "notes") {
    return (
      <div className="space-y-5">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Notes</h3>
        <FormField label="Notes Style">
          <div className="flex gap-1">
            {(["footnotes", "endnotes"] as const).map((s) => (
              <Button key={s} variant={config.notesStyle === s ? "default" : "outline"} size="sm" className="flex-1 h-7 text-xs" onClick={() => updateThemeConfig(activeThemeId, { notesStyle: s })}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </Button>
            ))}
          </div>
        </FormField>
      </div>
    );
  }

  return null;
}

function BookPreview() {
  const { activeThemeId, themes, previewDevice } = useFormattingStore();
  const theme = themes.find((t) => t.id === activeThemeId);
  if (!theme) return null;

  const { config } = theme;

  const pageWidth = previewDevice === "phone" ? 280 : previewDevice === "tablet" ? 420 : previewDevice === "ereader" ? 380 : 340;
  const pageHeight = previewDevice === "phone" ? 500 : previewDevice === "tablet" ? 560 : previewDevice === "ereader" ? 520 : 480;

  const numberLabel =
    config.chapterNumberStyle === "numeric" ? "Chapter 3" :
    config.chapterNumberStyle === "words" ? "Chapter Three" :
    config.chapterNumberStyle === "roman" ? "Chapter III" : "";

  return (
    <div
      className="bg-white rounded-md shadow-xl border relative overflow-hidden"
      style={{ width: pageWidth, minHeight: pageHeight, fontFamily: config.bodyFont }}
    >
      {/* Header */}
      {config.headerContent !== "none" && (
        <div className="px-6 pt-3 text-[9px] text-gray-400 text-center tracking-widest uppercase">
          {config.headerContent === "title" ? "The Silent Horizon" :
           config.headerContent === "author" ? "Denison Zimmer" : "The Climax"}
        </div>
      )}

      {/* Chapter heading area */}
      <div className="px-8 pt-12 pb-6" style={{ textAlign: config.chapterHeadingAlign }}>
        {config.chapterHeadingOrnament && (
          <div className="text-gray-400 text-lg mb-3">{config.chapterHeadingOrnament}</div>
        )}
        {numberLabel && (
          <div className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-2" style={{ fontFamily: config.chapterHeadingFont }}>
            {numberLabel}
          </div>
        )}
        <h1 className="text-gray-900 font-bold mb-2" style={{ fontFamily: config.chapterHeadingFont, fontSize: `${config.chapterHeadingSize * 0.65}px` }}>
          The Climax
        </h1>
        {config.chapterHeadingOrnament && (
          <div className="text-gray-400 text-sm mt-2">{config.chapterHeadingOrnament}</div>
        )}
      </div>

      {/* Body text preview */}
      <div className="px-8 pb-8 text-gray-800" style={{ fontSize: `${config.bodyFontSize * 0.85}px`, lineHeight: config.lineHeight, fontFamily: config.bodyFont }}>
        <p style={{ textIndent: config.firstLineIndent > 0 ? `${config.firstLineIndent}em` : undefined }}>
          {config.dropCap ? (
            <>
              <span className="float-left text-4xl font-bold mr-1 mt-0.5 leading-[0.8]" style={{ fontSize: `${config.dropCapLines * 1.1}em`, fontFamily: config.chapterHeadingFont }}>T</span>
              {config.firstSentenceSmallCaps ? (
                <span className="uppercase text-[0.85em] tracking-wider">he wind swept across</span>
              ) : "he wind swept across"}
            </>
          ) : config.firstSentenceSmallCaps ? (
            <span className="uppercase text-[0.85em] tracking-wider">The wind swept across</span>
          ) : "The wind swept across"}{" "}
          the barren landscape, carrying with it the whispers of those who had walked this path before. Each step forward felt like a journey through time itself.
        </p>
        <p style={{ textIndent: config.firstLineIndent > 0 ? `${config.firstLineIndent}em` : undefined, marginTop: `${config.paragraphSpacing}em` }}>
          The ancient stones beneath her feet told stories of kingdoms risen and fallen, of loves found and lost in the endless dance of centuries.
        </p>

        {/* Scene break preview */}
        <div className="text-center my-4 text-gray-400">
          {config.sceneBreakStyle === "ornament" && config.sceneBreakOrnament}
          {config.sceneBreakStyle === "asterisks" && "* * *"}
          {config.sceneBreakStyle === "line" && <hr className="border-gray-300 w-1/3 mx-auto" />}
          {config.sceneBreakStyle === "blank" && <div className="h-4" />}
        </div>

        <p style={{ textIndent: config.firstLineIndent > 0 ? `${config.firstLineIndent}em` : undefined }}>
          Morning arrived without fanfare. The sun, indifferent to the drama below, painted the sky in shades of amber and rose.
        </p>
      </div>

      {/* Footer - page number */}
      {config.footerContent !== "none" && (
        <div className="absolute bottom-3 left-0 right-0 text-[9px] text-gray-400 text-center">
          42
        </div>
      )}
    </div>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-medium text-foreground/80 mb-1.5 block">{label}</label>
      {children}
    </div>
  );
}

function FontDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const fonts = [
    "Playfair Display", "Cinzel", "Abril Fatface", "Great Vibes", "Pacifico",
    "Oswald", "Orbitron", "Merriweather", "Libre Baskerville",
    "Crimson Text", "EB Garamond", "Lora", "Cormorant Garamond",
    "Source Serif Pro", "Spectral", "Roboto Slab", "Courier Prime",
    "Inter", "Exo 2", "Quicksand",
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="w-full justify-between h-8 text-xs">
          <span style={{ fontFamily: value }}>{value}</span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 max-h-60 overflow-y-auto">
        {fonts.map((font) => (
          <DropdownMenuItem key={font} onClick={() => onChange(font)}>
            <span style={{ fontFamily: font }}>{font}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
