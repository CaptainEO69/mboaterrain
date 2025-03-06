
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
    handleSubmit
  } = useProfileSubmit(user, formData, setLoading);
  
  // If editing is enabled, ensure we have fresh data
  useEffect(() => {
    if (isEditing && user) {
      console.log("Edit mode enabled, ensuring fresh user data");
    }
  }, [isEditing, user]);
  
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
    
    // Also call the base handler for any additional logic
    baseHandleInputChange(e);
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
