
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import fr from "date-fns/locale/fr";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface PersonalInfoSectionProps {
  formData: {
    birthPlace: string;
    birthDate: Date | undefined;
    idNumber: string;
    profession: string;
    residencePlace: string;
  };
  setters: {
    setBirthPlace: (value: string) => void;
    setBirthDate: (value: Date | undefined) => void;
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
        <Label>Date de naissance</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !formData.birthDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formData.birthDate ? (
                format(formData.birthDate, "P", { locale: fr })
              ) : (
                <span>Sélectionner une date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={formData.birthDate}
              onSelect={setters.setBirthDate}
              initialFocus
              locale={fr}
            />
          </PopoverContent>
        </Popover>
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
