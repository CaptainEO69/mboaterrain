
import { useAuth } from "@/lib/auth";
import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Si le chargement est terminé, on peut afficher le contenu
    if (!loading) {
      setIsReady(true);
    }
  }, [loading]);

  // Ajout de logs pour debug
  console.log("ProtectedRoute - Loading:", loading);
  console.log("ProtectedRoute - User:", user);
  console.log("ProtectedRoute - IsReady:", isReady);

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cmr-green mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log("ProtectedRoute - Redirecting to login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
