
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NotaryFieldsProps {
  notaryOffice: string;
  approvalNumber: string;
  setNotaryOffice: (value: string) => void;
  setApprovalNumber: (value: string) => void;
}

export function NotaryFields({ 
  notaryOffice, 
  approvalNumber,
  setNotaryOffice,
  setApprovalNumber
}: NotaryFieldsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label>Nom de l'étude notariale</Label>
        <Input
          value={notaryOffice || ""}
          onChange={(e) => setNotaryOffice(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Numéro d'agrément</Label>
        <Input
          value={approvalNumber || ""}
          onChange={(e) => setApprovalNumber(e.target.value)}
        />
      </div>
    </>
  );
}
