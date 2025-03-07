
import { useState, useEffect, useCallback } from "react";
import { Message, PREDEFINED_RESPONSES, CAMEROON_CITIES, City, Neighborhood } from "./types";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";

export function useChatMessages() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Bienvenue sur MboaTer! 👋 Je suis votre assistant immobilier virtuel pour le Cameroun. Je peux vous aider sur:\n• Le marché immobilier dans toutes les régions\n• Les quartiers et villes du Cameroun\n• Conseils pour acheter/vendre/investir\n• Démarches administratives\n• Financement\n\nQue puis-je faire pour vous aujourd'hui?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  
  // Contexte de conversation pour améliorer la pertinence des réponses
  const [conversationContext, setConversationContext] = useState<{
    lastCity?: string;
    lastRegion?: string;
    lastNeighborhood?: string;
    lastTopic?: string;
    userPreferences?: {
      budget?: string;
      propertyType?: string;
      purpose?: string; // achat, location, investissement
      preferredLocations?: string[];
    };
    userProfile?: {
      isLoggedIn: boolean;
      userType?: string; // particulier, agent, notaire, etc.
      interests?: string[];
    };
    // Historique des recherches récentes pour mieux comprendre le contexte
    recentSearches?: string[];
  }>({});

  // Initialisation du contexte utilisateur
  useEffect(() => {
    if (user) {
      setConversationContext(prev => ({
        ...prev,
        userProfile: {
          isLoggedIn: true,
          userType: user.user_metadata?.user_type || "particulier",
          interests: []
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

  // Réinitialisation du compteur de messages non lus
  useEffect(() => {
    if (isChatOpen) {
      setUnreadCount(0);
    }
  }, [isChatOpen]);

  // Fonction pour envoyer un message
  const handleSendMessage = useCallback((input: string) => {
    if (!input.trim()) return;

    console.log("Message utilisateur reçu:", input);

    // Message de l'utilisateur
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: input,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Ajout à l'historique des recherches récentes
    setConversationContext(prev => ({
      ...prev,
      recentSearches: [...(prev.recentSearches || []), input.toLowerCase()]
    }));

    // Indicateur de frappe
    const typingIndicator: Message = {
      id: `typing-${Date.now()}`,
      content: "...",
      sender: "bot",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, typingIndicator]);

    // Analyse et extraction de contexte à partir de la question
    const normalizedInput = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    extractContextFromQuery(normalizedInput);

    // Délai aléatoire pour simuler la réflexion du bot
    const delay = Math.floor(Math.random() * 800) + 400;
    
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    
    const newTimeout = setTimeout(() => {
      setMessages(prev => {
        const withoutTyping = prev.filter(msg => msg.id !== typingIndicator.id);
        const botResponse = generateResponse(input);
        
        console.log("Contexte de conversation:", conversationContext);
        console.log("Réponse générée:", botResponse);
        
        const botMessage: Message = {
          id: `bot-${Date.now()}`,
          content: botResponse.content,
          sender: "bot",
          timestamp: new Date(),
          isPersonalized: botResponse.isPersonalized,
          isExpert: botResponse.isExpert,
          relatedToQuestion: input // Tracer la question pour le débogage
        };
        
        // Notification pour les réponses d'expert
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

  // Extraction de contexte à partir de la question
  const extractContextFromQuery = (normalizedQuery: string) => {
    // Détection de région
    for (const region in CAMEROON_CITIES) {
      const normalizedRegion = region.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (normalizedQuery.includes(normalizedRegion)) {
        setConversationContext(prev => ({ ...prev, lastRegion: region }));
        break;
      }
    }

    // Détection de ville
    for (const region in CAMEROON_CITIES) {
      for (const city of CAMEROON_CITIES[region]) {
        const normalizedCityName = city.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (normalizedQuery.includes(normalizedCityName)) {
          setConversationContext(prev => ({ 
            ...prev, 
            lastCity: city.name, 
            lastRegion: city.region 
          }));
          break;
        }
      }
    }

    // Détection de quartier
    for (const region in CAMEROON_CITIES) {
      for (const city of CAMEROON_CITIES[region]) {
        for (const neighborhood of city.neighborhoods) {
          const normalizedNeighborhoodName = neighborhood.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          if (normalizedQuery.includes(normalizedNeighborhoodName)) {
            setConversationContext(prev => ({ 
              ...prev, 
              lastNeighborhood: neighborhood.name,
              lastCity: city.name,
              lastRegion: city.region 
            }));
            break;
          }
        }
      }
    }

    // Détection de préférences
    if (normalizedQuery.includes("acheter") || normalizedQuery.includes("achat")) {
      setConversationContext(prev => ({
        ...prev,
        userPreferences: { ...prev.userPreferences, purpose: "achat" }
      }));
    } else if (normalizedQuery.includes("louer") || normalizedQuery.includes("location")) {
      setConversationContext(prev => ({
        ...prev,
        userPreferences: { ...prev.userPreferences, purpose: "location" }
      }));
    } else if (normalizedQuery.includes("investir") || normalizedQuery.includes("investissement")) {
      setConversationContext(prev => ({
        ...prev,
        userPreferences: { ...prev.userPreferences, purpose: "investissement" }
      }));
    }

    // Détection de type de bien
    if (normalizedQuery.includes("maison") || normalizedQuery.includes("villa")) {
      setConversationContext(prev => ({
        ...prev,
        userPreferences: { ...prev.userPreferences, propertyType: "maison" }
      }));
    } else if (normalizedQuery.includes("appartement")) {
      setConversationContext(prev => ({
        ...prev,
        userPreferences: { ...prev.userPreferences, propertyType: "appartement" }
      }));
    } else if (normalizedQuery.includes("terrain") || normalizedQuery.includes("parcelle")) {
      setConversationContext(prev => ({
        ...prev,
        userPreferences: { ...prev.userPreferences, propertyType: "terrain" }
      }));
    } else if (normalizedQuery.includes("bureau") || normalizedQuery.includes("commerce")) {
      setConversationContext(prev => ({
        ...prev,
        userPreferences: { ...prev.userPreferences, propertyType: "commercial" }
      }));
    }

    // Détection de budget
    const budgetRegex = /(\d+)\s*(millions?|million|m|fcfa|franc|xaf)/i;
    const budgetMatch = normalizedQuery.match(budgetRegex);
    if (budgetMatch) {
      let budget = budgetMatch[1];
      if (budgetMatch[2].toLowerCase().startsWith('m')) {
        budget = budget + " millions FCFA";
      } else {
        budget = budget + " FCFA";
      }
      setConversationContext(prev => ({
        ...prev,
        userPreferences: { ...prev.userPreferences, budget: budget }
      }));
    }
  };

  // Fonction pour trouver les informations sur une ville
  const findCityInfo = (cityName: string): City | null => {
    const normalizedCityName = cityName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    for (const region in CAMEROON_CITIES) {
      const cityInfo = CAMEROON_CITIES[region].find(
        city => city.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === normalizedCityName
      );
      
      if (cityInfo) {
        return cityInfo;
      }
    }
    
    return null;
  };

  // Fonction pour trouver les informations sur un quartier
  const findNeighborhoodInfo = (cityName: string, neighborhoodName: string): Neighborhood | null => {
    const city = findCityInfo(cityName);
    if (!city) return null;
    
    const normalizedNeighborhoodName = neighborhoodName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    for (const neighborhood of city.neighborhoods) {
      const normalizedName = neighborhood.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (normalizedName === normalizedNeighborhoodName) {
        return neighborhood;
      }
    }
    
    return null;
  };

  // Fonction pour obtenir les quartiers populaires d'une ville
  const getPopularNeighborhoods = (cityName: string): string => {
    const city = findCityInfo(cityName);
    if (!city) return "Je n'ai pas d'informations sur cette ville.";
    
    const popularNeighborhoods = city.neighborhoods
      .filter(n => n.isPopular)
      .map(n => n.name)
      .join(", ");
    
    return `À ${city.name}, les quartiers les plus recherchés sont ${popularNeighborhoods}. ${city.description} Les prix immobiliers varient généralement entre ${city.priceRange}.`;
  };

  // Fonction pour générer une réponse personnalisée
  const generatePersonalizedResponse = (normalizedQuestion: string): { content: string, isPersonalized: boolean, isExpert: boolean } | null => {
    const { userProfile, userPreferences, lastCity, lastRegion } = conversationContext;
    
    // Personnalisation pour utilisateurs connectés
    if (userProfile?.isLoggedIn) {
      // Réponse pour professionnels
      if (userProfile.userType && userProfile.userType !== "particulier") {
        if (normalizedQuestion.includes("conseil") || normalizedQuestion.includes("expertise") || normalizedQuestion.includes("professionnel")) {
          const professionalResponses = PREDEFINED_RESPONSES["professionnel"];
          if (professionalResponses) {
            return {
              content: professionalResponses[Math.floor(Math.random() * professionalResponses.length)],
              isPersonalized: true,
              isExpert: true
            };
          }
        }
      }
      
      // Personnalisation basée sur les préférences utilisateur
      if (userPreferences) {
        if (lastCity && userPreferences.purpose) {
          const city = findCityInfo(lastCity);
          if (city) {
            const popularAreas = city.neighborhoods
              .filter(n => n.isPopular)
              .map(n => n.name)
              .slice(0, 3)
              .join(", ");
            
            return {
              content: `Selon votre profil et votre intérêt pour ${userPreferences.purpose === "achat" ? "l'achat" : 
                         userPreferences.purpose === "location" ? "la location" : "l'investissement"}, 
                       à ${city.name}, je vous recommande particulièrement les quartiers de ${popularAreas}.
                       ${userPreferences.budget ? `Avec un budget de ${userPreferences.budget}, vous pourriez ${
                         userPreferences.purpose === "achat" ? "acquérir" : 
                         userPreferences.purpose === "location" ? "louer" : "investir dans"
                       } un bien de bonne qualité dans ces zones.` : ""}`,
              isPersonalized: true,
              isExpert: true
            };
          }
        }
      }
    }
    
    return null;
  };

  // Fonction principale pour générer une réponse
  const generateResponse = (question: string): { content: string, isPersonalized: boolean, isExpert: boolean } => {
    const normalizedQuestion = question.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    console.log("Génération de réponse pour:", normalizedQuestion);
    
    // NOUVEAU: Détection directe des questions sur les terrains à Yaoundé
    if (normalizedQuestion.includes("terrain") && normalizedQuestion.includes("yaounde")) {
      return {
        content: "À Yaoundé, les meilleurs terrains se trouvent dans les quartiers de Odza, Nsimeyong et Mfandena. Ces zones offrent un bon compromis entre accessibilité, sécurité et potentiel de valorisation. Les prix varient entre 15 000 et 35 000 FCFA/m² selon l'emplacement et la viabilisation. Les zones en expansion comme Nkoabang et Simbock présentent également de bonnes opportunités d'investissement avec des prix plus abordables.",
        isPersonalized: false,
        isExpert: true
      };
    }
    
    // Tentative de réponse personnalisée
    const personalizedResponse = generatePersonalizedResponse(normalizedQuestion);
    if (personalizedResponse) return personalizedResponse;
    
    // Vérification si c'est une question d'expert
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
    
    // Détection de demande sur une ville spécifique
    const cityRegex = /(?:a|de|sur|pour|dans|quartiers?(?:\sde)?)\s+([a-zA-Zé\s]+?)(?:$|\s+[?.,]|\s+(?:qui|pour|comment|est|sont))/i;
    const cityMatch = normalizedQuestion.match(cityRegex);
    
    // NOUVEAU: Détection spécifique des questions sur les terrains
    if (normalizedQuestion.includes("terrain") || normalizedQuestion.includes("parcelle")) {
      // Vérifier s'il y a une ville mentionnée
      if (conversationContext.lastCity) {
        return {
          content: `À ${conversationContext.lastCity}, les terrains les plus intéressants se trouvent ${
            conversationContext.lastCity === "Yaoundé" ? "dans les quartiers d'Odza, Nsimeyong et Mfandena" : 
            conversationContext.lastCity === "Douala" ? "dans les quartiers de Yassa, Logbessou et Bonamoussadi" :
            "généralement en périphérie de la ville, dans les zones en développement"
          }. Les prix varient entre ${
            conversationContext.lastCity === "Yaoundé" ? "15 000 et 35 000 FCFA/m²" : 
            conversationContext.lastCity === "Douala" ? "20 000 et 40 000 FCFA/m²" :
            "10 000 et 25 000 FCFA/m²"
          } selon l'emplacement et la viabilisation.`,
          isPersonalized: false,
          isExpert: true
        };
      }
    }
    
    if (cityMatch) {
      const potentialCity = cityMatch[1].trim();
      if (potentialCity && potentialCity.length > 3) {
        // Vérifier si c'est une demande de quartiers
        if (normalizedQuestion.includes("quartier")) {
          const cityInfo = findCityInfo(potentialCity);
          if (cityInfo) {
            return {
              content: getPopularNeighborhoods(potentialCity),
              isPersonalized: false,
              isExpert: true
            };
          }
        }
        
        // NOUVEAU: Vérifier si c'est une demande sur les terrains dans une ville
        if (normalizedQuestion.includes("terrain") || normalizedQuestion.includes("parcelle")) {
          const cityInfo = findCityInfo(potentialCity);
          if (cityInfo) {
            return {
              content: `À ${cityInfo.name}, les terrains les plus intéressants se trouvent ${
                cityInfo.name === "Yaoundé" ? "dans les quartiers d'Odza, Nsimeyong et Mfandena" : 
                cityInfo.name === "Douala" ? "dans les quartiers de Yassa, Logbessou et Bonamoussadi" :
                "généralement en périphérie de la ville, dans les zones en développement"
              }. Les prix varient entre ${
                cityInfo.name === "Yaoundé" ? "15 000 et 35 000 FCFA/m²" : 
                cityInfo.name === "Douala" ? "20 000 et 40 000 FCFA/m²" :
                "10 000 et 25 000 FCFA/m²"
              } selon l'emplacement et la viabilisation.`,
              isPersonalized: false,
              isExpert: true
            };
          }
        }
        
        // Vérifier si c'est une demande sur la ville en général
        const cityInfo = findCityInfo(potentialCity);
        if (cityInfo) {
          const popularAreas = cityInfo.neighborhoods
            .filter(n => n.isPopular)
            .map(n => n.name)
            .join(", ");
            
          return {
            content: `${cityInfo.name} est située dans la région ${cityInfo.region} du Cameroun. ${cityInfo.description}
Les prix immobiliers y varient généralement entre ${cityInfo.priceRange}.
Les quartiers les plus recherchés sont ${popularAreas}.`,
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
        // Si contexte de ville, chercher dans cette ville
        if (conversationContext.lastCity) {
          const neighborhoodInfo = findNeighborhoodInfo(conversationContext.lastCity, potentialNeighborhood);
          if (neighborhoodInfo) {
            const city = findCityInfo(conversationContext.lastCity);
            return {
              content: `Le quartier ${neighborhoodInfo.name} à ${conversationContext.lastCity} est ${
                neighborhoodInfo.isPopular ? "l'un des plus prisés" : "un quartier intéressant"
              } de la ville. ${neighborhoodInfo.description || ""} ${
                neighborhoodInfo.isPopular && city 
                  ? `Les prix y sont généralement dans la fourchette haute de ${city.priceRange}.` 
                  : ""
              }`,
              isPersonalized: false,
              isExpert: true
            };
          }
        }
        
        // Recherche dans toutes les villes principales
        for (const region in CAMEROON_CITIES) {
          for (const city of CAMEROON_CITIES[region]) {
            const neighborhoodInfo = findNeighborhoodInfo(city.name, potentialNeighborhood);
            if (neighborhoodInfo) {
              return {
                content: `Le quartier ${neighborhoodInfo.name} se trouve à ${city.name} (région ${city.region}). C'est ${
                  neighborhoodInfo.isPopular ? "l'un des quartiers les plus prisés" : "un quartier"
                } de la ville. ${neighborhoodInfo.description || ""} ${
                  neighborhoodInfo.isPopular
                    ? `Les prix immobiliers y sont généralement dans la fourchette haute de ${city.priceRange}.` 
                    : ""
                }`,
                isPersonalized: false,
                isExpert: true
              };
            }
          }
        }
      }
    }
    
    // NOUVEAU: Détection améliorée des questions sur les meilleurs emplacements
    if ((normalizedQuestion.includes("meilleur") || normalizedQuestion.includes("mieux") || 
         normalizedQuestion.includes("ideal") || normalizedQuestion.includes("idéal") || 
         normalizedQuestion.includes("bon")) && 
        (normalizedQuestion.includes("endroit") || normalizedQuestion.includes("emplacement") || 
         normalizedQuestion.includes("quartier") || normalizedQuestion.includes("lieu") ||
         normalizedQuestion.includes("zone") || normalizedQuestion.includes("terrain"))) {
        
      // Chercher si une ville est mentionnée ou en contexte
      const cityName = conversationContext.lastCity || 
                      (cityMatch ? cityMatch[1].trim() : null) ||
                      (normalizedQuestion.includes("yaounde") ? "Yaoundé" : 
                       normalizedQuestion.includes("douala") ? "Douala" : null);
                       
      if (cityName) {
        const cityInfo = findCityInfo(cityName);
        if (cityInfo) {
          const bestAreas = cityInfo.neighborhoods
            .filter(n => n.isPopular)
            .map(n => n.name)
            .slice(0, 3)
            .join(", ");
            
          return {
            content: `Les meilleurs emplacements à ${cityInfo.name} sont ${bestAreas}. Ces quartiers offrent un excellent compromis entre accessibilité, sécurité et qualité de vie. ${
              normalizedQuestion.includes("terrain") ? 
              `Pour les terrains spécifiquement, les zones de ${
                cityInfo.name === "Yaoundé" ? "Odza, Nsimeyong et Mfandena" : 
                cityInfo.name === "Douala" ? "Yassa, Logbessou et Bonamoussadi" :
                "la périphérie en développement"
              } offrent le meilleur potentiel d'investissement.` : ""
            }`,
            isPersonalized: false,
            isExpert: true
          };
        }
      }
    }
    
    // Recherche de mots-clés dans la question
    const keywordMappings: Record<string, string[]> = {
      "prix": ["cout", "coute", "cher", "budget", "prix", "tarif", "combien", "fcfa", "xaf", "euro", "dollar"],
      "vente": ["vendre", "vente", "mettre en vente", "vends", "céder", "ceder", "mise en vente"],
      "location": ["louer", "location", "bail", "locataire", "proprietaire", "propriétaire"],
      "document": ["document", "papier", "titre", "foncier", "contrat", "acte", "cadastre", "légal", "legal"],
      "investissement": ["investir", "investissement", "placement", "rendement", "rentabilité", "rentabilite"],
      "crédit": ["credit", "crédit", "pret", "prêt", "banque", "financement", "financer", "emprunt"],
      "construction": ["construire", "construction", "bâtir", "batir", "chantier", "architecte", "entrepreneur"],
      "quartier": ["quartier", "zone", "secteur", "emplacement", "lieu"],
      "notaire": ["notaire", "acte", "authentique", "officiel", "légalisation", "legalisation"],
      "regions": ["region", "régions", "province", "cameroun", "pays"],
      "villes": ["ville", "cité", "urban", "agglomeration", "métropole"],
      "sécurité": ["securite", "sécurité", "arnaque", "fraude", "confiance", "fiable", "sûr", "sur"],
      "visite": ["visite", "visiter", "voir", "rendez-vous", "rendez", "rendezvous", "rdv"],
      "estimation": ["estimer", "estimation", "evaluer", "évaluer", "evaluation", "évaluation", "valeur", "vaut"],
      "expertise": ["expert", "spécialiste", "professionnel", "expertise", "spécialise", "spécialisé"],
      "professionnel": ["agent", "courtier", "promoteur", "profession", "notaire", "architecte", "expert"]
    };
    
    // Recherche par mots-clés
    for (const [category, keywords] of Object.entries(keywordMappings)) {
      if (keywords.some(keyword => normalizedQuestion.includes(keyword))) {
        // Mise à jour du contexte
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
          ? "Le meilleur moment pour acheter est généralement en début d'année ou pendant la saison des pluies (juin-septembre) quand il y a moins d'activité sur le marché. Les prix sont souvent plus négociables à ces périodes. Les statistiques montrent une baisse d'activité de 15-20% pendant ces périodes, ce qui donne un avantage aux acheteurs."
          : "Le meilleur moment pour acheter est généralement en début d'année ou pendant la saison des pluies (juin-septembre) quand il y a moins d'activité sur le marché. Les prix sont souvent plus négociables à ces périodes.",
        isPersonalized: false,
        isExpert: isExpertQuestion
      };
    }
    
    if ((normalizedQuestion.includes("delai") || normalizedQuestion.includes("durée") || normalizedQuestion.includes("duree") || normalizedQuestion.includes("temps")) && 
        (normalizedQuestion.includes("vente") || normalizedQuestion.includes("vendre") || normalizedQuestion.includes("transaction"))) {
      return {
        content: isExpertQuestion
          ? "La durée moyenne d'une transaction immobilière complète au Cameroun est de 2 à 3 mois. Cela inclut: la période de mise en vente (2-3 semaines), les visites (1-2 semaines), la négociation (1-2 semaines), et les formalités administratives et notariales (3-4 semaines). La vérification du titre foncier peut parfois allonger ce délai, surtout dans les zones rurales."
          : "La durée moyenne d'une transaction immobilière complète au Cameroun est de 2 à 3 mois. Cela inclut la période de mise en vente, les visites, la négociation, et les formalités administratives et notariales.",
        isPersonalized: false,
        isExpert: isExpertQuestion
      };
    }
    
    if (normalizedQuestion.includes("merci") || normalizedQuestion.includes("super") || normalizedQuestion.includes("excellent")) {
      return {
        content: "Je vous en prie, c'est un plaisir de vous aider! N'hésitez pas si vous avez d'autres questions concernant l'immobilier au Cameroun.",
        isPersonalized: false,
        isExpert: false
      };
    }
    
    // Proposition de sujet si la question n'est pas claire
    if (normalizedQuestion.length < 15 || !normalizedQuestion.includes("?")) {
      let suggestedTopic = "";
      
      if (conversationContext.lastCity) {
        suggestedTopic = `Pour ${conversationContext.lastCity}, je peux vous renseigner sur les quartiers prisés, les prix du marché, ou les opportunités d'investissement. Que souhaitez-vous savoir plus précisément?`;
      } else if (conversationContext.lastRegion) {
        suggestedTopic = `Concernant la région ${conversationContext.lastRegion}, je peux vous informer sur les principales villes, le marché immobilier local ou les spécificités de cette zone. Que voulez-vous explorer?`;
      } else if (conversationContext.lastTopic) {
        suggestedTopic = `Pour approfondir sur le sujet "${conversationContext.lastTopic}", avez-vous des questions plus spécifiques? Je peux vous donner des détails précis adaptés à votre situation.`;
      } else {
        suggestedTopic = "Je peux vous renseigner sur les villes et quartiers du Cameroun, les prix du marché, les démarches d'achat/vente, ou l'investissement immobilier. Quel sujet vous intéresse en particulier?";
      }
      
      return {
        content: suggestedTopic,
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

  // Fonction pour obtenir une réponse aléatoire d'une catégorie
  const getRandomResponse = (category: string): string => {
    const responses = PREDEFINED_RESPONSES[category] || PREDEFINED_RESPONSES["default"];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  // Basculer l'état d'ouverture du chat
  const toggleChat = useCallback(() => {
    setIsChatOpen(!isChatOpen);
    if (!isChatOpen) {
      setUnreadCount(0);
    }
  }, [isChatOpen]);

  // Nettoyage au démontage
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
