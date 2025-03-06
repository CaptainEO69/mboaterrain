
import React from "react";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  toggleChat: () => void;
  unreadCount: number;
}

export function ChatHeader({ toggleChat, unreadCount }: ChatHeaderProps) {
  return (
    <div className="py-3 px-4 border-b flex flex-row items-center justify-between bg-white/90 backdrop-blur-sm">
      <div className="flex items-center space-x-2">
        <div className="relative w-7 h-7 bg-cmr-green rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
        <h3 className="text-lg font-medium">Assistant CamerImmo</h3>
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
      </div>
      <Button 
        onClick={toggleChat} 
        variant="ghost" 
        size="sm" 
        className="h-8 w-8 p-0 hover:bg-gray-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </Button>
    </div>
  );
}
