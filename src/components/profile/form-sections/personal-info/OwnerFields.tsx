
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface OwnerFieldsProps {
  propertyType?: string;
  isEditing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: any } }) => void;
}

export function OwnerFields({ propertyType, isEditing, onInputChange }: OwnerFieldsProps) {
  return (
    <div className="space-y-2">
      <Label className="text-cmr-green font-medium">Type de bien à vendre/louer</Label>
      <Select
        value={propertyType || ""}
        onValueChange={(value) => 
          onInputChange({ target: { name: 'property_type', value } })
        }
        disabled={!isEditing}
      >
        <SelectTrigger className={!isEditing ? "bg-gray-50" : ""}>
          <SelectValue placeholder="Sélectionner un type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="house">Maison</SelectItem>
          <SelectItem value="land">Terrain</SelectItem>
          <SelectItem value="apartment">Appartement</SelectItem>
          <SelectItem value="commercial">Local commercial</SelectItem>
          <SelectItem value="other">Autre</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
