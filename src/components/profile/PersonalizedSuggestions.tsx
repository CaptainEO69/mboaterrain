import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Property } from "@/types/property";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

export function PersonalizedSuggestions() {
  const [properties, setProperties] = useState<Property[]>([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPersonalizedSuggestions = async () => {
      if (!user?.id) {
        console.log("No user ID found, can't fetch personalized suggestions.");
        setLoading(false);
        return;
      }

      try {
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("property_type, price_min, price_max, preferred_locations")
          .eq("user_id", user.id)
          .single();

        if (profileError) {
          console.error("Error fetching user profile:", profileError);
          setError("Failed to load personalized suggestions.");
          setLoading(false);
          return;
        }

        if (profileData && !profileError) {
          // Build query based on user preferences
          let query = supabase.from("properties").select("*, property_images(image_url, is_main)").limit(6);
          
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
          
          const { data, error } = await query;

          if (error) {
            console.error("Error fetching properties:", error);
            setError("Failed to load personalized suggestions.");
          } else {
            setProperties(data || []);
          }
        } else {
          console.log("No profile data found for user.");
          setProperties([]);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("Failed to load personalized suggestions.");
      } finally {
        setLoading(false);
      }
    };

    fetchPersonalizedSuggestions();
  }, [user?.id]);

  if (loading) {
    return <p>Chargement des suggestions personnalisées...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (properties.length === 0) {
    return <p>Aucune suggestion personnalisée disponible pour le moment.</p>;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Suggestions personnalisées</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map((property) => (
          <div key={property.id} className="border rounded-md p-2">
            <Link to={`/property/${property.id}`}>
              {property.property_images && property.property_images.length > 0 ? (
                <img
                  src={property.property_images[0].image_url}
                  alt={property.title}
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 rounded-md mb-2"></div>
              )}
              <h3 className="text-md font-semibold">{property.title}</h3>
              <p className="text-gray-600">{property.city}, {property.region}</p>
              <p className="text-gray-700">{property.price} FCFA</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
