
import { useState, useEffect, useCallback } from "react";
import { Message, PREDEFINED_RESPONSES } from "./types";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";
import { ConversationContext } from "./types/conversationContext";
import { extractContextFromQuery } from "./utils/contextExtraction";
import { generateResponse, getRandomResponse } from "./utils/responseGenerator";

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
  const [conversationContext, setConversationContext] = useState<ConversationContext>({});

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

  // Fonction pour ouvrir directement le chat
  const openChat = useCallback(() => {
    setIsChatOpen(true);
    setUnreadCount(0);
  }, []);

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
    extractContextFromQuery(normalizedInput, setConversationContext);

    // Délai aléatoire pour simuler la réflexion du bot
    const delay = Math.floor(Math.random() * 800) + 400;
    
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    
    const newTimeout = setTimeout(() => {
      setMessages(prev => {
        const withoutTyping = prev.filter(msg => msg.id !== typingIndicator.id);
        const botResponse = generateResponse(input, conversationContext);
        
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
    toggleChat: useCallback(() => {
      setIsChatOpen(!isChatOpen);
      if (!isChatOpen) {
        setUnreadCount(0);
      }
    }, [isChatOpen]),
    openChat // Ajout de la fonction pour ouvrir directement le chat
  };
}
