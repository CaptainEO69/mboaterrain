
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SellerFieldsProps {
  agencyName: string;
  commercialRegister: string;
  operationZone: string;
  setAgencyName: (value: string) => void;
  setCommercialRegister: (value: string) => void;
  setOperationZone: (value: string) => void;
}

export function SellerFields({ 
  agencyName, 
  commercialRegister, 
  operationZone, 
  setAgencyName, 
  setCommercialRegister, 
  setOperationZone 
}: SellerFieldsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label>Nom de l'agence</Label>
        <Input
          value={agencyName || ""}
          onChange={(e) => setAgencyName(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label>Registre de commerce (Si professionnel)</Label>
        <Input
          value={commercialRegister || ""}
          onChange={(e) => setCommercialRegister(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label>Zone d'opération</Label>
        <Input
          value={operationZone || ""}
          onChange={(e) => setOperationZone(e.target.value)}
        />
      </div>
    </>
  );
}
