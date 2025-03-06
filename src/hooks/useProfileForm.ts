
import { useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";
import { useProfileData } from "./profile/useProfileData";
import { useProfileSubmit } from "./profile/useProfileSubmit";

export function useProfileForm(user: User | null) {
  const {
    loading,
    setLoading,
    error: dataError,
    formData,
    setFormData,
    resetForm
  } = useProfileData(user);
  
  const {
    isEditing,
    setIsEditing, 
    error: submitError,
    handleInputChange: baseHandleInputChange,
    handleSubmit: baseHandleSubmit
  } = useProfileSubmit(user, formData, setLoading);
  
  // Si l'édition est activée, assurons-nous d'avoir des données fraîches
  useEffect(() => {
    if (isEditing && user) {
      console.log("Edit mode enabled, ensuring fresh user data");
    }
  }, [isEditing, user]);
  
  // Notification des erreurs
  useEffect(() => {
    if (dataError || submitError) {
      toast.error(`Erreur: ${dataError || submitError}`);
    }
  }, [dataError, submitError]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: any } }) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Appeler aussi le gestionnaire de base pour toute logique supplémentaire
    baseHandleInputChange(e);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted, current form data:", formData);
    await baseHandleSubmit(e);
  };

  return {
    isEditing,
    setIsEditing,
    loading,
    error: dataError || submitError,
    formData,
    handleInputChange,
    handleSubmit,
    resetForm
  };
}
