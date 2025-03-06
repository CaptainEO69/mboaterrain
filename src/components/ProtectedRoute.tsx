
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [showLoader, setShowLoader] = useState(true);
  
  // Set a timeout to prevent infinite loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  // Logs pour debug
  console.log("ProtectedRoute - Current state:", {
    loading,
    user: user ? "User authenticated" : "No user",
    pathname: location.pathname,
    showLoader
  });

  // Si l'authentification est en cours de chargement et moins de 3 secondes se sont écoulées
  if (loading && showLoader) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cmr-green mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  // Si toujours en chargement après 3 secondes ou aucun utilisateur, rediriger vers login
  if (loading || !user) {
    console.log("ProtectedRoute - Redirecting to login from:", location.pathname);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si l'utilisateur est connecté, afficher le contenu protégé
  return <>{children}</>;
}
