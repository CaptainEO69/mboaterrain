
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NotaryFieldsProps {
  notaryOffice?: string;
  approvalNumber?: string;
  isEditing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: any } }) => void;
}

export function NotaryFields({ 
  notaryOffice, 
  approvalNumber,
  isEditing, 
  onInputChange
}: NotaryFieldsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label className="text-cmr-green font-medium">Nom de l'étude notariale</Label>
        <Input
          name="notary_office"
          value={notaryOffice || ""}
          onChange={onInputChange}
          disabled={!isEditing}
          className={!isEditing ? "bg-gray-50" : ""}
        />
      </div>
      <div className="space-y-2">
        <Label className="text-cmr-green font-medium">Numéro d'agrément</Label>
        <Input
          name="approval_number"
          value={approvalNumber || ""}
          onChange={onInputChange}
          disabled={!isEditing}
          className={!isEditing ? "bg-gray-50" : ""}
        />
      </div>
    </>
  );
}
