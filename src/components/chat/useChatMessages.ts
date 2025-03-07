
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
    lastPropertyType?: string;
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

    // Détection de type de bien immobilier
    const propertyTypes = [
      { type: "terrain", keywords: ["terrain", "parcelle", "lot", "hectare", "are", "m2"] },
      { type: "maison", keywords: ["maison", "villa", "pavillon", "domicile", "residence", "résidence"] },
      { type: "appartement", keywords: ["appartement", "studio", "f1", "f2", "f3", "f4", "f5", "t1", "t2", "t3", "t4", "t5"] },
      { type: "bureau", keywords: ["bureau", "local", "commerce", "commercial", "boutique", "magasin", "shop"] },
      { type: "immeuble", keywords: ["immeuble", "building", "batiment", "bâtiment"] }
    ];

    for (const { type, keywords } of propertyTypes) {
      if (keywords.some(keyword => normalizedQuery.includes(keyword))) {
        setConversationContext(prev => ({ ...prev, lastPropertyType: type }));
        
        // Mise à jour des préférences utilisateur
        setConversationContext(prev => ({
          ...prev,
          userPreferences: { ...prev.userPreferences, propertyType: type }
        }));
        break;
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

    // Détection de sujets/topics
    const topicKeywords: Record<string, string[]> = {
      "prix": ["prix", "coute", "cout", "cher", "budget", "tarif", "cout", "coutent", "valent", "vaut"],
      "marché": ["marche", "marché", "tendance", "evolution", "évolution", "demande", "offre"],
      "investissement": ["investir", "investissement", "placement", "rendement", "rentabilite", "rentabilité"],
      "document": ["document", "papier", "titre", "foncier", "contrat", "notaire", "acte", "légal", "legal"],
      "financement": ["credit", "crédit", "pret", "prêt", "banque", "financement", "financer"],
      "démarche": ["demarche", "démarche", "procedure", "procédure", "étape", "etape", "comment", "processus"],
      "sécurité": ["securite", "sécurité", "sur", "sûr", "fiable", "confiance", "arnaque", "risque"]
    };

    for (const [topic, keywords] of Object.entries(topicKeywords)) {
      if (keywords.some(keyword => normalizedQuery.includes(keyword))) {
        setConversationContext(prev => ({ ...prev, lastTopic: topic }));
        break;
      }
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
    const { userProfile, userPreferences, lastCity, lastRegion, lastPropertyType } = conversationContext;
    
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
        // Si nous avons une ville et un type de propriété
        if (lastCity && userPreferences.purpose && lastPropertyType) {
          const city = findCityInfo(lastCity);
          if (city) {
            const propertyTypeMsg = lastPropertyType === "terrain" ? "terrains" : 
                                  lastPropertyType === "maison" ? "maisons" :
                                  lastPropertyType === "appartement" ? "appartements" :
                                  lastPropertyType === "bureau" ? "bureaux/commerces" : "biens immobiliers";
            
            const popularAreas = city.neighborhoods
              .filter(n => n.isPopular)
              .map(n => n.name)
              .slice(0, 3)
              .join(", ");
            
            return {
              content: `Selon votre profil et votre intérêt pour ${userPreferences.purpose === "achat" ? "l'achat" : 
                         userPreferences.purpose === "location" ? "la location" : "l'investissement"} de ${propertyTypeMsg} 
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
        // Si nous avons juste une ville
        else if (lastCity && userPreferences.purpose) {
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
    console.log("Contexte actuel:", conversationContext);
    
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
    
    // Détection de type de bien dans la question
    const propertyTypes = {
      "terrain": ["terrain", "parcelle", "lot"],
      "maison": ["maison", "villa", "pavillon"],
      "appartement": ["appartement", "studio", "f1", "f2", "f3"],
      "commercial": ["bureau", "commerce", "local", "boutique"]
    };
    
    let detectedPropertyType: string | null = null;
    
    for (const [type, keywords] of Object.entries(propertyTypes)) {
      if (keywords.some(keyword => normalizedQuestion.includes(keyword))) {
        detectedPropertyType = type;
        break;
      }
    }
    
    // Si un type de propriété est détecté dans la question ou dans le contexte
    const propertyType = detectedPropertyType || conversationContext.lastPropertyType;
    
    if (propertyType) {
      // Vérifier s'il y a une ville mentionnée ou en contexte
      const cityName = (cityMatch ? cityMatch[1].trim() : null) || conversationContext.lastCity;
      
      if (cityName) {
        const cityInfo = findCityInfo(cityName);
        if (cityInfo) {
          // Réponse spécifique au type de bien et à la ville
          let propertyResponse: { content: string, isPersonalized: boolean, isExpert: boolean } | null = null;
          
          if (propertyType === "terrain") {
            propertyResponse = {
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
          } else if (propertyType === "maison") {
            propertyResponse = {
              content: `À ${cityInfo.name}, le marché des maisons et villas est particulièrement dynamique dans ${
                cityInfo.name === "Yaoundé" ? "les quartiers de Bastos, Omnisport et Santa Barbara" : 
                cityInfo.name === "Douala" ? "les quartiers de Bonanjo, Bonapriso et Bonamoussadi" :
                "les quartiers résidentiels calmes et sécurisés"
              }. Les prix pour une maison de qualité varient entre ${
                cityInfo.name === "Yaoundé" ? "50 et 200 millions FCFA" : 
                cityInfo.name === "Douala" ? "70 et 250 millions FCFA" :
                "30 et 150 millions FCFA"
              } selon l'emplacement, la taille et les finitions.`,
              isPersonalized: false,
              isExpert: true
            };
          } else if (propertyType === "appartement") {
            propertyResponse = {
              content: `À ${cityInfo.name}, les appartements les plus recherchés se situent dans ${
                cityInfo.name === "Yaoundé" ? "les quartiers du Centre-ville, Bastos et Nlongkak" : 
                cityInfo.name === "Douala" ? "les quartiers de Bonapriso, Bonanjo et Akwa" :
                "les quartiers centraux et bien desservis"
              }. Pour un appartement de 2-3 chambres, comptez entre ${
                cityInfo.name === "Yaoundé" ? "20 et 60 millions FCFA" : 
                cityInfo.name === "Douala" ? "25 et 80 millions FCFA" :
                "15 et 50 millions FCFA"
              } à l'achat, ou entre ${
                cityInfo.name === "Yaoundé" ? "150 000 et 400 000 FCFA" : 
                cityInfo.name === "Douala" ? "200 000 et 500 000 FCFA" :
                "100 000 et 300 000 FCFA"
              } par mois en location.`,
              isPersonalized: false,
              isExpert: true
            };
          } else if (propertyType === "commercial") {
            propertyResponse = {
              content: `À ${cityInfo.name}, les espaces commerciaux et bureaux les plus prisés se trouvent ${
                cityInfo.name === "Yaoundé" ? "au centre-ville, à Bastos et à Hippodrome" : 
                cityInfo.name === "Douala" ? "à Akwa, Bonanjo et Bali" :
                "généralement dans les zones à fort passage et les centres d'affaires"
              }. Les prix de location varient entre ${
                cityInfo.name === "Yaoundé" ? "10 000 et 25 000 FCFA/m²/mois" : 
                cityInfo.name === "Douala" ? "15 000 et 30 000 FCFA/m²/mois" :
                "7 000 et 20 000 FCFA/m²/mois"
              } selon l'emplacement et la qualité des finitions.`,
              isPersonalized: false,
              isExpert: true
            };
          }
          
          if (propertyResponse) {
            return propertyResponse;
          }
        }
      }
    }
    
    // Vérifier si c'est une demande de quartiers pour une ville spécifique
    if (cityMatch && normalizedQuestion.includes("quartier")) {
      const potentialCity = cityMatch[1].trim();
      if (potentialCity && potentialCity.length > 3) {
        const cityInfo = findCityInfo(potentialCity);
        if (cityInfo) {
          return {
            content: getPopularNeighborhoods(potentialCity),
            isPersonalized: false,
            isExpert: true
          };
        }
      }
    }
    
    // Vérifier si c'est une demande sur une ville en général
    if (cityMatch) {
      const potentialCity = cityMatch[1].trim();
      if (potentialCity && potentialCity.length > 3) {
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
    
    // Détection améliorée des questions sur les meilleurs emplacements
    if ((normalizedQuestion.includes("meilleur") || normalizedQuestion.includes("mieux") || 
         normalizedQuestion.includes("ideal") || normalizedQuestion.includes("idéal") || 
         normalizedQuestion.includes("bon")) && 
        (normalizedQuestion.includes("endroit") || normalizedQuestion.includes("emplacement") || 
         normalizedQuestion.includes("quartier") || normalizedQuestion.includes("lieu") ||
         normalizedQuestion.includes("zone"))) {
        
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
            
          // Adapter la réponse en fonction du type de bien détecté
          let propertySpecificAdvice = "";
          if (propertyType === "terrain") {
            propertySpecificAdvice = `Pour les terrains spécifiquement, les zones de ${
              cityInfo.name === "Yaoundé" ? "Odza, Nsimeyong et Mfandena" : 
              cityInfo.name === "Douala" ? "Yassa, Logbessou et Bonamoussadi" :
              "la périphérie en développement"
            } offrent le meilleur potentiel d'investissement.`;
          } else if (propertyType === "maison") {
            propertySpecificAdvice = `Pour les maisons familiales, les quartiers de ${
              cityInfo.name === "Yaoundé" ? "Bastos, Omnisport et Santa Barbara" : 
              cityInfo.name === "Douala" ? "Bonanjo, Bonapriso et Bonamoussadi" :
              "zones résidentielles calmes"
            } offrent le meilleur cadre de vie.`;
          } else if (propertyType === "appartement") {
            propertySpecificAdvice = `Pour les appartements, les immeubles dans ${
              cityInfo.name === "Yaoundé" ? "le Centre-ville, Bastos et Nlongkak" : 
              cityInfo.name === "Douala" ? "Bonapriso, Bonanjo et Akwa" :
              "le centre-ville"
            } sont les plus valorisés.`;
          } else if (propertyType === "commercial") {
            propertySpecificAdvice = `Pour les espaces commerciaux, les zones à fort passage comme ${
              cityInfo.name === "Yaoundé" ? "le centre-ville, Mvog-Mbi et Mokolo" : 
              cityInfo.name === "Douala" ? "Akwa, Mboppi et Ndokoti" :
              "les marchés et axes commerciaux"
            } sont à privilégier.`;
          }
            
          return {
            content: `Les meilleurs emplacements à ${cityInfo.name} sont ${bestAreas}. Ces quartiers offrent un excellent compromis entre accessibilité, sécurité et qualité de vie. ${propertySpecificAdvice}`,
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
        
        // Si nous avons un type de bien et une catégorie, personnaliser la réponse
        if (propertyType) {
          const propertyTypeMsg = propertyType === "terrain" ? "terrains" : 
                                propertyType === "maison" ? "maisons" :
                                propertyType === "appartement" ? "appartements" :
                                propertyType === "commercial" ? "espaces commerciaux" : "biens immobiliers";
          
          // Personnaliser pour les catégories les plus importantes
          if (category === "prix") {
            return {
              content: `Les ${propertyTypeMsg} au Cameroun ont des prix qui varient considérablement selon la ville et le quartier. ${
                propertyType === "terrain" ? "Dans les grandes villes comme Douala et Yaoundé, les terrains coûtent entre 15 000 et 40 000 FCFA/m² dans les zones prisées, tandis que dans les villes secondaires ou en périphérie, on trouve des opportunités entre 5 000 et 15 000 FCFA/m²." :
                propertyType === "maison" ? "Pour une maison de qualité, comptez entre 50 et 250 millions FCFA à Douala et Yaoundé (quartiers résidentiels), et entre 30 et 150 millions FCFA dans les villes secondaires." :
                propertyType === "appartement" ? "Pour un appartement standard de 2-3 chambres, les prix varient entre 20 et 80 millions FCFA à l'achat dans les grandes villes, ou entre 150 000 et 500 000 FCFA par mois en location." :
                propertyType === "commercial" ? "Les espaces commerciaux bien situés se louent entre 10 000 et 30 000 FCFA/m²/mois dans les zones d'affaires de Douala et Yaoundé, avec des prix d'achat pouvant atteindre 1 million FCFA/m² pour les emplacements premium." :
                "Les prix varient selon le type de bien, l'emplacement et la qualité des finitions. N'hésitez pas à me préciser quel type de bien vous intéresse pour des informations plus détaillées."
              }`,
              isPersonalized: false,
              isExpert: true
            };
          } else if (category === "investissement") {
            return {
              content: `Pour investir dans les ${propertyTypeMsg} au Cameroun, ${
                propertyType === "terrain" ? "concentrez-vous sur les zones en développement des grandes villes comme Yassa à Douala ou Odza à Yaoundé, ou sur les villes en croissance comme Kribi. Les rendements potentiels sur 5-10 ans peuvent atteindre 100-200% si vous choisissez bien l'emplacement." :
                propertyType === "maison" ? "les propriétés résidentielles dans les quartiers sécurisés comme Bonamoussadi (Douala) ou Bastos (Yaoundé) offrent un rendement locatif de 6-8% et une bonne valorisation. Les maisons divisées en plusieurs appartements peuvent générer jusqu'à 10-12% de rendement." :
                propertyType === "appartement" ? "les petites unités (studios, 2 pièces) près des universités et zones d'affaires offrent les meilleurs rendements locatifs (8-14%). Privilégiez les immeubles récents avec ascenseur et sécurité pour attirer une clientèle d'expatriés et cadres." :
                propertyType === "commercial" ? "les emplacements stratégiques dans les zones commerciales à fort passage comme Akwa (Douala) peuvent générer des rendements de 10-15%. Assurez-vous d'obtenir des baux commerciaux sécurisés pour garantir la stabilité de vos revenus." :
                "choisissez des emplacements stratégiques en fonction du type de bien visé. Les zones en développement offrent le meilleur potentiel de plus-value, tandis que les quartiers établis garantissent des revenus locatifs plus stables."
              }`,
              isPersonalized: false,
              isExpert: true
            };
          }
        }
        
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
      } else if (conversationContext.lastPropertyType) {
        const propertyTypeMsg = conversationContext.lastPropertyType === "terrain" ? "terrains" : 
                              conversationContext.lastPropertyType === "maison" ? "maisons" :
                              conversationContext.lastPropertyType === "appartement" ? "appartements" :
                              conversationContext.lastPropertyType === "commercial" ? "espaces commerciaux" : "biens immobiliers";
        suggestedTopic = `Concernant les ${propertyTypeMsg}, je peux vous informer sur les prix, les meilleures zones, ou les conseils d'achat/investissement. Que voulez-vous savoir plus précisément?`;
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
