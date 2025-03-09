
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SurveyorFieldsProps {
  approvalNumber: string;
  interventionZone: string;
  setApprovalNumber: (value: string) => void;
  setInterventionZone: (value: string) => void;
}

export function SurveyorFields({ 
  approvalNumber, 
  interventionZone,
  setApprovalNumber,
  setInterventionZone
}: SurveyorFieldsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label>Numéro d'agrément / Attestation professionnelle</Label>
        <Input
          value={approvalNumber || ""}
          onChange={(e) => setApprovalNumber(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label>Zone d'intervention</Label>
        <Input
          value={interventionZone || ""}
          onChange={(e) => setInterventionZone(e.target.value)}
        />
      </div>
    </>
  );
}
