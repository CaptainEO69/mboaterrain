
import React from "react";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  toggleChat: () => void;
  unreadCount: number;
}

export function ChatHeader({ toggleChat, unreadCount }: ChatHeaderProps) {
  return (
    <div className="py-3 px-4 border-b flex flex-row items-center justify-between bg-white/90 backdrop-blur-sm">
      <h3 className="text-lg font-medium">Mon Assistant</h3>
      <Button 
        onClick={toggleChat} 
        variant="ghost" 
        size="sm" 
        className="h-8 w-8 p-0"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </Button>
    </div>
  );
}
