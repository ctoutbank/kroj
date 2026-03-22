"use client";

import { useEditorStore } from "@/stores/editor-store";
import { CHAPTER_ICONS } from "@/types/editor";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Plus, MoreHorizontal, Trash2, GripVertical } from "lucide-react";
import { FRONT_MATTER_TYPES, BACK_MATTER_TYPES } from "@/types/editor";

export function ChapterSidebar() {
  const { chapters, activeChapterId, setActiveChapter, addChapter, addFrontMatter, removeChapter } = useEditorStore();

  const frontMatter = chapters.filter((c) => c.type === "front_matter");
  const bodyChapters = chapters.filter((c) => c.type === "chapter");
  const backMatter = chapters.filter((c) => c.type === "back_matter");

  return (
    <aside className="w-60 shrink-0 border-r bg-editor-sidebar flex flex-col h-full overflow-hidden">
      {/* Front Matter */}
      {frontMatter.length > 0 && (
        <div className="px-2 pt-3">
          {frontMatter.map((chapter) => (
            <ChapterItem
              key={chapter.id}
              id={chapter.id}
              title={chapter.title}
              icon={CHAPTER_ICONS[chapter.subtype || ""] || "📄"}
              isActive={chapter.id === activeChapterId}
              onClick={() => setActiveChapter(chapter.id)}
              onDelete={() => removeChapter(chapter.id)}
            />
          ))}
        </div>
      )}

      <Separator className="my-1" />

      {/* Body Label */}
      <div className="px-3 py-1.5 flex items-center justify-between">
        <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Body</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm" className="h-5 w-5 text-muted-foreground">
              <MoreHorizontal className="h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel className="text-xs">Add Front Matter</DropdownMenuLabel>
            {FRONT_MATTER_TYPES.map((type) => (
              <DropdownMenuItem key={type.value} onClick={() => addFrontMatter(type.value, type.label)}>
                <span className="mr-2">{CHAPTER_ICONS[type.value]}</span>
                {type.label}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs">Add Back Matter</DropdownMenuLabel>
            {BACK_MATTER_TYPES.map((type) => (
              <DropdownMenuItem key={type.value} onClick={() => addFrontMatter(type.value, type.label)}>
                <span className="mr-2">{CHAPTER_ICONS[type.value]}</span>
                {type.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Body Chapters */}
      <div className="flex-1 overflow-y-auto px-2 pb-2">
        {bodyChapters.map((chapter, index) => (
          <ChapterItem
            key={chapter.id}
            id={chapter.id}
            title={chapter.title}
            icon={`${index + 1}.`}
            isActive={chapter.id === activeChapterId}
            onClick={() => setActiveChapter(chapter.id)}
            onDelete={() => removeChapter(chapter.id)}
            showGrip
          />
        ))}

        {/* Back Matter */}
        {backMatter.length > 0 && (
          <>
            <Separator className="my-1.5" />
            {backMatter.map((chapter) => (
              <ChapterItem
                key={chapter.id}
                id={chapter.id}
                title={chapter.title}
                icon={CHAPTER_ICONS[chapter.subtype || ""] || "📄"}
                isActive={chapter.id === activeChapterId}
                onClick={() => setActiveChapter(chapter.id)}
                onDelete={() => removeChapter(chapter.id)}
              />
            ))}
          </>
        )}
      </div>

      {/* Add Chapter Button */}
      <div className="p-2 border-t">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
          onClick={addChapter}
        >
          <Plus className="h-4 w-4" />
          Add new chapter
        </Button>
      </div>
    </aside>
  );
}

function ChapterItem({
  id,
  title,
  icon,
  isActive,
  onClick,
  onDelete,
  showGrip,
}: {
  id: string;
  title: string;
  icon: string;
  isActive: boolean;
  onClick: () => void;
  onDelete: () => void;
  showGrip?: boolean;
}) {
  return (
    <div
      className={cn(
        "group flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm cursor-pointer transition-colors",
        isActive
          ? "bg-primary/10 text-primary font-medium"
          : "text-foreground/70 hover:bg-muted hover:text-foreground"
      )}
      onClick={onClick}
    >
      {showGrip && (
        <GripVertical className="h-3 w-3 opacity-0 group-hover:opacity-40 shrink-0 cursor-grab" />
      )}
      <span className="shrink-0 text-xs w-5 text-center">{icon}</span>
      <span className="truncate flex-1">{title}</span>
      <button
        className="opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-opacity shrink-0"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        <Trash2 className="h-3 w-3 text-destructive" />
      </button>
    </div>
  );
}
