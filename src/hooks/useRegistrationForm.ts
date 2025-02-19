
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useNavigate } from "react-router-dom";

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
      await signUp(email, password);
      navigate("/login");
    } catch (error: any) {
      console.error("Registration error:", error);
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
