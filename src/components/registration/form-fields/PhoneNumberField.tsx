
import React from "react";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { CountryCode } from "libphonenumber-js";

interface PhoneNumberFieldProps {
  value: string;
  onChange: (value: string) => void;
  countryCode: CountryCode;
  onCountryChange: (code: CountryCode) => void;
}

export function PhoneNumberField({
  value,
  onChange,
  countryCode,
  onCountryChange
}: PhoneNumberFieldProps) {
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawPhoneNumber = e.target.value;
    if (rawPhoneNumber) {
      // Utiliser l'indicatif du pays sélectionné
      onChange(`+${countryCode}${rawPhoneNumber}`);
    } else {
      onChange("");
    }
  };

  return (
    <PhoneInput
      label="Téléphone"
      countryCode={countryCode}
      onCountryChange={onCountryChange}
      value={value.replace(/^\+\d+/, "")}
      onChange={handlePhoneChange}
    />
  );
}
