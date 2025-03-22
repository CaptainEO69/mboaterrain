
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
      throw new Error("Veuillez remplir tous les champs obligatoires");
    }
    
    try {
      console.log("Envoi des données d'inscription à l'API:", { 
        email: formData.email, 
        password: formData.password,
        phoneNumber: formData.phoneNumber
      });
      
      // Envoi des données à l'API externe
      const response = await fetch('https://mboaterrain.lovable.app/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phoneNumber
        })
      });
      
      // Afficher la réponse complète dans la console pour débogage
      const responseData = await response.json().catch(() => null);
      console.log("Réponse complète du serveur:", responseData);
      
      if (!response.ok) {
        throw new Error(responseData?.message || "Erreur lors de l'inscription");
      }
      
      if (!responseData) {
        throw new Error("Erreur serveur ou données incomplètes");
      }
      
      // Si on arrive ici, la requête a réussi
      // Nous allons quand même créer l'utilisateur dans Supabase pour maintenir la compatibilité
      try {
        const { data: authData, error: authError } = await signUp(formData.email, formData.password);
        
        if (authError) {
          console.error("Erreur Supabase Auth (non-bloquante):", authError);
          // Ne pas bloquer le processus si l'enregistrement Supabase échoue
        }
        
        if (authData?.user) {
          const userId = authData.user.id;
          console.log("Utilisateur créé avec ID Supabase (secondaire):", userId);
          
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
            console.error("Erreur profil Supabase (non-bloquante):", profileError);
          }
        }
      } catch (supabaseError) {
        console.error("Erreur Supabase (non-bloquante):", supabaseError);
        // Ne pas bloquer le processus si l'enregistrement Supabase échoue
      }
      
      // Continuer avec le succès de l'API externe
      return { 
        success: true,
        redirectToOTP: true,
        message: "Inscription réussie"
      };
    } catch (error: any) {
      console.error("Erreur d'inscription:", error);
      
      // Messages d'erreur plus spécifiques
      if (error.message?.includes("Erreur serveur ou données incomplètes")) {
        throw new Error("Erreur serveur ou données incomplètes");
      } else if (error.message?.includes("duplicate key") || error.message?.includes("already exists") || 
          error.message?.includes("User already registered") || error.message?.includes("User exists")) {
        throw new Error("Cette adresse email est déjà utilisée.");
      } else {
        throw error; // Re-throw pour que le composant parent puisse gérer l'erreur
      }
    }
  };

  return { handleSubmit };
}
