
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Mail } from "lucide-react";
import { toast } from "sonner";
import { BottomNav } from "@/components/BottomNav";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";

export default function Contact() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState(user?.email || "");
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

  return (
    <div className="min-h-screen pb-20">
      <h1 className="text-xl font-bold p-4">Contactez-nous</h1>
      
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Nos coordonnées</h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <Mail className="w-5 h-5 text-cmr-green mt-1 mr-3" />
              <div>
                <p className="font-medium">Email</p>
                <a href="mailto:contactmboater@yahoo.com" className="text-cmr-green hover:underline">
                  contactmboater@yahoo.com
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Envoyez-nous un message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nom complet
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isLoading}
                placeholder="Votre nom"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                placeholder="votre@email.com"
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Sujet
              </label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                disabled={isLoading}
                placeholder="Sujet de votre message"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                disabled={isLoading}
                placeholder="Votre message..."
                rows={5}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-cmr-green hover:bg-cmr-green/90" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                "Envoyer le message"
              )}
            </Button>
          </form>
          
          {debugInfo && (
            <div className="mt-6 p-4 bg-gray-100 rounded-md">
              <h3 className="text-sm font-medium mb-2">Informations de débogage:</h3>
              <pre className="text-xs overflow-auto p-2 bg-gray-200 rounded">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}
