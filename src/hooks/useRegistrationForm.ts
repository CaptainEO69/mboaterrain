
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { passwordStrength } from "@/lib/password-utils";
import { supabase } from "@/integrations/supabase/client";

export function useRegistrationForm(type: string | null) {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [idNumber, setIdNumber] = useState("");
  const [profession, setProfession] = useState("");
  const [residencePlace, setResidencePlace] = useState("");
  const [saleReason, setSaleReason] = useState("");
  const [isCertified, setIsCertified] = useState(false);
  const [notaryOffice, setNotaryOffice] = useState("");
  const [servicePrices, setServicePrices] = useState<Record<string, number>>({});
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    if (e.preventDefault) {
      e.preventDefault();
    }
    
    // Vérification de la force du mot de passe
    const strength = passwordStrength(password);
    if (strength.score < 3) {
      toast.error("Le mot de passe n'est pas assez sécurisé. Veuillez le renforcer.");
      return;
    }
    
    try {
      // Create the user in Supabase Auth
      await signUp(email, password);
      
      // Create a profile record with additional information
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .insert([
          {
            full_name: `${firstName} ${lastName}`,
            phone_number: phoneNumber,
            birth_place: birthPlace,
            birth_date: birthDate,
            id_number: idNumber,
            profession: profession,
            residence_place: residencePlace,
            user_type: type,
            // Add other fields as needed
          },
        ])
        .select();

      if (profileError) throw profileError;
      
      // Upload profile image if available
      if (profileImage) {
        const fileExt = profileImage.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `profile-images/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('profiles')
          .upload(filePath, profileImage);
          
        if (uploadError) {
          console.error("Error uploading profile image:", uploadError);
          // Continue with signup even if image upload fails
        } else {
          // Update profile with image URL
          const { error: updateError } = await supabase
            .from("profiles")
            .update({ avatar_url: filePath })
            .eq("id", profile[0].id);
            
          if (updateError) {
            console.error("Error updating profile with image URL:", updateError);
          }
        }
      }
      
      toast.success("Inscription réussie! Veuillez vous connecter.");
      navigate("/login");
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error.message || "Erreur lors de l'inscription");
    }
  };

  return {
    formData: {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      birthPlace,
      birthDate,
      idNumber,
      profession,
      residencePlace,
      saleReason,
      isCertified,
      notaryOffice,
      servicePrices,
      profileImage,
    },
    setters: {
      setEmail,
      setPassword,
      setFirstName,
      setLastName,
      setPhoneNumber,
      setBirthPlace,
      setBirthDate,
      setIdNumber,
      setProfession,
      setResidencePlace,
      setSaleReason,
      setIsCertified,
      setNotaryOffice,
      setServicePrices,
      setProfileImage,
    },
    handleSubmit,
  };
}
