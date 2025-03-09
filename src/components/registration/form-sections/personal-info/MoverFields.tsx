
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface MoverFieldsProps {
  companyName: string;
  serviceType: string;
  transportCapacity: string;
  interventionZone: string;
  insuranceIncluded: boolean;
  setCompanyName: (value: string) => void;
  setServiceType: (value: string) => void;
  setTransportCapacity: (value: string) => void;
  setInterventionZone: (value: string) => void;
  setInsuranceIncluded: (value: boolean) => void;
}

export function MoverFields({ 
  companyName, 
  serviceType, 
  transportCapacity, 
  interventionZone, 
  insuranceIncluded,
  setCompanyName,
  setServiceType,
  setTransportCapacity,
  setInterventionZone,
  setInsuranceIncluded
}: MoverFieldsProps) {
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
        <Label>Type de service</Label>
        <Select
          value={serviceType || ""}
          onValueChange={(value) => setServiceType(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="local">Déménagement local</SelectItem>
            <SelectItem value="national">Déménagement national</SelectItem>
            <SelectItem value="international">Déménagement international</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Capacité de transport</Label>
        <Select
          value={transportCapacity || ""}
          onValueChange={(value) => setTransportCapacity(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner une capacité" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small_truck">Petit camion</SelectItem>
            <SelectItem value="large_truck">Grand camion</SelectItem>
            <SelectItem value="special_logistics">Logistique spéciale</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Zone d'intervention</Label>
        <Input
          value={interventionZone || ""}
          onChange={(e) => setInterventionZone(e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-2 mt-4">
        <Switch
          checked={!!insuranceIncluded}
          onCheckedChange={(checked) => setInsuranceIncluded(checked)}
        />
        <Label>Assurance incluse</Label>
      </div>
    </>
  );
}
