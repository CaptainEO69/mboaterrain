
import React, { useState } from "react";
import { ChatSuggestions } from "./ChatSuggestions";
import { ChatInputForm } from "./ChatInputForm"; 
import { useChatSuggestions } from "./hooks/useChatSuggestions";
import { Message } from "./types/messages";

export interface ChatInputProps {
  onSendMessage: (input: string) => void;
  messages?: Message[];
}

export function ChatInput({ onSendMessage, messages = [] }: ChatInputProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { suggestions } = useChatSuggestions(messages);

  const handleSubmit = (input: string) => {
    setIsSubmitting(true);
    onSendMessage(input);
    
    // Simulation d'un délai pour montrer le loader
    setTimeout(() => {
      setIsSubmitting(false);
    }, 300);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setIsSubmitting(true);
    onSendMessage(suggestion);
    
    // Simulation d'un délai pour montrer le loader
    setTimeout(() => {
      setIsSubmitting(false);
    }, 300);
  };

  return (
    <div className="p-3 border-t bg-white/90 backdrop-blur-sm flex flex-col gap-2">
      <ChatSuggestions 
        suggestions={suggestions} 
        onSuggestionClick={handleSuggestionClick} 
        disabled={isSubmitting} 
      />
      
      <ChatInputForm 
        onSubmit={handleSubmit} 
        isSubmitting={isSubmitting} 
      />
    </div>
  );
}
