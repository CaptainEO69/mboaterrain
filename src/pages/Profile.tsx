
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, signOut } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: user?.profile?.full_name || "",
    phone_number: user?.profile?.phone_number || "",
  });

  // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
  if (!user) {
    navigate("/login");
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: formData.full_name,
          phone_number: formData.phone_number,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", user.id);

      if (error) throw error;

      toast.success("Profil mis à jour avec succès");
      setIsEditing(false);
    } catch (error: any) {
      toast.error("Erreur lors de la mise à jour du profil");
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card className="border-cmr-green">
        <CardHeader className="bg-cmr-green text-white">
          <CardTitle className="text-2xl font-playfair">Mon Profil</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label className="text-cmr-green font-medium">Email</Label>
                <Input
                  type="email"
                  value={user.email}
                  disabled
                  className="bg-gray-50"
                />
              </div>

              <div>
                <Label className="text-cmr-green font-medium">Nom complet</Label>
                <Input
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={!isEditing ? "bg-gray-50" : ""}
                />
              </div>

              <div>
                <Label className="text-cmr-green font-medium">Téléphone</Label>
                <Input
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={!isEditing ? "bg-gray-50" : ""}
                />
              </div>

              <div>
                <Label className="text-cmr-green font-medium">Type de compte</Label>
                <Input
                  value={user.profile?.user_type || "Non spécifié"}
                  disabled
                  className="bg-gray-50"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              {!isEditing ? (
                <Button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="bg-cmr-yellow text-black hover:bg-cmr-yellow/90"
                >
                  Modifier le profil
                </Button>
              ) : (
                <>
                  <Button
                    type="submit"
                    className="bg-cmr-green hover:bg-cmr-green/90"
                  >
                    Enregistrer
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    className="border-cmr-red text-cmr-red hover:bg-cmr-red/10"
                  >
                    Annuler
                  </Button>
                </>
              )}
              <Button
                type="button"
                onClick={signOut}
                className="bg-cmr-red hover:bg-cmr-red/90 ml-auto"
              >
                Se déconnecter
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
