
import { useState } from "react";
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
    first_name: user?.user_metadata?.full_name?.split(' ')[1] || "",
    last_name: user?.user_metadata?.full_name?.split(' ')[0] || "",
    phone_number: user?.user_metadata?.phone_number || "",
    birth_place: user?.user_metadata?.birth_place || "",
    id_number: user?.user_metadata?.id_number || "",
    profession: user?.user_metadata?.profession || "",
    residence_place: user?.user_metadata?.residence_place || "",
    birth_date: user?.user_metadata?.birth_date ? new Date(user.user_metadata.birth_date) : null,
    user_type: user?.user_metadata?.user_type || "",
  });

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
    console.log("Form submitted", formData); // Debug log

    try {
      // Mettre à jour les métadonnées de l'utilisateur
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          full_name: `${formData.last_name} ${formData.first_name}`.trim(),
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

      // Mettre à jour la table profiles
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          full_name: `${formData.last_name} ${formData.first_name}`.trim(),
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
    <div className="container mx-auto px-4 py-8 max-w-2xl">
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
            userType={user.user_metadata?.user_type || null}
          />
        </CardContent>
      </Card>
    </div>
  );
}
