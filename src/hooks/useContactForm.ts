
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export function useContactForm(userEmail: string | undefined) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(userEmail || "");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState<any>(null);

  const validateForm = () => {
    if (!name.trim()) {
      toast.error("Veuillez entrer votre nom");
      return false;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Veuillez entrer une adresse email valide");
      return false;
    }
    if (!subject.trim()) {
      toast.error("Veuillez entrer un sujet");
      return false;
    }
    if (!message.trim()) {
      toast.error("Veuillez entrer un message");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setDebugInfo(null);
    
    try {
      console.log("Envoi du formulaire de contact:", { name, email, subject, messageLength: message.length });
      
      // Vérifier si la fonction edge existe
      toast.info("Tentative d'envoi du message...");
      
      const functionResponse = await supabase.functions.invoke("send-contact-email", {
        body: {
          name,
          email,
          subject,
          message
        }
      });

      console.log("Réponse brute de la fonction:", functionResponse);
      
      // Sauvegarder les infos de débogage
      setDebugInfo(functionResponse);
      
      // Vérifier si la réponse contient une erreur
      if (functionResponse.error) {
        console.error("Erreur retournée par la fonction:", functionResponse.error);
        throw new Error(functionResponse.error.message || "Erreur lors de l'envoi du message");
      }

      // Vérifier la structure de la réponse
      const data = functionResponse.data;
      console.log("Données reçues:", data);

      if (!data?.success) {
        console.error("Échec de l'envoi indiqué dans la réponse:", data?.error);
        throw new Error(data?.error || "Erreur lors de l'envoi du message");
      }

      toast.success("Votre message a été envoyé. Nous vous répondrons dans les plus brefs délais.");
      // Réinitialiser uniquement le sujet et le message
      setSubject("");
      setMessage("");
    } catch (error: any) {
      console.error("Erreur lors de l'envoi du message:", error);
      toast.error(error.message || "Erreur lors de l'envoi du message. Veuillez réessayer plus tard.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    subject,
    setSubject,
    message,
    setMessage,
    isLoading,
    debugInfo,
    handleSubmit
  };
}
