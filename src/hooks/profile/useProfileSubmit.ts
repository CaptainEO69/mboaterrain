
import { useState } from "react";
import { User } from "@supabase/supabase-js";
import { ProfileFormData } from "@/types/profile";
import { updateUserProfile } from "@/services/profileService";
import { toast } from "sonner";

export function useProfileSubmit(
  user: User | null, 
  formData: ProfileFormData, 
  setLoading: (isLoading: boolean) => void
) {
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: any } }) => {
    const { name, value } = e.target;
    
    if (name) {
      console.log(`Updating form field: ${name} with value:`, value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError("Vous devez être connecté pour mettre à jour votre profil");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      console.log("ProfileForm - Submitting profile update");
      const success = await updateUserProfile(user.id, formData);
      
      if (success) {
        setIsEditing(false);
        toast.success("Profil mis à jour avec succès");
      } else {
        throw new Error("La mise à jour du profil a échoué");
      }
    } catch (error: any) {
      console.error("Error in handleSubmit:", error);
      setError("Erreur lors de la mise à jour du profil: " + (error.message || "Erreur inconnue"));
      toast.error("Erreur lors de la mise à jour du profil. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return {
    isEditing,
    setIsEditing,
    error,
    handleInputChange,
    handleSubmit
  };
}
