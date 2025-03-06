
import { useAuth } from "@/lib/auth";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { ChatButton } from "./ChatButton";
import { useChatMessages } from "./useChatMessages";
import { useBackgroundImage } from "./useBackgroundImage";
import { useEffect } from "react";

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
  
  // Utiliser spécifiquement l'image du lion
  const imageUrl = '/lovable-uploads/a3ffe062-c7f9-4c48-9958-60db36d00526.png';
  const { imageLoaded, imageSrc, error } = useBackgroundImage(imageUrl);

  // Afficher des informations de débogage dans la console
  useEffect(() => {
    console.log("État de l'image:", { imageLoaded, imageSrc, error });
  }, [imageLoaded, imageSrc, error]);

  if (!isChatOpen) {
    return <ChatButton toggleChat={toggleChat} unreadCount={unreadCount} />;
  }

  return (
    <div className="fixed bottom-16 right-4 z-50 w-[90vw] md:w-80 h-[60vh] md:h-96">
      <div className="absolute inset-0 rounded-lg shadow-xl overflow-hidden bg-white">
        {/* Dégradé de couleur comme fond de secours */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-cmr-green/10 to-cmr-yellow/10"></div>
        
        {/* Image de fond - forcée à s'afficher avec !important */}
        {imageLoaded && imageSrc && (
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url('${imageSrc}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: 0.7,
              display: 'block !important'
            }}
          ></div>
        )}
      </div>
      
      <div className="relative h-full flex flex-col rounded-lg overflow-hidden">
        <ChatHeader toggleChat={toggleChat} unreadCount={unreadCount} />
        <ChatMessages messages={messages} />
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
      
      {/* Affichage des informations de débogage en mode développement */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute bottom-0 left-0 bg-orange-500 text-white p-1 text-xs max-w-full overflow-hidden">
          {error ? 
            `Erreur: ${error}` : 
            (imageLoaded ? `Image chargée: ${imageSrc?.substring(0, 30)}...` : "Chargement de l'image...")
          }
        </div>
      )}
    </div>
  );
}
