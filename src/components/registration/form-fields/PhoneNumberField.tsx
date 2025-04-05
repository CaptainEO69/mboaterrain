
import React from "react";
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
    // Passer simplement le numéro sans préfixe car il sera ajouté ailleurs
    onChange(rawPhoneNumber);
  };

  return (
    <PhoneInput
      label="Téléphone"
      countryCode={countryCode}
      onCountryChange={onCountryChange}
      value={value}
      onChange={handlePhoneChange}
    />
  );
}
