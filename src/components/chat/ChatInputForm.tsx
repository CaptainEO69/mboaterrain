
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Loader } from "lucide-react";

interface ChatInputFormProps {
  onSubmit: (input: string) => void;
  isSubmitting: boolean;
}

export function ChatInputForm({ onSubmit, isSubmitting }: ChatInputFormProps) {
  const [input, setInput] = useState("");
  const [isComposing, setIsComposing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    onSubmit(input);
    setInput("");
  };

  return (
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
              handleSubmit(e);
            }
          }
        }}
        className="flex-1 bg-white/80 focus-visible:ring-cmr-green"
        disabled={isSubmitting}
      />
      <Button 
        type="submit" 
        size="icon" 
        className="h-10 w-10 bg-cmr-green hover:bg-cmr-green/90 transition-colors"
        disabled={!input.trim() || isSubmitting}
      >
        {isSubmitting ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
      </Button>
    </form>
  );
}
