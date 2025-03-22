
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AuthContext, UserWithProfile } from "@/contexts/AuthContext";
import { isPublicRoute } from "@/lib/auth-constants";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserWithProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const loadUserProfile = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error) throw error;
      return profile;
    } catch (error) {
      console.error("Error loading user profile:", error);
      return null;
    }
  };

  const handleAuthChange = async (session: any | null) => {
    try {
      if (session?.user) {
        const profile = await loadUserProfile(session.user.id);
        setUser({ ...session.user, profile });
      } else {
        setUser(null);
        if (!isPublicRoute(location.pathname)) {
          navigate("/login");
        }
      }
    } catch (error) {
      console.error("Error in handleAuthChange:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        await handleAuthChange(session);
      } catch (error) {
        console.error("Error in initializeAuth:", error);
        setLoading(false);
      }
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      await handleAuthChange(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      navigate("/");
      toast.success("Connexion réussie");
    } catch (error: any) {
      console.error("Error signing in:", error);
      toast.error(error.message === "Invalid login credentials" 
        ? "Email ou mot de passe incorrect" 
        : "Erreur lors de la connexion");
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      // Vérifie que le mot de passe répond aux exigences de sécurité
      if (password.length < 8) {
        throw new Error("Le mot de passe doit contenir au moins 8 caractères");
      }

      if (!/[A-Z]/.test(password)) {
        throw new Error("Le mot de passe doit contenir au moins une lettre majuscule");
      }

      if (!/[a-z]/.test(password)) {
        throw new Error("Le mot de passe doit contenir au moins une lettre minuscule");
      }

      if (!/[0-9]/.test(password)) {
        throw new Error("Le mot de passe doit contenir au moins un chiffre");
      }

      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        throw new Error("Le mot de passe doit contenir au moins un caractère spécial");
      }

      const response = await supabase.auth.signUp({
        email,
        password,
      });

      if (response.error) throw response.error;
      return response;
    } catch (error: any) {
      console.error("Error signing up:", error);
      toast.error(error.message || "Erreur lors de l'inscription");
      throw error;
    }
  };

  const signOut = async () => {
    try {
      // Clear any local state first
      setLoading(true);
      
      // Call Supabase signOut
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear user state
      setUser(null);
      
      // Redirect to login page
      navigate("/login");
      toast.success("Déconnexion réussie");
      console.log("User signed out successfully");
    } catch (error: any) {
      console.error("Error signing out:", error);
      toast.error("Erreur lors de la déconnexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
