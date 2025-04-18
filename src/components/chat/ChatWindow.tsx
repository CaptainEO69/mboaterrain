
import { useAuth } from "@/lib/auth";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { ChatButton } from "./ChatButton";
import { useChatMessages } from "./useChatMessages";
import { useEffect } from "react";
import { useBackgroundImage } from "./useBackgroundImage";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useLocation } from "react-router-dom";

export * from "./types";

export function ChatWindow() {
  const { user } = useAuth();
  const location = useLocation();
  
  const {
    messages,
    unreadCount,
    isChatOpen,
    handleSendMessage,
    toggleChat,
    openChat
  } = useChatMessages();
  
  const backgroundImagePath = "/lovable-uploads/1f09cbc4-45e2-4b8c-8e32-75019e404759.png";
  const { imageLoaded, imageSrc, error } = useBackgroundImage(backgroundImagePath);

  // Gérer l'ouverture automatique du chat et la question initiale
  useEffect(() => {
    const state = location.state as { openChat?: boolean; initialQuestion?: string } | null;
    
    if (state?.openChat) {
      console.log("Ouverture automatique du chat demandée");
      openChat();
      
      // Si une question initiale est fournie, l'envoyer après un court délai
      if (state.initialQuestion) {
        console.log("Question initiale détectée:", state.initialQuestion);
        setTimeout(() => {
          handleSendMessage(state.initialQuestion as string);
          
          // Nettoyer l'état pour éviter de renvoyer la même question lors des navigations futures
          window.history.replaceState({}, document.title);
        }, 500);
      }
    }
  }, [location.state, openChat, handleSendMessage]);

  // Afficher des informations de débogage dans la console
  useEffect(() => {
    console.log("Chat window rendered, chat open:", isChatOpen);
    console.log("Background image status:", { loaded: imageLoaded, src: imageSrc, error });
  }, [isChatOpen, imageLoaded, imageSrc, error]);

  if (!isChatOpen) {
    return (
      <TooltipProvider>
        <ChatButton toggleChat={toggleChat} unreadCount={unreadCount} />
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <div className="fixed bottom-16 right-4 z-50 w-[90vw] md:w-80 h-[60vh] md:h-96">
        <div className="absolute inset-0 rounded-lg shadow-xl overflow-hidden bg-white">
          {/* Préchargement de l'image en arrière-plan avec transition douce */}
          <div 
            className={`absolute inset-0 z-0 bg-gradient-to-br from-cmr-green/20 to-cmr-yellow/20 transition-opacity duration-300 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`}
          ></div>
          
          {imageLoaded && (
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center opacity-60 transition-opacity duration-300 ease-in-out" 
              style={{ backgroundImage: `url(${imageSrc})` }}
            ></div>
          )}
        </div>
        
        <div className="relative h-full flex flex-col rounded-lg overflow-hidden">
          <ChatHeader toggleChat={toggleChat} unreadCount={unreadCount} />
          <ChatMessages messages={messages} />
          <ChatInput onSendMessage={handleSendMessage} messages={messages} />
        </div>
      </div>
    </TooltipProvider>
  );
}
