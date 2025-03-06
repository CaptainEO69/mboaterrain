
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (input: string) => void;
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [input, setInput] = useState("");
  const [isComposing, setIsComposing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input);
    setInput("");
  };

  // Suggestions de questions rapides
  const suggestions = [
    "Prix du marché?",
    "Comment vendre?",
    "Quartiers prisés"
  ];

  const handleSuggestionClick = (suggestion: string) => {
    onSendMessage(suggestion);
  };

  return (
    <div className="p-3 border-t bg-white/90 backdrop-blur-sm flex flex-col gap-2">
      <div className="flex overflow-x-auto pb-2 -mx-1 px-1">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            className="text-xs px-3 py-1 rounded-full border border-cmr-green/30 bg-cmr-green/10 text-cmr-green whitespace-nowrap mr-2 hover:bg-cmr-green/20 transition-colors"
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion}
          </button>
        ))}
      </div>
      
      <form 
        className="flex w-full gap-2" 
        onSubmit={handleSubmit}
      >
        <Input
          placeholder="Envoyez un message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
              e.preventDefault();
              if (input.trim()) {
                onSendMessage(input);
                setInput("");
              }
            }
          }}
          className="flex-1 bg-white/80 focus-visible:ring-cmr-green"
        />
        <Button 
          type="submit" 
          size="icon" 
          className="h-10 w-10 bg-cmr-green hover:bg-cmr-green/90 transition-colors"
          disabled={!input.trim()}
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
