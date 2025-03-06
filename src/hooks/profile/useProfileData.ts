
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
    
    // Set a timeout to prevent infinite loading
    const loadingTimeout = setTimeout(() => {
      if (loading) {
        console.log("ProfileForm - Loading timeout exceeded, forcing load complete");
        setLoading(false);
      }
    }, 3000); // Reduced timeout to 3 seconds
    
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
      // Reset the form if no user is found, and stop loading
      resetForm();
      setLoading(false);
    }
    
    return () => clearTimeout(loadingTimeout);
  }, [user, loading]);

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
      // Reset with default values if no user is found
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

  // Load user data on initial mount or when user changes
  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  return {
    loading,
    error,
    formData,
    setFormData,
    resetForm
  };
}
