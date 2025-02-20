
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function useRegistrationForm(type: string | null) {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [profession, setProfession] = useState("");
  const [residencePlace, setResidencePlace] = useState("");
  const [saleReason, setSaleReason] = useState("");
  const [isCertified, setIsCertified] = useState(false);
  const [notaryOffice, setNotaryOffice] = useState("");
  const [servicePrices, setServicePrices] = useState<Record<string, number>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Inscription de l'utilisateur
      const signUpResult = await signUp(email, password);
      if (signUpResult.error) throw signUpResult.error;

      const user = signUpResult.data?.user;
      if (!user) {
        throw new Error("Erreur lors de l'inscription");
      }

      // Créer le profil utilisateur
      const birthYearNum = birthYear ? parseInt(birthYear, 10) : null;
      const { error: profileError } = await supabase.from("profiles").insert({
        user_id: user.id,
        full_name: fullName,
        phone_number: phoneNumber,
        birth_place: birthPlace,
        birth_year: birthYearNum,
        id_number: idNumber,
        profession,
        residence_place: residencePlace,
        sale_reason: saleReason,
        is_certified: isCertified,
        notary_office: notaryOffice,
        user_type: type,
        service_prices: servicePrices,
      });

      if (profileError) throw profileError;

      // Envoyer les codes de vérification
      const { error: verificationError } = await supabase.functions.invoke("send-verification-codes", {
        body: {
          user_id: user.id,
          email,
          phone_number: phoneNumber,
        },
      });

      if (verificationError) throw verificationError;

      toast.success("Inscription réussie ! Veuillez vérifier votre compte.");
      navigate("/verify");
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error.message);
    }
  };

  return {
    formData: {
      email,
      password,
      fullName,
      phoneNumber,
      birthPlace,
      birthYear,
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
      setFullName,
      setPhoneNumber,
      setBirthPlace,
      setBirthYear,
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
