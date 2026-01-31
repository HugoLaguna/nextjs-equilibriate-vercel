"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
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
      {/* Mobile: Stack layout with fixed chat overlay */}
      <div className="lg:hidden min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* Mobile chat overlay */}
        <div
          className={cn(
            "fixed right-0 top-0 h-screen transition-all duration-300 ease-in-out z-50",
            isCollapsed ? "w-14" : "w-full"
          )}
        >
          <ChatPanel />
        </div>
      </div>

      {/* Desktop: CSS Grid layout with fluid columns */}
      <div
        className="hidden lg:grid min-h-screen"
        style={{
          // Fixed values allow CSS to animate smoothly
          gridTemplateColumns: isCollapsed
            ? "calc(100% - 56px) 56px"
            : "50% 50%",
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
