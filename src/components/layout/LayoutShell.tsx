"use client";

import { ReactNode } from "react";
import { useChatContext } from "@/context/ChatContext";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ChatPanel } from "../chat/ChatPanel";

interface LayoutShellProps {
  children: ReactNode;
}

export function LayoutShell({ children }: LayoutShellProps) {
  const { isCollapsed } = useChatContext();

  return (
    <>
      {/* Mobile: Stack layout - ChatPanel handles its own modal */}
      <div className="lg:hidden min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatPanel />
      </div>

      {/* Desktop: CSS Grid layout with fluid columns */}
      <div
        className="hidden lg:grid min-h-screen"
        style={{
          // Fixed values allow CSS to animate smoothly
          gridTemplateColumns: isCollapsed
            ? "calc(100% - 56px) 56px"
            : "1fr min(50%, 60rem)",
          transition: "grid-template-columns 300ms ease-in-out",
        }}
      >
        {/* Main Content Area */}
        <div className="flex flex-col min-w-0">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>

        {/* Chat Column - real column, not floating */}
        <div className="h-screen sticky top-0">
          <ChatPanel />
        </div>
      </div>
    </>
  );
}
