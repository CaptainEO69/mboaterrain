
import React from "react";
import { Message } from "./ChatWindow";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.sender === "bot";
  const time = new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(message.timestamp);

  return (
    <div
      className={cn(
        "flex w-full mb-4 gap-2",
        isBot ? "justify-start" : "justify-end"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-xl px-3 py-2 text-sm shadow-sm",
          isBot
            ? "bg-white/90 text-black rounded-tl-none"
            : "bg-cmr-green text-white rounded-tr-none"
        )}
      >
        <div className="mb-1">{message.content}</div>
        <div
          className={cn(
            "text-[10px] opacity-70 text-right",
            isBot ? "text-gray-600" : "text-gray-100"
          )}
        >
          {time}
        </div>
      </div>
    </div>
  );
}
