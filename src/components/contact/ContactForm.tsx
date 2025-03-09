
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { DebugInfo } from "./DebugInfo";
import { FileUploader } from "./FileUploader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface ContactFormProps {
  name: string;
  email: string;
  subject: string;
  message: string;
  files: File[];
  isLoading: boolean;
  debugInfo: any;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onSubjectChange: (value: string) => void;
  onMessageChange: (value: string) => void;
  onAddFile: (file: File) => void;
  onRemoveFile: (index: number) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ContactForm({
  name,
  email,
  subject,
  message,
  files,
  isLoading,
  debugInfo,
  onNameChange,
  onEmailChange,
  onSubjectChange,
  onMessageChange,
  onAddFile,
  onRemoveFile,
  onSubmit
}: ContactFormProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">Envoyez-nous un message</h2>
      
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Nom complet
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              required
              disabled={isLoading}
              placeholder="Votre nom"
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              required
              disabled={isLoading}
              placeholder="votre@email.com"
              className="w-full"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
            Sujet
          </Label>
          <Select 
            value={subject} 
            onValueChange={onSubjectChange} 
            disabled={isLoading}
          >
            <SelectTrigger id="subject" className="w-full">
              <SelectValue placeholder="Sélectionnez un sujet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="information">Demande d'informations</SelectItem>
              <SelectItem value="property">Informations sur un bien</SelectItem>
              <SelectItem value="partnership">Proposition de partenariat</SelectItem>
              <SelectItem value="suggestion">Suggestion</SelectItem>
              <SelectItem value="complaint">Réclamation</SelectItem>
              <SelectItem value="other">Autre sujet</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="message" className="text-sm font-medium text-gray-700">
            Message
          </Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            required
            disabled={isLoading}
            placeholder="Votre message..."
            rows={5}
            className="resize-none"
          />
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Pièces jointes
          </Label>
          <FileUploader 
            files={files}
            onAddFile={onAddFile}
            onRemoveFile={onRemoveFile}
            disabled={isLoading}
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-cmr-green hover:bg-cmr-green/90 text-white font-medium py-2 rounded-md transition-colors" 
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
