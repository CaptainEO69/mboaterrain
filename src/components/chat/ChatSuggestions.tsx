
import React from "react";

interface ChatSuggestionsProps {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
  disabled: boolean;
}

export function ChatSuggestions({ 
  suggestions, 
  onSuggestionClick, 
  disabled 
}: ChatSuggestionsProps) {
  return (
    <div className="flex overflow-x-auto pb-2 -mx-1 px-1">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          className="text-xs px-3 py-1 rounded-full border border-cmr-green/30 bg-cmr-green/10 text-cmr-green whitespace-nowrap mr-2 hover:bg-cmr-green/20 transition-colors"
          onClick={() => onSuggestionClick(suggestion)}
          disabled={disabled}
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}
