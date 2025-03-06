
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [showLoader, setShowLoader] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  
  // Reduce timeout to prevent long waiting times
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
      setAuthChecked(true);
      
      if (!user && !loading) {
        toast.error("Session expirée ou non connecté. Veuillez vous reconnecter.");
      }
    }, 1000); // Reduced from 2000ms to 1000ms for faster feedback
    
    // If authentication completes before timeout, update state immediately
    if (!loading) {
      setAuthChecked(true);
      if (user) {
        setShowLoader(false);
      }
    }
    
    return () => clearTimeout(timer);
  }, [loading, user]);

  // Logs for debugging
  useEffect(() => {
    console.log("ProtectedRoute - Current state:", {
      loading,
      user: user ? "User authenticated" : "No user",
      pathname: location.pathname,
      showLoader,
      authChecked
    });
  }, [loading, user, location.pathname, showLoader, authChecked]);

  // If no user and loading completed, redirect to login
  if (!user && (!loading || authChecked)) {
    console.log("ProtectedRoute - Redirecting to login from:", location.pathname);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authentication is still loading and timeout not reached
  if ((loading || !authChecked) && showLoader) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cmr-green mx-auto"></div>
          <p className="mt-4 text-gray-600">Vérification de votre session...</p>
        </div>
      </div>
    );
  }

  // If user is logged in or we've passed the timeout, show content
  return <>{children}</>;
}
