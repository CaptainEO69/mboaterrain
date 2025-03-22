
import { AuthProvider } from "@/providers/AuthProvider";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

// Hook d'authentification qui permet d'accéder au contexte d'authentification
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider };
