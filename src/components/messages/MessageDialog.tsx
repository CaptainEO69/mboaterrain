
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

interface MessageDialogProps {
  recipientId: string;
  propertyId: string;
  recipientEmail?: string;
}

export function MessageDialog({ recipientId, propertyId, recipientEmail }: MessageDialogProps) {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { user } = useAuth();

  const handleSendMessage = async () => {
    if (!user) {
      toast.error("Vous devez être connecté pour envoyer un message");
      return;
    }

    try {
      setIsSending(true);

      // Enregistrer le message dans la base de données
      const { error: messageError } = await supabase
        .from('messages')
        .insert({
          sender_id: user.id,
          receiver_id: recipientId,
          property_id: propertyId,
          content: message
        });

      if (messageError) throw messageError;

      // Envoyer une notification par email
      if (recipientEmail) {
        await supabase.functions.invoke('send-notification-email', {
          body: {
            to: recipientEmail,
            subject: 'Nouveau message sur Mboater',
            content: `Vous avez reçu un nouveau message concernant votre propriété. Connectez-vous à votre compte pour le consulter.`
          }
        });
      }

      toast.success("Message envoyé avec succès");
      setMessage("");
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error("Erreur lors de l'envoi du message");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <MessageSquare className="w-4 h-4 mr-2" />
          Contacter le vendeur
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Envoyer un message</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="Écrivez votre message ici..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
          />
          <Button 
            onClick={handleSendMessage} 
            className="w-full bg-cmr-green hover:bg-cmr-green/90"
            disabled={isSending || !message.trim()}
          >
            {isSending ? "Envoi en cours..." : "Envoyer"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
