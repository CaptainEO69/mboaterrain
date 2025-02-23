
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/sell/ImageUpload";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface BasicInfoSectionProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    birthDate: Date | null;
    profileImage: File | null;
  };
  setters: {
    setFirstName: (value: string) => void;
    setLastName: (value: string) => void;
    setEmail: (value: string) => void;
    setPhoneNumber: (value: string) => void;
    setPassword: (value: string) => void;
    setBirthDate: (value: Date | null) => void;
    setProfileImage: (value: File | null) => void;
  };
}

export function BasicInfoSection({ formData, setters }: BasicInfoSectionProps) {
  const handleImageChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      setters.setProfileImage(files[0]);
    } else {
      setters.setProfileImage(null);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Nom</Label>
          <Input
            value={formData.lastName}
            onChange={(e) => setters.setLastName(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label>Prénom</Label>
          <Input
            value={formData.firstName}
            onChange={(e) => setters.setFirstName(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setters.setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Téléphone</Label>
          <Input
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) => setters.setPhoneNumber(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Date de naissance</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full justify-start text-left font-normal ${
                  !formData.birthDate && "text-muted-foreground"
                }`}
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
                selected={formData.birthDate || undefined}
                onSelect={(date) => setters.setBirthDate(date)}
                initialFocus
                locale={fr}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>Mot de passe</Label>
          <Input
            type="password"
            value={formData.password}
            onChange={(e) => setters.setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>

        <div className="space-y-2">
          <Label>Photo de profil</Label>
          <ImageUpload onChange={handleImageChange} />
        </div>
      </div>
    </div>
  );
}
