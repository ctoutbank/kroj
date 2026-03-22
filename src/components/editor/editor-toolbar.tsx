"use client";

import { type Editor } from "@tiptap/react";
import { cn } from "@/lib/utils";
import {
  Bold, Italic, Underline, Strikethrough,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered,
  Link2, Image, Quote, Minus,
  Undo2, Redo2, Maximize2,
  ChevronDown, Type,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface EditorToolbarProps {
  editor: Editor | null;
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
  if (!editor) return null;

  return (
    <div className="flex items-center gap-0.5 border-b bg-editor-toolbar px-3 py-1.5 overflow-x-auto">
      {/* Basic formatting */}
      <ToolbarButton
        icon={Bold}
        label="Bold"
        shortcut="⌘B"
        isActive={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      />
      <ToolbarButton
        icon={Italic}
        label="Italic"
        shortcut="⌘I"
        isActive={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      />
      <ToolbarButton
        icon={Underline}
        label="Underline"
        shortcut="⌘U"
        isActive={editor.isActive("underline")}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      />

      {/* Advanced styles dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm" className="gap-0.5 w-auto px-1.5">
            <Strikethrough className="h-4 w-4" />
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-44">
          <DropdownMenuItem onClick={() => editor.chain().focus().toggleStrike().run()}>
            <Strikethrough className="h-4 w-4 mr-2" />
            Strikethrough
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => editor.chain().focus().toggleCode().run()}>
            <span className="mr-2 font-mono text-xs">M</span>
            Monospace
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => editor.chain().focus().toggleSubscript().run()}>
            <span className="mr-2 text-xs">X₂</span>
            Subscript
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => editor.chain().focus().toggleSuperscript().run()}>
            <span className="mr-2 text-xs">X²</span>
            Superscript
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Headings dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm" className="gap-0.5 w-auto px-1.5">
            <Type className="h-4 w-4" />
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-44">
          <DropdownMenuItem onClick={() => editor.chain().focus().setParagraph().run()}>
            <span className="text-sm">Paragraph</span>
          </DropdownMenuItem>
          {([2, 3, 4, 5, 6] as const).map((level) => (
            <DropdownMenuItem
              key={level}
              onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
              className={cn(editor.isActive("heading", { level }) && "bg-accent")}
            >
              <span className={cn("font-semibold", level <= 3 ? "text-base" : "text-sm")}>
                Heading {level}
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Alignment dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm" className="gap-0.5 w-auto px-1.5">
            <AlignLeft className="h-4 w-4" />
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-36">
          <DropdownMenuItem onClick={() => editor.chain().focus().setTextAlign("left").run()}>
            <AlignLeft className="h-4 w-4 mr-2" /> Left
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => editor.chain().focus().setTextAlign("center").run()}>
            <AlignCenter className="h-4 w-4 mr-2" /> Center
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => editor.chain().focus().setTextAlign("right").run()}>
            <AlignRight className="h-4 w-4 mr-2" /> Right
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => editor.chain().focus().setTextAlign("justify").run()}>
            <AlignJustify className="h-4 w-4 mr-2" /> Justify
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Scene break */}
      <ToolbarButton
        icon={Minus}
        label="Scene Break"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      />

      {/* Lists */}
      <ToolbarButton
        icon={List}
        label="Bullet List"
        isActive={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      />
      <ToolbarButton
        icon={ListOrdered}
        label="Ordered List"
        isActive={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      />

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Link */}
      <ToolbarButton
        icon={Link2}
        label="Link"
        isActive={editor.isActive("link")}
        onClick={() => {
          const url = window.prompt("URL");
          if (url) editor.chain().focus().setLink({ href: url }).run();
        }}
      />

      {/* Image */}
      <ToolbarButton
        icon={Image}
        label="Image"
        onClick={() => {
          const url = window.prompt("Image URL");
          if (url) editor.chain().focus().setImage({ src: url }).run();
        }}
      />

      {/* Blockquote */}
      <ToolbarButton
        icon={Quote}
        label="Blockquote"
        isActive={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      />

      <div className="flex-1" />

      {/* Undo / Redo */}
      <ToolbarButton
        icon={Undo2}
        label="Undo"
        shortcut="⌘Z"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
      />
      <ToolbarButton
        icon={Redo2}
        label="Redo"
        shortcut="⌘⇧Z"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
      />

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Fullscreen */}
      <ToolbarButton
        icon={Maximize2}
        label="Fullscreen"
        onClick={() => document.documentElement.requestFullscreen?.()}
      />
    </div>
  );
}

function ToolbarButton({
  icon: Icon,
  label,
  shortcut,
  isActive,
  disabled,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  shortcut?: string;
  isActive?: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          className={cn(
            "transition-colors",
            isActive && "bg-primary/10 text-primary",
            disabled && "opacity-30"
          )}
          onClick={onClick}
          disabled={disabled}
        >
          <Icon className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span>{label}</span>
        {shortcut && <span className="ml-2 text-[10px] opacity-60">{shortcut}</span>}
      </TooltipContent>
    </Tooltip>
  );
}
