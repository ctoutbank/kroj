"use client";

import { create } from "zustand";

export interface BookItem {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  coverUrl?: string;
  wordCount: number;
  chapterCount: number;
  updatedAt: Date;
  createdAt: Date;
  language: string;
  type: "book" | "boxset";
}

interface BooksState {
  books: BookItem[];
  search: string;
  sortBy: "updated" | "title" | "created" | "words";
  filterType: "all" | "book" | "boxset";
  isNewBookOpen: boolean;

  setSearch: (s: string) => void;
  setSortBy: (s: BooksState["sortBy"]) => void;
  setFilterType: (f: BooksState["filterType"]) => void;
  setNewBookOpen: (open: boolean) => void;
  addBook: (book: BookItem) => void;
  deleteBook: (id: string) => void;
  getFilteredBooks: () => BookItem[];
}

const DEMO_BOOKS: BookItem[] = [
  {
    id: "book-1",
    title: "The Silent Horizon",
    subtitle: "A Novel",
    author: "Denison Zimmer",
    wordCount: 78542,
    chapterCount: 24,
    updatedAt: new Date("2026-03-20"),
    createdAt: new Date("2026-01-15"),
    language: "en",
    type: "book",
  },
  {
    id: "book-2",
    title: "Echoes of Tomorrow",
    author: "Denison Zimmer",
    wordCount: 45230,
    chapterCount: 16,
    updatedAt: new Date("2026-03-18"),
    createdAt: new Date("2026-02-10"),
    language: "en",
    type: "book",
  },
  {
    id: "book-3",
    title: "Crônicas do Amanhecer",
    subtitle: "Volume I",
    author: "Denison Zimmer",
    wordCount: 92100,
    chapterCount: 32,
    updatedAt: new Date("2026-03-15"),
    createdAt: new Date("2025-11-01"),
    language: "pt",
    type: "book",
  },
  {
    id: "boxset-1",
    title: "Saga Horizonte",
    author: "Denison Zimmer",
    wordCount: 215872,
    chapterCount: 72,
    updatedAt: new Date("2026-03-10"),
    createdAt: new Date("2025-09-20"),
    language: "pt",
    type: "boxset",
  },
];

export const useBooksStore = create<BooksState>((set, get) => ({
  books: DEMO_BOOKS,
  search: "",
  sortBy: "updated",
  filterType: "all",
  isNewBookOpen: false,

  setSearch: (search) => set({ search }),
  setSortBy: (sortBy) => set({ sortBy }),
  setFilterType: (filterType) => set({ filterType }),
  setNewBookOpen: (isNewBookOpen) => set({ isNewBookOpen }),

  addBook: (book) => set((s) => ({ books: [book, ...s.books] })),
  deleteBook: (id) => set((s) => ({ books: s.books.filter((b) => b.id !== id) })),

  getFilteredBooks: () => {
    const { books, search, sortBy, filterType } = get();
    let filtered = [...books];

    if (filterType !== "all") {
      filtered = filtered.filter((b) => b.type === filterType);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "title": return a.title.localeCompare(b.title);
        case "created": return b.createdAt.getTime() - a.createdAt.getTime();
        case "words": return b.wordCount - a.wordCount;
        default: return b.updatedAt.getTime() - a.updatedAt.getTime();
      }
    });

    return filtered;
  },
}));
