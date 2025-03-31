
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneNumberField } from "./PhoneNumberField";
import { DatePickerField } from "./DatePickerField";
import { CountryCode } from "libphonenumber-js";

interface BasicFormFieldsProps {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  birthDate: Date | null;
  password: string;
  countryCode: CountryCode;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setEmail: (value: string) => void;
  setPhoneNumber: (value: string) => void;
  setBirthDate: (date: Date | null) => void;
  setPassword: (value: string) => void;
  onCountryChange: (code: CountryCode) => void;
}

export function BasicFormFields({
  firstName,
  lastName,
  email,
  phoneNumber,
  birthDate,
  password,
  countryCode,
  setFirstName,
  setLastName,
  setEmail,
  setPhoneNumber,
  setBirthDate,
  setPassword,
  onCountryChange
}: BasicFormFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Prénom</Label>
          <Input
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Nom</Label>
          <Input
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Adresse e-mail</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <PhoneNumberField
        value={phoneNumber}
        onChange={setPhoneNumber}
        countryCode={countryCode}
        onCountryChange={onCountryChange}
      />

      <DatePickerField
        label="Date de naissance"
        value={birthDate}
        onChange={setBirthDate}
        yearRange={{ fromYear: 1930, toYear: 2006 }}
      />

      <div className="space-y-2">
        <Label htmlFor="password">Mot de passe</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
    </div>
  );
}
