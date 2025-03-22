
import { useState, useEffect, useCallback } from "react";
import { Message, PREDEFINED_RESPONSES } from "./types";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { ConversationContext } from "./types/conversationContext";
import { extractContextFromQuery } from "./utils/contextExtraction";
import { generateResponse, getRandomResponse } from "./utils/responseGenerator";
import { supabase } from "@/integrations/supabase/client";

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
      
      // Load previous chat history for returning users
      loadChatHistory();
    } else {
      setConversationContext(prev => ({
        ...prev,
        userProfile: {
          isLoggedIn: false
        }
      }));
    }
  }, [user]);

  // Load chat history from database
  const loadChatHistory = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('chat_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);
        
      if (error) throw error;
      
      if (data && data.length > 0) {
        // Extract frequently asked topics for better context
        const categories = data.map(entry => entry.category).filter(Boolean);
        const propertyTypes = data.map(entry => entry.property_type).filter(Boolean);
        const locations = data.map(entry => entry.location).filter(Boolean);
        
        // Update user context with historical preferences
        setConversationContext(prev => ({
          ...prev,
          userPreferences: {
            ...prev.userPreferences,
            frequentCategories: Array.from(new Set(categories)),
            frequentPropertyTypes: Array.from(new Set(propertyTypes)),
            frequentLocations: Array.from(new Set(locations))
          },
          recentSearches: data.map(entry => entry.question)
        }));
      }
    } catch (error) {
      console.error("Error loading chat history:", error);
    }
  };

  // Save chat message to database
  const saveChatToHistory = async (question: string, response: string) => {
    if (!user) return;
    
    try {
      // Extract context from the question for better categorization
      let category = null;
      let propertyType = null;
      let location = null;
      
      if (conversationContext.lastTopic) {
        category = conversationContext.lastTopic;
      }
      
      if (conversationContext.lastPropertyType) {
        propertyType = conversationContext.lastPropertyType;
      }
      
      if (conversationContext.lastCity) {
        location = conversationContext.lastCity;
      } else if (conversationContext.lastNeighborhood) {
        location = conversationContext.lastNeighborhood;
      } else if (conversationContext.lastRegion) {
        location = conversationContext.lastRegion;
      }
      
      // Save to database
      await supabase.from('chat_history').insert({
        user_id: user.id,
        question,
        response,
        category,
        property_type: propertyType,
        location,
        is_important: question.length > 50  // Mark longer questions as important
      });
      
      // Also update search history in user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('search_history')
        .eq('user_id', user.id)
        .single();
        
      let searchHistory = profile?.search_history || [];
      searchHistory = [
        { query: question, timestamp: new Date().toISOString() },
        ...searchHistory.slice(0, 19)  // Keep last 20 searches
      ];
      
      await supabase
        .from('profiles')
        .update({ search_history: searchHistory })
        .eq('user_id', user.id);
        
    } catch (error) {
      console.error("Error saving chat history:", error);
    }
  };

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
  const handleSendMessage = useCallback(async (input: string) => {
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
    
    const newTimeout = setTimeout(async () => {
      try {
        const botResponse = await generateResponse(input, conversationContext, user?.id);
        
        console.log("Contexte de conversation:", conversationContext);
        console.log("Réponse générée:", botResponse);
        
        setMessages(prev => {
          const withoutTyping = prev.filter(msg => msg.id !== typingIndicator.id);
          
          const botMessage: Message = {
            id: `bot-${Date.now()}`,
            content: botResponse.content,
            sender: "bot",
            timestamp: new Date(),
            isPersonalized: botResponse.isPersonalized,
            isExpert: botResponse.isExpert,
            relatedToQuestion: input // Tracer la question pour le débogage
          };
          
          // Save to history if user is logged in
          if (user) {
            saveChatToHistory(input, botResponse.content);
          }
          
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
      } catch (error) {
        console.error("Error generating response:", error);
        
        setMessages(prev => {
          const withoutTyping = prev.filter(msg => msg.id !== typingIndicator.id);
          const errorMessage: Message = {
            id: `error-${Date.now()}`,
            content: "Désolé, j'ai rencontré un problème. Pourriez-vous reformuler votre question?",
            sender: "bot",
            timestamp: new Date()
          };
          return [...withoutTyping, errorMessage];
        });
      }
      
      if (!isChatOpen) {
        setUnreadCount(prev => prev + 1);
      }
    }, delay);
    
    setTypingTimeout(newTimeout);
  }, [isChatOpen, typingTimeout, conversationContext, user]);

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
