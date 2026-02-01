"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, PanelRightClose, PanelRightOpen, AlertCircle, Plus, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useChatContext } from "@/context/ChatContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useChat } from "@/hooks/useChat";
import { MAX_MESSAGE_LENGTH } from "@/types/chat";

export function ChatPanel() {
  const [input, setInput] = useState("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isCollapsed, toggleCollapsed } = useChatContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { conversation, conversations, sendMessage, createConversation, setActiveConversation, isLoading, error } = useChat();
  const [showConversations, setShowConversations] = useState(false);

  const messages = conversation?.messages || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages, messages.length]);

  // Auto-scroll cuando cambia el último mensaje (streaming)
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === "assistant") {
      scrollToBottom();
    }
  }, [messages[messages.length - 1]?.content]);

  // Bloquear scroll del body cuando el chat móvil esté abierto
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    // Cleanup
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isMobileOpen]);

  // Listener para abrir el chat desde cualquier lugar via postMessage
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Solo procesar mensajes con la estructura esperada
      if (event.data?.type === 'OPEN_CHAT') {
        // Detectar si es móvil o desktop
        const isMobile = window.innerWidth < 1024; // lg breakpoint

        if (isMobile) {
          setIsMobileOpen(true);
        } else {
          // En desktop, expandir el chat si está colapsado
          if (isCollapsed) {
            toggleCollapsed();
          }
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [isCollapsed, toggleCollapsed]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Validar longitud
    if (input.length > MAX_MESSAGE_LENGTH) {
      return; // El error se mostrará en el UI
    }

    await sendMessage(input);
    setInput("");
  };
  const remainingChars = MAX_MESSAGE_LENGTH - input.length;
  const isOverLimit = remainingChars < 0;

  // Mobile floating button
  const MobileToggle = () => (
    <button
      onClick={() => setIsMobileOpen(!isMobileOpen)}
      className="lg:hidden fixed bottom-4 right-4 z-90 bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:bg-primary/90 transition-all"
    >
      <Bot className="h-6 w-6" />
    </button>
  );

  return (
    <>
      {!isMobileOpen && <MobileToggle />}

      {/* Desktop Chat Panel */}
      <div
        className={cn(
          "hidden lg:flex flex-col bg-chat-bg text-chat-foreground h-full transition-all duration-300 ease-in-out",
          isCollapsed ? "w-14" : "w-full"
        )}
      >
        {/* Header */}
        <div className={cn(
          "flex flex-col border-b border-white/10",
          isCollapsed ? "" : ""
        )}>
          <div className={cn(
            "flex items-center p-4",
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

          {/* Conversation Selector */}
          {!isCollapsed && (
            <div className="px-4 pb-3 relative">
              <button
                onClick={() => setShowConversations(!showConversations)}
                className="w-full flex items-center justify-between px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-sm"
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span className="truncate">{conversation?.title || "Nueva conversación"}</span>
                </div>
                <span className="text-xs text-chat-foreground/40">
                  {conversations.length}
                </span>
              </button>

              {/* Dropdown */}
              {showConversations && (
                <div className="absolute top-full left-4 right-4 mt-1 bg-chat-bg border border-white/10 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                  <button
                    onClick={() => {
                      createConversation();
                      setShowConversations(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 hover:bg-white/10 transition-colors text-sm border-b border-white/10"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Nueva conversación</span>
                  </button>
                  {conversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => {
                        setActiveConversation(conv.id);
                        setShowConversations(false);
                      }}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 hover:bg-white/10 transition-colors text-sm text-left",
                        conversation?.id === conv.id && "bg-white/10"
                      )}
                    >
                      <span className="truncate flex-1">{conv.title}</span>
                      <span className="text-xs text-chat-foreground/40 ml-2">
                        {conv.messages.length - 1}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Collapsed state - vertical text */}
        {isCollapsed && (
          <button
            onClick={toggleCollapsed}
            className="flex-1 flex items-center justify-center hover:bg-white/5 transition-colors"
          >
            <span className="writing-vertical text-xs font-medium text-chat-foreground/60 tracking-wider">
              ASISTENTE NUTRICIONAL INTELIGENTE
            </span>
          </button>
        )}

        {!isCollapsed && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-4">
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
                        {message.role === "assistant" ? (
                          <div className="prose prose-sm max-w-none [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1 *:text-current">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {message.content}
                            </ReactMarkdown>
                          </div>
                        ) : (
                          message.content
                        )}
                      </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
              {error && (
                <div className="mb-2 p-2 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-xs text-red-300">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              )}
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    style={{
                      fontSize: "16px"
                    }}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Escribe tu mensaje..."
                    maxLength={MAX_MESSAGE_LENGTH}
                    disabled={isLoading}
                    className={cn(
                      "flex-1 bg-white border rounded-full px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 placeholder:text-gray-400 disabled:opacity-50",
                      isOverLimit
                        ? "border-red-500 focus:ring-red-500/50"
                        : "border-gray-200 focus:ring-primary/50"
                    )}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading || isOverLimit}
                    className="bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex justify-between text-xs px-2">
                  <span className="text-chat-foreground/40">
                    {isLoading ? "Enviando..." : ""}
                  </span>
                  <span
                    className={cn(
                      "transition-colors",
                      isOverLimit
                        ? "text-red-400 font-medium"
                        : remainingChars < 50
                        ? "text-yellow-400"
                        : "text-chat-foreground/40"
                    )}
                  >
                    {remainingChars} caracteres restantes
                  </span>
                </div>
              </div>
            </form>
          </>
        )}
      </div>

      {/* Mobile Chat Modal */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-100 bg-chat-bg text-chat-foreground flex flex-col">
          {/* Close Button - Fixed */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="fixed top-4 right-4 z-110 p-2 bg-chat-bg/80 backdrop-blur-sm border border-white/10 hover:bg-white/10 rounded-full transition-colors shadow-lg"
          >
            <PanelRightClose className="h-5 w-5" />
          </button>

          {/* Header */}
          <div className="flex flex-col border-b border-white/10">
            <div className="flex items-center p-4 pr-16">
              <div className="flex items-center gap-3">
                <div className="bg-primary/20 p-2 rounded-full">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold text-sm">Asistente Equilibriate</h2>
                  <p className="text-xs text-chat-foreground/60">En línea</p>
                </div>
              </div>
            </div>

            {/* Conversation Selector Mobile */}
            <div className="px-4 pb-3 relative">
              <button
                onClick={() => setShowConversations(!showConversations)}
                className="w-full flex items-center justify-between px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-sm"
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span className="truncate">{conversation?.title || "Nueva conversación"}</span>
                </div>
                <span className="text-xs text-chat-foreground/40">
                  {conversations.length}
                </span>
              </button>

              {/* Dropdown Mobile */}
              {showConversations && (
                <div className="absolute top-full left-4 right-4 mt-1 bg-chat-bg border border-white/10 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                  <button
                    onClick={() => {
                      createConversation();
                      setShowConversations(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 hover:bg-white/10 transition-colors text-sm border-b border-white/10"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Nueva conversación</span>
                  </button>
                  {conversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => {
                        setActiveConversation(conv.id);
                        setShowConversations(false);
                      }}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 hover:bg-white/10 transition-colors text-sm text-left",
                        conversation?.id === conv.id && "bg-white/10"
                      )}
                    >
                      <span className="truncate flex-1">{conv.title}</span>
                      <span className="text-xs text-chat-foreground/40 ml-2">
                        {conv.messages.length - 1}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4">
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
                      {message.role === "assistant" ? (
                        <div className="prose prose-sm max-w-none [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1 [&>*]:text-current">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        message.content
                      )}
                    </div>
                  </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
            {error && (
              <div className="mb-2 p-2 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-xs text-red-300">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  style={{
                    fontSize: "16px"
                  }}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  maxLength={MAX_MESSAGE_LENGTH}
                  disabled={isLoading}
                  className={cn(
                    "flex-1 bg-white border rounded-full px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 placeholder:text-gray-400 disabled:opacity-50",
                    isOverLimit
                      ? "border-red-500 focus:ring-red-500/50"
                      : "border-gray-200 focus:ring-primary/50"
                  )}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading || isOverLimit}
                  className="bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
              <div className="flex justify-between text-xs px-2">
                <span className="text-chat-foreground/40">
                  {isLoading ? "Enviando..." : ""}
                </span>
                <span
                  className={cn(
                    "transition-colors",
                    isOverLimit
                      ? "text-red-400 font-medium"
                      : remainingChars < 50
                      ? "text-yellow-400"
                      : "text-chat-foreground/40"
                  )}
                >
                  {remainingChars} caracteres restantes
                </span>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
