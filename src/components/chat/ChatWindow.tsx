
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { ChatMessage } from "./ChatMessage";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

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
  const [input, setInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Ajoute le message de l'utilisateur
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: input,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // Génère une réponse automatique
    setTimeout(() => {
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: generateResponse(input),
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
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
  };

  if (!isChatOpen) {
    return (
      <Button 
        onClick={toggleChat}
        className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-50 rounded-full w-12 h-12 p-0 shadow-lg bg-cmr-green hover:bg-cmr-green/90"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-50 w-[90vw] md:w-80 shadow-xl h-[60vh] md:h-96 flex flex-col overflow-hidden">
      <CardHeader className="py-3 px-4 border-b flex flex-row items-center justify-between bg-white/90 backdrop-blur-sm">
        <CardTitle className="text-lg font-medium">Mon Assistant</CardTitle>
        <Button 
          onClick={toggleChat} 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </Button>
      </CardHeader>
      <div 
        className="absolute inset-0 -z-10 opacity-25"
        style={{
          backgroundImage: "url('/lovable-uploads/d43f6569-f04e-4043-bbf1-6cb25d99b290.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(1.3) contrast(0.85) blur(1px)",
        }}
      />
      <CardContent className="flex-1 p-4 overflow-hidden bg-transparent backdrop-blur-[2px]">
        <ScrollArea className="h-full pr-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-3 border-t bg-white/90 backdrop-blur-sm">
        <form 
          className="flex w-full gap-2" 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <Input
            placeholder="Envoyez un message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-white/80"
          />
          <Button type="submit" size="icon" className="h-10 w-10 bg-cmr-green hover:bg-cmr-green/90">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
