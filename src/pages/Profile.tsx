
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Calendar } from "@/components/ui/calendar";
import { fr } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface Profile {
  id: string;
  user_id: string;
  first_name: string | null;
  last_name: string | null;
  phone_number: string | null;
  birth_place: string | null;
  id_number: string | null;
  profession: string | null;
  residence_place: string | null;
  birth_date: string | null;
  user_type: string | null;
  created_at: string;
  updated_at: string;
}

interface ExtendedUser {
  id: string;
  email: string;
  profile?: Profile;
}

export default function Profile() {
  const { user, signOut } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: (user as ExtendedUser)?.profile?.first_name || "",
    last_name: (user as ExtendedUser)?.profile?.last_name || "",
    phone_number: (user as ExtendedUser)?.profile?.phone_number || "",
    birth_place: (user as ExtendedUser)?.profile?.birth_place || "",
    id_number: (user as ExtendedUser)?.profile?.id_number || "",
    profession: (user as ExtendedUser)?.profile?.profession || "",
    residence_place: (user as ExtendedUser)?.profile?.residence_place || "",
    birth_date: (user as ExtendedUser)?.profile?.birth_date ? new Date((user as ExtendedUser).profile.birth_date) : null,
  });

  if (!user) {
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
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone_number: formData.phone_number,
          birth_place: formData.birth_place,
          id_number: formData.id_number,
          profession: formData.profession,
          residence_place: formData.residence_place,
          birth_date: formData.birth_date?.toISOString(),
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
              <div className="space-y-2">
                <Label className="text-cmr-green font-medium">Email</Label>
                <Input
                  type="email"
                  value={user.email}
                  disabled
                  className="bg-gray-50"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-cmr-green font-medium">Nom</Label>
                <Input
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={!isEditing ? "bg-gray-50" : ""}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-cmr-green font-medium">Prénom</Label>
                <Input
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={!isEditing ? "bg-gray-50" : ""}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-cmr-green font-medium">Téléphone</Label>
                <Input
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={!isEditing ? "bg-gray-50" : ""}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-cmr-green font-medium">Date de naissance</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      disabled={!isEditing}
                      className={`w-full justify-start text-left font-normal ${
                        !formData.birth_date && "text-muted-foreground"
                      } ${!isEditing ? "bg-gray-50" : ""}`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.birth_date ? (
                        format(formData.birth_date, "P", { locale: fr })
                      ) : (
                        <span>Sélectionner une date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.birth_date || undefined}
                      onSelect={(date) => setFormData(prev => ({ ...prev, birth_date: date }))}
                      initialFocus
                      locale={fr}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label className="text-cmr-green font-medium">Lieu de naissance</Label>
                <Input
                  name="birth_place"
                  value={formData.birth_place}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={!isEditing ? "bg-gray-50" : ""}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-cmr-green font-medium">Numéro CNI</Label>
                <Input
                  name="id_number"
                  value={formData.id_number}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={!isEditing ? "bg-gray-50" : ""}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-cmr-green font-medium">Profession</Label>
                <Input
                  name="profession"
                  value={formData.profession}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={!isEditing ? "bg-gray-50" : ""}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-cmr-green font-medium">Lieu d'habitation</Label>
                <Input
                  name="residence_place"
                  value={formData.residence_place}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={!isEditing ? "bg-gray-50" : ""}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-cmr-green font-medium">Type de compte</Label>
                <Input
                  value={(user as ExtendedUser)?.profile?.user_type || "Non spécifié"}
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
