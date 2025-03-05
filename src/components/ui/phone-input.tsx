
import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { getCountries, getCountryCallingCode } from "libphonenumber-js";

interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  countryCode: string;
  onCountryChange: (value: string) => void;
  label?: string;
}

const countries = getCountries();

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, countryCode, onCountryChange, onChange, label, ...props }, ref) => {
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Supprimer les caractères non numériques sauf +
      const value = e.target.value.replace(/[^\d+]/g, "");
      
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
          <Select value={countryCode} onValueChange={onCountryChange}>
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
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground">
              +{getCountryCallingCode(countryCode)}
            </div>
            <Input
              className={cn("pl-12", className)}
              onChange={handlePhoneChange}
              ref={ref}
              {...props}
            />
          </div>
        </div>
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";
