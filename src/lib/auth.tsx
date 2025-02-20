
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type AuthUser = {
  id: string;
  email: string;
  profile?: {
    id: string;
    full_name: string | null;
    phone_number: string | null;
    user_type: string;
  };
};

type AuthContextType = {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  createProfile: (profile: Omit<AuthUser['profile'], 'id'>) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    // Initialiser l'état utilisateur à partir du localStorage
    const savedUser = localStorage.getItem('auth_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        console.log("Initializing auth...");
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session && mounted) {
          console.log("Session found, fetching profile...");
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', session.user.id)
            .single();

          if (mounted) {
            const userData = {
              id: session.user.id,
              email: session.user.email!,
              profile: profile || undefined,
            };
            setUser(userData);
            // Sauvegarder l'utilisateur dans le localStorage
            localStorage.setItem('auth_user', JSON.stringify(userData));
            console.log("Auth initialized with user:", session.user.id);
          }
        } else {
          if (mounted) {
            console.log("No session found");
            setUser(null);
            localStorage.removeItem('auth_user');
          }
        }
      } catch (error) {
        console.error("Error during auth initialization:", error);
        if (mounted) {
          setUser(null);
          localStorage.removeItem('auth_user');
        }
      } finally {
        if (mounted) {
          console.log("Auth initialization complete");
          setLoading(false);
        }
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event);
      
      if (session && mounted) {
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', session.user.id)
            .single();

          if (mounted) {
            const userData = {
              id: session.user.id,
              email: session.user.email!,
              profile: profile || undefined,
            };
            setUser(userData);
            // Mettre à jour le localStorage quand l'état de l'auth change
            localStorage.setItem('auth_user', JSON.stringify(userData));
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
          if (mounted) {
            setUser(null);
            localStorage.removeItem('auth_user');
          }
        }
      } else if (mounted) {
        setUser(null);
        localStorage.removeItem('auth_user');
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate('/');
      toast.success('Connexion réussie');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      toast.success('Inscription réussie. Veuillez vérifier votre email.');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      localStorage.removeItem('auth_user');
      navigate('/login');
      toast.success('Déconnexion réussie');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const createProfile = async (profile: Omit<AuthUser['profile'], 'id'>) => {
    try {
      if (!user) throw new Error("Utilisateur non connecté");
      
      const { error } = await supabase
        .from('profiles')
        .insert([{ ...profile, user_id: user.id }]);
        
      if (error) throw error;
      
      toast.success('Profil créé avec succès');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, createProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
