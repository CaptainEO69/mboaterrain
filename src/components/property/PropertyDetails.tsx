
import { Property } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface PropertyDetailsProps {
  property: Property;
  isOwner: boolean;
  onEdit: (id: string) => void;
  onDelete: () => void;
}

export function PropertyDetails({ property, isOwner, onEdit, onDelete }: PropertyDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{property.title}</h1>
          <p className="text-xl font-semibold text-cmr-green">
            {property.price.toLocaleString()} FCFA
            {property.transaction_type === "rent" ? "/mois" : ""}
          </p>
        </div>
        {isOwner && (
          <div className="space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onEdit(property.id)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={onDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-semibold">Localisation:</span>
          <p>{property.neighborhood}, {property.city}</p>
        </div>
        <div>
          <span className="font-semibold">Type:</span>
          <p>{property.property_type}</p>
        </div>
        <div>
          <span className="font-semibold">Surface:</span>
          <p>{property.area_size} m²</p>
        </div>
        {property.bedrooms && (
          <div>
            <span className="font-semibold">Chambres:</span>
            <p>{property.bedrooms}</p>
          </div>
        )}
        {property.bathrooms && (
          <div>
            <span className="font-semibold">Salles de bain:</span>
            <p>{property.bathrooms}</p>
          </div>
        )}
        {property.is_furnished !== null && (
          <div>
            <span className="font-semibold">Meublé:</span>
            <p>{property.is_furnished ? "Oui" : "Non"}</p>
          </div>
        )}
        {property.distance_from_road && (
          <div>
            <span className="font-semibold">Distance de la route:</span>
            <p>{property.distance_from_road} m</p>
          </div>
        )}
      </div>

      {property.description && (
        <div>
          <h2 className="font-semibold mb-2">Description</h2>
          <p className="text-gray-600">{property.description}</p>
        </div>
      )}

      <div className="border-t pt-4">
        <h2 className="font-semibold mb-2">Contact</h2>
        <p>{property.profiles.full_name || "Nom non renseigné"}</p>
        <p>{property.profiles.phone_number || "Téléphone non renseigné"}</p>
      </div>
    </div>
  );
}
