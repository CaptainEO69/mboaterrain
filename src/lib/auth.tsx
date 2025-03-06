
import { AuthProvider } from "@/providers/AuthProvider";
import { useAuth as useAuthHook } from "@/hooks/useAuth";

// On exporte directement le hook useAuth pour éviter les importations circulaires
export function useAuth() {
  return useAuthHook();
}

export { AuthProvider };
