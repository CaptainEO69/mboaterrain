
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
      const { data: authData, error: authError } = await signUp(email, password);
      
      if (authError) throw authError;
      
      // Extraire l'ID de l'utilisateur
      const userId = authData?.user?.id;
      
      if (!userId) {
        throw new Error("Impossible de créer le compte utilisateur");
      }
      
      // Convertir la date de naissance en année de naissance pour la BD
      const birthYear = birthDate ? birthDate.getFullYear() : null;
      
      // Create a profile record with additional information
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .insert({
          user_id: userId,
          full_name: `${firstName} ${lastName}`,
          phone_number: phoneNumber,
          birth_place: birthPlace,
          birth_year: birthYear,
          id_number: idNumber,
          profession: profession,
          residence_place: residencePlace,
          user_type: type || "buyer", // Valeur par défaut si type est null
        })
        .select();

      if (profileError) throw profileError;
      
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
    },
    handleSubmit,
  };
}
