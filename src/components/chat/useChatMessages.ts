import { useState, useEffect, useCallback } from "react";
import { Message, PREDEFINED_RESPONSES } from "./types";
import { toast } from "sonner";

export function useChatMessages() {
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
          content: botResponse,
          sender: "bot",
          timestamp: new Date()
        };
        
        if (botResponse.includes("[EXPERT]")) {
          botMessage.content = botResponse.replace("[EXPERT]", "");
          
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
  }, [isChatOpen, typingTimeout]);

  const generateResponse = (question: string): string => {
    const normalizedQuestion = question.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    const keywordMappings: Record<string, string[]> = {
      "prix": ["cout", "coute", "cher", "budget", "prix", "tarif", "combien", "fcfa", "xaf", "euro", "dollar"],
      "vente": ["vendre", "vente", "mettre en vente", "vends", "céder", "ceder", "mise en vente"],
      "location": ["louer", "location", "bail", "locataire", "proprietaire", "propriétaire"],
      "contact": ["contact", "joindre", "parler", "appeler", "téléphone", "telephone", "mail", "email", "message"],
      "agent": ["agent", "conseiller", "courtier", "agence", "professionnel", "immobilier"],
      "quartier": ["quartier", "zone", "secteur", "emplacement", "douala", "yaounde", "yaoundé", "lieu"],
      "document": ["document", "papier", "titre", "foncier", "contrat", "acte", "cadastre", "légal", "legal"],
      "investissement": ["investir", "investissement", "placement", "rendement", "rentabilité", "rentabilite"],
      "crédit": ["credit", "crédit", "pret", "prêt", "banque", "financement", "financer", "emprunt"],
      "construction": ["construire", "construction", "bâtir", "batir", "chantier", "architecte", "entrepreneur"],
      "annonce": ["annonce", "publier", "publication", "poster", "creer", "créer"],
      "sécurité": ["securite", "sécurité", "arnaque", "fraude", "confiance", "fiable", "sûr", "sur"],
      "visite": ["visite", "visiter", "voir", "rendez-vous", "rendez", "rendezvous", "rdv"],
      "estimation": ["estimer", "estimation", "evaluer", "évaluer", "evaluation", "évaluation", "valeur", "vaut"],
      "notaire": ["notaire", "acte", "authentique", "officiel", "légalisation", "legalisation"]
    };

    const isExpertQuestion = 
      normalizedQuestion.includes("exactement") || 
      normalizedQuestion.includes("precisement") || 
      normalizedQuestion.includes("précisément") ||
      normalizedQuestion.includes("detail") || 
      normalizedQuestion.includes("détail") ||
      normalizedQuestion.includes("expliquez") ||
      normalizedQuestion.includes("pourquoi") ||
      normalizedQuestion.includes("comment") && (
        normalizedQuestion.includes("fonctionne") || 
        normalizedQuestion.includes("procédure") || 
        normalizedQuestion.includes("procedure")
      );
    
    for (const [category, keywords] of Object.entries(keywordMappings)) {
      if (keywords.some(keyword => normalizedQuestion.includes(keyword))) {
        const response = getRandomResponse(category);
        return isExpertQuestion ? `[EXPERT]${response}` : response;
      }
    }
    
    if (normalizedQuestion.includes("meilleur") && normalizedQuestion.includes("moment")) {
      return isExpertQuestion 
        ? "[EXPERT]Le meilleur moment pour acheter est généralement en début d'année ou pendant la saison des pluies quand il y a moins d'activité sur le marché. Les prix sont souvent plus négociables à ces périodes. Les statistiques montrent une baisse d'activité de 15-20% pendant ces périodes."
        : "Le meilleur moment pour acheter est généralement en début d'année ou pendant la saison des pluies quand il y a moins d'activité sur le marché. Les prix sont souvent plus négociables à ces périodes.";
    }
    
    if ((normalizedQuestion.includes("delai") || normalizedQuestion.includes("durée") || normalizedQuestion.includes("duree") || normalizedQuestion.includes("temps")) && 
        (normalizedQuestion.includes("vente") || normalizedQuestion.includes("vendre") || normalizedQuestion.includes("transaction"))) {
      return isExpertQuestion
        ? "[EXPERT]La durée moyenne d'une transaction immobilière complète au Cameroun est de 2 à 3 mois. Cela inclut la période de mise en vente (2-3 semaines), les visites (1-2 semaines), la négociation (1-2 semaines), et les formalités administratives et notariales (3-4 semaines)."
        : "La durée moyenne d'une transaction immobilière complète au Cameroun est de 2 à 3 mois. Cela inclut la période de mise en vente, les visites, la négociation, et les formalités administratives et notariales.";
    }
    
    if (normalizedQuestion.includes("merci") || normalizedQuestion.includes("super") || normalizedQuestion.includes("excellent")) {
      return "Je vous en prie, c'est un plaisir de vous aider! N'hésitez pas si vous avez d'autres questions concernant votre projet immobilier.";
    }
    
    return getRandomResponse("default");
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
