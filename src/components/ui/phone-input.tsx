
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

// Fonction utilisée plus loin
const getCountryCallingCodeFunc = getCountryCallingCode;

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, countryCode, onCountryChange, onChange, label, ...props }, ref) => {
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Supprimer les caractères non numériques sauf +
      let value = e.target.value.replace(/[^\d+]/g, "");
      
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
                      +{getCountryCallingCodeFunc(country)}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="relative flex-grow">
            <Input
              className={cn("pl-14", className)}
              onChange={handlePhoneChange}
              ref={ref}
              placeholder="Numéro de téléphone"
              {...props}
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              +{getCountryCallingCodeFunc(countryCode)}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";
