
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Si l'utilisateur n'est pas connecté, afficher une interface de connexion/inscription
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-md">
        <Card className="border-cmr-green">
          <CardHeader className="bg-cmr-green text-white text-center">
            <CardTitle className="text-2xl font-playfair">Accéder à votre profil</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                Connectez-vous ou créez un compte pour accéder à votre profil
              </p>
              <div className="space-y-4">
                <Link to="/login" className="w-full">
                  <Button className="w-full bg-cmr-green hover:bg-cmr-green/90">
                    Se connecter
                  </Button>
                </Link>
                <Link to="/register" className="w-full">
                  <Button variant="outline" className="w-full border-cmr-green text-cmr-green hover:bg-cmr-green/10">
                    Créer un compte
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Si l'utilisateur est connecté, afficher le profil
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card className="border-cmr-green">
        <CardHeader className="bg-cmr-green text-white">
          <CardTitle className="text-2xl font-playfair">Mon Profil</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
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
                value={user.user_metadata?.full_name || "Non renseigné"}
                disabled
                className="bg-gray-50"
              />
            </div>

            <div>
              <Label className="text-cmr-green font-medium">Type de compte</Label>
              <Input
                value={user.user_metadata?.user_type || "Non spécifié"}
                disabled
                className="bg-gray-50"
              />
            </div>

            <div className="pt-4">
              <Button
                onClick={() => supabase.auth.signOut()}
                className="w-full bg-cmr-red hover:bg-cmr-red/90"
              >
                Se déconnecter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
