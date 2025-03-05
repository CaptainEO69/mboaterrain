
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
  
  // Nouveaux champs
  const [propertyType, setPropertyType] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [commercialRegister, setCommercialRegister] = useState("");
  const [operationZone, setOperationZone] = useState("");
  const [estimatedBudget, setEstimatedBudget] = useState<number>(0);
  const [desiredLocation, setDesiredLocation] = useState("");
  const [approvalNumber, setApprovalNumber] = useState("");
  const [interventionZone, setInterventionZone] = useState("");
  const [experienceQualifications, setExperienceQualifications] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [legalStatus, setLegalStatus] = useState("");
  const [investmentType, setInvestmentType] = useState("");
  const [estimatedFundingCapacity, setEstimatedFundingCapacity] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [transportCapacity, setTransportCapacity] = useState("");
  const [insuranceIncluded, setInsuranceIncluded] = useState(false);

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
          first_name: firstName,
          last_name: lastName,
          phone_number: phoneNumber,
          birth_place: birthPlace,
          birth_year: birthYear,
          id_number: idNumber,
          profession: profession,
          residence_place: residencePlace,
          user_type: type || "buyer", // Valeur par défaut si type est null
          is_certified: isCertified,
          notary_office: notaryOffice,
          service_prices: servicePrices,
          
          // Nouveaux champs
          property_type: propertyType,
          agency_name: agencyName,
          commercial_register: commercialRegister,
          operation_zone: operationZone,
          estimated_budget: estimatedBudget,
          desired_location: desiredLocation,
          approval_number: approvalNumber,
          intervention_zone: interventionZone,
          experience_qualifications: experienceQualifications,
          company_name: companyName,
          legal_status: legalStatus,
          investment_type: investmentType,
          estimated_funding_capacity: estimatedFundingCapacity,
          service_type: serviceType,
          transport_capacity: transportCapacity,
          insurance_included: insuranceIncluded,
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
      
      // Nouveaux champs
      propertyType,
      agencyName,
      commercialRegister,
      operationZone,
      estimatedBudget,
      desiredLocation,
      approvalNumber,
      interventionZone,
      experienceQualifications,
      companyName,
      legalStatus,
      investmentType,
      estimatedFundingCapacity,
      serviceType,
      transportCapacity,
      insuranceIncluded,
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
      
      // Nouveaux setters
      setPropertyType,
      setAgencyName,
      setCommercialRegister,
      setOperationZone,
      setEstimatedBudget,
      setDesiredLocation,
      setApprovalNumber,
      setInterventionZone,
      setExperienceQualifications,
      setCompanyName,
      setLegalStatus,
      setInvestmentType,
      setEstimatedFundingCapacity,
      setServiceType,
      setTransportCapacity,
      setInsuranceIncluded,
    },
    handleSubmit,
  };
}
