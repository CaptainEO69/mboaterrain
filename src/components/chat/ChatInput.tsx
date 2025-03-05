
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (input: string) => void;
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input);
    setInput("");
  };

  return (
    <div className="p-3 border-t bg-white/90 backdrop-blur-sm">
      <form 
        className="flex w-full gap-2" 
        onSubmit={handleSubmit}
      >
        <Input
          placeholder="Envoyez un message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-white/80"
        />
        <Button type="submit" size="icon" className="h-10 w-10 bg-cmr-green hover:bg-cmr-green/90">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
