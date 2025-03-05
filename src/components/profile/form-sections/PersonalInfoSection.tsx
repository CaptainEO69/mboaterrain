
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PersonalInfoSectionProps {
  idNumber: string;
  profession: string;
  residencePlace: string;
  userType: string;
  isEditing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }) => void;
}

export function PersonalInfoSection({
  idNumber,
  profession,
  residencePlace,
  userType,
  isEditing,
  onInputChange,
}: PersonalInfoSectionProps) {
  return (
    <>
      <div className="space-y-2">
        <Label className="text-cmr-green font-medium">Numéro CNI</Label>
        <Input
          name="id_number"
          value={idNumber}
          onChange={onInputChange}
          disabled={!isEditing}
          className={!isEditing ? "bg-gray-50" : ""}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-cmr-green font-medium">Profession</Label>
        <Input
          name="profession"
          value={profession}
          onChange={onInputChange}
          disabled={!isEditing}
          className={!isEditing ? "bg-gray-50" : ""}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-cmr-green font-medium">Lieu d'habitation</Label>
        <Input
          name="residence_place"
          value={residencePlace}
          onChange={onInputChange}
          disabled={!isEditing}
          className={!isEditing ? "bg-gray-50" : ""}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-cmr-green font-medium">Type de compte</Label>
        <Select
          value={userType || ""}
          onValueChange={(value) => 
            onInputChange({ target: { name: 'user_type', value } })
          }
          disabled={!isEditing}
        >
          <SelectTrigger className={!isEditing ? "bg-gray-50" : ""}>
            <SelectValue placeholder="Choisir un type de compte" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="owner">Propriétaire</SelectItem>
            <SelectItem value="seller">Agence/Mandataire</SelectItem>
            <SelectItem value="buyer">Acheteur/Locataire</SelectItem>
            <SelectItem value="surveyor">Géomètre</SelectItem>
            <SelectItem value="notary">Notaire</SelectItem>
            <SelectItem value="notary_clerk">Clerc de notaire</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
