"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Target, Flame, Trophy, TrendingUp, Calendar, Clock, Plus, Pencil, Trash2 } from "lucide-react";

interface GoalsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface WritingGoal {
  id: string;
  type: "daily" | "session" | "project";
  target: number;
  current: number;
  unit: "words" | "minutes" | "chapters";
  label: string;
  streak?: number;
}

const DEFAULT_GOALS: WritingGoal[] = [
  { id: "g1", type: "daily", target: 1500, current: 0, unit: "words", label: "Daily Word Goal", streak: 12 },
  { id: "g2", type: "session", target: 45, current: 0, unit: "minutes", label: "Session Timer", streak: 0 },
  { id: "g3", type: "project", target: 80000, current: 45230, unit: "words", label: "Book Target" },
];

export function GoalsDialog({ open, onOpenChange }: GoalsDialogProps) {
  const [goals, setGoals] = useState<WritingGoal[]>(DEFAULT_GOALS);
  const [editingId, setEditingId] = useState<string | null>(null);

  const getProgress = (goal: WritingGoal) => Math.min(100, Math.round((goal.current / goal.target) * 100));
  const getUnit = (unit: string) => unit === "words" ? "words" : unit === "minutes" ? "min" : "ch";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><Target className="h-5 w-5 text-primary" /> Writing Goals</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-orange-50 dark:bg-orange-500/10 rounded-lg p-3 text-center">
              <Flame className="h-5 w-5 text-orange-500 mx-auto mb-1" />
              <p className="text-lg font-bold">12</p>
              <p className="text-[10px] text-muted-foreground">Day Streak</p>
            </div>
            <div className="bg-green-50 dark:bg-green-500/10 rounded-lg p-3 text-center">
              <Trophy className="h-5 w-5 text-green-500 mx-auto mb-1" />
              <p className="text-lg font-bold">42</p>
              <p className="text-[10px] text-muted-foreground">Goals Met</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-500/10 rounded-lg p-3 text-center">
              <TrendingUp className="h-5 w-5 text-blue-500 mx-auto mb-1" />
              <p className="text-lg font-bold">1.2k</p>
              <p className="text-[10px] text-muted-foreground">Avg/Day</p>
            </div>
          </div>

          <Separator />

          {/* Goals List */}
          <div className="space-y-3">
            {goals.map((goal) => (
              <div key={goal.id} className="p-3 rounded-lg border group hover:border-primary/20 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {goal.type === "daily" && <Calendar className="h-3.5 w-3.5 text-orange-500" />}
                    {goal.type === "session" && <Clock className="h-3.5 w-3.5 text-blue-500" />}
                    {goal.type === "project" && <Target className="h-3.5 w-3.5 text-green-500" />}
                    <span className="text-sm font-medium">{goal.label}</span>
                    {goal.streak !== undefined && goal.streak > 0 && (
                      <Badge variant="secondary" className="text-[9px] h-4 px-1.5 gap-0.5">
                        <Flame className="h-2.5 w-2.5 text-orange-500" />{goal.streak}
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon-sm" className="h-6 w-6" onClick={() => setEditingId(goal.id)}><Pencil className="h-3 w-3" /></Button>
                    <Button variant="ghost" size="icon-sm" className="h-6 w-6 text-destructive" onClick={() => setGoals(goals.filter((g) => g.id !== goal.id))}><Trash2 className="h-3 w-3" /></Button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${getProgress(goal) >= 100 ? "bg-green-500" : getProgress(goal) > 50 ? "bg-primary" : "bg-primary/70"}`}
                      style={{ width: `${getProgress(goal)}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-medium text-muted-foreground min-w-[50px] text-right">
                    {goal.current.toLocaleString()} / {goal.target.toLocaleString()} {getUnit(goal.unit)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <Button variant="outline" size="sm" className="w-full gap-1.5 text-xs h-8"
            onClick={() => {
              const newGoal: WritingGoal = { id: `g${Date.now()}`, type: "daily", target: 1000, current: 0, unit: "words", label: "New Goal" };
              setGoals([...goals, newGoal]);
              setEditingId(newGoal.id);
            }}>
            <Plus className="h-3.5 w-3.5" /> Add Goal
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
