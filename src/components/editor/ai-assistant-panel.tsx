"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sparkles,
  Send,
  X,
  Copy,
  ArrowRight,
  RefreshCw,
  Wand2,
  BookOpen,
  MessageSquare,
  Lightbulb,
  Pencil,
  Zap,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const QUICK_ACTIONS = [
  { icon: Pencil, label: "Continue writing", prompt: "Continue writing from where I left off, maintaining the same tone and style." },
  { icon: Lightbulb, label: "Brainstorm ideas", prompt: "Suggest 5 creative ideas for the next scene in this chapter." },
  { icon: Wand2, label: "Improve prose", prompt: "Improve the prose of the selected text. Make it more vivid and engaging." },
  { icon: MessageSquare, label: "Write dialogue", prompt: "Write a dialogue exchange between two characters based on the current scene." },
  { icon: BookOpen, label: "Chapter summary", prompt: "Generate a summary of this chapter highlighting key plot points." },
  { icon: Zap, label: "Fix grammar", prompt: "Fix any grammar, spelling, and punctuation errors in the selected text." },
];

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome",
    role: "assistant",
    content: "Hi! I'm your AI writing assistant. I can help you continue writing, brainstorm ideas, improve prose, generate dialogue, and more. How can I help with your manuscript today?",
    timestamp: "now",
  },
];

interface AiAssistantPanelProps {
  open: boolean;
  onClose: () => void;
}

export function AiAssistantPanel({ open, onClose }: AiAssistantPanelProps) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!open) return null;

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: `u${Date.now()}`, role: "user", content: text, timestamp: "now" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    await new Promise((r) => setTimeout(r, 1500 + Math.random() * 1000));

    const responses: Record<string, string> = {
      "Continue writing": "The mist clung to the valley floor like a silken veil, obscuring the path ahead. Elena paused at the ridge, her breath forming small clouds in the chill air. Below, the village lights flickered — tiny beacons of warmth in an otherwise cold world.\n\n\"We should move before dawn,\" Kael whispered from behind her, his hand resting on the pommel of his sword. \"The sentries change shift at first light.\"\n\nShe nodded, though something in the stillness gave her pause. A feeling, unnameable and deep, that they were being watched.",
      "Brainstorm ideas": "Here are 5 ideas for your next scene:\n\n1. **The Hidden Letter** — Elena discovers a letter sewn into the lining of her father's old coat, revealing a secret alliance.\n\n2. **The Market Confrontation** — While buying supplies in the border town, Kael recognizes a former comrade who betrayed their unit.\n\n3. **The Storm** — A sudden blizzard forces the group to seek shelter in an abandoned monastery with its own dark history.\n\n4. **The Dream Sequence** — Elena has a vivid dream that mirrors real events, blurring the line between prophecy and memory.\n\n5. **The Unexpected Ally** — A street child offers to guide them through the underground tunnels in exchange for a promise.",
      "Improve prose": "Here's the improved version:\n\n*Before:* \"She walked through the dark forest feeling scared.\"\n\n*After:* \"She threaded through the ancient pines, their gnarled branches reaching overhead like the fingers of sleeping giants. Every shadow held potential menace; every rustle of undergrowth quickened her pulse. The forest breathed around her — patient, watchful, immeasurably old.\"",
      "Write dialogue": "\"You knew,\" Elena said, her voice barely above a whisper. \"You knew about the passage all along.\"\n\nKael didn't look up from the map. \"Knowing and saying are different things.\"\n\n\"Not when lives hang in the balance.\" She slammed her palm on the table. The candle flame stuttered.\n\nHe finally met her eyes. In the dim light, she saw something she hadn't expected — not defiance, but regret.\n\n\"I was protecting you,\" he said simply.\n\n\"From what?\"\n\nA long silence. Then: \"From the choice I knew you'd make.\"",
      "Chapter summary": "**Chapter Summary:**\n\nElena and Kael cross the border into the Northern Territories, evading imperial patrols. They discover the village of Thornhaven has been evacuated — tables set for dinner, fires still smoldering, but no souls in sight. A series of symbols carved into doorframes hints at the work of the Veilwalkers. The chapter ends with Elena finding her mother's ring in the village well, raising questions about her family's connection to events she thought she understood.",
      "Fix grammar": "I've corrected the following issues:\n\n- ~~\"Their going to the castle\"~~ → \"**They're** going to the castle\"\n- ~~\"The knight's fought bravely\"~~ → \"The knight**s** fought bravely\" (no apostrophe)\n- ~~\"She lead the army\"~~ → \"She **led** the army\" (past tense)\n- ~~\"alot of soldiers\"~~ → \"**a lot** of soldiers\"\n- ~~\"effect the outcome\"~~ → \"**affect** the outcome\"\n\n✅ 5 corrections applied.",
    };

    const matchedKey = Object.keys(responses).find((k) => text.includes(k));
    const aiContent = matchedKey ? responses[matchedKey] : "I'd be happy to help with that! Based on the context of your current chapter, here are my suggestions:\n\nThe narrative voice you've established is strong — conversational yet literary. I'd recommend leaning into that by:\n\n1. Using more sensory details (what characters smell, touch, taste)\n2. Varying sentence length for rhythm\n3. Adding subtext to dialogue — what characters *don't* say matters\n\nWould you like me to demonstrate any of these techniques with a specific passage?";

    const aiMsg: Message = { id: `a${Date.now()}`, role: "assistant", content: aiContent, timestamp: "now" };
    setMessages((prev) => [...prev, aiMsg]);
    setIsTyping(false);
  };

  return (
    <div className="w-80 border-l bg-background flex flex-col shrink-0 animate-in slide-in-from-right-4 duration-200">
      {/* Header */}
      <div className="flex items-center justify-between h-10 px-3 border-b shrink-0">
        <div className="flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-medium">AI Assistant</span>
          <Badge variant="secondary" className="text-[8px] h-3.5 px-1">Beta</Badge>
        </div>
        <Button variant="ghost" size="icon-sm" className="h-6 w-6" onClick={onClose}>
          <X className="h-3 w-3" />
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="p-2 border-b">
        <div className="grid grid-cols-2 gap-1">
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action.label}
              className="flex items-center gap-1.5 px-2 py-1.5 text-[10px] rounded-md hover:bg-muted transition-colors text-left"
              onClick={() => sendMessage(action.prompt)}
              disabled={isTyping}
            >
              <action.icon className="h-3 w-3 text-primary shrink-0" />
              <span className="truncate">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-2 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[90%] rounded-lg px-2.5 py-1.5 text-[11px] leading-relaxed ${
              msg.role === "user"
                ? "bg-primary text-primary-foreground"
                : "bg-muted"
            }`}>
              {msg.role === "assistant" && (
                <div className="flex items-center gap-1 mb-1">
                  <Sparkles className="h-2.5 w-2.5" />
                  <span className="text-[9px] font-medium opacity-70">Kroj AI</span>
                </div>
              )}
              <div className="whitespace-pre-wrap">{msg.content}</div>
              {msg.role === "assistant" && msg.id !== "welcome" && (
                <div className="flex items-center gap-1 mt-1.5 pt-1 border-t border-border/50">
                  <Button variant="ghost" size="icon-sm" className="h-5 w-5 opacity-60 hover:opacity-100" title="Copy">
                    <Copy className="h-2.5 w-2.5" />
                  </Button>
                  <Button variant="ghost" size="icon-sm" className="h-5 w-5 opacity-60 hover:opacity-100" title="Insert into editor">
                    <ArrowRight className="h-2.5 w-2.5" />
                  </Button>
                  <Button variant="ghost" size="icon-sm" className="h-5 w-5 opacity-60 hover:opacity-100" title="Regenerate">
                    <RefreshCw className="h-2.5 w-2.5" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg px-3 py-2">
              <div className="flex items-center gap-1">
                <Sparkles className="h-2.5 w-2.5 text-primary animate-pulse" />
                <span className="text-[9px] text-muted-foreground">Writing...</span>
              </div>
              <div className="flex gap-1 mt-1">
                <span className="h-1.5 w-1.5 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="h-1.5 w-1.5 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="h-1.5 w-1.5 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-2 border-t">
        <div className="flex gap-1.5">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about your book..."
            className="h-8 text-xs"
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
            disabled={isTyping}
          />
          <Button size="icon-sm" className="h-8 w-8 shrink-0" onClick={() => sendMessage(input)} disabled={!input.trim() || isTyping}>
            <Send className="h-3.5 w-3.5" />
          </Button>
        </div>
        <p className="text-[8px] text-muted-foreground text-center mt-1">AI may make mistakes. Review suggestions carefully.</p>
      </div>
    </div>
  );
}
