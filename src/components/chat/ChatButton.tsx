
import React from "react";
import { Button } from "@/components/ui/button";

interface ChatButtonProps {
  toggleChat: () => void;
  unreadCount: number;
}

export function ChatButton({ toggleChat, unreadCount }: ChatButtonProps) {
  return (
    <Button 
      onClick={toggleChat}
      className="fixed bottom-16 right-4 z-50 rounded-full w-14 h-14 p-0 shadow-lg bg-cmr-green hover:bg-cmr-green/90"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
      
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-cmr-red text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {unreadCount}
        </span>
      )}
    </Button>
  );
}
