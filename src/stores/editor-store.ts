"use client";

import { create } from "zustand";
import { type ChapterData, createDefaultChapter, createDefaultFrontMatter } from "@/types/editor";

interface EditorState {
  bookTitle: string;
  chapters: ChapterData[];
  activeChapterId: string | null;
  mode: "writing" | "formatting";
  wordCount: number;
  isSaving: boolean;

  setMode: (mode: "writing" | "formatting") => void;
  setBookTitle: (title: string) => void;
  setActiveChapter: (id: string) => void;
  addChapter: () => void;
  addFrontMatter: (subtype: string, label: string) => void;
  removeChapter: (id: string) => void;
  updateChapterContent: (id: string, content: Record<string, unknown>, wordCount: number) => void;
  updateChapterTitle: (id: string, title: string) => void;
  reorderChapters: (chapters: ChapterData[]) => void;
  getActiveChapter: () => ChapterData | undefined;
}

const DEMO_CHAPTERS: ChapterData[] = [
  {
    id: "front-title",
    title: "Title Page",
    type: "front_matter",
    subtype: "title_page",
    content: null,
    order: 0,
    wordCount: 0,
    showChapterHeading: false,
    showChapterImage: false,
    showPageNumbers: false,
    showHeaderFooter: false,
    showInToc: false,
    firstSentenceFormat: false,
    useSmallerTitle: false,
    invertTextColor: false,
  },
  {
    id: "front-copyright",
    title: "Copyright",
    type: "front_matter",
    subtype: "copyright",
    content: null,
    order: 1,
    wordCount: 0,
    showChapterHeading: true,
    showChapterImage: false,
    showPageNumbers: false,
    showHeaderFooter: false,
    showInToc: false,
    firstSentenceFormat: false,
    useSmallerTitle: false,
    invertTextColor: false,
  },
  {
    id: "chapter-1",
    title: "The Beginning",
    type: "chapter",
    content: null,
    order: 2,
    wordCount: 0,
    showChapterHeading: true,
    showChapterImage: false,
    showPageNumbers: true,
    showHeaderFooter: true,
    showInToc: true,
    firstSentenceFormat: true,
    useSmallerTitle: false,
    invertTextColor: false,
  },
  {
    id: "chapter-2",
    title: "Rising Action",
    type: "chapter",
    content: null,
    order: 3,
    wordCount: 0,
    showChapterHeading: true,
    showChapterImage: false,
    showPageNumbers: true,
    showHeaderFooter: true,
    showInToc: true,
    firstSentenceFormat: true,
    useSmallerTitle: false,
    invertTextColor: false,
  },
  {
    id: "chapter-3",
    title: "The Climax",
    type: "chapter",
    content: null,
    order: 4,
    wordCount: 0,
    showChapterHeading: true,
    showChapterImage: false,
    showPageNumbers: true,
    showHeaderFooter: true,
    showInToc: true,
    firstSentenceFormat: true,
    useSmallerTitle: false,
    invertTextColor: false,
  },
];

export const useEditorStore = create<EditorState>((set, get) => ({
  bookTitle: "My First Book",
  chapters: DEMO_CHAPTERS,
  activeChapterId: "chapter-1",
  mode: "writing",
  wordCount: 0,
  isSaving: false,

  setMode: (mode) => set({ mode }),
  setBookTitle: (bookTitle) => set({ bookTitle }),
  setActiveChapter: (id) => set({ activeChapterId: id }),

  addChapter: () => {
    const { chapters } = get();
    const bodyChapters = chapters.filter((c) => c.type === "chapter");
    const newOrder = chapters.length;
    const newChapter = createDefaultChapter(bodyChapters.length + 1);
    newChapter.order = newOrder;
    set({ chapters: [...chapters, newChapter], activeChapterId: newChapter.id });
  },

  addFrontMatter: (subtype, label) => {
    const { chapters } = get();
    const frontMatter = chapters.filter((c) => c.type === "front_matter");
    const newChapter = createDefaultFrontMatter(subtype, label, frontMatter.length);
    const newChapters = [
      ...chapters.filter((c) => c.type === "front_matter"),
      newChapter,
      ...chapters.filter((c) => c.type !== "front_matter"),
    ].map((c, i) => ({ ...c, order: i }));
    set({ chapters: newChapters, activeChapterId: newChapter.id });
  },

  removeChapter: (id) => {
    const { chapters, activeChapterId } = get();
    const filtered = chapters.filter((c) => c.id !== id).map((c, i) => ({ ...c, order: i }));
    const newActive = id === activeChapterId ? filtered[0]?.id || null : activeChapterId;
    set({ chapters: filtered, activeChapterId: newActive });
  },

  updateChapterContent: (id, content, wordCount) => {
    set((state) => ({
      chapters: state.chapters.map((c) =>
        c.id === id ? { ...c, content, wordCount } : c
      ),
    }));
  },

  updateChapterTitle: (id, title) => {
    set((state) => ({
      chapters: state.chapters.map((c) =>
        c.id === id ? { ...c, title } : c
      ),
    }));
  },

  reorderChapters: (chapters) => set({ chapters }),

  getActiveChapter: () => {
    const { chapters, activeChapterId } = get();
    return chapters.find((c) => c.id === activeChapterId);
  },
}));
