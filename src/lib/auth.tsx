
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLocation, useNavigate } from "react-router-dom";
import type { User } from "@supabase/supabase-js";
import { toast } from "sonner";

interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  user_type: string | null;
  phone_number: string | null;
}

interface UserWithProfile extends User {
  profile?: Profile;
}

interface AuthContextType {
  user: UserWithProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/register',
  '/register/form',
  '/buy',
  '/property',
  '/reset-password',
  '/update-password',
  '/privacy-policy',
  '/terms',
];

const isPublicRoute = (path: string) => {
  return PUBLIC_ROUTES.some(route => {
    if (route === '/property') {
      return path.startsWith('/property/');
    }
    return path === route;
  });
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserWithProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.info("Initializing auth...");

    const setupAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("user_id", session.user.id)
            .single();

          setUser({ ...session.user, profile });
          console.info("Auth state changed: SIGNED_IN");
        } else {
          console.info("No session found");
          setUser(null);
        }
      } catch (error) {
        console.error("Error in setupAuth:", error);
        setUser(null);
      }
      
      console.info("Auth initialization complete");
      setLoading(false);
    };

    setupAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.info("Auth state changed:", event);

        if (session?.user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("user_id", session.user.id)
            .single();

          setUser({ ...session.user, profile });

          // Si on est sur une page de connexion/inscription et qu'on est connecté,
          // rediriger vers la page d'accueil
          if (location.pathname === "/login" || location.pathname === "/register") {
            navigate("/");
            toast.success("Connexion réussie");
          }
        } else {
          setUser(null);

          // Si on n'est pas sur une route publique et qu'on n'est pas connecté,
          // rediriger vers la page de connexion
          if (!isPublicRoute(location.pathname)) {
            navigate("/login", { state: { from: location.pathname } });
          }
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, location.pathname]);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/login");
      toast.success("Déconnexion réussie");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Erreur lors de la déconnexion");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
