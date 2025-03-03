
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { passwordStrength } from "@/lib/password-utils";

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
    e.preventDefault();
    
    // Vérification de la force du mot de passe
    const strength = passwordStrength(password);
    if (strength.score < 3) {
      toast.error("Le mot de passe n'est pas assez sécurisé. Veuillez le renforcer.");
      return;
    }
    
    try {
      await signUp(email, password);
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
