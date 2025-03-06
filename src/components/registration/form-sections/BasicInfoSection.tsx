
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    if (dateValue) {
      setters.setBirthDate(new Date(dateValue));
    } else {
      setters.setBirthDate(null);
    }
  };

  // Format de la date pour l'input
  const formattedDate = formData.birthDate 
    ? formData.birthDate.toISOString().split('T')[0] 
    : "";

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
          <Input
            type="date"
            value={formattedDate}
            onChange={handleDateChange}
            required
          />
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
