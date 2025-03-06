import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ProfileForm } from "@/components/profile/ProfileForm";
import type { ProfileFormData } from "@/types/profile";

export default function Profile() {
  const { user, signOut } = useAuth();
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
    // Ajout des nouveaux champs
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
        // Nouveaux champs
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
    
    try {
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
          // Nouveaux champs
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

      if (updateError) throw updateError;

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
          // Nouveaux champs
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
        .eq("user_id", user?.id);

      if (profileError) throw profileError;

      toast.success("Profil mis à jour avec succès");
      setIsEditing(false);
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast.error("Erreur lors de la mise à jour du profil");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 pb-24 max-w-2xl">
        <Card className="border-cmr-green">
          <CardHeader className="bg-cmr-green text-white">
            <CardTitle className="text-2xl font-playfair">Mon Profil</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cmr-green"></div>
              <p className="ml-4">Chargement du profil...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    console.log("Profile - No user found, should be redirected by ProtectedRoute");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 pb-24 max-w-2xl">
      <Card className="border-cmr-green">
        <CardHeader className="bg-cmr-green text-white">
          <CardTitle className="text-2xl font-playfair">Mon Profil</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <ProfileForm
            formData={formData}
            isEditing={isEditing}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            onEdit={() => setIsEditing(true)}
            onCancel={() => {
              setIsEditing(false);
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
                // Nouveaux champs
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
            }}
            onSignOut={signOut}
            userEmail={user.email || ""}
            userType={formData.user_type}
          />
        </CardContent>
      </Card>
    </div>
  );
}
