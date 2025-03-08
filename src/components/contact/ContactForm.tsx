
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { DebugInfo } from "./DebugInfo";

interface ContactFormProps {
  name: string;
  email: string;
  subject: string;
  message: string;
  isLoading: boolean;
  debugInfo: any;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onSubjectChange: (value: string) => void;
  onMessageChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ContactForm({
  name,
  email,
  subject,
  message,
  isLoading,
  debugInfo,
  onNameChange,
  onEmailChange,
  onSubjectChange,
  onMessageChange,
  onSubmit
}: ContactFormProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">Envoyez-nous un message</h2>
      
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nom complet
          </label>
          <Input
            id="name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
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
            onChange={(e) => onEmailChange(e.target.value)}
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
            onChange={(e) => onSubjectChange(e.target.value)}
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
            onChange={(e) => onMessageChange(e.target.value)}
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
      
      <DebugInfo debugInfo={debugInfo} />
    </div>
  );
}
