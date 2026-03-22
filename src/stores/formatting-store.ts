"use client";

import { create } from "zustand";

export interface ThemeConfig {
  id: string;
  name: string;
  preview: string;
  isBuiltIn: boolean;
  config: {
    // Chapter Heading
    chapterHeadingFont: string;
    chapterHeadingSize: number;
    chapterHeadingAlign: "left" | "center" | "right";
    chapterNumberStyle: "numeric" | "words" | "roman" | "none";
    chapterHeadingOrnament: string;
    // Typography
    bodyFont: string;
    bodyFontSize: number;
    lineHeight: number;
    paragraphSpacing: number;
    firstLineIndent: number;
    // Paragraph Style
    dropCap: boolean;
    dropCapLines: number;
    firstSentenceSmallCaps: boolean;
    // Scene Breaks
    sceneBreakStyle: "ornament" | "blank" | "asterisks" | "line" | "custom";
    sceneBreakOrnament: string;
    // Notes
    notesStyle: "footnotes" | "endnotes";
    // Print Layout
    startChapterOn: "right" | "left" | "any";
    blankPageText: string;
    // Headers & Footers
    headerContent: "title" | "author" | "chapter" | "none";
    footerContent: "page_number" | "none";
    pageNumberPosition: "bottom_center" | "bottom_outside" | "top_outside";
  };
}

interface FormattingState {
  activeThemeId: string;
  themes: ThemeConfig[];
  previewDevice: "print" | "ereader" | "phone" | "tablet";
  activeSection: string;

  setActiveTheme: (id: string) => void;
  setPreviewDevice: (d: FormattingState["previewDevice"]) => void;
  setActiveSection: (s: string) => void;
  updateThemeConfig: (id: string, updates: Partial<ThemeConfig["config"]>) => void;
}

const DEFAULT_CONFIG: ThemeConfig["config"] = {
  chapterHeadingFont: "Playfair Display",
  chapterHeadingSize: 32,
  chapterHeadingAlign: "center",
  chapterNumberStyle: "numeric",
  chapterHeadingOrnament: "✦",
  bodyFont: "Crimson Text",
  bodyFontSize: 12,
  lineHeight: 1.6,
  paragraphSpacing: 0,
  firstLineIndent: 1.5,
  dropCap: false,
  dropCapLines: 3,
  firstSentenceSmallCaps: false,
  sceneBreakStyle: "ornament",
  sceneBreakOrnament: "⁂",
  notesStyle: "footnotes",
  startChapterOn: "right",
  blankPageText: "This page intentionally left blank",
  headerContent: "chapter",
  footerContent: "page_number",
  pageNumberPosition: "bottom_center",
};

const BUILT_IN_THEMES: ThemeConfig[] = [
  { id: "aether", name: "Aether", preview: "linear-gradient(135deg, #f5f7fa, #c3cfe2)", isBuiltIn: true, config: { ...DEFAULT_CONFIG } },
  { id: "atreides", name: "Atreides", preview: "linear-gradient(135deg, #d4a574, #8b6942)", isBuiltIn: true, config: { ...DEFAULT_CONFIG, chapterHeadingFont: "Cinzel", bodyFont: "EB Garamond", chapterHeadingAlign: "center", dropCap: true } },
  { id: "bonkers", name: "Bonkers Books", preview: "linear-gradient(135deg, #ff9a9e, #fad0c4)", isBuiltIn: true, config: { ...DEFAULT_CONFIG, chapterHeadingFont: "Abril Fatface", bodyFont: "Lora", sceneBreakStyle: "asterisks" } },
  { id: "classic", name: "Classic", preview: "linear-gradient(135deg, #ffecd2, #fcb69f)", isBuiltIn: true, config: { ...DEFAULT_CONFIG, chapterHeadingFont: "Libre Baskerville", bodyFont: "Libre Baskerville", firstSentenceSmallCaps: true } },
  { id: "editorial", name: "Editorial", preview: "linear-gradient(135deg, #e0c3fc, #8ec5fc)", isBuiltIn: true, config: { ...DEFAULT_CONFIG, chapterHeadingFont: "Merriweather", bodyFont: "Source Serif Pro", chapterNumberStyle: "words" } },
  { id: "gothic", name: "Gothic", preview: "linear-gradient(135deg, #2d2d2d, #1a1a1a)", isBuiltIn: true, config: { ...DEFAULT_CONFIG, chapterHeadingFont: "UnifrakturCook", bodyFont: "Spectral", dropCap: true, chapterHeadingOrnament: "☽" } },
  { id: "minimalist", name: "Minimalist", preview: "linear-gradient(135deg, #ffffff, #f0f0f0)", isBuiltIn: true, config: { ...DEFAULT_CONFIG, chapterHeadingFont: "Inter", bodyFont: "Inter", chapterNumberStyle: "none", sceneBreakStyle: "blank", chapterHeadingOrnament: "" } },
  { id: "manuscript", name: "Manuscript", preview: "linear-gradient(135deg, #fdf6e3, #eee8d5)", isBuiltIn: true, config: { ...DEFAULT_CONFIG, chapterHeadingFont: "Courier Prime", bodyFont: "Courier Prime", firstLineIndent: 0, paragraphSpacing: 1 } },
  { id: "romance", name: "Romance", preview: "linear-gradient(135deg, #fbc2eb, #a6c1ee)", isBuiltIn: true, config: { ...DEFAULT_CONFIG, chapterHeadingFont: "Great Vibes", bodyFont: "Cormorant Garamond", chapterHeadingOrnament: "❦", dropCap: true } },
  { id: "scifi", name: "Sci-Fi", preview: "linear-gradient(135deg, #0f2027, #2c5364)", isBuiltIn: true, config: { ...DEFAULT_CONFIG, chapterHeadingFont: "Orbitron", bodyFont: "Exo 2", chapterNumberStyle: "roman", sceneBreakStyle: "line" } },
  { id: "thriller", name: "Thriller", preview: "linear-gradient(135deg, #434343, #000000)", isBuiltIn: true, config: { ...DEFAULT_CONFIG, chapterHeadingFont: "Oswald", bodyFont: "Roboto Slab", chapterHeadingAlign: "left", sceneBreakStyle: "blank" } },
  { id: "whimsical", name: "Whimsical", preview: "linear-gradient(135deg, #a8edea, #fed6e3)", isBuiltIn: true, config: { ...DEFAULT_CONFIG, chapterHeadingFont: "Pacifico", bodyFont: "Quicksand", chapterHeadingOrnament: "✿", sceneBreakStyle: "ornament", sceneBreakOrnament: "~❀~" } },
];

export const FORMATTING_SECTIONS = [
  { id: "themes", label: "Themes", icon: "🎨" },
  { id: "chapter-heading", label: "Chapter Heading", icon: "📝" },
  { id: "paragraph", label: "Paragraph", icon: "¶" },
  { id: "typography", label: "Typography", icon: "Aa" },
  { id: "scene-breaks", label: "Scene Breaks", icon: "—" },
  { id: "notes", label: "Notes", icon: "📌" },
  { id: "print-layout", label: "Print Layout", icon: "📐" },
  { id: "headers-footers", label: "Headers & Footers", icon: "📑" },
];

export const useFormattingStore = create<FormattingState>((set) => ({
  activeThemeId: "classic",
  themes: BUILT_IN_THEMES,
  previewDevice: "print",
  activeSection: "themes",

  setActiveTheme: (id) => set({ activeThemeId: id }),
  setPreviewDevice: (previewDevice) => set({ previewDevice }),
  setActiveSection: (activeSection) => set({ activeSection }),

  updateThemeConfig: (id, updates) =>
    set((state) => ({
      themes: state.themes.map((t) =>
        t.id === id ? { ...t, config: { ...t.config, ...updates } } : t
      ),
    })),
}));
