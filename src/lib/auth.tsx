
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLocation, useNavigate } from "react-router-dom";
import type { User } from "@supabase/supabase-js";

interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  user_type: string | null;
}

interface UserWithProfile extends User {
  profile?: Profile;
}

interface AuthState {
  user: UserWithProfile | null;
  loading: boolean;
  isReady: boolean;
}

interface AuthContextType extends AuthState {
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    isReady: false,
  });
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Restore session from localStorage if it exists
    const savedSession = localStorage.getItem('supabase_session');
    if (savedSession) {
      try {
        const session = JSON.parse(savedSession);
        supabase.auth.setSession(session);
      } catch (error) {
        console.error('Error restoring session:', error);
        localStorage.removeItem('supabase_session');
      }
    }

    const fetchUserProfile = async (userId: string) => {
      try {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", userId)
          .single();

        if (error) throw error;
        return profile;
      } catch (error) {
        console.error("Error fetching user profile:", error);
        return null;
      }
    };

    console.info("Initializing auth...");
    
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const profile = await fetchUserProfile(session.user.id);
        setState({
          user: { ...session.user, profile },
          loading: false,
          isReady: true,
        });
        // Save session to localStorage
        localStorage.setItem('supabase_session', JSON.stringify(session));
      } else {
        setState({ user: null, loading: false, isReady: true });
        localStorage.removeItem('supabase_session');
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.info("Auth state changed:", event);

        if (session?.user) {
          const profile = await fetchUserProfile(session.user.id);
          setState({
            user: { ...session.user, profile },
            loading: false,
            isReady: true,
          });
          // Save session to localStorage on auth state change
          localStorage.setItem('supabase_session', JSON.stringify(session));

          if (location.pathname === "/login" || location.pathname === "/register") {
            navigate("/");
          }
        } else {
          setState({ user: null, loading: false, isReady: true });
          localStorage.removeItem('supabase_session');

          if (location.pathname !== "/login" && 
              location.pathname !== "/register" && 
              location.pathname !== "/reset-password" && 
              location.pathname !== "/update-password" &&
              !location.pathname.startsWith("/property/")) {
            navigate("/login");
          }
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, location.pathname]);

  const signOut = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('supabase_session');
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ ...state, signOut }}>
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
