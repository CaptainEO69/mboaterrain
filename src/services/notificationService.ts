
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface UserPreference {
  property_type?: string;
  price_min?: number;
  price_max?: number;
  preferred_locations?: string[];
  specific_criteria?: Record<string, boolean>;
}

export async function checkForMatchingProperties(userId: string): Promise<void> {
  try {
    // Get user preferences
    const { data: userPreferences, error: preferencesError } = await supabase
      .from("profiles")
      .select("property_type, price_min, price_max, preferred_locations, specific_criteria, last_notification_sent")
      .eq("user_id", userId)
      .maybeSingle();
      
    if (preferencesError) throw preferencesError;
    
    if (!userPreferences) return;
    
    // Check if we've sent a notification recently (don't spam users)
    const lastNotification = userPreferences.last_notification_sent ? new Date(userPreferences.last_notification_sent) : null;
    const now = new Date();
    
    // Don't send notifications more than once every 12 hours
    if (lastNotification && (now.getTime() - lastNotification.getTime() < 12 * 60 * 60 * 1000)) {
      return;
    }
    
    // Build query to find matching properties
    let query = supabase
      .from("properties")
      .select("id, title, price, city, transaction_type, property_type, created_at");
    
    // Only look for properties added in the last week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    query = query.gte("created_at", oneWeekAgo.toISOString());
    
    // Apply user preference filters
    if (userPreferences.property_type) {
      query = query.eq("property_type", userPreferences.property_type);
    }
    
    if (userPreferences.price_min) {
      query = query.gte("price", userPreferences.price_min);
    }
    
    if (userPreferences.price_max) {
      query = query.lte("price", userPreferences.price_max);
    }
    
    if (userPreferences.preferred_locations && userPreferences.preferred_locations.length > 0) {
      query = query.in("city", userPreferences.preferred_locations);
    }
    
    // Execute query
    const { data: matchingProperties, error: propertiesError } = await query;
    
    if (propertiesError) throw propertiesError;
    
    // If we have matching properties, notify the user
    if (matchingProperties && matchingProperties.length > 0) {
      // Update the last notification timestamp
      await supabase
        .from("profiles")
        .update({ last_notification_sent: now.toISOString() })
        .eq("user_id", userId);
      
      // Show toast notification
      toast("Nouvelles propriétés disponibles!", {
        description: `${matchingProperties.length} propriété(s) correspondent à vos critères.`,
        action: {
          label: "Voir",
          onClick: () => {
            // Navigate to properties page with filters
            window.location.href = `/properties?${userPreferences.property_type ? `type=${userPreferences.property_type}` : ''}`;
          }
        },
        duration: 10000
      });
    }
  } catch (error) {
    console.error("Error checking for matching properties:", error);
  }
}

// Function to check user's voice capabilities
export function checkVoiceCapabilities(): boolean {
  return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
}
