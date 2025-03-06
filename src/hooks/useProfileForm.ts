
import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { ProfileFormData } from "@/types/profile";
import { updateUserProfile } from "@/services/profileService";

export function useProfileForm(user: User | null) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    console.log("Profile - Current auth state:", { user: user ? "User authenticated" : "No user" });
    
    if (user) {
      setFormData({
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
      });
    }
    setLoading(false);
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    const success = await updateUserProfile(user.id, formData);
    if (success) {
      setIsEditing(false);
    }
  };

  const resetForm = () => {
    if (user) {
      setFormData({
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
      });
    }
  };

  return {
    isEditing,
    setIsEditing,
    loading,
    formData,
    handleInputChange,
    handleSubmit,
    resetForm
  };
}
