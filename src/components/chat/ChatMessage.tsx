
import { Message } from "./ChatWindow";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.sender === "bot";
  const formattedTime = message.timestamp.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div
      className={cn(
        "flex items-start gap-2 mb-4",
        isBot ? "flex-row" : "flex-row-reverse"
      )}
    >
      <Avatar className={cn("h-8 w-8", isBot ? "bg-cmr-green text-white" : "bg-gray-200")}>
        {isBot ? (
          <AvatarImage src="/favicon.ico" alt="Assistant" />
        ) : null}
        <AvatarFallback>
          {isBot ? "AI" : "Vous"}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col max-w-[75%]">
        <div
          className={cn(
            "px-3 py-2 rounded-lg",
            isBot 
              ? "bg-gray-100 text-gray-800" 
              : "bg-cmr-green text-white"
          )}
        >
          <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
        </div>
        <span className="text-xs text-gray-500 mt-1">
          {formattedTime}
        </span>
      </div>
    </div>
  );
}
