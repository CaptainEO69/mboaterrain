
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LocationTextFieldsProps {
  onDistrictChange: (district: string) => void;
  onNeighborhoodChange: (neighborhood: string) => void;
}

export function LocationTextFields({ 
  onDistrictChange, 
  onNeighborhoodChange 
}: LocationTextFieldsProps) {
  return (
    <>
      <div>
        <Label>Arrondissement</Label>
        <Input
          placeholder="Entrez l'arrondissement"
          onChange={(e) => onDistrictChange(e.target.value)}
          className="w-full"
        />
      </div>

      <div>
        <Label>Quartier</Label>
        <Input
          placeholder="Entrez le quartier"
          onChange={(e) => onNeighborhoodChange(e.target.value)}
          className="w-full"
        />
      </div>
    </>
  );
}
