"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, PanelRightClose, PanelRightOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { useChatContext } from "@/context/ChatContext";
import * as ScrollArea from "@radix-ui/react-scroll-area";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "¡Hola! Soy tu asistente de Equilibriate. ¿En qué puedo ayudarte hoy? Puedo responder preguntas sobre nuestros tés, ayudarte con tu pedido o darte recomendaciones personalizadas.",
    timestamp: new Date(),
  },
];

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isCollapsed, toggleCollapsed } = useChatContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulated response - this will be connected to an agent later
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Gracias por tu mensaje. En este momento estoy en modo de demostración. Pronto podré ayudarte con información sobre nuestros productos, realizar pedidos y mucho más.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
  };

  // Mobile floating button
  const MobileToggle = () => (
    <button
      onClick={() => setIsMobileOpen(!isMobileOpen)}
      className="lg:hidden fixed bottom-4 right-4 z-50 bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:bg-primary/90 transition-all"
    >
      <Bot className="h-6 w-6" />
    </button>
  );

  return (
    <>
      <MobileToggle />

      {/* Desktop Chat Panel */}
      <div
        className={cn(
          "hidden lg:flex flex-col bg-chat-bg text-chat-foreground h-full transition-all duration-300 ease-in-out",
          isCollapsed ? "w-14" : "w-full"
        )}
      >
        {/* Header */}
        <div className={cn(
          "flex items-center p-4 border-b border-white/10",
          isCollapsed ? "justify-center" : "justify-between"
        )}>
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 p-2 rounded-full">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold text-sm">Asistente Equilibriate</h2>
                <p className="text-xs text-chat-foreground/60">En línea</p>
              </div>
            </div>
          )}
          <button
            onClick={toggleCollapsed}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title={isCollapsed ? "Abrir chat" : "Cerrar chat"}
          >
            {isCollapsed ? (
              <PanelRightOpen className="h-5 w-5" />
            ) : (
              <PanelRightClose className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Collapsed state - vertical text */}
        {isCollapsed && (
          <button
            onClick={toggleCollapsed}
            className="flex-1 flex items-center justify-center hover:bg-white/5 transition-colors"
          >
            <span className="writing-vertical text-xs font-medium text-chat-foreground/60 tracking-wider">
              CHAT
            </span>
          </button>
        )}

        {!isCollapsed && (
          <>
            {/* Messages */}
            <ScrollArea.Root className="flex-1 overflow-hidden">
              <ScrollArea.Viewport className="h-full w-full p-4 chat-scrollbar">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex gap-3",
                        message.role === "user" ? "flex-row-reverse" : "flex-row"
                      )}
                    >
                      <div
                        className={cn(
                          "shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                          message.role === "user"
                            ? "bg-secondary/20"
                            : "bg-primary/20"
                        )}
                      >
                        {message.role === "user" ? (
                          <User className="h-4 w-4 text-secondary" />
                        ) : (
                          <Bot className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <div
                        className={cn(
                          "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                          message.role === "user"
                            ? "bg-primary text-primary-foreground rounded-tr-sm"
                            : "bg-white/10 rounded-tl-sm"
                        )}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar
                className="flex select-none touch-none p-0.5 bg-transparent transition-colors duration-150 ease-out data-[orientation=vertical]:w-2"
                orientation="vertical"
              >
                <ScrollArea.Thumb className="flex-1 bg-white/20 rounded-full relative" />
              </ScrollArea.Scrollbar>
            </ScrollArea.Root>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-gray-400"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </form>
          </>
        )}
      </div>

      {/* Mobile Chat Modal */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-chat-bg text-chat-foreground flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 p-2 rounded-full">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold text-sm">Asistente Equilibriate</h2>
                <p className="text-xs text-chat-foreground/60">En línea</p>
              </div>
            </div>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <PanelRightClose className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <ScrollArea.Root className="flex-1 overflow-hidden">
            <ScrollArea.Viewport className="h-full w-full p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-3",
                      message.role === "user" ? "flex-row-reverse" : "flex-row"
                    )}
                  >
                    <div
                      className={cn(
                        "shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                        message.role === "user"
                          ? "bg-secondary/20"
                          : "bg-primary/20"
                      )}
                    >
                      {message.role === "user" ? (
                        <User className="h-4 w-4 text-secondary" />
                      ) : (
                        <Bot className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div
                      className={cn(
                        "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                        message.role === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-sm"
                          : "bg-white/10 rounded-tl-sm"
                      )}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea.Viewport>
          </ScrollArea.Root>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-gray-400"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
