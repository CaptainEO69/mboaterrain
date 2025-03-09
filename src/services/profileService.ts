
import { supabase } from "@/integrations/supabase/client";
import { ProfileFormData } from "@/types/profile";
import { toast } from "sonner";

export async function updateUserProfile(userId: string, formData: ProfileFormData) {
  try {
    console.log("Updating user profile for user ID:", userId);
    console.log("Form data being submitted:", formData);
    
    // Update user metadata
    const { error: updateError, data } = await supabase.auth.updateUser({
      data: {
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone_number: formData.phone_number,
        birth_place: formData.birth_place,
        id_number: formData.id_number,
        profession: formData.profession,
        residence_place: formData.residence_place,
        birth_date: formData.birth_date ? formData.birth_date.toISOString() : null,
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
        associated_notaries: formData.associated_notaries,
      },
    });

    if (updateError) {
      console.error("Error updating user metadata:", updateError);
      toast.error(`Erreur de mise à jour des données: ${updateError.message}`);
      throw updateError;
    }

    console.log("Auth metadata update succeeded:", !!data.user);

    // Update profile in the profiles table
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
        associated_notaries: formData.associated_notaries,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId);

    if (profileError) {
      console.error("Error updating profile in database:", profileError);
      toast.error(`Erreur de mise à jour du profil dans la base de données: ${profileError.message}`);
      throw profileError;
    }

    console.log("Profile successfully updated");
    return true;
  } catch (error: any) {
    console.error("Error updating profile:", error);
    toast.error(`Erreur lors de la mise à jour: ${error.message || 'Erreur inconnue'}`);
    return false;
  }
}
