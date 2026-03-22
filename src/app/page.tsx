"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FilePlus, LayoutGrid, BarChart3, Palette } from "lucide-react";
import Link from "next/link";
import { ImportDocxDialog } from "@/components/books/import-docx-dialog";

export default function Home() {
  const [importOpen, setImportOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">K</div>
            <span className="font-semibold text-lg tracking-tight">Kroj</span>
          </Link>

          <nav className="ml-8 flex items-center gap-1">
            <Button variant="ghost" size="sm" className="text-foreground font-medium">Home</Button>
            <Link href="/books"><Button variant="ghost" size="sm" className="text-muted-foreground">My Books</Button></Link>
            <Link href="/collaboration"><Button variant="ghost" size="sm" className="text-muted-foreground">Collaboration</Button></Link>
            <Link href="/analytics"><Button variant="ghost" size="sm" className="text-muted-foreground">Analytics</Button></Link>
            <Link href="/themes"><Button variant="ghost" size="sm" className="text-muted-foreground">Themes</Button></Link>
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <Link href="/settings">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all">DL</div>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-8 max-w-6xl mx-auto w-full">
        {/* Quick Actions */}
        <section className="mb-10">
          <h2 className="text-sm font-medium text-muted-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30" onClick={() => setImportOpen(true)}>
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Upload className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-sm font-semibold">Upload a book</CardTitle>
                  <CardDescription className="text-xs mt-0.5">Import from DOCX</CardDescription>
                </div>
              </CardContent>
            </Card>

            <Link href="/editor">
              <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-accent/30">
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <FilePlus className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-semibold">Start a new book</CardTitle>
                    <CardDescription className="text-xs mt-0.5">Create from scratch</CardDescription>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-secondary-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <LayoutGrid className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-sm font-semibold">Create a boxset</CardTitle>
                  <CardDescription className="text-xs mt-0.5">Group multiple books</CardDescription>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Recent Work */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-muted-foreground">Recent Work</h2>
            <Link href="/books" className="text-xs text-primary hover:underline">
              View all →
            </Link>
          </div>
          <div className="flex items-center justify-center py-16 border-2 border-dashed rounded-xl text-muted-foreground">
            <div className="text-center">
              <FilePlus className="h-10 w-10 mx-auto mb-3 opacity-40" />
              <p className="text-sm font-medium mb-1">No books yet</p>
              <p className="text-xs opacity-70">&ldquo;Start writing. The world is waiting for your words.&rdquo;</p>
            </div>
          </div>
        </section>
      </main>

      {/* Import Dialog */}
      <ImportDocxDialog open={importOpen} onOpenChange={setImportOpen} />
    </div>
  );
}
