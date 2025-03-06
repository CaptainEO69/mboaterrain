
import { useAuth } from "@/lib/auth";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { ChatButton } from "./ChatButton";
import { useChatMessages } from "./useChatMessages";
import { useBackgroundImage } from "./useBackgroundImage";
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
  
  // Utiliser l'image lion.png.png comme fond par défaut
  const [useImageBackground, setUseImageBackground] = useState(true);
  const { imageLoaded, imageSrc, error } = useBackgroundImage(
    useImageBackground ? 'lion.png.png' : '' // Modifié pour utiliser l'extension correcte
  );

  // Afficher des informations de débogage dans la console
  useEffect(() => {
    console.log("État de l'image:", { imageLoaded, imageSrc, error, useImageBackground });
  }, [imageLoaded, imageSrc, error, useImageBackground]);

  if (!isChatOpen) {
    return <ChatButton toggleChat={toggleChat} unreadCount={unreadCount} />;
  }

  return (
    <div className="fixed bottom-16 right-4 z-50 w-[90vw] md:w-80 h-[60vh] md:h-96">
      <div className="absolute inset-0 rounded-lg shadow-xl overflow-hidden bg-white">
        {/* Dégradé de couleur comme fond principal */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-cmr-green/20 to-cmr-yellow/20"></div>
        
        {/* Image de fond - uniquement si chargée avec succès */}
        {useImageBackground && imageLoaded && imageSrc && (
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
            (useImageBackground ? 
              (imageLoaded ? `Image chargée: ${imageSrc?.substring(0, 30)}...` : "Chargement de l'image...") :
              "Utilisation du dégradé uniquement (pas d'image)")
          }
        </div>
      )}
    </div>
  );
}
