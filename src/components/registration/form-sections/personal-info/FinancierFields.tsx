
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FinancierFieldsProps {
  companyName: string;
  legalStatus: string;
  investmentType: string;
  operationZone: string;
  estimatedFundingCapacity: string;
  setCompanyName: (value: string) => void;
  setLegalStatus: (value: string) => void;
  setInvestmentType: (value: string) => void;
  setOperationZone: (value: string) => void;
  setEstimatedFundingCapacity: (value: string) => void;
}

export function FinancierFields({ 
  companyName, 
  legalStatus, 
  investmentType, 
  operationZone, 
  estimatedFundingCapacity,
  setCompanyName,
  setLegalStatus,
  setInvestmentType,
  setOperationZone,
  setEstimatedFundingCapacity
}: FinancierFieldsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label>Nom de l'entreprise</Label>
        <Input
          value={companyName || ""}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label>Registre de commerce / Statut légal</Label>
        <Input
          value={legalStatus || ""}
          onChange={(e) => setLegalStatus(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label>Type d'investissement</Label>
        <Select
          value={investmentType || ""}
          onValueChange={(value) => setInvestmentType(value)}
        >
          <SelectTrigger>
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
        <Label>Zone d'opération</Label>
        <Input
          value={operationZone || ""}
          onChange={(e) => setOperationZone(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label>Capacité de financement estimée</Label>
        <Input
          value={estimatedFundingCapacity || ""}
          onChange={(e) => setEstimatedFundingCapacity(e.target.value)}
        />
      </div>
    </>
  );
}
