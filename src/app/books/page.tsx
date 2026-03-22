"use client";

import { useBooksStore } from "@/stores/books-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search, SortAsc, Filter, Plus, MoreVertical, BookOpen, Library,
  Trash2, Copy, FileDown, Pen, ArrowUpDown,
} from "lucide-react";
import Link from "next/link";
import { NewBookDialog } from "@/components/books/new-book-dialog";

export default function BooksPage() {
  const { search, setSearch, sortBy, setSortBy, filterType, setFilterType, setNewBookOpen, getFilteredBooks } = useBooksStore();
  const books = getFilteredBooks();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 px-6 py-6 max-w-6xl mx-auto w-full">
        {/* Controls */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search books..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5 h-9 text-xs">
                <ArrowUpDown className="h-3.5 w-3.5" />
                {sortBy === "updated" ? "Last updated" : sortBy === "title" ? "Title" : sortBy === "created" ? "Date created" : "Word count"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-40">
              <DropdownMenuItem onClick={() => setSortBy("updated")}>Last updated</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("title")}>Title</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("created")}>Date created</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("words")}>Word count</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5 h-9 text-xs">
                <Filter className="h-3.5 w-3.5" />
                {filterType === "all" ? "All" : filterType === "book" ? "Books" : "Boxsets"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-32">
              <DropdownMenuItem onClick={() => setFilterType("all")}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterType("book")}>Books</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterType("boxset")}>Boxsets</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex-1" />

          <Button size="sm" className="gap-1.5 h-9" onClick={() => setNewBookOpen(true)}>
            <Plus className="h-4 w-4" />
            New Book
          </Button>
        </div>

        {/* Book List */}
        {books.length === 0 ? (
          <div className="flex items-center justify-center py-20 border-2 border-dashed rounded-xl text-muted-foreground">
            <div className="text-center">
              <BookOpen className="h-10 w-10 mx-auto mb-3 opacity-40" />
              <p className="text-sm font-medium mb-1">No books found</p>
              <p className="text-xs opacity-70">Try adjusting your search or filters</p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </main>

      <NewBookDialog />
    </div>
  );
}

function BookCard({ book }: { book: ReturnType<typeof useBooksStore.getState>["books"][0] }) {
  const deleteBook = useBooksStore((s) => s.deleteBook);
  const daysAgo = Math.floor((Date.now() - book.updatedAt.getTime()) / 86400000);
  const updatedLabel = daysAgo === 0 ? "Today" : daysAgo === 1 ? "Yesterday" : `${daysAgo}d ago`;

  return (
    <Card className="group hover:shadow-sm transition-all hover:border-primary/20">
      <CardContent className="flex items-center gap-4 p-4">
        {/* Cover placeholder */}
        <div className="w-10 h-14 rounded bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
          {book.type === "boxset" ? (
            <Library className="h-5 w-5 text-primary/60" />
          ) : (
            <BookOpen className="h-5 w-5 text-primary/60" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <Link href="/editor" className="font-semibold text-sm hover:text-primary transition-colors truncate">
              {book.title}
            </Link>
            {book.type === "boxset" && <Badge variant="secondary" className="text-[10px] py-0">Boxset</Badge>}
          </div>
          {book.subtitle && (
            <p className="text-xs text-muted-foreground truncate">{book.subtitle}</p>
          )}
          <div className="flex items-center gap-3 mt-1 text-[11px] text-muted-foreground">
            <span>{book.wordCount.toLocaleString()} words</span>
            <span>·</span>
            <span>{book.chapterCount} chapters</span>
            <span>·</span>
            <span>{updatedLabel}</span>
            <span>·</span>
            <span className="uppercase">{book.language}</span>
          </div>
        </div>

        {/* Actions */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem>
              <Pen className="h-3.5 w-3.5 mr-2" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Copy className="h-3.5 w-3.5 mr-2" /> Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FileDown className="h-3.5 w-3.5 mr-2" /> Export
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive" onClick={() => deleteBook(book.id)}>
              <Trash2 className="h-3.5 w-3.5 mr-2" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">K</div>
          <span className="font-semibold text-lg tracking-tight">Kroj</span>
        </Link>
        <nav className="ml-8 flex items-center gap-1">
          <Link href="/"><Button variant="ghost" size="sm" className="text-muted-foreground">Home</Button></Link>
          <Button variant="ghost" size="sm" className="text-foreground font-medium">My Books</Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">Collaboration</Button>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium">DL</div>
        </div>
      </div>
    </header>
  );
}
