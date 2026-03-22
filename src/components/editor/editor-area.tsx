"use client";

import { useEditor, EditorContent as TiptapEditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import TextAlign from "@tiptap/extension-text-align";
import UnderlineExt from "@tiptap/extension-underline";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Highlight from "@tiptap/extension-highlight";
import { TextStyle } from "@tiptap/extension-text-style";
import { FontFamily } from "@tiptap/extension-text-style";
import { useEffect, useCallback, useRef } from "react";
import { useEditorStore } from "@/stores/editor-store";
import { EditorToolbar } from "./editor-toolbar";

export function EditorArea() {
  const { activeChapterId, chapters, updateChapterContent } = useEditorStore();
  const activeChapter = chapters.find((c) => c.id === activeChapterId);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4, 5, 6] },
      }),
      Placeholder.configure({
        placeholder: "Start writing your story...",
      }),
      CharacterCount,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      UnderlineExt,
      Subscript,
      Superscript,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-primary underline cursor-pointer" },
      }),
      Image.configure({
        HTMLAttributes: { class: "mx-auto rounded-md max-w-full" },
      }),
      Highlight,
      TextStyle,
      FontFamily,
    ],
    content: activeChapter?.content || "<p></p>",
    editorProps: {
      attributes: {
        class:
          "prose prose-lg max-w-none px-16 py-12 min-h-[calc(100vh-10rem)] focus:outline-none " +
          "prose-headings:font-serif prose-p:leading-relaxed prose-p:text-foreground " +
          "prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground " +
          "prose-hr:border-border",
      },
    },
    onUpdate: ({ editor }) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        if (activeChapterId) {
          const json = editor.getJSON();
          const wordCount = editor.storage.characterCount.words();
          updateChapterContent(activeChapterId, json as Record<string, unknown>, wordCount);
        }
      }, 500);
    },
  });

  // Switch chapter content when active chapter changes
  const setContent = useCallback(() => {
    if (editor && activeChapter) {
      editor.commands.setContent(activeChapter.content || "<p></p>");
    }
  }, [editor, activeChapter]);

  useEffect(() => {
    setContent();
  }, [activeChapterId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
      <EditorToolbar editor={editor} />

      {/* Chapter Header */}
      {activeChapter && (
        <div className="px-16 pt-10 pb-4">
          <input
            type="text"
            value={activeChapter.title}
            onChange={(e) => {
              useEditorStore.getState().updateChapterTitle(activeChapter.id, e.target.value);
            }}
            className="w-full text-3xl font-serif font-bold text-foreground bg-transparent border-none outline-none placeholder:text-muted-foreground/50"
            placeholder="Chapter Title"
          />
          {activeChapter.type === "chapter" && (
            <div className="mt-1 text-xs text-muted-foreground">
              Chapter {chapters.filter((c) => c.type === "chapter").findIndex((c) => c.id === activeChapter.id) + 1}
            </div>
          )}
        </div>
      )}

      {/* Editor Content */}
      <div className="flex-1 overflow-y-auto bg-editor-bg">
        <TiptapEditorContent editor={editor} />
      </div>
    </div>
  );
}
