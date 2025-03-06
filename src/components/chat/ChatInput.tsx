
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Loader } from "lucide-react";
import { PREDEFINED_RESPONSES } from "./types";

interface ChatInputProps {
  onSendMessage: (input: string) => void;
  messages: Array<{content: string; sender: string;}>;
}

export function ChatInput({ onSendMessage, messages }: ChatInputProps) {
  const [input, setInput] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([
    "Prix du marché?",
    "Comment vendre?",
    "Quartiers prisés"
  ]);

  // Générer des suggestions contextuelles basées sur les derniers messages
  useEffect(() => {
    if (messages.length > 0) {
      const lastBotMessage = [...messages].reverse().find(msg => msg.sender === "bot");
      
      if (lastBotMessage) {
        const content = lastBotMessage.content.toLowerCase();
        
        // Suggestions contextuelles basées sur le dernier message du bot
        if (content.includes("quartier") || content.includes("emplacement")) {
          setSuggestions([
            "Meilleurs quartiers?",
            "Prix à Bonapriso?",
            "Sécurité du quartier?"
          ]);
        } else if (content.includes("investissement") || content.includes("placement")) {
          setSuggestions([
            "Rendement locatif?",
            "Zones prometteuses?",
            "Risques à éviter?"
          ]);
        } else if (content.includes("document") || content.includes("papier") || content.includes("titre")) {
          setSuggestions([
            "Vérifier un titre?",
            "Coût des documents?",
            "Notaire nécessaire?"
          ]);
        } else if (content.includes("crédit") || content.includes("financement") || content.includes("banque")) {
          setSuggestions([
            "Meilleur taux?",
            "Conditions requises?",
            "Délai d'obtention?"
          ]);
        } else {
          // Suggestions par défaut basées sur les catégories populaires
          const categories = Object.keys(PREDEFINED_RESPONSES);
          const randomCategories = categories
            .filter(cat => cat !== "default")
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);
          
          const newSuggestions = randomCategories.map(category => {
            switch(category) {
              case "prix": return "Prix du marché?";
              case "vente": return "Comment vendre?";
              case "quartier": return "Meilleurs quartiers?";
              case "investissement": return "Conseils investissement?";
              case "document": return "Documents nécessaires?";
              case "visite": return "Organiser une visite?";
              case "estimation": return "Estimer mon bien?";
              case "notaire": return "Rôle du notaire?";
              default: return `Infos sur ${category}?`;
            }
          });
          
          setSuggestions(newSuggestions);
        }
      }
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setIsSubmitting(true);
    onSendMessage(input);
    setInput("");
    
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
      <div className="flex overflow-x-auto pb-2 -mx-1 px-1">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            className="text-xs px-3 py-1 rounded-full border border-cmr-green/30 bg-cmr-green/10 text-cmr-green whitespace-nowrap mr-2 hover:bg-cmr-green/20 transition-colors"
            onClick={() => handleSuggestionClick(suggestion)}
            disabled={isSubmitting}
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
    </div>
  );
}
