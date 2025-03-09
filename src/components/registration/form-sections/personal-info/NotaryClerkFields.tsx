
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface NotaryClerkFieldsProps {
  notaryOffice: string;
  experienceQualifications: string;
  setNotaryOffice: (value: string) => void;
  setExperienceQualifications: (value: string) => void;
}

export function NotaryClerkFields({ 
  notaryOffice, 
  experienceQualifications,
  setNotaryOffice,
  setExperienceQualifications
}: NotaryClerkFieldsProps) {
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
        <Label>Expérience et qualifications</Label>
        <Textarea
          value={experienceQualifications || ""}
          onChange={(e) => setExperienceQualifications(e.target.value)}
        />
      </div>
    </>
  );
}
