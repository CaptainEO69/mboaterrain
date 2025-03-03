
import { createContext } from "react";
import type { User, AuthResponse } from "@supabase/supabase-js";
import { Profile } from "@/types/profile";

export interface UserWithProfile extends User {
  profile?: Profile;
}

export interface AuthContextType {
  user: UserWithProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
