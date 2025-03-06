
import { useAuth } from "@/lib/auth";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { ChatButton } from "./ChatButton";
import { useChatMessages } from "./useChatMessages";
import { useEffect, useState } from "react";

export * from "./types";

export function ChatWindow() {
  const { user } = useAuth();
  const {
    messages,
    unreadCount,
    isChatOpen,
    handleSendMessage,
    toggleChat
  } = useChatMessages();
  const [backgroundImageLoaded, setBackgroundImageLoaded] = useState(false);

  // Afficher des informations de débogage dans la console
  useEffect(() => {
    console.log("Chat window rendered, chat open:", isChatOpen);
    
    // Vérifie si l'image existe avec le chemin correct
    const img = new Image();
    img.onload = () => {
      console.log("Image de fond chargée avec succès:", img.src);
      setBackgroundImageLoaded(true);
    };
    img.onerror = (error) => {
      console.error("Erreur lors du chargement de l'image de fond:", error);
      console.log("Chemin de l'image tentée:", img.src);
    };
    img.src = "/lovable-uploads/1f09cbc4-45e2-4b8c-8e32-75019e404759.png"; // Utilisation de la nouvelle image téléchargée
  }, [isChatOpen]);

  if (!isChatOpen) {
    return <ChatButton toggleChat={toggleChat} unreadCount={unreadCount} />;
  }

  return (
    <div className="fixed bottom-16 right-4 z-50 w-[90vw] md:w-80 h-[60vh] md:h-96">
      <div className="absolute inset-0 rounded-lg shadow-xl overflow-hidden bg-white">
        {/* Image d'arrière-plan ou dégradé de secours */}
        {backgroundImageLoaded ? (
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center opacity-30" 
            style={{ backgroundImage: 'url(/lovable-uploads/1f09cbc4-45e2-4b8c-8e32-75019e404759.png)' }}
          ></div>
        ) : (
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-cmr-green/20 to-cmr-yellow/20"></div>
        )}
      </div>
      
      <div className="relative h-full flex flex-col rounded-lg overflow-hidden">
        <ChatHeader toggleChat={toggleChat} unreadCount={unreadCount} />
        <ChatMessages messages={messages} />
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
