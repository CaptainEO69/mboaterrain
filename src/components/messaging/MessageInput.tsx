
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface MessageInputProps {
  selectedContact: string | null;
  onSendMessage: (content: string) => Promise<void>;
}

export function MessageInput({ 
  selectedContact, 
  onSendMessage 
}: MessageInputProps) {
  const [newMessage, setNewMessage] = useState("");

  if (!selectedContact) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedContact) return;
    
    try {
      await onSendMessage(newMessage);
      setNewMessage("");
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Tapez votre message..."
        className="flex-1 border rounded-md px-3 py-2"
      />
      <Button type="submit">
        <Send className="h-4 w-4 mr-2" />
        Envoyer
      </Button>
    </form>
  );
}
