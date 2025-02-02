import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";

export default function Profile() {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen pb-20">
      <Header />
      
      <div className="p-4 space-y-6">
        {user ? (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Mon Profil</h2>
              <div className="space-y-2">
                <p><span className="font-medium">Email:</span> {user.email}</p>
                <p><span className="font-medium">Nom:</span> {user.profile?.full_name}</p>
                <p><span className="font-medium">Téléphone:</span> {user.profile?.phone_number}</p>
                <p><span className="font-medium">Type:</span> {user.profile?.user_type}</p>
              </div>
            </div>
            
            <Button
              onClick={() => signOut()}
              variant="destructive"
              className="w-full"
            >
              Se déconnecter
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <p>Vous devez être connecté pour voir votre profil.</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}