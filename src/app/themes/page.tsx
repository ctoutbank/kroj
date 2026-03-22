"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Download,
  Star,
  Search,
  Eye,
  Palette,
  ArrowLeft,
  Heart,
  Check,
  Filter,
  Grid3X3,
  List,
} from "lucide-react";
import Link from "next/link";

interface Theme {
  id: string;
  name: string;
  author: string;
  category: string;
  downloads: number;
  rating: number;
  price: "free" | number;
  colors: string[];
  featured?: boolean;
  installed?: boolean;
  description: string;
}

const MARKETPLACE_THEMES: Theme[] = [
  { id: "aurora", name: "Aurora Borealis", author: "Kroj Studio", category: "fiction", downloads: 12400, rating: 4.9, price: "free", colors: ["#0f3460", "#16213e", "#1a1a2e", "#e94560"], featured: true, description: "Inspired by northern lights. Elegant serif typography with dark backgrounds and glowing accent colors." },
  { id: "sakura", name: "Sakura Spring", author: "Tokyo Type Co.", category: "romance", downloads: 8900, rating: 4.8, price: 4.99, colors: ["#fce4ec", "#f8bbd0", "#f48fb1", "#ec407a"], description: "Delicate cherry blossom aesthetic. Soft pinks, rounded corners, and light serif typography for romance novels." },
  { id: "noir", name: "Darkroom Noir", author: "Pulp Press", category: "thriller", downloads: 6700, rating: 4.7, price: 3.99, colors: ["#1a1a1a", "#2d2d2d", "#4a4a4a", "#ff4444"], description: "High-contrast noir aesthetic. Bold sans-serif headings, dramatic red accents, perfect for crime and thriller." },
  { id: "grove", name: "Enchanted Grove", author: "Woodland Press", category: "fantasy", downloads: 9200, rating: 4.8, price: "free", colors: ["#1b4332", "#2d6a4f", "#40916c", "#d4a373"], featured: true, description: "Forest-inspired theme with earthy greens, ornamental chapter dividers, and old-world serif typography." },
  { id: "cosmos", name: "Cosmic Drift", author: "Nebula Designs", category: "sci-fi", downloads: 5400, rating: 4.6, price: 5.99, colors: ["#0a0a2e", "#1a1a4e", "#3333ff", "#00d4ff"], description: "Space-age design with futuristic sans-serif, neon accents, and starfield chapter ornaments." },
  { id: "vintage", name: "Vintage Typewriter", author: "Retro Collective", category: "literary", downloads: 11200, rating: 4.9, price: "free", colors: ["#f5f0e1", "#d4c5a9", "#704214", "#3e2507"], description: "Classic typewriter aesthetic. Monospaced body text, yellowed paper, and ink-stamp decorations." },
  { id: "minimalist", name: "Swiss Clean", author: "Helvetica House", category: "non-fiction", downloads: 14800, rating: 4.7, price: 2.99, colors: ["#ffffff", "#f5f5f5", "#000000", "#0066ff"], description: "Swiss-style minimalism. Clean grid layouts, Helvetica-inspired typography, generous whitespace." },
  { id: "gothic", name: "Cathedral Gothic", author: "Raven Press", category: "horror", downloads: 4200, rating: 4.5, price: 4.99, colors: ["#0d0d0d", "#1a0000", "#4a0000", "#8b0000"], description: "Dark gothic aesthetic with blackletter chapter headings, ornate borders, and blood-red accents." },
  { id: "pastel", name: "Soft Pastel", author: "Bloom Studio", category: "children", downloads: 7600, rating: 4.8, price: "free", colors: ["#e8f8f5", "#d4efdf", "#abebc6", "#f9e79f"], description: "Gentle pastels with playful rounded typography. Perfect for children's books and light-hearted fiction." },
  { id: "academic", name: "Oxford Scholar", author: "University Press", category: "non-fiction", downloads: 8900, rating: 4.6, price: 3.99, colors: ["#f8f4e8", "#1c2826", "#8b4513", "#003366"], description: "Academic typesetting with footnote support, margin notes, professional citations, and reference formatting." },
  { id: "memoir", name: "Sepia Memories", author: "Kroj Studio", category: "memoir", downloads: 6300, rating: 4.7, price: "free", colors: ["#faf3e0", "#e8d5b5", "#8b6914", "#5a3e1b"], featured: true, description: "Warm sepia tones with vintage photography aesthetics. Elegant cursive headings for memoirs and autobiographies." },
  { id: "poetry", name: "Verse & Meter", author: "Lyric Labs", category: "poetry", downloads: 3800, rating: 4.9, price: 2.99, colors: ["#fafafa", "#e0e0e0", "#757575", "#212121"], description: "Designed specifically for poetry. Precise line spacing, stanza controls, and centered verse layouts." },
];

const CATEGORIES = ["All", "Fiction", "Romance", "Thriller", "Fantasy", "Sci-Fi", "Literary", "Non-Fiction", "Horror", "Children", "Memoir", "Poetry"];

export default function ThemeMarketplacePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [installed, setInstalled] = useState<Set<string>>(new Set(["aurora", "grove"]));

  const filtered = MARKETPLACE_THEMES.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.author.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || t.category.toLowerCase() === category.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const featuredThemes = MARKETPLACE_THEMES.filter((t) => t.featured);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon-sm"><ArrowLeft className="h-4 w-4" /></Button>
          </Link>
          <div className="flex items-center gap-2">
            <Palette className="h-4 w-4 text-primary" />
            <h1 className="text-sm font-semibold">Theme Marketplace</h1>
          </div>
          <div className="flex-1" />
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input placeholder="Search themes..." className="h-8 text-xs pl-8" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-0.5 border rounded-md p-0.5">
            <Button variant={view === "grid" ? "default" : "ghost"} size="icon-sm" className="h-6 w-6" onClick={() => setView("grid")}><Grid3X3 className="h-3 w-3" /></Button>
            <Button variant={view === "list" ? "default" : "ghost"} size="icon-sm" className="h-6 w-6" onClick={() => setView("list")}><List className="h-3 w-3" /></Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-6 space-y-6">
        {/* Featured Banner */}
        {!search && category === "All" && (
          <div className="rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border p-6">
            <h2 className="text-lg font-bold mb-1">✨ Featured Themes</h2>
            <p className="text-xs text-muted-foreground mb-4">Hand-picked by the Kroj team for exceptional design and readability</p>
            <div className="grid grid-cols-3 gap-3">
              {featuredThemes.map((theme) => (
                <button key={theme.id} className="text-left rounded-lg border bg-background p-3 hover:shadow-md transition-shadow" onClick={() => setSelectedTheme(theme)}>
                  <div className="flex gap-1 mb-2">
                    {theme.colors.map((c, i) => (<div key={i} className="h-4 w-4 rounded-full border" style={{ backgroundColor: c }} />))}
                  </div>
                  <p className="text-xs font-semibold">{theme.name}</p>
                  <p className="text-[9px] text-muted-foreground">{theme.author}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Badge variant="secondary" className="text-[8px] h-4">{theme.price === "free" ? "Free" : `$${theme.price}`}</Badge>
                    <span className="text-[8px] text-muted-foreground flex items-center gap-0.5"><Star className="h-2.5 w-2.5 fill-yellow-500 text-yellow-500" />{theme.rating}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {CATEGORIES.map((cat) => (
            <Button key={cat} variant={category === cat ? "default" : "outline"} size="sm" className="h-7 text-[10px] px-3 shrink-0" onClick={() => setCategory(cat)}>{cat}</Button>
          ))}
        </div>

        {/* Themes Grid/List */}
        {view === "grid" ? (
          <div className="grid grid-cols-4 gap-4">
            {filtered.map((theme) => (
              <Card key={theme.id} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all" onClick={() => setSelectedTheme(theme)}>
                {/* Color Preview */}
                <div className="h-20 flex">
                  {theme.colors.map((c, i) => (<div key={i} className="flex-1" style={{ backgroundColor: c }} />))}
                </div>
                <CardContent className="p-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-semibold">{theme.name}</p>
                      <p className="text-[9px] text-muted-foreground">{theme.author}</p>
                    </div>
                    {installed.has(theme.id) && (
                      <Badge variant="secondary" className="text-[8px] h-4 gap-0.5"><Check className="h-2 w-2" /> Installed</Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] flex items-center gap-0.5"><Star className="h-2.5 w-2.5 fill-yellow-500 text-yellow-500" />{theme.rating}</span>
                      <span className="text-[9px] text-muted-foreground">{(theme.downloads / 1000).toFixed(1)}k</span>
                    </div>
                    <Badge variant={theme.price === "free" ? "secondary" : "default"} className="text-[8px] h-4">{theme.price === "free" ? "Free" : `$${theme.price}`}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((theme) => (
              <div key={theme.id} className="flex items-center gap-4 p-3 border rounded-lg hover:bg-muted/30 cursor-pointer transition-colors" onClick={() => setSelectedTheme(theme)}>
                <div className="flex gap-0.5 shrink-0">
                  {theme.colors.map((c, i) => (<div key={i} className="h-8 w-4 first:rounded-l-md last:rounded-r-md" style={{ backgroundColor: c }} />))}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold">{theme.name}</p>
                  <p className="text-[9px] text-muted-foreground">{theme.author} · {theme.category}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[9px] flex items-center gap-0.5"><Star className="h-2.5 w-2.5 fill-yellow-500 text-yellow-500" />{theme.rating}</span>
                  <span className="text-[9px] text-muted-foreground">{(theme.downloads / 1000).toFixed(1)}k downloads</span>
                  <Badge variant={theme.price === "free" ? "secondary" : "default"} className="text-[8px] h-4">{theme.price === "free" ? "Free" : `$${theme.price}`}</Badge>
                  {installed.has(theme.id) ? (
                    <Badge variant="secondary" className="text-[8px] h-4 gap-0.5"><Check className="h-2 w-2" /> Installed</Badge>
                  ) : (
                    <Button size="sm" className="h-6 text-[10px]" onClick={(e) => { e.stopPropagation(); setInstalled(new Set([...installed, theme.id])); }}>Install</Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Theme Detail Dialog */}
      <Dialog open={!!selectedTheme} onOpenChange={(v) => !v && setSelectedTheme(null)}>
        {selectedTheme && (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-base">
                <Palette className="h-4 w-4 text-primary" />
                {selectedTheme.name}
              </DialogTitle>
            </DialogHeader>

            {/* Color Preview */}
            <div className="h-16 flex rounded-lg overflow-hidden">
              {selectedTheme.colors.map((c, i) => (<div key={i} className="flex-1" style={{ backgroundColor: c }} />))}
            </div>

            <div className="space-y-3">
              <p className="text-xs text-muted-foreground">{selectedTheme.description}</p>

              <div className="flex items-center gap-4 text-[10px]">
                <span className="text-muted-foreground">By <span className="font-medium text-foreground">{selectedTheme.author}</span></span>
                <span className="flex items-center gap-0.5"><Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />{selectedTheme.rating}</span>
                <span className="text-muted-foreground">{selectedTheme.downloads.toLocaleString()} downloads</span>
              </div>

              <div className="flex gap-2">
                <Badge variant="outline" className="text-[9px] capitalize">{selectedTheme.category}</Badge>
                <Badge variant={selectedTheme.price === "free" ? "secondary" : "default"} className="text-[9px]">{selectedTheme.price === "free" ? "Free" : `$${selectedTheme.price}`}</Badge>
              </div>

              <Separator />

              {installed.has(selectedTheme.id) ? (
                <div className="flex gap-2">
                  <Button className="flex-1 gap-1.5 text-xs" variant="outline">
                    <Eye className="h-3.5 w-3.5" /> Preview
                  </Button>
                  <Button className="flex-1 gap-1.5 text-xs" variant="secondary">
                    <Check className="h-3.5 w-3.5" /> Installed
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Button className="flex-1 gap-1.5 text-xs" variant="outline">
                    <Eye className="h-3.5 w-3.5" /> Preview
                  </Button>
                  <Button className="flex-1 gap-1.5 text-xs" onClick={() => setInstalled(new Set([...installed, selectedTheme.id]))}>
                    <Download className="h-3.5 w-3.5" /> {selectedTheme.price === "free" ? "Install Free" : `Install — $${selectedTheme.price}`}
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
