
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PropertyMap } from "@/components/map/PropertyMap";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PropertyDistance } from "@/components/PropertyDistance";

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from("properties")
          .select(`
            *,
            property_images(*)
          `)
          .eq("id", id)
          .single();
          
        if (error) throw error;
        
        setProperty(data);
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Skeleton className="h-10 w-1/2 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Skeleton className="h-96 w-full rounded-lg mb-4" />
          </div>
          <div>
            <Skeleton className="h-20 w-full mb-4" />
            <Skeleton className="h-40 w-full mb-4" />
            <Skeleton className="h-20 w-full mb-4" />
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-3xl font-bold mb-8 font-playfair text-cmr-green">Propriété non trouvée</h1>
        <p>La propriété que vous cherchez n'existe pas ou a été supprimée.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8 font-playfair text-cmr-green">{property.title}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {property.property_images && property.property_images.length > 0 && (
            <img 
              src={property.property_images.find((img: any) => img.is_main)?.image_url || property.property_images[0].image_url} 
              alt={property.title}
              className="w-full h-96 object-cover rounded-lg mb-4"
            />
          )}
          
          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p>{property.description || "Aucune description disponible."}</p>
            </CardContent>
          </Card>
          
          {property.latitude && property.longitude && (
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Localisation</h2>
                <div className="h-96">
                  <PropertyMap 
                    initialLat={property.latitude} 
                    initialLng={property.longitude}
                    properties={[property]} 
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div>
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-cmr-green mb-2">
                {property.price.toLocaleString()} FCFA
              </div>
              <div className="text-gray-500 mb-4">
                {property.transaction_type === "sale" ? "Vente" : "Location"}
              </div>
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Type</span>
                  <span className="font-medium">{property.property_type}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-500">Surface</span>
                  <span className="font-medium">{property.area_size} m²</span>
                </div>
                
                {property.bedrooms && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Chambres</span>
                    <span className="font-medium">{property.bedrooms}</span>
                  </div>
                )}
                
                {property.bathrooms && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Salles de bain</span>
                    <span className="font-medium">{property.bathrooms}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-500">Localisation</span>
                  <span className="font-medium">
                    {property.city}, {property.neighborhood}
                  </span>
                </div>
                
                {property.distance_from_road && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Distance de la route</span>
                    <span className="font-medium">{property.distance_from_road} m</span>
                  </div>
                )}
                
                {property.latitude && property.longitude && (
                  <PropertyDistance lat={property.latitude} lng={property.longitude} />
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <button className="w-full bg-cmr-green text-white py-3 rounded-lg font-semibold mb-2">
                Contacter le propriétaire
              </button>
              <button className="w-full border border-cmr-green text-cmr-green py-3 rounded-lg font-semibold">
                Ajouter aux favoris
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
