
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";

// Types pour les messages
export interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

// Questions et réponses prédéfinies pour le chatbot simple
const PREDEFINED_RESPONSES: Record<string, string[]> = {
  "default": [
    "Comment puis-je vous aider avec votre recherche immobilière ?",
    "N'hésitez pas à me poser des questions sur nos services !",
    "Je suis là pour vous aider à trouver votre propriété idéale."
  ],
  "prix": [
    "Les prix varient selon la localisation et le type de bien. Vous pouvez utiliser nos filtres de recherche pour trouver des propriétés dans votre budget.",
    "Nous avons des options pour tous les budgets. Souhaitez-vous rechercher dans une gamme de prix spécifique ?"
  ],
  "vente": [
    "Pour vendre votre propriété, vous pouvez utiliser notre service de mise en vente. Il vous suffit de créer une annonce en fournissant les détails et photos de votre bien.",
    "Vous pouvez mettre votre propriété en vente en vous rendant sur la page 'Vendre' après vous être connecté."
  ],
  "location": [
    "Notre section 'Louer' propose de nombreuses propriétés disponibles à la location.",
    "Vous pouvez filtrer les locations selon vos critères spécifiques comme le quartier, le nombre de pièces ou le budget."
  ],
  "contact": [
    "Vous pouvez nous contacter via le formulaire dans la section 'Contact' ou directement avec le propriétaire d'une annonce via notre messagerie sécurisée.",
    "Notre équipe est disponible pour répondre à vos questions via le formulaire de contact."
  ],
  "agent": [
    "Nos agents immobiliers sont disponibles pour vous accompagner dans votre recherche. Ils connaissent parfaitement le marché local.",
    "Vous pouvez contacter directement un agent immobilier depuis la page d'une propriété qui vous intéresse."
  ],
  "notaire": [
    "Nous collaborons avec des notaires qualifiés qui peuvent vous assister pour toutes les formalités légales liées à votre transaction immobilière.",
    "Les services d'un notaire sont essentiels pour sécuriser votre achat ou vente immobilière."
  ],
  "offre": [
    "Vous pouvez envoyer une offre directement au propriétaire depuis la page de la propriété qui vous intéresse.",
    "Pour faire une offre, il vous suffit de cliquer sur le bouton 'Contacter le propriétaire' et de préciser votre proposition."
  ]
};

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Bienvenue ! Comment puis-je vous aider aujourd'hui ?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user } = useAuth();

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

  if (!isChatOpen) {
    return (
      <Button 
        onClick={toggleChat}
        className="fixed bottom-16 right-4 z-50 rounded-full w-14 h-14 p-0 shadow-lg bg-cmr-green hover:bg-cmr-green/90"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-cmr-red text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </Button>
    );
  }

  return (
    <div className="fixed bottom-16 right-4 z-50 w-[90vw] md:w-80 h-[60vh] md:h-96">
      <div 
        className="absolute inset-0 rounded-lg shadow-xl overflow-hidden"
        style={{
          backgroundImage: `url('/lovable-uploads/61bf705f-6a7f-4f57-aa11-ac8121c57d73.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      <div className="relative h-full flex flex-col rounded-lg overflow-hidden">
        <ChatHeader toggleChat={toggleChat} unreadCount={unreadCount} />
        <ChatMessages messages={messages} />
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
