import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

// Types pour améliorer la lisibilité et le typage
type ContactFormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
  files: File[];
  isLoading: boolean;
  debugInfo: any | null;
  showConfirmation: boolean;
};

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
  hasAttachments: boolean;
  fileUrls?: string[];
};

/**
 * Hook personnalisé pour gérer le formulaire de contact
 * @param userEmail Email de l'utilisateur connecté (optionnel)
 */
export function useContactForm(userEmail: string | undefined) {
  // État du formulaire
  const [formState, setFormState] = useState<ContactFormState>({
    name: "",
    email: userEmail || "",
    subject: "information",
    message: "",
    files: [],
    isLoading: false,
    debugInfo: null,
    showConfirmation: false
  });

  // Destructuration de l'état pour plus de clarté
  const { name, email, subject, message, files, isLoading, debugInfo, showConfirmation } = formState;

  /**
   * Valide les champs du formulaire
   * @returns true si le formulaire est valide, false sinon
   */
  const validateForm = (): boolean => {
    if (!name.trim()) {
      toast.error("Veuillez entrer votre nom");
      return false;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Veuillez entrer une adresse email valide");
      return false;
    }
    if (!subject.trim()) {
      toast.error("Veuillez sélectionner un sujet");
      return false;
    }
    if (!message.trim()) {
      toast.error("Veuillez entrer un message");
      return false;
    }
    return true;
  };

  /**
   * Met à jour un champ spécifique du formulaire
   * @param field Nom du champ à mettre à jour
   * @param value Nouvelle valeur
   */
  const updateField = <K extends keyof ContactFormState>(field: K, value: ContactFormState[K]) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  // Setters pour chaque champ
  const setName = (value: string) => updateField("name", value);
  const setEmail = (value: string) => updateField("email", value);
  const setSubject = (value: string) => updateField("subject", value);
  const setMessage = (value: string) => updateField("message", value);

  /**
   * Ajoute un fichier à la liste des pièces jointes
   * @param file Fichier à ajouter
   */
  const handleAddFile = (file: File) => {
    // Limite la taille des fichiers à 5 Mo
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Le fichier est trop volumineux (max 5 Mo)");
      return;
    }
    
    // Limite le nombre de fichiers à 3
    if (files.length >= 3) {
      toast.error("Vous ne pouvez pas joindre plus de 3 fichiers");
      return;
    }
    
    setFormState(prev => ({ ...prev, files: [...prev.files, file] }));
  };

  /**
   * Supprime un fichier de la liste des pièces jointes
   * @param index Index du fichier à supprimer
   */
  const handleRemoveFile = (index: number) => {
    setFormState(prev => ({ 
      ...prev, 
      files: prev.files.filter((_, i) => i !== index) 
    }));
  };

  /**
   * Télécharge les fichiers joints vers Supabase Storage
   * @returns Tableau des URLs publiques des fichiers téléchargés
   */
  const uploadAttachments = async (): Promise<string[]> => {
    if (files.length === 0) return [];
    
    toast.info(`Téléchargement de ${files.length} fichier(s)...`);
    const fileUrls: string[] = [];
    
    // Télécharger chaque fichier
    for (const file of files) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `contact_attachments/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
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
    
    return fileUrls;
  };

  /**
   * Envoie le formulaire de contact via la fonction Edge
   * @param formData Données du formulaire à envoyer
   * @returns Réponse de la fonction Edge
   */
  const sendContactForm = async (formData: ContactFormData) => {
    return await supabase.functions.invoke("send-contact-email", {
      body: formData
    });
  };

  /**
   * Réinitialise le formulaire après un envoi réussi
   */
  const resetForm = () => {
    setFormState(prev => ({
      ...prev,
      subject: "",
      message: "",
      files: [],
      showConfirmation: true
    }));
    
    // Masquer la confirmation après 5 secondes
    setTimeout(() => {
      setFormState(prev => ({ ...prev, showConfirmation: false }));
    }, 5000);
  };

  /**
   * Gère la soumission du formulaire de contact
   * @param e Événement de soumission du formulaire
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setFormState(prev => ({ ...prev, isLoading: true, debugInfo: null }));
    
    try {
      // Traduire les valeurs de sujet pour l'email
      const subjectLabels: Record<string, string> = {
        information: "Demande d'informations",
        property: "Informations sur un bien",
        partnership: "Proposition de partenariat",
        suggestion: "Suggestion",
        complaint: "Réclamation",
        other: "Autre sujet"
      };
      
      const subjectLabel = subjectLabels[subject] || subject;
      
      console.log("Envoi du formulaire de contact:", { 
        name, 
        email, 
        subject: subjectLabel, 
        messageLength: message.length, 
        filesCount: files.length 
      });
      
      toast.info("Tentative d'envoi du message...");
      
      // Télécharger les fichiers s'il y en a
      const fileUrls = await uploadAttachments();
      
      // Créer la requête avec les données du formulaire
      const formData: ContactFormData = {
        name,
        email,
        subject: subjectLabel,
        message,
        hasAttachments: files.length > 0,
        fileUrls
      };
      
      // Appeler la fonction edge avec les données du formulaire
      const functionResponse = await sendContactForm(formData);

      console.log("Réponse brute de la fonction:", functionResponse);
      
      // Sauvegarder les infos de débogage
      setFormState(prev => ({ ...prev, debugInfo: functionResponse }));
      
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
      
      // Réinitialiser le formulaire
      resetForm();
    } catch (error: any) {
      console.error("Erreur lors de l'envoi du message:", error);
      toast.error(error.message || "Erreur lors de l'envoi du message. Veuillez réessayer plus tard.");
    } finally {
      setFormState(prev => ({ ...prev, isLoading: false }));
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
