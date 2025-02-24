
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ProfileForm } from "@/components/profile/ProfileForm";
import type { ProfileFormData } from "@/types/profile";

export default function Profile() {
  const { user, signOut } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
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
  });

  useEffect(() => {
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
      });
    }
  }, [user]);

  if (!user) {
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted", formData);

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
        },
      });

      if (updateError) {
        console.error("Error updating user metadata:", updateError);
        throw updateError;
      }

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
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", user.id);

      if (profileError) {
        console.error("Error updating profile:", profileError);
        throw profileError;
      }

      toast.success("Profil mis à jour avec succès");
      setIsEditing(false);
    } catch (error: any) {
      console.error("Error in form submission:", error);
      toast.error("Erreur lors de la mise à jour du profil");
    }
  };

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
            onCancel={() => setIsEditing(false)}
            onSignOut={signOut}
            userEmail={user.email || ""}
            userType={formData.user_type}
          />
        </CardContent>
      </Card>
    </div>
  );
}
