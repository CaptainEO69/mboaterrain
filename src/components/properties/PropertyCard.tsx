
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface PropertyImage {
  image_url: string;
  is_main: boolean;
}

export interface Property {
  id: string;
  title: string;
  price: number;
  city: string;
  neighborhood: string;
  property_type: string;
  transaction_type: "sale" | "rent";
  property_images: PropertyImage[];
}

export function PropertyCard({ property }: { property: Property }) {
  // Find the main image or use the first one
  const mainImage = property.property_images?.find(img => img.is_main) || 
                    (property.property_images?.length > 0 ? property.property_images[0] : null);
  
  const imageUrl = mainImage?.image_url || "/placeholder.svg";
  
  // Format price with thousand separators
  const formattedPrice = property.price.toLocaleString();
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/properties/${property.id}`}>
        <div className="relative pb-[60%]">
          <img 
            src={imageUrl} 
            alt={property.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-cmr-green text-white px-2 py-1 text-xs rounded-full">
            {property.transaction_type === "sale" ? "Vente" : "Location"}
          </div>
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg truncate mb-1">{property.title}</h3>
          
          <div className="text-cmr-green font-bold text-lg mb-1">
            {formattedPrice} FCFA
          </div>
          
          <div className="text-sm text-gray-500 mb-1">
            {property.property_type}
          </div>
          
          <div className="text-sm text-gray-500 truncate">
            {property.city}, {property.neighborhood}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
