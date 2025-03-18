
import { useState, useEffect } from "react";
import { extractEntitiesFromMessages } from "./suggestionUtils/entityExtraction";
import { generateCitySuggestions } from "./suggestionUtils/citySuggestions";
import { generateRegionSuggestions } from "./suggestionUtils/regionSuggestions";
import { generateNeighborhoodSuggestions } from "./suggestionUtils/neighborhoodSuggestions";
import { generateTopicSuggestions } from "./suggestionUtils/topicSuggestions";
import { generateDefaultSuggestions } from "./suggestionUtils/defaultSuggestions";

type Message = {
  content: string;
  sender: string;
};

export function useChatSuggestions(messages: Message[]) {
  const [suggestions, setSuggestions] = useState<string[]>([
    "Prix du marché?",
    "Comment vendre?",
    "Quartiers prisés"
  ]);

  // Analyze recent messages to contextualize suggestions
  useEffect(() => {
    if (messages.length > 0) {
      // Extract mentioned entities
      const entities = extractEntitiesFromMessages(messages);
      
      // Generate contextualized suggestions
      if (entities) {
        const { lastCity, lastRegion, lastNeighborhood, lastTopic } = entities;
        
        const newSuggestions: string[] = [];
        
        // City-based suggestions
        if (lastCity) {
          const citySuggestions = generateCitySuggestions(lastCity, lastTopic);
          newSuggestions.push(...citySuggestions);
        }
        // Region-based suggestions
        else if (lastRegion) {
          const regionSuggestions = generateRegionSuggestions(lastRegion);
          newSuggestions.push(...regionSuggestions);
        }
        // Neighborhood-based suggestions
        else if (lastNeighborhood && lastCity) {
          const neighborhoodSuggestions = generateNeighborhoodSuggestions(lastNeighborhood);
          newSuggestions.push(...neighborhoodSuggestions);
        }
        // Topic-based suggestions
        else if (lastTopic) {
          const topicSuggestions = generateTopicSuggestions(lastTopic);
          newSuggestions.push(...topicSuggestions);
        }
        // Default suggestions
        else {
          const defaultSuggestions = generateDefaultSuggestions();
          newSuggestions.push(...defaultSuggestions);
        }
        
        // Update suggestions if we've generated new ones
        if (newSuggestions.length > 0) {
          setSuggestions(newSuggestions);
        }
      }
    }
  }, [messages]);

  return { suggestions };
}
