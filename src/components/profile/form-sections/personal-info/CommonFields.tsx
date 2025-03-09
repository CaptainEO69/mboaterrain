
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CommonFieldsProps {
  idNumber: string;
  profession: string;
  residencePlace: string;
  userType: string;
  isEditing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: any } }) => void;
}

export function CommonFields({ idNumber, profession, residencePlace, userType, isEditing, onInputChange }: CommonFieldsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label className="text-cmr-green font-medium">Numéro CNI / Passeport</Label>
        <Input
          name="id_number"
          value={idNumber || ""}
          onChange={onInputChange}
          disabled={!isEditing}
          className={!isEditing ? "bg-gray-50" : ""}
        />
      </div>

      {userType !== "buyer" && (
        <div className="space-y-2">
          <Label className="text-cmr-green font-medium">Profession</Label>
          <Input
            name="profession"
            value={profession || ""}
            onChange={onInputChange}
            disabled={!isEditing}
            className={!isEditing ? "bg-gray-50" : ""}
          />
        </div>
      )}

      <div className="space-y-2">
        <Label className="text-cmr-green font-medium">
          {userType === "seller" ? "Adresse de l'agence ou du bureau" : "Adresse actuelle"}
        </Label>
        <Input
          name="residence_place"
          value={residencePlace || ""}
          onChange={onInputChange}
          disabled={!isEditing}
          className={!isEditing ? "bg-gray-50" : ""}
        />
      </div>
    </>
  );
}
