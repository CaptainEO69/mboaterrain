
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Property } from "@/types/property";
import { toast } from "sonner";

export function usePropertyDetails(id: string | undefined) {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from("properties")
          .select(`
            *,
            property_images (*),
            profiles:owner_profile_id (
              full_name,
              phone_number
            )
          `)
          .eq("id", id)
          .single();

        if (error) throw error;
        
        if (data) {
          const propertyData = {
            ...data,
            property_images: (data.property_images || []),
            profiles: {
              full_name: data.profiles?.full_name || null,
              phone_number: data.profiles?.phone_number || null
            }
          } as unknown as Property;
          
          setProperty(propertyData);
        }
      } catch (error: any) {
        toast.error("Erreur lors du chargement de la propriété");
        throw error;
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  return { property, loading };
}
