
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PersonalInfoSectionProps {
  formData: {
    birthPlace: string;
    birthYear: string;
    idNumber: string;
    profession: string;
    residencePlace: string;
  };
  setters: {
    setBirthPlace: (value: string) => void;
    setBirthYear: (value: string) => void;
    setIdNumber: (value: string) => void;
    setProfession: (value: string) => void;
    setResidencePlace: (value: string) => void;
  };
}

export function PersonalInfoSection({ formData, setters }: PersonalInfoSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>Lieu de naissance</Label>
        <Input
          value={formData.birthPlace}
          onChange={(e) => setters.setBirthPlace(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Année de naissance</Label>
        <Input
          type="number"
          value={formData.birthYear}
          onChange={(e) => setters.setBirthYear(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Numéro CNI</Label>
        <Input
          value={formData.idNumber}
          onChange={(e) => setters.setIdNumber(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Profession</Label>
        <Input
          value={formData.profession}
          onChange={(e) => setters.setProfession(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Lieu d'habitation</Label>
        <Input
          value={formData.residencePlace}
          onChange={(e) => setters.setResidencePlace(e.target.value)}
          required
        />
      </div>
    </div>
  );
}
