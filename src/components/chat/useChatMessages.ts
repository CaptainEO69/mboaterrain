
import { useState, useEffect } from "react";
import { Message, PREDEFINED_RESPONSES } from "./types";

export function useChatMessages() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Bienvenue sur CamerImmo! Comment puis-je vous aider dans votre projet immobilier aujourd'hui?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Si le chat est ouvert, réinitialiser le compteur de messages non lus
    if (isChatOpen) {
      setUnreadCount(0);
    }
  }, [isChatOpen]);

  const handleSendMessage = (input: string) => {
    if (!input.trim()) return;

    // Ajoute le message de l'utilisateur
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: input,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Ajoute un indicateur de frappe pendant que le bot "réfléchit"
    const typingIndicator: Message = {
      id: `typing-${Date.now()}`,
      content: "...",
      sender: "bot",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, typingIndicator]);

    // Simule un délai de réflexion
    const delay = Math.floor(Math.random() * 1000) + 500;
    
    // Nettoyer le timeout précédent si existant
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    
    // Génère une réponse automatique après un délai
    const newTimeout = setTimeout(() => {
      // Retire l'indicateur de frappe et ajoute la réponse
      setMessages(prev => {
        const withoutTyping = prev.filter(msg => msg.id !== typingIndicator.id);
        const botMessage: Message = {
          id: `bot-${Date.now()}`,
          content: generateResponse(input),
          sender: "bot",
          timestamp: new Date()
        };
        return [...withoutTyping, botMessage];
      });
      
      // Si le chat n'est pas ouvert, incrémenter le compteur
      if (!isChatOpen) {
        setUnreadCount(prev => prev + 1);
      }
    }, delay);
    
    setTypingTimeout(newTimeout);
  };

  const generateResponse = (question: string): string => {
    // Convertir en minuscules pour la recherche de mots-clés
    const normalizedQuestion = question.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    // Tableau des correspondances entre mots-clés et catégories
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
    
    // Chercher la première correspondance
    for (const [category, keywords] of Object.entries(keywordMappings)) {
      if (keywords.some(keyword => normalizedQuestion.includes(keyword))) {
        return getRandomResponse(category);
      }
    }
    
    // Analyse contextuelle plus avancée pour les questions complexes
    if (normalizedQuestion.includes("meilleur") && normalizedQuestion.includes("moment")) {
      return "Le meilleur moment pour acheter est généralement en début d'année ou pendant la saison des pluies quand il y a moins d'activité sur le marché. Les prix sont souvent plus négociables à ces périodes.";
    }
    
    if ((normalizedQuestion.includes("delai") || normalizedQuestion.includes("durée") || normalizedQuestion.includes("duree") || normalizedQuestion.includes("temps")) && 
        (normalizedQuestion.includes("vente") || normalizedQuestion.includes("vendre") || normalizedQuestion.includes("transaction"))) {
      return "La durée moyenne d'une transaction immobilière complète au Cameroun est de 2 à 3 mois. Cela inclut la période de mise en vente, les visites, la négociation, et les formalités administratives et notariales.";
    }
    
    if (normalizedQuestion.includes("merci") || normalizedQuestion.includes("super") || normalizedQuestion.includes("excellent")) {
      return "Je vous en prie, c'est un plaisir de vous aider! N'hésitez pas si vous avez d'autres questions concernant votre projet immobilier.";
    }
    
    // Réponse par défaut si aucun mot-clé n'est trouvé
    return getRandomResponse("default");
  };

  const getRandomResponse = (category: string): string => {
    const responses = PREDEFINED_RESPONSES[category] || PREDEFINED_RESPONSES["default"];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (!isChatOpen) {
      setUnreadCount(0); // Réinitialiser le compteur lors de l'ouverture
    }
  };

  // Nettoyer les timeouts lors du démontage du composant
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
