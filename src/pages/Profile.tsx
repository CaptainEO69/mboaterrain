
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { ProfileLoading } from "@/components/profile/ProfileLoading";
import { useProfileForm } from "@/hooks/useProfileForm";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Profile() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    console.log("Profile component - Auth state:", { 
      user: user ? "Authenticated" : "Not authenticated", 
      authChecked,
      localLoading 
    });
    
    // Définir un court délai pour éviter les écrans de chargement longs
    const timer = setTimeout(() => {
      setLocalLoading(false);
      setAuthChecked(true);
    }, 500); // Garde un délai réduit
    
    // Si l'utilisateur est déjà chargé, pas besoin d'attendre
    if (user) {
      setLocalLoading(false);
      setAuthChecked(true);
      clearTimeout(timer);
    }
    
    return () => clearTimeout(timer);
  }, [user]);

  const {
    isEditing,
    setIsEditing,
    loading: formLoading,
    formData,
    handleInputChange,
    handleSubmit,
    resetForm,
    error: formError
  } = useProfileForm(user);

  useEffect(() => {
    if (formError) {
      toast.error(`Erreur: ${formError}`);
    }
  }, [formError]);

  // Si nous sommes toujours dans l'état initial de chargement, afficher l'écran de chargement
  if (localLoading) {
    return <ProfileLoading message="Initialisation de votre profil..." />;
  }

  // Une fois le chargement terminé, si aucun utilisateur n'est trouvé, rediriger vers la connexion
  if (!user && authChecked) {
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
  if (formLoading) {
    return <ProfileLoading message="Chargement des données de votre profil..." />;
  }

  const handleSignOut = async () => {
    console.log("Sign out button clicked");
    if (signOut) {
      try {
        await signOut();
      } catch (error) {
        console.error("Error during sign out:", error);
        toast.error("Erreur lors de la déconnexion");
      }
    } else {
      console.error("signOut function is undefined");
      toast.error("Erreur: Fonction de déconnexion non disponible");
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
            onCancel={() => {
              setIsEditing(false);
              resetForm();
            }}
            onSignOut={handleSignOut}
            userEmail={user?.email || ""}
            userType={formData.user_type}
          />
        </CardContent>
      </Card>
    </div>
  );
}
