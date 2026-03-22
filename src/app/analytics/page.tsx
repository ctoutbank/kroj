"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  BarChart3,
  Calendar,
  Clock,
  FileText,
  Flame,
  PenTool,
  Target,
  TrendingUp,
  BookOpen,
  ArrowLeft,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";

const DAILY_STATS = [
  { day: "Mon", words: 1200 },
  { day: "Tue", words: 890 },
  { day: "Wed", words: 2100 },
  { day: "Thu", words: 1560 },
  { day: "Fri", words: 780 },
  { day: "Sat", words: 2400 },
  { day: "Sun", words: 1900 },
];

const WEEKLY_STATS = [
  { week: "W1", words: 8500 },
  { week: "W2", words: 12300 },
  { week: "W3", words: 9800 },
  { week: "W4", words: 15200 },
];

const CHAPTER_STATS = [
  { name: "The Beginning", words: 8234, progress: 95 },
  { name: "Rising Action", words: 12456, progress: 78 },
  { name: "The Climax", words: 6890, progress: 45 },
  { name: "Resolution", words: 3200, progress: 20 },
  { name: "Epilogue", words: 450, progress: 5 },
];

const SESSIONS = [
  { date: "Today", duration: "2h 15m", words: 1842, pages: 7 },
  { date: "Yesterday", duration: "1h 45m", words: 1230, pages: 5 },
  { date: "Mar 20", duration: "3h 20m", words: 2890, pages: 11 },
  { date: "Mar 19", duration: "0h 55m", words: 680, pages: 3 },
  { date: "Mar 18", duration: "2h 05m", words: 1560, pages: 6 },
];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<"week" | "month">("week");
  const maxDaily = Math.max(...DAILY_STATS.map((d) => d.words));
  const maxWeekly = Math.max(...WEEKLY_STATS.map((w) => w.words));

  const totalWords = 45230;
  const avgWordsPerDay = 1547;
  const totalSessions = 32;
  const currentStreak = 7;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon-sm"><ArrowLeft className="h-4 w-4" /></Button>
          </Link>
          <div>
            <h1 className="text-sm font-semibold">Writing Analytics</h1>
            <p className="text-[10px] text-muted-foreground">My First Book</p>
          </div>
          <div className="flex-1" />
          <div className="flex gap-1">
            {(["week", "month"] as const).map((p) => (
              <Button key={p} variant={period === p ? "default" : "outline"} size="sm" className="h-7 text-xs capitalize" onClick={() => setPeriod(p)}>{p}</Button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-4">
          <KpiCard icon={FileText} label="Total Words" value={totalWords.toLocaleString()} trend="+12%" trendUp />
          <KpiCard icon={TrendingUp} label="Avg Words/Day" value={avgWordsPerDay.toLocaleString()} trend="+5%" trendUp />
          <KpiCard icon={Clock} label="Sessions" value={totalSessions.toString()} trend="32 total" />
          <KpiCard icon={Flame} label="Current Streak" value={`${currentStreak} days`} trend="Best: 14" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Daily Chart */}
          <Card className="col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-primary" />
                {period === "week" ? "Daily Word Count" : "Weekly Word Count"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2 h-40">
                {(period === "week" ? DAILY_STATS : WEEKLY_STATS).map((item, i) => {
                  const val = "words" in item ? item.words : 0;
                  const max = period === "week" ? maxDaily : maxWeekly;
                  const height = (val / max) * 100;
                  const label = "day" in item ? item.day : "week" in item ? item.week : "";
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-[8px] text-muted-foreground">{val.toLocaleString()}</span>
                      <div className="w-full rounded-t-sm bg-primary/20 relative" style={{ height: `${height}%`, minHeight: 4 }}>
                        <div className="absolute inset-0 bg-primary rounded-t-sm opacity-80 hover:opacity-100 transition-opacity" />
                      </div>
                      <span className="text-[9px] text-muted-foreground">{label}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Writing Goal Progress */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" /> Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <GoalProgress label="Daily" current={1842} target={2000} />
              <GoalProgress label="Weekly" current={10830} target={14000} />
              <GoalProgress label="Book" current={45230} target={80000} />
              <Separator />
              <div className="text-center space-y-1">
                <p className="text-2xl font-bold text-primary">{currentStreak}</p>
                <p className="text-[10px] text-muted-foreground">Day Streak 🔥</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Chapter Progress */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" /> Chapter Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {CHAPTER_STATS.map((ch) => (
                <div key={ch.name}>
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[11px] font-medium">{ch.name}</span>
                    <span className="text-[9px] text-muted-foreground">{ch.words.toLocaleString()} words</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${ch.progress}%` }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Sessions */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" /> Recent Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {SESSIONS.map((session, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5 border-b last:border-0">
                    <div>
                      <p className="text-[11px] font-medium">{session.date}</p>
                      <p className="text-[9px] text-muted-foreground flex items-center gap-1">
                        <Clock className="h-2.5 w-2.5" /> {session.duration}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] font-semibold">{session.words.toLocaleString()} words</p>
                      <p className="text-[9px] text-muted-foreground">{session.pages} pages</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

function KpiCard({ icon: Icon, label, value, trend, trendUp }: { icon: React.ElementType; label: string; value: string; trend: string; trendUp?: boolean }) {
  return (
    <Card>
      <CardContent className="pt-4 pb-3 px-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-7 w-7 rounded-md bg-primary/10 flex items-center justify-center">
            <Icon className="h-3.5 w-3.5 text-primary" />
          </div>
          <span className="text-[10px] text-muted-foreground">{label}</span>
        </div>
        <p className="text-xl font-bold">{value}</p>
        <p className={`text-[9px] mt-0.5 ${trendUp ? "text-green-600" : "text-muted-foreground"}`}>{trend}</p>
      </CardContent>
    </Card>
  );
}

function GoalProgress({ label, current, target }: { label: string; current: number; target: number }) {
  const pct = Math.min((current / target) * 100, 100);
  return (
    <div>
      <div className="flex items-center justify-between mb-0.5">
        <span className="text-[10px] font-medium">{label}</span>
        <span className="text-[9px] text-muted-foreground">{current.toLocaleString()} / {target.toLocaleString()}</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full">
        <div className={`h-full rounded-full transition-all ${pct >= 100 ? "bg-green-500" : "bg-primary"}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
