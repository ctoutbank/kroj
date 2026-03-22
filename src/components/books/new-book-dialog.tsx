"use client";

import { useState } from "react";
import { useBooksStore } from "@/stores/books-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "pt", label: "Português" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
  { value: "it", label: "Italiano" },
];

export function NewBookDialog() {
  const { isNewBookOpen, setNewBookOpen, addBook } = useBooksStore();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("Denison Zimmer");
  const [language, setLanguage] = useState("en");

  const langLabel = LANGUAGES.find((l) => l.value === language)?.label || "English";

  const handleCreate = () => {
    if (!title.trim()) return;
    const newBook = {
      id: `book-${Date.now()}`,
      title: title.trim(),
      author: author.trim(),
      wordCount: 0,
      chapterCount: 1,
      updatedAt: new Date(),
      createdAt: new Date(),
      language,
      type: "book" as const,
    };
    addBook(newBook);
    setNewBookOpen(false);
    setTitle("");
    router.push("/editor");
  };

  return (
    <Dialog open={isNewBookOpen} onOpenChange={setNewBookOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Book</DialogTitle>
          <DialogDescription>Start a new writing project from scratch.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Book Title</label>
            <Input
              placeholder="Enter your book title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Author Name</label>
            <Input
              placeholder="Your name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Language</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between h-9">
                  {langLabel}
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
                {LANGUAGES.map((lang) => (
                  <DropdownMenuItem key={lang.value} onClick={() => setLanguage(lang.value)}>
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => setNewBookOpen(false)}>Cancel</Button>
          <Button onClick={handleCreate} disabled={!title.trim()}>Create Book</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
