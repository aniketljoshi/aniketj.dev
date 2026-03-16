"use client";

import { useEffect, useRef, useState, useMemo, type FormEvent } from "react";
import { useChat } from "@ai-sdk/react";
import {
  Bot,
  Maximize2,
  Minimize2,
  RefreshCcw,
  Send,
  User,
  X,
} from "lucide-react";
import { MotionDiv } from "@/components/motion";
import { cn } from "@/lib/utils";

const SUGGESTIONS = [
  "What are his core skills?",
  "Tell me about featured projects",
  "Where does he work now?",
  "How can I contact him?",
];

const INITIAL_MESSAGE =
  "Hi! I'm Aniket's AI assistant. Ask me anything about his projects, experience, skills, or certifications!";

function getMessageText(msg: {
  parts?: Array<{ type: string; text?: string }>;
}): string {
  if (!msg.parts) return "";
  return msg.parts
    .filter((p) => p.type === "text" && p.text)
    .map((p) => p.text)
    .join("");
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

/** Lightweight markdown-to-JSX renderer for chat bubbles */
function MarkdownContent({ text }: { text: string }) {
  const elements = useMemo(() => {
    const lines = text.split("\n");
    const result: React.ReactNode[] = [];
    let listItems: React.ReactNode[] = [];
    let listType: "ol" | "ul" | null = null;
    let listStart = 0;

    function flushList() {
      if (listItems.length === 0) return;
      if (listType === "ol") {
        result.push(
          <ol
            key={`ol-${listStart}`}
            className="my-1.5 ml-4 list-decimal space-y-1 text-[13px]"
          >
            {listItems}
          </ol>,
        );
      } else {
        result.push(
          <ul
            key={`ul-${listStart}`}
            className="my-1.5 ml-4 list-disc space-y-1 text-[13px]"
          >
            {listItems}
          </ul>,
        );
      }
      listItems = [];
      listType = null;
    }

    function renderInline(str: string, keyPrefix: string): React.ReactNode[] {
      const parts: React.ReactNode[] = [];
      const regex = /\*\*(.+?)\*\*|`(.+?)`/g;
      let last = 0;
      let match: RegExpExecArray | null;
      let idx = 0;
      while ((match = regex.exec(str)) !== null) {
        if (match.index > last) {
          parts.push(str.slice(last, match.index));
        }
        if (match[1]) {
          parts.push(
            <strong key={`${keyPrefix}-b${idx}`} className="font-semibold">
              {match[1]}
            </strong>,
          );
        } else if (match[2]) {
          parts.push(
            <code
              key={`${keyPrefix}-c${idx}`}
              className="rounded bg-foreground/10 px-1 py-0.5 text-[12px] font-mono"
            >
              {match[2]}
            </code>,
          );
        }
        last = regex.lastIndex;
        idx++;
      }
      if (last < str.length) parts.push(str.slice(last));
      return parts;
    }

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const olMatch = line.match(/^(\d+)\.\s+(.+)/);
      const ulMatch = line.match(/^[-*]\s+(.+)/);

      if (olMatch) {
        if (listType !== "ol") {
          flushList();
          listType = "ol";
          listStart = i;
        }
        listItems.push(
          <li key={`li-${i}`}>{renderInline(olMatch[2], `li-${i}`)}</li>,
        );
      } else if (ulMatch) {
        if (listType !== "ul") {
          flushList();
          listType = "ul";
          listStart = i;
        }
        listItems.push(
          <li key={`li-${i}`}>{renderInline(ulMatch[1], `li-${i}`)}</li>,
        );
      } else {
        flushList();
        if (line.trim() === "") {
          result.push(<div key={`br-${i}`} className="h-1.5" />);
        } else {
          result.push(
            <p key={`p-${i}`} className="text-[13px] leading-[1.65]">
              {renderInline(line, `p-${i}`)}
            </p>,
          );
        }
      }
    }
    flushList();
    return result;
  }, [text]);

  return <div className="space-y-0.5">{elements}</div>;
}

export function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timestamps = useRef<Map<string, Date>>(new Map());

  const { messages, sendMessage, status, setMessages } = useChat();

  const isBusy = status === "submitted" || status === "streaming";

  useEffect(() => {
    const openChat = () => setIsOpen(true);
    window.addEventListener("open-ai-chat", openChat);
    return () => window.removeEventListener("open-ai-chat", openChat);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isBusy]);

  useEffect(() => {
    if (!isOpen) return;
    const timeoutId = window.setTimeout(() => inputRef.current?.focus(), 100);
    return () => window.clearTimeout(timeoutId);
  }, [isOpen]);

  // Track message creation timestamps
  useEffect(() => {
    for (const msg of messages) {
      if (!timestamps.current.has(msg.id)) {
        timestamps.current.set(msg.id, new Date());
      }
    }
  }, [messages]);

  function resetConversation() {
    setMessages([]);
    setInput("");
    timestamps.current.clear();
    inputRef.current?.focus();
  }

  function submit(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isBusy) return;
    setInput("");
    sendMessage({ text: trimmed });
  }

  function handleFormSubmit(event: FormEvent) {
    event.preventDefault();
    submit(input);
  }

  return (
    <>
      {/* Minimized — circular Bot icon */}
      {!isOpen && (
        <MotionDiv
          initial={{ scale: 0.95, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{
            delay: 1,
            type: "spring",
            stiffness: 180,
            damping: 18,
          }}
          className="fixed bottom-6 right-6 z-50"
        >
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary via-primary to-ring text-primary-foreground shadow-2xl shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-primary/40"
            aria-label="Open AI Assistant"
          >
            <Bot className="h-6 w-6" />
            <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-background bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.7)]" />
          </button>
        </MotionDiv>
      )}

      {/* Chat panel */}
      {isOpen && (
        <MotionDiv
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.22 }}
          className={cn(
            "fixed z-50 flex flex-col overflow-hidden rounded-[28px] border border-border/60 bg-background/96 shadow-2xl backdrop-blur-xl",
            isExpanded
              ? "inset-4"
              : "bottom-6 right-6 h-[560px] max-h-[calc(100vh-6rem)] w-[390px] max-w-[calc(100vw-2rem)]",
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/50 bg-gradient-to-r from-primary to-ring px-4 py-3 text-primary-foreground">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold">AI Assistant</div>
                <div className="flex items-center gap-1.5 text-[11px] text-primary-foreground/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                  Ready to help! Online
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={resetConversation}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-primary-foreground/80 transition-colors hover:bg-white/10 hover:text-primary-foreground"
                aria-label="Reset chat"
                type="button"
              >
                <RefreshCcw className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsExpanded((v) => !v)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-primary-foreground/80 transition-colors hover:bg-white/10 hover:text-primary-foreground"
                aria-label={isExpanded ? "Minimize chat" : "Expand chat"}
                type="button"
              >
                {isExpanded ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsExpanded(false);
                }}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-primary-foreground/80 transition-colors hover:bg-white/10 hover:text-primary-foreground"
                aria-label="Close chat"
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto p-4"
          >
            {messages.length === 0 ? (
              <div className="space-y-4">
                {/* Welcome bubble */}
                <div className="flex gap-2.5">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="max-w-[85%]">
                    <div className="rounded-2xl rounded-tl-sm bg-muted/70 px-3.5 py-2.5 text-[13px] leading-relaxed text-foreground/90 shadow-sm">
                      {INITIAL_MESSAGE}
                    </div>
                    <div className="mt-1 px-1 text-[10px] text-muted-foreground/50">
                      {formatTime(new Date())}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              messages.map((message) => {
                const text = getMessageText(message);
                const isUser = message.role === "user";
                const time = timestamps.current.get(message.id) ?? new Date();

                return (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-2.5",
                      isUser && "flex-row-reverse",
                    )}
                  >
                    {/* Avatar */}
                    <div
                      className={cn(
                        "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                        isUser
                          ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                          : "bg-primary/10 text-primary",
                      )}
                    >
                      {isUser ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4" />
                      )}
                    </div>

                    {/* Bubble + timestamp */}
                    <div
                      className={cn(
                        "max-w-[85%]",
                        isUser && "flex flex-col items-end",
                      )}
                    >
                      <div
                        className={cn(
                          "rounded-2xl px-3.5 py-2.5 shadow-sm",
                          isUser
                            ? "rounded-tr-sm bg-emerald-500 text-white dark:bg-emerald-600"
                            : "rounded-tl-sm bg-muted/70 text-foreground/90",
                        )}
                      >
                        {isUser ? (
                          <p className="text-[13px] leading-relaxed">{text}</p>
                        ) : (
                          <MarkdownContent text={text} />
                        )}
                      </div>
                      <div
                        className={cn(
                          "mt-1 px-1 text-[10px] text-muted-foreground/50",
                          isUser && "text-right",
                        )}
                      >
                        {formatTime(time)}
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {/* Typing indicator */}
            {isBusy && messages[messages.length - 1]?.role !== "assistant" && (
              <div className="flex gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="rounded-2xl rounded-tl-sm bg-muted/70 px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:0ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:150ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick suggestions — fixed at bottom */}
          <div className="flex flex-wrap gap-1.5 border-t border-border/30 bg-background/80 px-3 pt-2 pb-1">
            {SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => submit(suggestion)}
                disabled={isBusy}
                className="rounded-full border border-border/60 bg-background/70 px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary disabled:opacity-40"
                type="button"
              >
                {suggestion}
              </button>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={handleFormSubmit}
            className="border-t border-border/50 bg-background/90 px-3 py-3"
          >
            <div className="flex items-center gap-2 rounded-2xl border border-border/60 bg-muted/35 p-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask Me Anything...!"
                className="flex-1 bg-transparent px-2 text-sm text-foreground outline-none placeholder:text-muted-foreground/55"
              />
              <button
                type="submit"
                disabled={!input.trim() || isBusy}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </MotionDiv>
      )}
    </>
  );
}
