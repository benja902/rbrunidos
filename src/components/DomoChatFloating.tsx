"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MessageCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";

type Role = "user" | "assistant";

interface Message {
  role: Role;
  content: string;
}

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content:
    "¡Hola! Soy el asesor de RBR Cúpulas Geodésicas.\n\n¿Para qué uso estás pensando en un domo? (glamping, vivienda, evento, oficina...)\n\nCuéntame y te recomiendo el modelo ideal.",
};

export default function DomoChatFloating() {
  const [visible, setVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleOpen = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      setMessages([WELCOME_MESSAGE]);
    }
    setTimeout(() => inputRef.current?.focus(), 300);
  };

  const handleClose = () => setIsOpen(false);

  const sendMessage = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMsg: Message = { role: "user", content: trimmed };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");

    // reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.content ||
            "Ocurrió un error. Por favor intenta de nuevo.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Problema de conexión. Intenta nuevamente.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [input, messages, isLoading]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleTextareaInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const el = e.currentTarget;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 80) + "px";
  };

  return (
    <>
      {/* ── Chat panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-50 flex flex-col rounded-3xl overflow-hidden border border-white/10"
            style={{
              background: "#141414",
              width: "min(360px, calc(100vw - 1.5rem))",
              maxHeight: "min(540px, calc(100dvh - 110px))",
              boxShadow:
                "0 24px 64px rgba(0,0,0,0.45), 0 4px 16px rgba(0,0,0,0.25)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "#2F3A2E" }}
                >
                  {/* Dome icon */}
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 12a9 9 0 0 1 18 0" />
                    <path d="M3 12h18" />
                    <path d="M12 3v9" />
                    <path d="M6.5 7.5 12 12l5.5-4.5" />
                  </svg>
                </div>
                <div>
                  <p className="text-[14px] font-medium text-white leading-tight">
                    Asesor RBR
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <p className="text-[11px] text-white/40">En línea</p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 flex items-center justify-center rounded-xl transition-colors text-white/40 hover:text-white hover:bg-white/10"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
              style={{ minHeight: 0, scrollbarWidth: "none" }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "user" ? (
                    <div
                      className="max-w-[84%] px-4 py-2.5 rounded-2xl text-[13px] leading-relaxed whitespace-pre-wrap"
                      style={{
                        background: "#2F3A2E",
                        color: "rgba(255,255,255,0.92)",
                        borderBottomRightRadius: "6px",
                      }}
                    >
                      {msg.content}
                    </div>
                  ) : (
                    <div
                      className="max-w-[84%] px-4 py-2.5 rounded-2xl text-[13px] leading-relaxed"
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.80)",
                        borderBottomLeftRadius: "6px",
                      }}
                    >
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => <p className="my-1 leading-snug">{children}</p>,
                          strong: ({ children }) => <strong className="font-semibold text-white/95">{children}</strong>,
                          ol: ({ children }) => <ol className="pl-4 my-1 list-decimal space-y-0.5">{children}</ol>,
                          ul: ({ children }) => <ul className="pl-4 my-1 list-disc space-y-0.5">{children}</ul>,
                          li: ({ children }) => <li className="leading-snug">{children}</li>,
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div
                    className="px-4 py-3 rounded-2xl"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      borderBottomLeftRadius: "6px",
                    }}
                  >
                    <div className="flex gap-1 items-center h-4">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-white/40"
                          animate={{ y: [0, -4, 0] }}
                          transition={{
                            duration: 0.7,
                            repeat: Infinity,
                            delay: i * 0.15,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div
              className="px-4 pb-4 pt-3 flex-shrink-0"
              style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div
                className="flex items-end gap-2 rounded-2xl px-4 py-2.5"
                style={{ background: "rgba(255,255,255,0.07)" }}
              >
                <textarea
                  ref={(el) => {
                    (inputRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = el;
                    (textareaRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = el;
                  }}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onInput={handleTextareaInput}
                  placeholder="Escribe tu consulta..."
                  rows={1}
                  className="flex-1 bg-transparent text-white/90 placeholder-white/30 text-[13px] resize-none outline-none leading-relaxed"
                  style={{ maxHeight: "80px" }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-xl transition-all duration-150 disabled:opacity-25"
                  style={{ background: "#2F3A2E" }}
                >
                  <Send size={14} className="text-white translate-x-px" />
                </button>
              </div>
              <p className="text-[10px] text-white/20 text-center mt-2">
                IA · RBR Cúpulas Geodésicas · Perú
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating button ── */}
      <AnimatePresence>
        {visible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.93 }}
            onClick={isOpen ? handleClose : handleOpen}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center"
            style={{
              background: "#2F3A2E",
              boxShadow:
                "0 8px 32px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.14)",
            }}
            aria-label={isOpen ? "Cerrar chat" : "Abrir chat de asesoría"}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={22} className="text-white" />
                </motion.span>
              ) : (
                <motion.span
                  key="chat"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <MessageCircle size={22} className="text-white" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
