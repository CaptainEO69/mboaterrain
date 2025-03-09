
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface MoverFieldsProps {
  companyName?: string;
  serviceType?: string;
  transportCapacity?: string;
  interventionZone?: string;
  insuranceIncluded?: boolean;
  isEditing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: any } }) => void;
}

export function MoverFields({ 
  companyName, 
  serviceType, 
  transportCapacity, 
  interventionZone, 
  insuranceIncluded,
  isEditing, 
  onInputChange
}: MoverFieldsProps) {
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
        <Label className="text-cmr-green font-medium">Type de service</Label>
        <Select
          value={serviceType || ""}
          onValueChange={(value) => 
            onInputChange({ target: { name: 'service_type', value } })
          }
          disabled={!isEditing}
        >
          <SelectTrigger className={!isEditing ? "bg-gray-50" : ""}>
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
        <Label className="text-cmr-green font-medium">Capacité de transport</Label>
        <Select
          value={transportCapacity || ""}
          onValueChange={(value) => 
            onInputChange({ target: { name: 'transport_capacity', value } })
          }
          disabled={!isEditing}
        >
          <SelectTrigger className={!isEditing ? "bg-gray-50" : ""}>
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
        <Label className="text-cmr-green font-medium">Zone d'intervention</Label>
        <Input
          name="intervention_zone"
          value={interventionZone || ""}
          onChange={onInputChange}
          disabled={!isEditing}
          className={!isEditing ? "bg-gray-50" : ""}
        />
      </div>
      <div className="flex items-center space-x-2 mt-4">
        <Switch
          checked={!!insuranceIncluded}
          onCheckedChange={(checked) => 
            onInputChange({ target: { name: 'insurance_included', value: checked } })
          }
          disabled={!isEditing}
        />
        <Label className="text-cmr-green font-medium">Assurance incluse</Label>
      </div>
    </>
  );
}
