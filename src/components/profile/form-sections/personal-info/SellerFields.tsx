
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SellerFieldsProps {
  agencyName?: string;
  commercialRegister?: string;
  operationZone?: string;
  isEditing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: any } }) => void;
}

export function SellerFields({ 
  agencyName, 
  commercialRegister, 
  operationZone, 
  isEditing, 
  onInputChange 
}: SellerFieldsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label className="text-cmr-green font-medium">Nom de l'agence</Label>
        <Input
          name="agency_name"
          value={agencyName || ""}
          onChange={onInputChange}
          disabled={!isEditing}
          className={!isEditing ? "bg-gray-50" : ""}
        />
      </div>
      <div className="space-y-2">
        <Label className="text-cmr-green font-medium">Registre de commerce (Si professionnel)</Label>
        <Input
          name="commercial_register"
          value={commercialRegister || ""}
          onChange={onInputChange}
          disabled={!isEditing}
          className={!isEditing ? "bg-gray-50" : ""}
        />
      </div>
      <div className="space-y-2">
        <Label className="text-cmr-green font-medium">Zone d'opération</Label>
        <Input
          name="operation_zone"
          value={operationZone || ""}
          onChange={onInputChange}
          disabled={!isEditing}
          className={!isEditing ? "bg-gray-50" : ""}
        />
      </div>
    </>
  );
}
