
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { PasswordStrength } from "@/components/ui/password-strength";
import { PhoneInput } from "@/components/ui/phone-input";
import { useState } from "react";
import { CountryCode } from "libphonenumber-js";

interface BasicInfoSectionProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    birthDate: Date | null;
  };
  setters: {
    setFirstName: (value: string) => void;
    setLastName: (value: string) => void;
    setEmail: (value: string) => void;
    setPhoneNumber: (value: string) => void;
    setPassword: (value: string) => void;
    setBirthDate: (value: Date | null) => void;
  };
}

export function BasicInfoSection({ formData, setters }: BasicInfoSectionProps) {
  const [countryCode, setCountryCode] = useState<CountryCode>("CM"); // CM pour Cameroun par défaut

  const handleCountryChange = (code: CountryCode) => {
    setCountryCode(code);
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

        <PhoneInput
          label="Téléphone"
          countryCode={countryCode}
          onCountryChange={handleCountryChange}
          value={formData.phoneNumber}
          onChange={(e) => setters.setPhoneNumber(e.target.value)}
          required
        />

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
            <PopoverContent className="w-auto p-0 bg-white" align="start">
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
          <PasswordStrength password={formData.password} />
        </div>
      </div>
    </div>
  );
}
