
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { ProfileLoading } from "@/components/profile/ProfileLoading";
import { useProfileForm } from "@/hooks/useProfileForm";

export default function Profile() {
  const { user, signOut } = useAuth();
  const {
    isEditing,
    setIsEditing,
    loading,
    formData,
    handleInputChange,
    handleSubmit,
    resetForm
  } = useProfileForm(user);

  if (loading) {
    return <ProfileLoading />;
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
              resetForm();
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
