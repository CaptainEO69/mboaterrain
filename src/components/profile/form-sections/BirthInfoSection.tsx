
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  // Générer les options pour les jours (1-31)
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  
  // Générer les options pour les mois (1-12)
  const months = [
    { value: 1, label: "Janvier" },
    { value: 2, label: "Février" },
    { value: 3, label: "Mars" },
    { value: 4, label: "Avril" },
    { value: 5, label: "Mai" },
    { value: 6, label: "Juin" },
    { value: 7, label: "Juillet" },
    { value: 8, label: "Août" },
    { value: 9, label: "Septembre" },
    { value: 10, label: "Octobre" },
    { value: 11, label: "Novembre" },
    { value: 12, label: "Décembre" },
  ];

  // Générer les options pour les années (1900 jusqu'à l'année actuelle)
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, i) => currentYear - i
  ).reverse();

  const currentDate = birthDate ? new Date(birthDate) : null;
  const currentDay = currentDate ? currentDate.getDate() : "";
  const currentMonth = currentDate ? currentDate.getMonth() + 1 : "";
  const currentYear2 = currentDate ? currentDate.getFullYear() : "";

  return (
    <>
      <div className="space-y-2">
        <Label className="text-cmr-green font-medium">Date de naissance</Label>
        <div className="grid grid-cols-3 gap-2">
          <Select
            disabled={!isEditing}
            value={currentDay.toString()}
            onValueChange={(value) => onDateChange('day', parseInt(value))}
          >
            <SelectTrigger className={!isEditing ? "bg-gray-50" : ""}>
              <SelectValue placeholder="Jour" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {days.map((day) => (
                <SelectItem key={day} value={day.toString()}>
                  {day}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            disabled={!isEditing}
            value={currentMonth.toString()}
            onValueChange={(value) => onDateChange('month', parseInt(value))}
          >
            <SelectTrigger className={!isEditing ? "bg-gray-50" : ""}>
              <SelectValue placeholder="Mois" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {months.map((month) => (
                <SelectItem key={month.value} value={month.value.toString()}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            disabled={!isEditing}
            value={currentYear2.toString()}
            onValueChange={(value) => onDateChange('year', parseInt(value))}
          >
            <SelectTrigger className={!isEditing ? "bg-gray-50" : ""}>
              <SelectValue placeholder="Année" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
