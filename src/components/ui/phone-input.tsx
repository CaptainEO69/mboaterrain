
import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { getCountries, getCountryCallingCode, CountryCode } from "libphonenumber-js";

interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  countryCode: CountryCode;
  onCountryChange: (value: CountryCode) => void;
  label?: string;
}

const countries = getCountries();

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, countryCode, onCountryChange, onChange, label, ...props }, ref) => {
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Supprimer les caractères non numériques sauf +
      let value = e.target.value.replace(/[^\d+]/g, "");
      
      // Supprimer l'indicatif du pays s'il est présent au début
      const countryPrefix = `+${getCountryCallingCode(countryCode)}`;
      if (value.startsWith(countryPrefix)) {
        value = value.substring(countryPrefix.length);
      } else if (value.startsWith(getCountryCallingCode(countryCode))) {
        value = value.substring(getCountryCallingCode(countryCode).length);
      }
      
      // Si le numéro commence par un 0, le supprimer également
      if (value.startsWith("0")) {
        value = value.substring(1);
      }
      
      // Mettre à jour le champ avec la valeur nettoyée
      if (onChange) {
        const newEvent = {
          ...e,
          target: {
            ...e.target,
            value,
          },
        } as React.ChangeEvent<HTMLInputElement>;
        
        onChange(newEvent);
      }
    };

    return (
      <div className="space-y-2">
        {label && <Label>{label}</Label>}
        <div className="flex gap-2">
          <Select value={countryCode} onValueChange={(value) => onCountryChange(value as CountryCode)}>
            <SelectTrigger className="w-[120px] flex-shrink-0">
              <SelectValue placeholder="Pays" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  <div className="flex items-center gap-2">
                    <span className="text-xs">{country}</span>
                    <span className="text-xs text-muted-foreground">
                      +{getCountryCallingCode(country)}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            className={cn("", className)}
            onChange={handlePhoneChange}
            ref={ref}
            placeholder="Numéro de téléphone"
            {...props}
          />
        </div>
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";
