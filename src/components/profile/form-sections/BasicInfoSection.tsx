
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BasicInfoSectionProps {
  userEmail: string;
  lastName: string;
  firstName: string;
  phoneNumber: string;
  isEditing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function BasicInfoSection({
  userEmail,
  lastName,
  firstName,
  phoneNumber,
  isEditing,
  onInputChange,
}: BasicInfoSectionProps) {
  return (
    <>
      <div className="space-y-2">
        <Label className="text-cmr-green font-medium">Email</Label>
        <Input
          type="email"
          value={userEmail}
          disabled
          className="bg-gray-50"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-cmr-green font-medium">Nom</Label>
        <Input
          name="last_name"
          value={lastName}
          onChange={onInputChange}
          disabled={!isEditing}
          className={!isEditing ? "bg-gray-50" : ""}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-cmr-green font-medium">Prénom</Label>
        <Input
          name="first_name"
          value={firstName}
          onChange={onInputChange}
          disabled={!isEditing}
          className={!isEditing ? "bg-gray-50" : ""}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-cmr-green font-medium">Téléphone</Label>
        <Input
          name="phone_number"
          value={phoneNumber}
          onChange={onInputChange}
          disabled={!isEditing}
          className={!isEditing ? "bg-gray-50" : ""}
        />
      </div>
    </>
  );
}
