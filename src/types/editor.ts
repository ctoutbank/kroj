export interface ChapterData {
  id: string;
  title: string;
  subtitle?: string;
  type: "front_matter" | "chapter" | "back_matter";
  subtype?: string;
  content: Record<string, unknown> | null;
  order: number;
  imageUrl?: string;
  wordCount: number;
  showChapterHeading: boolean;
  showChapterImage: boolean;
  showPageNumbers: boolean;
  showHeaderFooter: boolean;
  showInToc: boolean;
  firstSentenceFormat: boolean;
  useSmallerTitle: boolean;
  invertTextColor: boolean;
}

export interface BookData {
  id: string;
  title: string;
  subtitle?: string;
  author?: string;
  language: string;
  coverUrl?: string;
  wordCount: number;
  chapters: ChapterData[];
}

export const FRONT_MATTER_TYPES = [
  { value: "title_page", label: "Title Page" },
  { value: "copyright", label: "Copyright" },
  { value: "dedication", label: "Dedication" },
  { value: "epigraph", label: "Epigraph" },
  { value: "contents", label: "Contents" },
  { value: "foreword", label: "Foreword" },
  { value: "preface", label: "Preface" },
  { value: "acknowledgments", label: "Acknowledgments" },
  { value: "introduction", label: "Introduction" },
  { value: "prologue", label: "Prologue" },
] as const;

export const BACK_MATTER_TYPES = [
  { value: "epilogue", label: "Epilogue" },
  { value: "afterword", label: "Afterword" },
  { value: "appendix", label: "Appendix" },
  { value: "glossary", label: "Glossary" },
  { value: "bibliography", label: "Bibliography" },
  { value: "about_author", label: "About the Author" },
  { value: "also_by", label: "Also By" },
] as const;

export const CHAPTER_ICONS: Record<string, string> = {
  title_page: "📄",
  copyright: "©",
  dedication: "💝",
  epigraph: "✒",
  contents: "📑",
  foreword: "📝",
  preface: "📖",
  acknowledgments: "🙏",
  introduction: "📌",
  prologue: "🎭",
  chapter: "📕",
  epilogue: "🎬",
  afterword: "💬",
  appendix: "📎",
  glossary: "📚",
  bibliography: "📋",
  about_author: "👤",
  also_by: "📗",
};

export function createDefaultChapter(order: number): ChapterData {
  return {
    id: `chapter-${Date.now()}-${order}`,
    title: `Chapter ${order}`,
    type: "chapter",
    content: null,
    order,
    wordCount: 0,
    showChapterHeading: true,
    showChapterImage: false,
    showPageNumbers: true,
    showHeaderFooter: true,
    showInToc: true,
    firstSentenceFormat: true,
    useSmallerTitle: false,
    invertTextColor: false,
  };
}

export function createDefaultFrontMatter(subtype: string, label: string, order: number): ChapterData {
  return {
    id: `front-${Date.now()}-${order}`,
    title: label,
    type: "front_matter",
    subtype,
    content: null,
    order,
    wordCount: 0,
    showChapterHeading: subtype !== "title_page",
    showChapterImage: false,
    showPageNumbers: false,
    showHeaderFooter: false,
    showInToc: subtype === "contents",
    firstSentenceFormat: false,
    useSmallerTitle: false,
    invertTextColor: false,
  };
}
