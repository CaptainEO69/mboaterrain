
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BuyerFieldsProps {
  estimatedBudget?: number;
  propertyType?: string;
  desiredLocation?: string;
  isEditing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: any } }) => void;
}

export function BuyerFields({ 
  estimatedBudget, 
  propertyType, 
  desiredLocation,
  isEditing, 
  onInputChange 
}: BuyerFieldsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label className="text-cmr-green font-medium">Budget estimé</Label>
        <Input
          name="estimated_budget"
          type="number"
          value={estimatedBudget || ""}
          onChange={onInputChange}
          disabled={!isEditing}
          className={!isEditing ? "bg-gray-50" : ""}
        />
      </div>
      <div className="space-y-2">
        <Label className="text-cmr-green font-medium">Type de bien recherché</Label>
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
      <div className="space-y-2">
        <Label className="text-cmr-green font-medium">Localisation souhaitée</Label>
        <Input
          name="desired_location"
          value={desiredLocation || ""}
          onChange={onInputChange}
          disabled={!isEditing}
          className={!isEditing ? "bg-gray-50" : ""}
        />
      </div>
    </>
  );
}
