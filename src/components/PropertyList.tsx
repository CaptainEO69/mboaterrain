
import { PropertyCard } from "@/components/PropertyCard";

type Property = {
  id: string;
  title: string;
  price: number;
  city: string;
  neighborhood: string;
  area_size: number;
  distance?: number | null;
  property_images: {
    image_url: string;
    is_main: boolean;
  }[];
};

interface PropertyListProps {
  properties: Property[];
  loading: boolean;
  isRental?: boolean;
}

export function PropertyList({ properties, loading, isRental = false }: PropertyListProps) {
  if (loading) {
    return <p>Chargement des propriétés...</p>;
  }

  if (properties.length === 0) {
    return <p>Aucune propriété disponible</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          id={property.id}
          title={property.title}
          price={`${property.price.toLocaleString()} FCFA${isRental ? '/mois' : ''}`}
          location={`${property.neighborhood}, ${property.city}`}
          size={`${property.area_size} m²`}
          distance={property.distance}
          imageUrl={
            property.property_images.find((img) => img.is_main)?.image_url ||
            "/placeholder.svg"
          }
        />
      ))}
    </div>
  );
}
