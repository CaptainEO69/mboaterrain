
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export function useContactForm(userEmail: string | undefined) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(userEmail || "");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

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

  const handleAddFile = (file: File) => {
    // Limite la taille des fichiers à 5 Mo
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Le fichier est trop volumineux (max 5 Mo)");
      return;
    }
    setFiles(prev => [...prev, file]);
  };

  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setDebugInfo(null);
    
    try {
      console.log("Envoi du formulaire de contact:", { name, email, subject, messageLength: message.length, filesCount: files.length });
      
      // Vérifier si la fonction edge existe
      toast.info("Tentative d'envoi du message...");
      
      // Créer la requête avec les données du formulaire
      const formData = {
        name,
        email,
        subject,
        message,
        hasAttachments: files.length > 0
      };

      let fileUrls: string[] = [];

      // Télécharger les fichiers s'il y en a
      if (files.length > 0) {
        toast.info(`Téléchargement de ${files.length} fichier(s)...`);
        
        // Télécharger chaque fichier
        for (const file of files) {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
          const filePath = `contact_attachments/${fileName}`;
          
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('contact_attachments')
            .upload(filePath, file);
            
          if (uploadError) {
            console.error("Erreur lors du téléchargement du fichier:", uploadError);
            throw new Error(`Erreur lors du téléchargement du fichier: ${uploadError.message}`);
          }
          
          // Obtenir l'URL publique du fichier
          const { data: { publicUrl } } = supabase.storage
            .from('contact_attachments')
            .getPublicUrl(filePath);
            
          fileUrls.push(publicUrl);
        }
      }
      
      // Appeler la fonction edge avec les données du formulaire et les URLs des fichiers
      const functionResponse = await supabase.functions.invoke("send-contact-email", {
        body: {
          ...formData,
          fileUrls
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
      // Afficher la confirmation
      setShowConfirmation(true);
      // Masquer la confirmation après 5 secondes
      setTimeout(() => {
        setShowConfirmation(false);
      }, 5000);
      
      // Réinitialiser le formulaire
      setSubject("");
      setMessage("");
      setFiles([]);
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
    files,
    handleAddFile,
    handleRemoveFile,
    isLoading,
    debugInfo,
    showConfirmation,
    handleSubmit
  };
}
