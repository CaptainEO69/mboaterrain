
import { useState, useEffect } from "react";
import { Message, PREDEFINED_RESPONSES } from "./types";

export function useChatMessages() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Bienvenue ! Comment puis-je vous aider aujourd'hui ?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);

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

    // Génère une réponse automatique
    setTimeout(() => {
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: generateResponse(input),
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      
      // Si le chat n'est pas ouvert, incrémenter le compteur
      if (!isChatOpen) {
        setUnreadCount(prev => prev + 1);
      }
    }, 1000);
  };

  const generateResponse = (question: string): string => {
    // Recherche de mots-clés dans la question
    const lowercaseQuestion = question.toLowerCase();
    
    for (const [keyword, responses] of Object.entries(PREDEFINED_RESPONSES)) {
      if (keyword !== "default" && lowercaseQuestion.includes(keyword)) {
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }
    
    // Réponse par défaut si aucun mot-clé n'est trouvé
    const defaultResponses = PREDEFINED_RESPONSES["default"];
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (!isChatOpen) {
      setUnreadCount(0); // Réinitialiser le compteur lors de l'ouverture
    }
  };

  return {
    messages,
    unreadCount,
    isChatOpen,
    handleSendMessage,
    toggleChat
  };
}
