
import { useState, useEffect, useCallback } from "react";
import { Message, PREDEFINED_RESPONSES, CAMEROON_CITIES, City } from "./types";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";

export function useChatMessages() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Bienvenue sur MboaTer! 👋 Je suis votre assistant immobilier virtuel. Je peux vous aider sur:\n• Prix du marché\n• Conseils pour acheter/vendre\n• Quartiers recherchés\n• Démarches administratives\n• Financement\n\nQue puis-je faire pour vous aujourd'hui?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  
  // Historique des sujets pour améliorer la contextualisation
  const [conversationContext, setConversationContext] = useState<{
    lastCity?: string;
    lastRegion?: string;
    lastNeighborhood?: string;
    lastTopic?: string;
    userProfile?: {
      isLoggedIn: boolean;
      interests?: string[];
      budget?: string;
      preferredLocations?: string[];
    }
  }>({});

  // Au chargement, on initialise le contexte utilisateur si connecté
  useEffect(() => {
    if (user) {
      setConversationContext(prev => ({
        ...prev,
        userProfile: {
          isLoggedIn: true,
          interests: [],
          budget: "",
          preferredLocations: []
        }
      }));
    } else {
      setConversationContext(prev => ({
        ...prev,
        userProfile: {
          isLoggedIn: false
        }
      }));
    }
  }, [user]);

  useEffect(() => {
    if (isChatOpen) {
      setUnreadCount(0);
    }
  }, [isChatOpen]);

  const handleSendMessage = useCallback((input: string) => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: input,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    const typingIndicator: Message = {
      id: `typing-${Date.now()}`,
      content: "...",
      sender: "bot",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, typingIndicator]);

    const delay = Math.floor(Math.random() * 1000) + 500;
    
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    
    const newTimeout = setTimeout(() => {
      setMessages(prev => {
        const withoutTyping = prev.filter(msg => msg.id !== typingIndicator.id);
        const botResponse = generateResponse(input);
        const botMessage: Message = {
          id: `bot-${Date.now()}`,
          content: botResponse.content,
          sender: "bot",
          timestamp: new Date(),
          isPersonalized: botResponse.isPersonalized
        };
        
        if (botResponse.isExpert) {
          setTimeout(() => {
            toast("Conseil d'expert", {
              description: "Notre assistant vous a fourni une information spécialisée",
              duration: 3000,
            });
          }, 500);
        }
        
        return [...withoutTyping, botMessage];
      });
      
      if (!isChatOpen) {
        setUnreadCount(prev => prev + 1);
      }
    }, delay);
    
    setTypingTimeout(newTimeout);
  }, [isChatOpen, typingTimeout, conversationContext]);

  // Fonction pour trouver un quartier dans une ville
  const findNeighborhoodInfo = (cityName: string, neighborhoodName: string): string | null => {
    const normalizedCityName = cityName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const normalizedNeighborhood = neighborhoodName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    let cityInfo: City | undefined;
    
    // Parcourir toutes les régions et villes
    for (const region in CAMEROON_CITIES) {
      cityInfo = CAMEROON_CITIES[region].find(
        city => city.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === normalizedCityName
      );
      
      if (cityInfo) break;
    }
    
    if (!cityInfo) return null;
    
    // Vérifier si le quartier existe dans cette ville
    const neighborhoodExists = cityInfo.neighborhoods.some(
      n => n.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(normalizedNeighborhood)
    );
    
    if (neighborhoodExists) {
      const isPopular = cityInfo.popularAreas.some(
        n => n.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(normalizedNeighborhood)
      );
      
      if (isPopular) {
        return `Le quartier ${neighborhoodName} est l'un des quartiers les plus prisés de ${cityInfo.name}. ${
          cityInfo.name === "Douala" || cityInfo.name === "Yaoundé" 
            ? `Le prix au m² y varie entre ${parseInt(cityInfo.priceRange.split(" - ")[0]) + 50000} et ${parseInt(cityInfo.priceRange.split(" - ")[1])} FCFA.`
            : `C'est un excellent choix pour investir ou habiter.`
        }`;
      } else {
        return `Le quartier ${neighborhoodName} est situé à ${cityInfo.name}. C'est un quartier ${
          Math.random() > 0.5 ? "résidentiel" : "en développement"
        } avec des prix généralement inférieurs aux quartiers plus centraux.`;
      }
    }
    
    return null;
  };

  // Fonction pour trouver les infos d'une ville
  const findCityInfo = (cityName: string): City | null => {
    const normalizedCityName = cityName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    // Parcourir toutes les régions
    for (const region in CAMEROON_CITIES) {
      const cityInfo = CAMEROON_CITIES[region].find(
        city => city.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === normalizedCityName
      );
      
      if (cityInfo) {
        // Mise à jour du contexte
        setConversationContext(prev => ({
          ...prev,
          lastCity: cityInfo.name,
          lastRegion: cityInfo.region
        }));
        
        return cityInfo;
      }
    }
    
    return null;
  };

  // Fonction pour obtenir les quartiers d'une ville
  const getCityNeighborhoods = (cityName: string): string | null => {
    const city = findCityInfo(cityName);
    
    if (!city) return null;
    
    const popularAreas = city.popularAreas.join(", ");
    const otherAreas = city.neighborhoods
      .filter(n => !city.popularAreas.includes(n))
      .slice(0, 5)
      .join(", ");
    
    return `À ${city.name}, les quartiers les plus recherchés sont ${popularAreas}. 
D'autres quartiers comme ${otherAreas} sont également intéressants selon vos besoins.
${city.name} est situé dans la région ${city.region}. ${city.description}
Les prix immobiliers à ${city.name} varient généralement entre ${city.priceRange}.`;
  };

  // Fonction pour générer une réponse personnalisée
  const generatePersonalizedResponse = (normalizedQuestion: string): { content: string, isPersonalized: boolean, isExpert: boolean } | null => {
    const { userProfile, lastCity, lastRegion } = conversationContext;
    
    if (userProfile?.isLoggedIn) {
      // Personnalisation pour utilisateurs connectés
      if (normalizedQuestion.includes("conseil") || normalizedQuestion.includes("recommand")) {
        return {
          content: `En tant qu'utilisateur inscrit, je peux vous offrir des conseils plus personnalisés. 
Basé sur votre profil, ${lastCity ? `je vous conseille de considérer les quartiers de ${lastCity} comme ${
            findCityInfo(lastCity)?.popularAreas.slice(0, 3).join(", ")
          } qui correspondent à vos critères.` : 
          `n'hésitez pas à me préciser quelle ville ou région vous intéresse pour des recommandations ciblées.`}`,
          isPersonalized: true,
          isExpert: true
        };
      }
    }
    
    return null;
  };

  const generateResponse = (question: string): { content: string, isPersonalized: boolean, isExpert: boolean } => {
    const normalizedQuestion = question.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    // Essayer d'abord de générer une réponse personnalisée
    const personalizedResponse = generatePersonalizedResponse(normalizedQuestion);
    if (personalizedResponse) return personalizedResponse;
    
    // Détection de demande spécifique sur une ville
    const cityRegex = /(?:a|de|sur|pour|dans|quartiers?(?:\sde)?)\s+([a-zA-Zé\s]+?)(?:$|\s+[?.,]|\s+(?:qui|pour|comment|est|sont))/i;
    const cityMatch = normalizedQuestion.match(cityRegex);
    
    if (cityMatch) {
      const potentialCity = cityMatch[1].trim();
      if (potentialCity && potentialCity.length > 3) { // Pour éviter les faux positifs
        // Vérifier si c'est une demande de quartier
        if (normalizedQuestion.includes("quartier")) {
          const cityNeighborhoods = getCityNeighborhoods(potentialCity);
          if (cityNeighborhoods) {
            return {
              content: cityNeighborhoods,
              isPersonalized: false,
              isExpert: true
            };
          }
        }
        
        // Vérifier si c'est une demande sur la ville en général
        const cityInfo = findCityInfo(potentialCity);
        if (cityInfo) {
          return {
            content: `${cityInfo.name} est située dans la région ${cityInfo.region} du Cameroun. ${cityInfo.description}
Les prix immobiliers y varient généralement entre ${cityInfo.priceRange}.
Les quartiers les plus recherchés sont ${cityInfo.popularAreas.join(", ")}.`,
            isPersonalized: false,
            isExpert: true
          };
        }
      }
    }
    
    // Détection de quartier spécifique
    const neighborhoodRegex = /(?:quartier|zone|secteur)\s+([a-zA-Zé\s]+?)(?:$|\s+[?.,]|\s+(?:a|de|qui|pour|comment|est|sont))/i;
    const neighborhoodMatch = normalizedQuestion.match(neighborhoodRegex);
    
    if (neighborhoodMatch) {
      const potentialNeighborhood = neighborhoodMatch[1].trim();
      if (potentialNeighborhood && potentialNeighborhood.length > 3) {
        // Si on a un contexte de ville, chercher dans cette ville
        if (conversationContext.lastCity) {
          const neighborhoodInfo = findNeighborhoodInfo(conversationContext.lastCity, potentialNeighborhood);
          if (neighborhoodInfo) {
            return {
              content: neighborhoodInfo,
              isPersonalized: false,
              isExpert: true
            };
          }
        }
        
        // Sinon chercher dans toutes les villes principales
        const mainCities = ["Douala", "Yaoundé", "Bafoussam", "Bamenda", "Limbé", "Kribi"];
        for (const city of mainCities) {
          const neighborhoodInfo = findNeighborhoodInfo(city, potentialNeighborhood);
          if (neighborhoodInfo) {
            return {
              content: neighborhoodInfo,
              isPersonalized: false,
              isExpert: true
            };
          }
        }
      }
    }
    
    // Recherche des mots-clés dans la question
    const keywordMappings: Record<string, string[]> = {
      "prix": ["cout", "coute", "cher", "budget", "prix", "tarif", "combien", "fcfa", "xaf", "euro", "dollar"],
      "vente": ["vendre", "vente", "mettre en vente", "vends", "céder", "ceder", "mise en vente"],
      "location": ["louer", "location", "bail", "locataire", "proprietaire", "propriétaire"],
      "contact": ["contact", "joindre", "parler", "appeler", "téléphone", "telephone", "mail", "email", "message"],
      "agent": ["agent", "conseiller", "courtier", "agence", "professionnel", "immobilier"],
      "quartier": ["quartier", "zone", "secteur", "emplacement", "lieu"],
      "document": ["document", "papier", "titre", "foncier", "contrat", "acte", "cadastre", "légal", "legal"],
      "investissement": ["investir", "investissement", "placement", "rendement", "rentabilité", "rentabilite"],
      "crédit": ["credit", "crédit", "pret", "prêt", "banque", "financement", "financer", "emprunt"],
      "construction": ["construire", "construction", "bâtir", "batir", "chantier", "architecte", "entrepreneur"],
      "annonce": ["annonce", "publier", "publication", "poster", "creer", "créer"],
      "sécurité": ["securite", "sécurité", "arnaque", "fraude", "confiance", "fiable", "sûr", "sur"],
      "visite": ["visite", "visiter", "voir", "rendez-vous", "rendez", "rendezvous", "rdv"],
      "estimation": ["estimer", "estimation", "evaluer", "évaluer", "evaluation", "évaluation", "valeur", "vaut"],
      "notaire": ["notaire", "acte", "authentique", "officiel", "légalisation", "legalisation"],
      "regions": ["region", "régions", "province", "cameroun", "pays"],
      "villes": ["ville", "cité", "urban", "agglomeration", "métropole"]
    };

    // Vérifier si c'est une question d'expert
    const isExpertQuestion = 
      normalizedQuestion.includes("exactement") || 
      normalizedQuestion.includes("precisement") || 
      normalizedQuestion.includes("précisément") ||
      normalizedQuestion.includes("detail") || 
      normalizedQuestion.includes("détail") ||
      normalizedQuestion.includes("expliquez") ||
      normalizedQuestion.includes("pourquoi") ||
      (normalizedQuestion.includes("comment") && (
        normalizedQuestion.includes("fonctionne") || 
        normalizedQuestion.includes("procédure") || 
        normalizedQuestion.includes("procedure")
      ));
    
    // Recherche par mots-clés
    for (const [category, keywords] of Object.entries(keywordMappings)) {
      if (keywords.some(keyword => normalizedQuestion.includes(keyword))) {
        // Mettre à jour le contexte
        setConversationContext(prev => ({
          ...prev,
          lastTopic: category
        }));
        
        const response = getRandomResponse(category);
        return {
          content: response,
          isPersonalized: false,
          isExpert: isExpertQuestion
        };
      }
    }
    
    // Questions spécifiques
    if (normalizedQuestion.includes("meilleur") && normalizedQuestion.includes("moment")) {
      return {
        content: isExpertQuestion 
          ? "Le meilleur moment pour acheter est généralement en début d'année ou pendant la saison des pluies quand il y a moins d'activité sur le marché. Les prix sont souvent plus négociables à ces périodes. Les statistiques montrent une baisse d'activité de 15-20% pendant ces périodes."
          : "Le meilleur moment pour acheter est généralement en début d'année ou pendant la saison des pluies quand il y a moins d'activité sur le marché. Les prix sont souvent plus négociables à ces périodes.",
        isPersonalized: false,
        isExpert: isExpertQuestion
      };
    }
    
    if ((normalizedQuestion.includes("delai") || normalizedQuestion.includes("durée") || normalizedQuestion.includes("duree") || normalizedQuestion.includes("temps")) && 
        (normalizedQuestion.includes("vente") || normalizedQuestion.includes("vendre") || normalizedQuestion.includes("transaction"))) {
      return {
        content: isExpertQuestion
          ? "La durée moyenne d'une transaction immobilière complète au Cameroun est de 2 à 3 mois. Cela inclut la période de mise en vente (2-3 semaines), les visites (1-2 semaines), la négociation (1-2 semaines), et les formalités administratives et notariales (3-4 semaines)."
          : "La durée moyenne d'une transaction immobilière complète au Cameroun est de 2 à 3 mois. Cela inclut la période de mise en vente, les visites, la négociation, et les formalités administratives et notariales.",
        isPersonalized: false,
        isExpert: isExpertQuestion
      };
    }
    
    if (normalizedQuestion.includes("merci") || normalizedQuestion.includes("super") || normalizedQuestion.includes("excellent")) {
      return {
        content: "Je vous en prie, c'est un plaisir de vous aider! N'hésitez pas si vous avez d'autres questions concernant votre projet immobilier.",
        isPersonalized: false,
        isExpert: false
      };
    }
    
    // Réponse par défaut
    return {
      content: getRandomResponse("default"),
      isPersonalized: false,
      isExpert: false
    };
  };

  const getRandomResponse = (category: string): string => {
    const responses = PREDEFINED_RESPONSES[category] || PREDEFINED_RESPONSES["default"];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const toggleChat = useCallback(() => {
    setIsChatOpen(!isChatOpen);
    if (!isChatOpen) {
      setUnreadCount(0);
    }
  }, [isChatOpen]);

  useEffect(() => {
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [typingTimeout]);

  return {
    messages,
    unreadCount,
    isChatOpen,
    handleSendMessage,
    toggleChat
  };
}
