"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  Bell,
  Check,
  MessageCircle,
  Download,
  Users,
  Sparkles,
  BookOpen,
} from "lucide-react";

interface Notification {
  id: string;
  type: "comment" | "export" | "collab" | "ai" | "system";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const NOTIFICATIONS: Notification[] = [
  { id: "1", type: "comment", title: "New comment", message: "Sarah Mitchell commented on Chapter 1: \"The opening paragraph needs...\"", time: "2m ago", read: false },
  { id: "2", type: "export", title: "Export complete", message: "Your ePub file has been generated successfully.", time: "15m ago", read: false },
  { id: "3", type: "collab", title: "Collaborator joined", message: "James Rodriguez accepted your invitation.", time: "1h ago", read: false },
  { id: "4", type: "ai", title: "AI suggestion ready", message: "Your chapter summary has been generated.", time: "2h ago", read: true },
  { id: "5", type: "system", title: "Auto-saved", message: "Your manuscript has been automatically saved.", time: "3h ago", read: true },
];

const ICON_MAP: Record<string, React.ElementType> = {
  comment: MessageCircle,
  export: Download,
  collab: Users,
  ai: Sparkles,
  system: BookOpen,
};

const COLOR_MAP: Record<string, string> = {
  comment: "bg-blue-100 text-blue-600",
  export: "bg-green-100 text-green-600",
  collab: "bg-purple-100 text-purple-600",
  ai: "bg-amber-100 text-amber-600",
  system: "bg-gray-100 text-gray-600",
};

export function NotificationCenter() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon-sm" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-primary text-primary-foreground text-[8px] font-bold rounded-full flex items-center justify-center">{unreadCount}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between px-3 py-2 border-b">
          <h3 className="text-xs font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <button className="text-[10px] text-primary hover:underline" onClick={markAllRead}>Mark all read</button>
          )}
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.map((n) => {
            const Icon = ICON_MAP[n.type];
            const colorClass = COLOR_MAP[n.type];
            return (
              <button key={n.id} className={`w-full flex gap-2.5 px-3 py-2.5 text-left hover:bg-muted/50 transition-colors ${!n.read ? "bg-primary/5" : ""}`} onClick={() => markRead(n.id)}>
                <div className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 ${colorClass}`}>
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-semibold">{n.title}</span>
                    {!n.read && <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />}
                  </div>
                  <p className="text-[10px] text-muted-foreground line-clamp-2 mt-0.5">{n.message}</p>
                  <span className="text-[8px] text-muted-foreground/70 mt-0.5">{n.time}</span>
                </div>
              </button>
            );
          })}
        </div>
        <Separator />
        <div className="px-3 py-2 text-center">
          <button className="text-[10px] text-primary hover:underline">View all notifications</button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
