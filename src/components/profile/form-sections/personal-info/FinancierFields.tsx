
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FinancierFieldsProps {
  companyName?: string;
  legalStatus?: string;
  investmentType?: string;
  operationZone?: string;
  estimatedFundingCapacity?: string;
  isEditing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: any } }) => void;
}

export function FinancierFields({ 
  companyName, 
  legalStatus, 
  investmentType, 
  operationZone, 
  estimatedFundingCapacity,
  isEditing, 
  onInputChange
}: FinancierFieldsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label className="text-cmr-green font-medium">Nom de l'entreprise</Label>
        <Input
          name="company_name"
          value={companyName || ""}
          onChange={onInputChange}
          disabled={!isEditing}
          className={!isEditing ? "bg-gray-50" : ""}
        />
      </div>
      <div className="space-y-2">
        <Label className="text-cmr-green font-medium">Registre de commerce / Statut légal</Label>
        <Input
          name="legal_status"
          value={legalStatus || ""}
          onChange={onInputChange}
          disabled={!isEditing}
          className={!isEditing ? "bg-gray-50" : ""}
        />
      </div>
      <div className="space-y-2">
        <Label className="text-cmr-green font-medium">Type d'investissement</Label>
        <Select
          value={investmentType || ""}
          onValueChange={(value) => 
            onInputChange({ target: { name: 'investment_type', value } })
          }
          disabled={!isEditing}
        >
          <SelectTrigger className={!isEditing ? "bg-gray-50" : ""}>
            <SelectValue placeholder="Sélectionner un type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="land_purchase">Achat et viabilisation de terrains</SelectItem>
            <SelectItem value="subdivision">Construction de lotissements</SelectItem>
            <SelectItem value="construction">Construction</SelectItem>
            <SelectItem value="other">Autre</SelectItem>
          </SelectContent>
        </Select>
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
      <div className="space-y-2">
        <Label className="text-cmr-green font-medium">Capacité de financement estimée</Label>
        <Input
          name="estimated_funding_capacity"
          value={estimatedFundingCapacity || ""}
          onChange={onInputChange}
          disabled={!isEditing}
          className={!isEditing ? "bg-gray-50" : ""}
        />
      </div>
    </>
  );
}
