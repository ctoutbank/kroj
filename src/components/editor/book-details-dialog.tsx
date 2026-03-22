"use client";

import { useState } from "react";
import { useEditorStore } from "@/stores/editor-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Upload } from "lucide-react";

interface BookDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CATEGORIES = [
  "Fiction", "Non-Fiction", "Fantasy", "Science Fiction", "Romance",
  "Mystery", "Thriller", "Horror", "Biography", "Children's",
  "Young Adult", "Self-Help", "Poetry", "Historical Fiction",
];

export function BookDetailsDialog({ open, onOpenChange }: BookDetailsDialogProps) {
  const { bookTitle, setBookTitle } = useEditorStore();
  const [subtitle, setSubtitle] = useState("");
  const [author, setAuthor] = useState("Denison Zimmer");
  const [publisher, setPublisher] = useState("");
  const [isbn, setIsbn] = useState("");
  const [language, setLanguage] = useState("English");
  const [category, setCategory] = useState("Fiction");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Book Details</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="general" className="mt-2">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="general" className="text-xs">General</TabsTrigger>
            <TabsTrigger value="publishing" className="text-xs">Publishing</TabsTrigger>
            <TabsTrigger value="cover" className="text-xs">Cover</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-3 mt-4">
            <div><label className="text-xs font-medium mb-1 block">Title</label><Input value={bookTitle} onChange={(e) => setBookTitle(e.target.value)} /></div>
            <div><label className="text-xs font-medium mb-1 block">Subtitle</label><Input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="Optional subtitle" /></div>
            <div><label className="text-xs font-medium mb-1 block">Author</label><Input value={author} onChange={(e) => setAuthor(e.target.value)} /></div>
            <div>
              <label className="text-xs font-medium mb-1 block">Category</label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full justify-between h-8 text-xs"><span>{category}</span><ChevronDown className="h-3 w-3 opacity-50" /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-48 overflow-y-auto">
                  {CATEGORIES.map((c) => (<DropdownMenuItem key={c} onClick={() => setCategory(c)}>{c}</DropdownMenuItem>))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div><label className="text-xs font-medium mb-1 block">Description</label><textarea className="w-full h-20 rounded-md border px-3 py-2 text-sm resize-none" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="A brief description of your book..." /></div>
          </TabsContent>

          <TabsContent value="publishing" className="space-y-3 mt-4">
            <div><label className="text-xs font-medium mb-1 block">Publisher</label><Input value={publisher} onChange={(e) => setPublisher(e.target.value)} placeholder="Publisher name" /></div>
            <div><label className="text-xs font-medium mb-1 block">ISBN</label><Input value={isbn} onChange={(e) => setIsbn(e.target.value)} placeholder="978-0-000-00000-0" /></div>
            <div>
              <label className="text-xs font-medium mb-1 block">Language</label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full justify-between h-8 text-xs"><span>{language}</span><ChevronDown className="h-3 w-3 opacity-50" /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
                  {["English", "Português", "Español", "Français", "Deutsch"].map((l) => (<DropdownMenuItem key={l} onClick={() => setLanguage(l)}>{l}</DropdownMenuItem>))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div><label className="text-xs font-medium mb-1 block">Keywords</label><Input value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="fantasy, adventure, magic (comma separated)" /></div>
            <div><label className="text-xs font-medium mb-1 block">Copyright</label><Input defaultValue={`© ${new Date().getFullYear()} ${author}`} /></div>
          </TabsContent>

          <TabsContent value="cover" className="mt-4">
            <div className="flex flex-col items-center gap-4 py-6">
              <div className="w-40 h-56 rounded-lg border-2 border-dashed bg-muted/30 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Upload className="h-8 w-8 mx-auto mb-2 opacity-40" />
                  <p className="text-xs font-medium">Drop cover here</p>
                  <p className="text-[10px] opacity-60">JPG, PNG up to 5MB</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                <Upload className="h-3.5 w-3.5" /> Upload Cover Image
              </Button>
              <p className="text-[11px] text-muted-foreground text-center max-w-xs">
                Recommended: 1600×2560px (1:1.6 ratio). Your cover will be included in ePub and PDF exports.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
