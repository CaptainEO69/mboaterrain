import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Profile() {
  const { user, signOut } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Profil</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium">Email</h3>
            <p>{user.email}</p>
          </div>
          {user.profile && (
            <>
              <div>
                <h3 className="font-medium">Nom complet</h3>
                <p>{user.profile.full_name}</p>
              </div>
              <div>
                <h3 className="font-medium">Téléphone</h3>
                <p>{user.profile.phone_number}</p>
              </div>
              <div>
                <h3 className="font-medium">Type de compte</h3>
                <p>{user.profile.user_type}</p>
              </div>
            </>
          )}
          <Button onClick={signOut} variant="destructive">
            Se déconnecter
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}