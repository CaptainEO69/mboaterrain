
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface PropertyImage {
  image_url: string;
  is_main: boolean;
}

interface Property {
  id: string;
  title: string;
  price: number;
  city: string;
  neighborhood: string;
  property_type: string;
  transaction_type: "sale" | "rent";
  property_images: PropertyImage[];
}

export function PersonalizedSuggestions() {
  const { user } = useAuth();
  const [suggestions, setSuggestions] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchSuggestions = async () => {
      try {
        setLoading(true);
        
        // Get user profile with preferences
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("property_type, price_min, price_max, preferred_locations, specific_criteria")
          .eq("user_id", user.id)
          .maybeSingle();
          
        if (profileError) throw profileError;
        
        // Build query based on user preferences
        let query = supabase
          .from("properties")
          .select("*, property_images(image_url, is_main)")
          .limit(6);
        
        // Apply filters based on user preferences
        if (profileData?.property_type) {
          query = query.eq("property_type", profileData.property_type);
        }
        
        if (profileData?.price_min) {
          query = query.gte("price", profileData.price_min);
        }
        
        if (profileData?.price_max) {
          query = query.lte("price", profileData.price_max);
        }
        
        if (profileData?.preferred_locations && profileData?.preferred_locations.length > 0) {
          query = query.in("city", profileData.preferred_locations);
        }
        
        // Execute query
        const { data: propertiesData, error: propertiesError } = await query;
        
        if (propertiesError) throw propertiesError;
        
        // Process results - ensure property type is compatible
        if (propertiesData) {
          const typedProperties = propertiesData.map(property => ({
            ...property,
            transaction_type: property.transaction_type === "sale" ? "sale" as const : "rent" as const
          }));
          setSuggestions(typedProperties);
        }
      } catch (error: any) {
        console.error("Error fetching personalized suggestions:", error.message);
        toast.error("Impossible de charger les suggestions personnalisées");
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [user]);

  if (loading) {
    return (
      <Card className="border-cmr-green my-6">
        <CardHeader className="bg-cmr-green/10">
          <CardTitle className="text-cmr-green text-lg">Suggestions personnalisées</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (suggestions.length === 0) {
    return (
      <Card className="border-cmr-green my-6">
        <CardHeader className="bg-cmr-green/10">
          <CardTitle className="text-cmr-green text-lg">Suggestions personnalisées</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <p className="text-center py-8 text-gray-500">
            Aucune propriété ne correspond actuellement à vos préférences. 
            Ajustez vos critères ou revenez plus tard !
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-cmr-green my-6">
      <CardHeader className="bg-cmr-green/10">
        <CardTitle className="text-cmr-green text-lg">Suggestions personnalisées</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {suggestions.map((property) => (
            <Card key={property.id} className="overflow-hidden h-full flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={property.property_images?.[0]?.image_url || "/placeholder.svg"} 
                  alt={property.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-1">{property.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{property.city}</p>
                <p className="font-bold text-cmr-green">{property.price.toLocaleString()} FCFA</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
