
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface OwnerFieldsProps {
  propertyType: string;
  setPropertyType: (value: string) => void;
}

export function OwnerFields({ propertyType, setPropertyType }: OwnerFieldsProps) {
  return (
    <div className="space-y-2">
      <Label>Type de bien à vendre/louer</Label>
      <Select
        value={propertyType || ""}
        onValueChange={(value) => setPropertyType(value)}
      >
        <SelectTrigger>
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
