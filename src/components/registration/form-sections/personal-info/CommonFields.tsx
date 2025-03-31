
import { RegistrationFormData, RegistrationFormSetters } from "@/types/registration";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CommonFieldsProps {
  formData: {
    birthPlace: string;
    idNumber: string;
    profession: string;
    residencePlace: string;
  };
  setters: {
    setBirthPlace: (value: string) => void;
    setIdNumber: (value: string) => void;
    setProfession: (value: string) => void;
    setResidencePlace: (value: string) => void;
  };
  userType: string;
}

export function CommonFields({ formData, setters, userType }: CommonFieldsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label>Lieu de naissance</Label>
        <Input
          value={formData.birthPlace}
          onChange={(e) => setters.setBirthPlace(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label>
          {userType === "buyer" ? "Numéro CNI / Passeport" : "Numéro CNI / Passeport"}
        </Label>
        <Input
          value={formData.idNumber}
          onChange={(e) => setters.setIdNumber(e.target.value)}
          required
        />
      </div>
      
      {userType !== "buyer" && (
        <div className="space-y-2">
          <Label>Profession</Label>
          <Input
            value={formData.profession}
            onChange={(e) => setters.setProfession(e.target.value)}
            required
          />
        </div>
      )}
      
      <div className="space-y-2">
        <Label>
          {userType === "seller" ? "Adresse de l'agence ou du bureau" : "Adresse actuelle"}
        </Label>
        <Input
          value={formData.residencePlace}
          onChange={(e) => setters.setResidencePlace(e.target.value)}
          required
        />
      </div>
    </>
  );
}
