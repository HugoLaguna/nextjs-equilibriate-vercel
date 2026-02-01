"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

const CHAT_COLLAPSED_KEY = "chat_collapsed";

interface ChatContextType {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  toggleCollapsed: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  // Por defecto cerrado (true = collapsed)
  const [isCollapsed, setIsCollapsedState] = useState(true);

  // Leer estado de localStorage al montar
  useEffect(() => {
    const stored = localStorage.getItem(CHAT_COLLAPSED_KEY);
    if (stored !== null) {
      setIsCollapsedState(stored === "true");
    }
  }, []);

  // Guardar en localStorage cuando cambie
  const setIsCollapsed = (collapsed: boolean) => {
    setIsCollapsedState(collapsed);
    localStorage.setItem(CHAT_COLLAPSED_KEY, String(collapsed));
  };

  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <ChatContext.Provider value={{ isCollapsed, setIsCollapsed, toggleCollapsed }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
}
