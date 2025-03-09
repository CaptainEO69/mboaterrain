
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface NotaryClerkFieldsProps {
  notaryOffice?: string;
  experienceQualifications?: string;
  isEditing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: any } }) => void;
}

export function NotaryClerkFields({ 
  notaryOffice, 
  experienceQualifications,
  isEditing, 
  onInputChange
}: NotaryClerkFieldsProps) {
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
        <Label className="text-cmr-green font-medium">Expérience et qualifications</Label>
        <Textarea
          name="experience_qualifications"
          value={experienceQualifications || ""}
          onChange={onInputChange}
          disabled={!isEditing}
          className={!isEditing ? "bg-gray-50" : ""}
        />
      </div>
    </>
  );
}
