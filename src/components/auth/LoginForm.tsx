
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        toast.success("Connexion réussie");
        navigate("/");
      }
    } catch (error: any) {
      console.error("Erreur de connexion:", error);
      
      if (error.message === "Invalid login credentials") {
        toast.error("Email ou mot de passe incorrect");
      } else if (error.message.includes("Email not confirmed")) {
        toast.error("Veuillez confirmer votre email avant de vous connecter");
      } else {
        toast.error(error.message || "Erreur lors de la connexion");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
    </form>
  );
};
