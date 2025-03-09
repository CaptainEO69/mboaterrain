
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import { passwordStrength } from "@/lib/password-utils";
import { supabase } from "@/integrations/supabase/client";
import { RegistrationFormData } from "@/types/registration";

export function useRegistrationSubmit(type: string | null) {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleSubmit = async (
    e: React.FormEvent,
    formData: RegistrationFormData
  ) => {
    if (e.preventDefault) {
      e.preventDefault();
    }
    
    // Vérification des champs obligatoires
    if (!formData.email || !formData.password || !formData.firstName || !formData.lastName || !formData.phoneNumber) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    
    // Vérification de la force du mot de passe
    const strength = passwordStrength(formData.password);
    if (strength.score < 3) {
      toast.error("Le mot de passe n'est pas assez sécurisé. Veuillez le renforcer.");
      return;
    }
    
    try {
      console.log("Création du compte avec:", { 
        email: formData.email, 
        password: "********", // Ne pas logger le mot de passe réel pour des raisons de sécurité
        firstName: formData.firstName, 
        lastName: formData.lastName, 
        phoneNumber: formData.phoneNumber, 
        type 
      });
      
      // Create the user in Supabase Auth
      const { data: authData, error: authError } = await signUp(formData.email, formData.password);
      
      if (authError) {
        console.error("Erreur Auth:", authError);
        throw authError;
      }
      
      if (!authData || !authData.user) {
        throw new Error("Erreur lors de la création du compte utilisateur");
      }
      
      // Extraire l'ID de l'utilisateur
      const userId = authData.user.id;
      
      console.log("Utilisateur créé avec ID:", userId);
      
      // Convertir la date de naissance en année de naissance pour la BD
      const birthYear = formData.birthDate ? formData.birthDate.getFullYear() : null;
      
      // Create a profile record with additional information
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .insert({
          user_id: userId,
          full_name: `${formData.firstName} ${formData.lastName}`,
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone_number: formData.phoneNumber,
          birth_place: formData.birthPlace,
          birth_year: birthYear,
          id_number: formData.idNumber,
          profession: formData.profession,
          residence_place: formData.residencePlace,
          user_type: type || "buyer", // Valeur par défaut si type est null
          is_certified: formData.isCertified,
          notary_office: formData.notaryOffice,
          service_prices: formData.servicePrices,
          is_phone_verified: true, // Simplifié pour les tests
          is_email_verified: true, // Simplifié pour les tests
          
          // Autres champs
          property_type: formData.propertyType,
          agency_name: formData.agencyName,
          commercial_register: formData.commercialRegister,
          operation_zone: formData.operationZone,
          estimated_budget: formData.estimatedBudget,
          desired_location: formData.desiredLocation,
          approval_number: formData.approvalNumber,
          intervention_zone: formData.interventionZone,
          experience_qualifications: formData.experienceQualifications,
          company_name: formData.companyName,
          legal_status: formData.legalStatus,
          investment_type: formData.investmentType,
          estimated_funding_capacity: formData.estimatedFundingCapacity,
          service_type: formData.serviceType,
          transport_capacity: formData.transportCapacity,
          insurance_included: formData.insuranceIncluded,
        })
        .select();

      if (profileError) {
        console.error("Erreur profil:", profileError);
        throw profileError;
      }
      
      console.log("Profil créé:", profile);
      toast.success("Inscription réussie! Veuillez vous connecter.");
      navigate("/login");
      return { success: true };
    } catch (error: any) {
      console.error("Erreur d'inscription:", error);
      
      // Messages d'erreur plus spécifiques
      if (error.message?.includes("duplicate key") || error.message?.includes("already exists") || 
          error.message?.includes("User already registered") || error.message?.includes("User exists")) {
        toast.error("Cette adresse email est déjà utilisée.");
      } else {
        toast.error(error.message || "Erreur lors de l'inscription");
      }
      throw error; // Re-throw pour que le composant parent puisse gérer l'erreur
    }
  };

  return { handleSubmit };
}
