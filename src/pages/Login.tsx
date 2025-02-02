import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2, House } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { signIn, user } = useAuth();

  if (user) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await signIn(email, password);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
          queryParams: {
            prompt: 'select_account',
          },
        }
      });
      
      if (error) {
        console.error("Erreur Google Auth:", error);
        toast.error("Erreur lors de la connexion avec Google");
        throw error;
      }
    } catch (error: any) {
      console.error('Erreur de connexion Google:', error.message);
      toast.error("Erreur lors de la connexion avec Google");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center gap-2 mb-8">
        <House className="h-8 w-8 text-cmr-green" />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-cmr-green">MboaTer</h1>
          <p className="text-sm text-gray-600">
            La première plateforme immobilière 100% camerounaise
          </p>
        </div>
      </div>

      <Card className="w-full max-w-md p-6 bg-white">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Connexion</h2>
          <p className="text-sm text-gray-600">
            Connectez-vous à votre compte MboaTer
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className="w-full"
              placeholder="votre@email.com"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <Link 
                to="/reset-password"
                className="text-sm font-medium text-cmr-green hover:text-cmr-green/80"
                tabIndex={isLoading ? -1 : 0}
              >
                Mot de passe oublié ?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              className="w-full"
              placeholder="••••••••"
              minLength={6}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-[#7BC5AE] hover:bg-[#7BC5AE]/90" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connexion en cours...
              </>
            ) : (
              "Se connecter"
            )}
          </Button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">
                OU CONTINUEZ AVEC
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
            className="w-full"
          >
            {isGoogleLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
              </svg>
            )}
            Se connecter avec Google
          </Button>

          <p className="text-center text-sm mt-4">
            Pas encore de compte ?{" "}
            <Link 
              to="/register" 
              className="font-medium text-cmr-green hover:text-cmr-green/80"
              tabIndex={isLoading ? -1 : 0}
            >
              S'inscrire
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
}