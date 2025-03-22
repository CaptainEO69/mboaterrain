import { supabase } from "@/integrations/supabase/client";

export const sendNotification = async (userId: string) => {
  try {
    // Fetch user profile to get preferences
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (profileData && !profileError) {
      const lastNotificationSent = profileData.last_notification_sent 
        ? new Date(profileData.last_notification_sent)
        : null;

      // Check if a notification was sent in the last 24 hours
      if (lastNotificationSent && (new Date().getTime() - lastNotificationSent.getTime()) < (24 * 60 * 60 * 1000)) {
        console.log("Notification already sent in the last 24 hours");
        return;
      }

      // Build query based on user preferences
      let query = supabase.from("properties").select("*").limit(5).order('created_at', { ascending: false });
      
      // Apply filters based on user preferences
      if (profileData.property_type) {
        query = query.eq("property_type", profileData.property_type);
      }
      
      if (typeof profileData.price_min === 'number') {
        query = query.gte("price", profileData.price_min);
      }
      
      if (typeof profileData.price_max === 'number') {
        query = query.lte("price", profileData.price_max);
      }
      
      if (profileData.preferred_locations && Array.isArray(profileData.preferred_locations) && profileData.preferred_locations.length > 0) {
        query = query.in("city", profileData.preferred_locations);
      }

      const { data: properties, error: propertiesError } = await query;

      if (propertiesError) {
        console.error("Error fetching properties:", propertiesError);
        return;
      }

      if (properties && properties.length > 0) {
        // Construct the notification message
        const notificationMessage = `Découvrez ${properties.length} nouvelles propriétés correspondant à vos critères !`;

        // Here, you would typically send the notification using a service like Firebase Cloud Messaging, Expo Notifications, etc.
        // For this example, we'll just log the notification message
        console.log("Sending notification:", notificationMessage);

        // Update the user's profile with the last notification sent timestamp
        const { error: updateError } = await supabase
          .from("profiles")
          .update({ last_notification_sent: new Date() })
          .eq("user_id", userId);

        if (updateError) {
          console.error("Error updating last_notification_sent:", updateError);
        }
      } else {
        console.log("No new properties found matching user criteria.");
      }
    } else {
      console.error("Error fetching user profile:", profileError);
    }
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};
