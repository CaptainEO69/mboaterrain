
import { useAuth } from "@/lib/auth";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { ChatButton } from "./ChatButton";
import { useChatMessages } from "./useChatMessages";
import { useBackgroundImage } from "./useBackgroundImage";
import { Skeleton } from "@/components/ui/skeleton";

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
  
  // Recherche de l'image dans différents emplacements
  const imageUrl = '/lovable-uploads/83fc2739-1a70-4b50-b7a3-127bda76b51d.png'; // Utiliser directement une image connue
  const { imageLoaded, imageSrc, error } = useBackgroundImage(imageUrl);

  if (!isChatOpen) {
    return <ChatButton toggleChat={toggleChat} unreadCount={unreadCount} />;
  }

  return (
    <div className="fixed bottom-16 right-4 z-50 w-[90vw] md:w-80 h-[60vh] md:h-96">
      <div className="absolute inset-0 rounded-lg shadow-xl overflow-hidden bg-white">
        {/* Dégradé de couleur comme fond de secours */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-cmr-green/10 to-cmr-yellow/10"></div>
        
        {/* Image de fond - affichage uniquement si chargée avec succès */}
        {imageLoaded && imageSrc ? (
          <div 
            className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url('${imageSrc}')`,
              opacity: 0.3,
            }}
          ></div>
        ) : (
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <Skeleton className="h-full w-full opacity-10" />
          </div>
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
