"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  MessageCircle,
  Send,
  MoreHorizontal,
  Check,
  CheckCheck,
  User,
  Filter,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Comment {
  id: string;
  author: string;
  initials: string;
  color: string;
  text: string;
  timestamp: string;
  resolved: boolean;
  selectedText?: string;
  replies: Reply[];
}

interface Reply {
  id: string;
  author: string;
  initials: string;
  text: string;
  timestamp: string;
}

const DEMO_COMMENTS: Comment[] = [
  {
    id: "c1",
    author: "Sarah Mitchell",
    initials: "SM",
    color: "bg-blue-500",
    text: "This paragraph needs a stronger opening hook. Consider starting with dialogue instead of exposition.",
    timestamp: "2h ago",
    resolved: false,
    selectedText: "The morning sun rose slowly over the hills...",
    replies: [
      { id: "r1", author: "You", initials: "DL", text: "Good point! I'll rewrite with a dialogue opener.", timestamp: "1h ago" },
    ],
  },
  {
    id: "c2",
    author: "James Rodriguez",
    initials: "JR",
    color: "bg-green-500",
    text: "The pacing here feels rushed. Can we add a beat between the action sequences?",
    timestamp: "5h ago",
    resolved: false,
    selectedText: "She ran through the corridors...",
    replies: [],
  },
  {
    id: "c3",
    author: "Sarah Mitchell",
    initials: "SM",
    color: "bg-blue-500",
    text: "Perfect character introduction! The sensory details really ground the reader.",
    timestamp: "1d ago",
    resolved: true,
    replies: [],
  },
];

interface CommentsPanelProps {
  open: boolean;
  onClose: () => void;
}

export function CommentsPanel({ open, onClose }: CommentsPanelProps) {
  const [comments, setComments] = useState<Comment[]>(DEMO_COMMENTS);
  const [newComment, setNewComment] = useState("");
  const [filter, setFilter] = useState<"all" | "open" | "resolved">("all");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  if (!open) return null;

  const filtered = comments.filter((c) =>
    filter === "all" ? true : filter === "open" ? !c.resolved : c.resolved
  );

  const addComment = () => {
    if (!newComment.trim()) return;
    const comment: Comment = {
      id: `c${Date.now()}`,
      author: "You",
      initials: "DL",
      color: "bg-primary",
      text: newComment,
      timestamp: "Just now",
      resolved: false,
      replies: [],
    };
    setComments([comment, ...comments]);
    setNewComment("");
  };

  const addReply = (commentId: string) => {
    if (!replyText.trim()) return;
    setComments(
      comments.map((c) =>
        c.id === commentId
          ? { ...c, replies: [...c.replies, { id: `r${Date.now()}`, author: "You", initials: "DL", text: replyText, timestamp: "Just now" }] }
          : c
      )
    );
    setReplyText("");
    setReplyingTo(null);
  };

  const toggleResolved = (id: string) => {
    setComments(comments.map((c) => (c.id === id ? { ...c, resolved: !c.resolved } : c)));
  };

  return (
    <div className="w-72 border-l bg-background flex flex-col shrink-0 animate-in slide-in-from-right-4 duration-200">
      {/* Header */}
      <div className="flex items-center justify-between h-10 px-3 border-b shrink-0">
        <div className="flex items-center gap-1.5">
          <MessageCircle className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-medium">Comments</span>
          <Badge variant="secondary" className="text-[9px] h-4 px-1.5">{comments.filter((c) => !c.resolved).length}</Badge>
        </div>
        <div className="flex items-center gap-0.5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm" className="h-6 w-6"><Filter className="h-3 w-3" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-28">
              <DropdownMenuItem onClick={() => setFilter("all")} className="text-xs">All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("open")} className="text-xs">Open</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("resolved")} className="text-xs">Resolved</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="icon-sm" className="h-6 w-6" onClick={onClose}><X className="h-3 w-3" /></Button>
        </div>
      </div>

      {/* New Comment */}
      <div className="p-2 border-b">
        <div className="flex gap-1.5">
          <Input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="h-7 text-xs"
            onKeyDown={(e) => e.key === "Enter" && addComment()}
          />
          <Button size="icon-sm" className="h-7 w-7 shrink-0" onClick={addComment} disabled={!newComment.trim()}>
            <Send className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Comments List */}
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-30" />
            <p className="text-xs">No comments yet</p>
          </div>
        ) : (
          filtered.map((comment) => (
            <div key={comment.id} className={`p-2.5 border-b last:border-0 transition-colors ${comment.resolved ? "opacity-60" : "hover:bg-muted/30"}`}>
              {/* Selected Text */}
              {comment.selectedText && (
                <div className="text-[10px] text-muted-foreground italic bg-muted/50 rounded px-2 py-1 mb-1.5 border-l-2 border-primary/30 line-clamp-1">
                  &ldquo;{comment.selectedText}&rdquo;
                </div>
              )}

              {/* Author */}
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <div className={`h-5 w-5 rounded-full ${comment.color} text-white flex items-center justify-center text-[8px] font-medium`}>{comment.initials}</div>
                  <span className="text-[10px] font-medium">{comment.author}</span>
                  <span className="text-[9px] text-muted-foreground">{comment.timestamp}</span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon-sm" className="h-5 w-5 opacity-0 group-hover:opacity-100"><MoreHorizontal className="h-3 w-3" /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-28">
                    <DropdownMenuItem className="text-xs" onClick={() => toggleResolved(comment.id)}>
                      {comment.resolved ? "Reopen" : "Resolve"}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-xs text-destructive" onClick={() => setComments(comments.filter((c) => c.id !== comment.id))}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Text */}
              <p className="text-[11px] leading-relaxed mb-1.5">{comment.text}</p>

              {/* Status */}
              <div className="flex items-center justify-between">
                <button className="flex items-center gap-1 text-[9px] text-muted-foreground hover:text-foreground transition-colors" onClick={() => toggleResolved(comment.id)}>
                  {comment.resolved ? <><CheckCheck className="h-3 w-3 text-green-500" /> Resolved</> : <><Check className="h-3 w-3" /> Resolve</>}
                </button>
                <button className="text-[9px] text-muted-foreground hover:text-primary transition-colors" onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}>
                  Reply{comment.replies.length > 0 ? ` (${comment.replies.length})` : ""}
                </button>
              </div>

              {/* Replies */}
              {comment.replies.length > 0 && (
                <div className="mt-2 ml-3 pl-2 border-l space-y-1.5">
                  {comment.replies.map((reply) => (
                    <div key={reply.id}>
                      <div className="flex items-center gap-1 mb-0.5">
                        <span className="text-[9px] font-medium">{reply.author}</span>
                        <span className="text-[8px] text-muted-foreground">{reply.timestamp}</span>
                      </div>
                      <p className="text-[10px] leading-relaxed">{reply.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Reply Input */}
              {replyingTo === comment.id && (
                <div className="flex gap-1 mt-2">
                  <Input value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Reply..." className="h-6 text-[10px]" onKeyDown={(e) => e.key === "Enter" && addReply(comment.id)} autoFocus />
                  <Button size="icon-sm" className="h-6 w-6 shrink-0" onClick={() => addReply(comment.id)}><Send className="h-2.5 w-2.5" /></Button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
