
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BuyerFieldsProps {
  estimatedBudget: number;
  propertyType: string;
  desiredLocation: string;
  setEstimatedBudget: (value: number) => void;
  setPropertyType: (value: string) => void;
  setDesiredLocation: (value: string) => void;
}

export function BuyerFields({ 
  estimatedBudget, 
  propertyType, 
  desiredLocation,
  setEstimatedBudget,
  setPropertyType,
  setDesiredLocation
}: BuyerFieldsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label>Budget estimé</Label>
        <Input
          type="number"
          value={estimatedBudget || ""}
          onChange={(e) => setEstimatedBudget(Number(e.target.value))}
        />
      </div>
      <div className="space-y-2">
        <Label>Type de bien recherché</Label>
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
      <div className="space-y-2">
        <Label>Localisation souhaitée</Label>
        <Input
          value={desiredLocation || ""}
          onChange={(e) => setDesiredLocation(e.target.value)}
        />
      </div>
    </>
  );
}
