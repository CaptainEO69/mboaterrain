
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fr } from "date-fns/locale";
import { format } from "date-fns";

interface BirthInfoSectionProps {
  birthDate: Date | null;
  birthPlace: string;
  isEditing: boolean;
  onDateChange: (type: 'day' | 'month' | 'year', value: number) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function BirthInfoSection({
  birthDate,
  birthPlace,
  isEditing,
  onDateChange,
  onInputChange,
}: BirthInfoSectionProps) {
  // Format actuel de la date si elle existe
  const formattedDate = birthDate ? format(birthDate, "yyyy-MM-dd") : "";
  
  // Fonction pour gérer le changement de date manuel
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    if (dateValue) {
      const newDate = new Date(dateValue);
      // Mise à jour du jour, mois et année
      onDateChange('day', newDate.getDate());
      onDateChange('month', newDate.getMonth() + 1);
      onDateChange('year', newDate.getFullYear());
    }
  };

  return (
    <>
      <div className="space-y-2">
        <Label className="text-cmr-green font-medium">Date de naissance</Label>
        <Input
          type="date"
          name="birth_date"
          value={formattedDate}
          onChange={handleDateChange}
          disabled={!isEditing}
          className={!isEditing ? "bg-gray-50" : ""}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-cmr-green font-medium">Lieu de naissance</Label>
        <Input
          name="birth_place"
          value={birthPlace}
          onChange={onInputChange}
          disabled={!isEditing}
          className={!isEditing ? "bg-gray-50" : ""}
        />
      </div>
    </>
  );
}
