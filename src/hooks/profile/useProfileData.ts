
import { useState, useEffect, useCallback } from "react";
import { User } from "@supabase/supabase-js";
import { ProfileFormData } from "@/types/profile";

export function useProfileData(user: User | null) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProfileFormData>({
    first_name: "",
    last_name: "",
    phone_number: "",
    birth_place: "",
    id_number: "",
    profession: "",
    residence_place: "",
    birth_date: null,
    user_type: "",
    agency_name: "",
    commercial_register: "",
    operation_zone: "",
    property_type: "",
    estimated_budget: 0,
    desired_location: "",
    approval_number: "",
    intervention_zone: "",
    experience_qualifications: "",
    company_name: "",
    legal_status: "",
    investment_type: "",
    estimated_funding_capacity: "",
    service_type: "",
    transport_capacity: "",
    insurance_included: false,
    notary_office: "",
  });

  const loadUserData = useCallback(() => {
    console.log("ProfileForm - Loading user data, user present:", !!user);
    setError(null);
    
    if (loading && !user) {
      console.log("ProfileForm - No user found, stopping loading");
      setLoading(false);
      return;
    }
    
    // Définir un délai d'attente plus court pour éviter un chargement infini
    const loadingTimeout = setTimeout(() => {
      if (loading) {
        console.log("ProfileForm - Loading timeout exceeded, forcing load complete");
        setLoading(false);
      }
    }, 1500); // Réduit à 1.5 secondes
    
    if (user && user.user_metadata) {
      try {
        console.log("ProfileForm - User metadata found, setting form data");
        setFormData(extractUserMetadata(user));
        clearTimeout(loadingTimeout);
        setLoading(false);
      } catch (error: any) {
        console.error("Error setting form data:", error);
        setError("Erreur lors du chargement des données du profil: " + (error.message || "Erreur inconnue"));
        setLoading(false);
      }
    } else {
      // Réinitialiser le formulaire si aucun utilisateur n'est trouvé et arrêter le chargement
      resetForm();
      setLoading(false);
    }
    
    return () => clearTimeout(loadingTimeout);
  }, [user, loading]);

  // Le reste du code reste le même
  const extractUserMetadata = (user: User): ProfileFormData => {
    return {
      first_name: user.user_metadata?.first_name || "",
      last_name: user.user_metadata?.last_name || "",
      phone_number: user.user_metadata?.phone_number || "",
      birth_place: user.user_metadata?.birth_place || "",
      id_number: user.user_metadata?.id_number || "",
      profession: user.user_metadata?.profession || "",
      residence_place: user.user_metadata?.residence_place || "",
      birth_date: user.user_metadata?.birth_date ? new Date(user.user_metadata.birth_date) : null,
      user_type: user.user_metadata?.user_type || "",
      agency_name: user.user_metadata?.agency_name || "",
      commercial_register: user.user_metadata?.commercial_register || "",
      operation_zone: user.user_metadata?.operation_zone || "",
      property_type: user.user_metadata?.property_type || "",
      estimated_budget: user.user_metadata?.estimated_budget || 0,
      desired_location: user.user_metadata?.desired_location || "",
      approval_number: user.user_metadata?.approval_number || "",
      intervention_zone: user.user_metadata?.intervention_zone || "",
      experience_qualifications: user.user_metadata?.experience_qualifications || "",
      company_name: user.user_metadata?.company_name || "",
      legal_status: user.user_metadata?.legal_status || "",
      investment_type: user.user_metadata?.investment_type || "",
      estimated_funding_capacity: user.user_metadata?.estimated_funding_capacity || "",
      service_type: user.user_metadata?.service_type || "",
      transport_capacity: user.user_metadata?.transport_capacity || "",
      insurance_included: user.user_metadata?.insurance_included || false,
      notary_office: user.user_metadata?.notary_office || "",
    };
  };

  const resetForm = () => {
    if (user && user.user_metadata) {
      setFormData(extractUserMetadata(user));
    } else {
      // Réinitialiser avec des valeurs par défaut si aucun utilisateur n'est trouvé
      setFormData({
        first_name: "",
        last_name: "",
        phone_number: "",
        birth_place: "",
        id_number: "",
        profession: "",
        residence_place: "",
        birth_date: null,
        user_type: "",
        agency_name: "",
        commercial_register: "",
        operation_zone: "",
        property_type: "",
        estimated_budget: 0,
        desired_location: "",
        approval_number: "",
        intervention_zone: "",
        experience_qualifications: "",
        company_name: "",
        legal_status: "",
        investment_type: "",
        estimated_funding_capacity: "",
        service_type: "",
        transport_capacity: "",
        insurance_included: false,
        notary_office: "",
      });
    }
  };

  // Charger les données utilisateur au montage initial ou lorsque l'utilisateur change
  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  return {
    loading,
    setLoading,
    error,
    formData,
    setFormData,
    resetForm
  };
}
