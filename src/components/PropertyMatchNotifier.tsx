
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { checkForMatchingProperties } from "@/services/notificationService";

export function PropertyMatchNotifier() {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    
    // Check for matching properties on login
    checkForMatchingProperties(user.id);
    
    // Also check periodically (every 1 hour)
    const checkInterval = setInterval(() => {
      checkForMatchingProperties(user.id);
    }, 60 * 60 * 1000);
    
    return () => {
      clearInterval(checkInterval);
    };
  }, [user]);

  // This is a background component that doesn't render anything
  return null;
}
