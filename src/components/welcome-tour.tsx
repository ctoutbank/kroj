"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import {
  BookOpen,
  PenTool,
  Palette,
  Download,
  Users,
  Sparkles,
  ArrowRight,
  X,
} from "lucide-react";

const STEPS = [
  { icon: BookOpen, title: "Welcome to Kroj", description: "The professional book editing platform. Write, format, and publish your books with a premium experience.", color: "from-blue-500/20 to-indigo-500/20" },
  { icon: PenTool, title: "Write with Power", description: "TipTap-powered editor with 14+ extensions, chapter management, find & replace, writing goals, and snapshots.", color: "from-emerald-500/20 to-teal-500/20" },
  { icon: Palette, title: "Format Beautifully", description: "12 professional themes with 8 configurable sections. Real-time preview across Desktop, Tablet, and Phone devices.", color: "from-amber-500/20 to-orange-500/20" },
  { icon: Download, title: "Export Anywhere", description: "Generate ePub (v2/v3), print-ready PDF (CMYK, bleed, crop marks), and DOCX files with one click.", color: "from-rose-500/20 to-pink-500/20" },
  { icon: Users, title: "Collaborate Seamlessly", description: "Threaded comments, track changes, and real-time collaboration with your editors and co-authors.", color: "from-violet-500/20 to-purple-500/20" },
  { icon: Sparkles, title: "AI-Powered Writing", description: "Brainstorm ideas, continue writing, improve prose, generate dialogue, and fix grammar with AI assistance.", color: "from-cyan-500/20 to-blue-500/20" },
];

export function WelcomeTour() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem("kroj-tour-completed");
    if (!hasSeenTour) setOpen(true);
  }, []);

  const completeTour = () => {
    localStorage.setItem("kroj-tour-completed", "true");
    setOpen(false);
  };

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) completeTour(); }}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        {/* Gradient Header */}
        <div className={`bg-gradient-to-br ${current.color} p-8 flex flex-col items-center text-center relative`}>
          <button className="absolute top-3 right-3 text-muted-foreground/60 hover:text-foreground transition-colors" onClick={completeTour}>
            <X className="h-4 w-4" />
          </button>
          <div className="h-16 w-16 rounded-2xl bg-background/80 backdrop-blur flex items-center justify-center mb-4 shadow-lg">
            <current.icon className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-lg font-bold">{current.title}</h2>
          <p className="text-xs text-muted-foreground mt-2 max-w-xs leading-relaxed">{current.description}</p>
        </div>

        {/* Footer */}
        <div className="p-4">
          {/* Progress dots */}
          <div className="flex items-center justify-center gap-1.5 mb-4">
            {STEPS.map((_, i) => (
              <button key={i} className={`h-1.5 rounded-full transition-all ${i === step ? "w-6 bg-primary" : i < step ? "w-1.5 bg-primary/50" : "w-1.5 bg-muted-foreground/20"}`} onClick={() => setStep(i)} />
            ))}
          </div>

          <div className="flex gap-2">
            {step > 0 && (
              <Button variant="outline" className="flex-1 text-xs" onClick={() => setStep(step - 1)}>Back</Button>
            )}
            <Button className="flex-1 text-xs gap-1" onClick={() => isLast ? completeTour() : setStep(step + 1)}>
              {isLast ? "Get Started" : "Next"}
              {!isLast && <ArrowRight className="h-3 w-3" />}
            </Button>
          </div>
          <p className="text-[9px] text-muted-foreground text-center mt-2">
            {step + 1} of {STEPS.length} · <button className="hover:underline" onClick={completeTour}>Skip tour</button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
