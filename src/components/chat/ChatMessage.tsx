
import React from "react";
import { Message } from "./types";
import { cn } from "@/lib/utils";
import { CheckCircle, Clock } from "lucide-react";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.sender === "bot";
  const isTyping = message.content === "...";
  const isWelcome = message.id === "welcome";
  const time = new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(message.timestamp);

  // Animation pour l'indicateur de frappe
  const renderTypingIndicator = () => (
    <div className="flex space-x-1 items-center h-4">
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
    </div>
  );

  return (
    <div
      className={cn(
        "flex w-full mb-4 gap-2",
        isBot ? "justify-start" : "justify-end"
      )}
    >
      {isBot && (
        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cmr-green flex items-center justify-center mt-1">
          {isTyping ? (
            <Clock className="h-3 w-3 text-white animate-pulse" />
          ) : (
            <CheckCircle className="h-3 w-3 text-white" />
          )}
        </div>
      )}
      <div
        className={cn(
          "max-w-[80%] rounded-xl px-3 py-2 text-sm shadow-sm",
          isBot
            ? "bg-white/90 text-black rounded-tl-none"
            : "bg-cmr-green text-white rounded-tr-none",
          isWelcome && "border-l-4 border-cmr-yellow"
        )}
      >
        <div className="mb-1">
          {isTyping ? renderTypingIndicator() : message.content}
        </div>
        {!isTyping && (
          <div
            className={cn(
              "text-[10px] opacity-70 text-right",
              isBot ? "text-gray-600" : "text-gray-100"
            )}
          >
            {time}
          </div>
        )}
      </div>
    </div>
  );
}
