
import { useAuth } from "@/lib/auth";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { ChatButton } from "./ChatButton";
import { useChatMessages } from "./useChatMessages";
import { useBackgroundImage } from "./useBackgroundImage";
import { Skeleton } from "@/components/ui/skeleton";
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
  
  // Utiliser l'image du lion téléversée avec un chemin confirmé
  const imageUrl = '/lovable-uploads/83fc2739-1a70-4b50-b7a3-127bda76b51d.png';
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
        
        {/* Image de fond avec style direct et forced display */}
        {imageLoaded && (
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url('${imageSrc}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: 1,
              display: 'block',
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
          {error || (imageLoaded ? `Image chargée: ${imageSrc}` : "Image de fond non chargée. Vérifiez la console.")}
        </div>
      )}
    </div>
  );
}
