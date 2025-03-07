
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Loader } from "lucide-react";
import { PREDEFINED_RESPONSES, CAMEROON_CITIES } from "./types";

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

  // Analyse des derniers messages pour contextualiser les suggestions
  useEffect(() => {
    if (messages.length > 0) {
      // Extraire les entités mentionnées récemment
      const extractEntities = () => {
        if (messages.length === 0) return null;
        
        const lastMessages = messages.slice(-3); // Considérer les 3 derniers messages
        let lastCity: string | null = null;
        let lastRegion: string | null = null;
        let lastNeighborhood: string | null = null;
        let lastTopic: string | null = null;
        
        // Mots-clés par catégorie pour détecter les sujets
        const topicKeywords: Record<string, string[]> = {
          "prix": ["prix", "coûte", "cher", "budget", "tarif"],
          "investissement": ["investir", "placement", "rendement"],
          "document": ["papier", "titre", "foncier", "notaire"],
          "quartier": ["quartier", "zone", "secteur"],
          "vente": ["vendre", "vente", "céder"],
          "credit": ["prêt", "crédit", "financement"]
        };
        
        // Analyser chaque message
        for (const msg of lastMessages) {
          const content = msg.content.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          
          // Chercher les régions
          for (const region in CAMEROON_CITIES) {
            const normalizedRegion = region.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            if (content.includes(normalizedRegion)) {
              lastRegion = region;
              break;
            }
          }
          
          // Chercher les villes
          for (const region in CAMEROON_CITIES) {
            for (const city of CAMEROON_CITIES[region]) {
              const normalizedCity = city.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
              if (content.includes(normalizedCity)) {
                lastCity = city.name;
                lastRegion = region;
                break;
              }
            }
            if (lastCity) break;
          }
          
          // Chercher les quartiers
          if (lastCity) {
            const cityRegion = Object.keys(CAMEROON_CITIES).find(region => 
              CAMEROON_CITIES[region].some(city => city.name === lastCity)
            );
            
            if (cityRegion) {
              const city = CAMEROON_CITIES[cityRegion].find(city => city.name === lastCity);
              if (city) {
                for (const neighborhood of city.neighborhoods) {
                  const normalizedNeighborhood = neighborhood.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                  if (content.includes(normalizedNeighborhood)) {
                    lastNeighborhood = neighborhood.name;
                    break;
                  }
                }
              }
            }
          }
          
          // Chercher le sujet
          for (const [topic, keywords] of Object.entries(topicKeywords)) {
            if (keywords.some(kw => content.includes(kw))) {
              lastTopic = topic;
              break;
            }
          }
        }
        
        return { lastCity, lastRegion, lastNeighborhood, lastTopic };
      };

      const entities = extractEntities();
      
      // Générer des suggestions contextuelles
      if (entities) {
        const { lastCity, lastRegion, lastNeighborhood, lastTopic } = entities;
        
        const newSuggestions: string[] = [];
        
        // Suggestions basées sur la ville
        if (lastCity) {
          newSuggestions.push(`Quartiers prisés à ${lastCity}?`);
          newSuggestions.push(`Prix à ${lastCity}?`);
          
          if (lastTopic === "investissement") {
            newSuggestions.push(`Investir à ${lastCity}?`);
          } else if (lastTopic === "document") {
            newSuggestions.push(`Démarches à ${lastCity}?`);
          } else if (lastTopic === "credit") {
            newSuggestions.push(`Financement à ${lastCity}?`);
          } else {
            newSuggestions.push(`Marché immobilier à ${lastCity}?`);
          }
        }
        // Suggestions basées sur la région
        else if (lastRegion) {
          newSuggestions.push(`Villes en ${lastRegion}?`);
          
          const regionCities = CAMEROON_CITIES[lastRegion];
          if (regionCities && regionCities.length > 0) {
            // Prendre 2 villes aléatoires de la région
            const randomCities = [...regionCities]
              .sort(() => 0.5 - Math.random())
              .slice(0, 2);
              
            newSuggestions.push(`Infos sur ${randomCities[0].name}?`);
            if (randomCities.length > 1) {
              newSuggestions.push(`Quartiers à ${randomCities[1].name}?`);
            }
          }
        }
        // Suggestions basées sur le quartier
        else if (lastNeighborhood && lastCity) {
          newSuggestions.push(`Prix à ${lastNeighborhood}?`);
          newSuggestions.push(`Sécurité à ${lastNeighborhood}?`);
          newSuggestions.push(`Autres quartiers comme ${lastNeighborhood}?`);
        }
        // Suggestions basées sur le sujet
        else if (lastTopic) {
          if (lastTopic === "prix") {
            newSuggestions.push("Prix par région?");
            newSuggestions.push("Estimation précise?");
            newSuggestions.push("Évolution des prix?");
          } else if (lastTopic === "investissement") {
            newSuggestions.push("Rendement locatif?");
            newSuggestions.push("Meilleures zones?");
            newSuggestions.push("Risques à éviter?");
          } else if (lastTopic === "document") {
            newSuggestions.push("Vérifier un titre?");
            newSuggestions.push("Coût des documents?");
            newSuggestions.push("Notaire nécessaire?");
          } else if (lastTopic === "quartier") {
            newSuggestions.push("Quartiers à Douala?");
            newSuggestions.push("Quartiers à Yaoundé?");
            newSuggestions.push("Critères de choix?");
          } else if (lastTopic === "vente") {
            newSuggestions.push("Étapes de vente?");
            newSuggestions.push("Délai moyen?");
            newSuggestions.push("Frais de vente?");
          } else if (lastTopic === "credit") {
            newSuggestions.push("Meilleur taux?");
            newSuggestions.push("Conditions requises?");
            newSuggestions.push("Délai d'obtention?");
          }
        }
        // Suggestions par défaut
        else {
          // Suggestions basées sur des villes différentes
          const allRegions = Object.keys(CAMEROON_CITIES);
          const randomRegion1 = allRegions[Math.floor(Math.random() * allRegions.length)];
          const randomRegion2 = allRegions[Math.floor(Math.random() * allRegions.length)];
          
          if (CAMEROON_CITIES[randomRegion1] && CAMEROON_CITIES[randomRegion1].length > 0) {
            const randomCity1 = CAMEROON_CITIES[randomRegion1][0];
            newSuggestions.push(`Infos sur ${randomCity1.name}?`);
          } else {
            newSuggestions.push("Prix du marché?");
          }
          
          if (CAMEROON_CITIES[randomRegion2] && CAMEROON_CITIES[randomRegion2].length > 0) {
            const randomCity2 = CAMEROON_CITIES[randomRegion2][0];
            newSuggestions.push(`Quartiers à ${randomCity2.name}?`);
          } else {
            newSuggestions.push("Conseils d'investissement?");
          }
          
          // Suggestion générale
          newSuggestions.push("Démarches d'achat?");
        }
        
        // Mettre à jour les suggestions si nous en avons généré de nouvelles
        if (newSuggestions.length > 0) {
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
