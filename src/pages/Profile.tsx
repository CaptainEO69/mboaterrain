
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { ProfileLoading } from "@/components/profile/ProfileLoading";
import { useProfileForm } from "@/hooks/useProfileForm";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [localLoading, setLocalLoading] = useState(true);

  // Mettre en place un timeout pour éviter un chargement infini
  useEffect(() => {
    const timer = setTimeout(() => {
      setLocalLoading(false);
    }, 3000); // 3 secondes de chargement maximum
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    console.log("Profile component - User status:", user ? "Authenticated" : "Not authenticated");
  }, [user]);

  const {
    isEditing,
    setIsEditing,
    loading: formLoading,
    formData,
    handleInputChange,
    handleSubmit,
    resetForm
  } = useProfileForm(user);

  // Si aucune donnée utilisateur n'est disponible après le timeout, afficher un message d'erreur
  if (!user && !localLoading) {
    return (
      <div className="container mx-auto px-4 py-8 pb-24 max-w-2xl">
        <Card className="border-cmr-green">
          <CardHeader className="bg-cmr-green text-white">
            <CardTitle className="text-2xl font-playfair">Mon Profil</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <p>Vous devez être connecté pour accéder à votre profil.</p>
              <Button 
                className="bg-cmr-green hover:bg-cmr-green/90"
                onClick={() => navigate("/login")}
              >
                Se connecter
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Afficher l'écran de chargement pendant le chargement des données du formulaire
  if (formLoading || localLoading) {
    return <ProfileLoading />;
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
              resetForm();
            }}
            onSignOut={signOut}
            userEmail={user?.email || ""}
            userType={formData.user_type}
          />
        </CardContent>
      </Card>
    </div>
  );
}
