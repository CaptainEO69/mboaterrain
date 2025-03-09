
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SurveyorFieldsProps {
  approvalNumber?: string;
  interventionZone?: string;
  isEditing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: any } }) => void;
}

export function SurveyorFields({ 
  approvalNumber, 
  interventionZone,
  isEditing, 
  onInputChange 
}: SurveyorFieldsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label className="text-cmr-green font-medium">Numéro d'agrément / Attestation professionnelle</Label>
        <Input
          name="approval_number"
          value={approvalNumber || ""}
          onChange={onInputChange}
          disabled={!isEditing}
          className={!isEditing ? "bg-gray-50" : ""}
        />
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
    </>
  );
}
