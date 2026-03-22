"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Users, MessageSquare, GitBranch, Clock, Plus, BookOpen, Eye } from "lucide-react";
import Link from "next/link";

const SHARED_PROJECTS = [
  {
    id: "sp-1",
    title: "The Silent Horizon",
    owner: "Denison Zimmer",
    collaborators: ["Ana Silva", "Carlos Mendes"],
    role: "owner",
    lastActivity: "2 hours ago",
    comments: 12,
    changes: 5,
  },
  {
    id: "sp-2",
    title: "Anthology of Dreams",
    owner: "Ana Silva",
    collaborators: ["Denison Zimmer"],
    role: "editor",
    lastActivity: "1 day ago",
    comments: 7,
    changes: 2,
  },
];

export default function CollaborationPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 px-6 py-6 max-w-6xl mx-auto w-full">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          {[
            { label: "Shared Projects", value: "2", icon: BookOpen },
            { label: "Active Collaborators", value: "3", icon: Users },
            { label: "Pending Comments", value: "5", icon: MessageSquare },
            { label: "Recent Changes", value: "7", icon: GitBranch },
          ].map((stat) => (
            <Card key={stat.label} className="bg-muted/30">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-[11px] text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Shared Projects</h2>
          <Button size="sm" className="gap-1.5 h-8">
            <Plus className="h-3.5 w-3.5" /> Invite Collaborator
          </Button>
        </div>

        <div className="space-y-3">
          {SHARED_PROJECTS.map((project) => (
            <Card key={project.id} className="hover:shadow-sm transition-all hover:border-primary/20">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="w-10 h-14 rounded bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
                  <BookOpen className="h-5 w-5 text-primary/60" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{project.title}</span>
                    <Badge variant={project.role === "owner" ? "default" : "secondary"} className="text-[10px] py-0">
                      {project.role}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {project.collaborators.length + 1}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" /> {project.comments}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><GitBranch className="h-3 w-3" /> {project.changes} changes</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {project.lastActivity}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1.5">
                    {project.collaborators.map((c) => (
                      <div key={c} className="h-5 w-5 rounded-full bg-muted text-[8px] font-medium flex items-center justify-center" title={c}>
                        {c.split(" ").map((n) => n[0]).join("")}
                      </div>
                    ))}
                  </div>
                </div>

                <Button variant="outline" size="sm" className="gap-1 h-7 text-xs">
                  <Eye className="h-3 w-3" /> Open
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Separator className="my-8" />

        {/* Activity Feed */}
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {[
            { user: "Ana Silva", action: "commented on Chapter 5", project: "The Silent Horizon", time: "2 hours ago" },
            { user: "Carlos Mendes", action: "edited Chapter 12", project: "The Silent Horizon", time: "5 hours ago" },
            { user: "Ana Silva", action: "suggested a change in Chapter 3", project: "The Silent Horizon", time: "1 day ago" },
            { user: "You", action: "accepted 2 suggestions", project: "Anthology of Dreams", time: "2 days ago" },
          ].map((activity, i) => (
            <div key={i} className="flex items-center gap-3 text-sm">
              <div className="h-7 w-7 rounded-full bg-muted text-[9px] font-medium flex items-center justify-center shrink-0">
                {activity.user === "You" ? "DZ" : activity.user.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-medium">{activity.user}</span>{" "}
                <span className="text-muted-foreground">{activity.action}</span>{" "}
                <span className="text-muted-foreground">in</span>{" "}
                <span className="font-medium">{activity.project}</span>
              </div>
              <span className="text-xs text-muted-foreground shrink-0">{activity.time}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
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
          <Link href="/books"><Button variant="ghost" size="sm" className="text-muted-foreground">My Books</Button></Link>
          <Button variant="ghost" size="sm" className="text-foreground font-medium">Collaboration</Button>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium">DL</div>
        </div>
      </div>
    </header>
  );
}
