
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

  // Reduce timeout to 1 second for better UX
  useEffect(() => {
    console.log("Profile component - Auth state:", { 
      user: user ? "Authenticated" : "Not authenticated", 
      authChecked,
      localLoading 
    });
    
    // Set a short timeout to prevent long loading screens
    const timer = setTimeout(() => {
      setLocalLoading(false);
      setAuthChecked(true);
    }, 1000); // Reduced from 2000 to 1000ms
    
    // If user is already loaded, no need to wait
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

  // If we're still in initial loading state, show loading screen
  if (localLoading) {
    return <ProfileLoading message="Initialisation de votre profil..." />;
  }

  // After loading completed, if no user is found, redirect to login
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

  // Show loading screen while form data is being loaded, but with a maximum wait time
  if (formLoading) {
    return <ProfileLoading message="Chargement des données de votre profil..." />;
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
