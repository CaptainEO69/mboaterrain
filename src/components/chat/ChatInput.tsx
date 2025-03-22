
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { VoiceInput } from "./VoiceInput";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, placeholder = "Posez votre question...", disabled = false }: ChatInputProps) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSendMessage(input);
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !disabled) {
        onSendMessage(input);
        setInput("");
      }
    }
  };

  // Auto-resize textarea based on content
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "40px"; // Reset height
      const scrollHeight = inputRef.current.scrollHeight;
      inputRef.current.style.height = Math.min(scrollHeight, 120) + "px"; // Max 120px height
    }
  }, [input]);

  // Handle voice input
  const handleVoiceInput = (text: string) => {
    setInput(text);
    // Focus on the input after voice capture
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end bg-white p-2 border-t border-gray-200 space-x-2">
      <div className="relative flex-grow">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full p-3 pl-3 pr-10 border rounded-lg focus:outline-none focus:ring-1 focus:ring-cmr-green min-h-[40px] max-h-[120px] resize-none"
          style={{ paddingRight: "2.5rem" }}
        />
        <div className="absolute right-2 bottom-2 flex space-x-1">
          <VoiceInput onTextCaptured={handleVoiceInput} isDisabled={disabled} />
        </div>
      </div>
      <Button
        type="submit"
        className="bg-cmr-green hover:bg-cmr-green/90 text-white h-10 w-10 rounded-full flex items-center justify-center"
        disabled={!input.trim() || disabled}
      >
        <Send size={20} />
      </Button>
    </form>
  );
}
