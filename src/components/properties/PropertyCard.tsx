
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Property {
  id: string;
  title: string;
  price: number;
  city: string;
  neighborhood: string;
  property_type: string;
  transaction_type: "sale" | "rent";
  property_images: { image_url: string; is_main: boolean }[];
}

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  // Find main image or use first available
  const mainImage = property.property_images?.find(img => img.is_main)?.image_url 
                   || property.property_images?.[0]?.image_url
                   || "/placeholder.svg";

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={mainImage} 
          alt={property.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        <Badge className="absolute top-2 right-2 bg-cmr-green">
          {property.transaction_type === "sale" ? "Vente" : "Location"}
        </Badge>
      </div>
      
      <CardHeader className="pb-2">
        <Link to={`/properties/${property.id}`} className="hover:underline">
          <h3 className="font-semibold text-lg line-clamp-1">{property.title}</h3>
        </Link>
        <p className="text-xs text-gray-500">
          {property.neighborhood}, {property.city}
        </p>
      </CardHeader>
      
      <CardContent className="pb-2 flex-grow">
        <p className="text-sm line-clamp-2 text-gray-600">
          {property.property_type}
        </p>
      </CardContent>
      
      <CardFooter className="pt-2 border-t">
        <p className="font-bold text-cmr-green">{property.price.toLocaleString()} FCFA</p>
      </CardFooter>
    </Card>
  );
}
