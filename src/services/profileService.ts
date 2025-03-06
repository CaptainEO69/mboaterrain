
import { supabase } from "@/integrations/supabase/client";
import { ProfileFormData } from "@/types/profile";
import { toast } from "sonner";

export async function updateUserProfile(userId: string, formData: ProfileFormData) {
  try {
    console.log("Updating user profile for user ID:", userId);
    
    // Mise à jour des métadonnées de l'utilisateur
    const { error: updateError } = await supabase.auth.updateUser({
      data: {
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone_number: formData.phone_number,
        birth_place: formData.birth_place,
        id_number: formData.id_number,
        profession: formData.profession,
        residence_place: formData.residence_place,
        birth_date: formData.birth_date?.toISOString(),
        user_type: formData.user_type,
        agency_name: formData.agency_name,
        commercial_register: formData.commercial_register,
        operation_zone: formData.operation_zone,
        property_type: formData.property_type,
        estimated_budget: formData.estimated_budget,
        desired_location: formData.desired_location,
        approval_number: formData.approval_number,
        intervention_zone: formData.intervention_zone,
        experience_qualifications: formData.experience_qualifications,
        company_name: formData.company_name,
        legal_status: formData.legal_status,
        investment_type: formData.investment_type,
        estimated_funding_capacity: formData.estimated_funding_capacity,
        service_type: formData.service_type,
        transport_capacity: formData.transport_capacity,
        insurance_included: formData.insurance_included,
        notary_office: formData.notary_office,
      },
    });

    if (updateError) {
      console.error("Error updating user metadata:", updateError);
      throw updateError;
    }

    // Mise à jour du profil dans la table des profils
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone_number: formData.phone_number,
        birth_place: formData.birth_place,
        id_number: formData.id_number,
        profession: formData.profession,
        residence_place: formData.residence_place,
        birth_date: formData.birth_date,
        user_type: formData.user_type,
        agency_name: formData.agency_name,
        commercial_register: formData.commercial_register,
        operation_zone: formData.operation_zone,
        property_type: formData.property_type,
        estimated_budget: formData.estimated_budget,
        desired_location: formData.desired_location,
        approval_number: formData.approval_number,
        intervention_zone: formData.intervention_zone,
        experience_qualifications: formData.experience_qualifications,
        company_name: formData.company_name,
        legal_status: formData.legal_status,
        investment_type: formData.investment_type,
        estimated_funding_capacity: formData.estimated_funding_capacity,
        service_type: formData.service_type,
        transport_capacity: formData.transport_capacity,
        insurance_included: formData.insurance_included,
        notary_office: formData.notary_office,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId);

    if (profileError) {
      console.error("Error updating profile in database:", profileError);
      throw profileError;
    }

    console.log("Profile successfully updated");
    return true;
  } catch (error: any) {
    console.error("Error updating profile:", error);
    toast.error("Erreur lors de la mise à jour du profil: " + (error.message || "Erreur inconnue"));
    return false;
  }
}
