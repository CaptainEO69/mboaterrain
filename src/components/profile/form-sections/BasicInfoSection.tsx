
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import { useState, useEffect } from "react";
import { CountryCode, getCountryCallingCode } from "libphonenumber-js";

interface BasicInfoSectionProps {
  userEmail: string;
  lastName: string;
  firstName: string;
  phoneNumber: string;
  isEditing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function BasicInfoSection({
  userEmail,
  lastName,
  firstName,
  phoneNumber,
  isEditing,
  onInputChange,
}: BasicInfoSectionProps) {
  const [countryCode, setCountryCode] = useState<CountryCode>("CM"); // Cameroun par défaut
  const [displayPhoneNumber, setDisplayPhoneNumber] = useState("");
  
  // Détecter le code pays et formater le numéro pour l'affichage
  useEffect(() => {
    if (phoneNumber) {
      // Si le numéro commence par +, essayons de détecter le pays
      if (phoneNumber.startsWith('+')) {
        // Logique simple: +237 -> CM (Cameroun), +33 -> FR (France), etc.
        if (phoneNumber.startsWith('+237')) {
          setCountryCode('CM');
          setDisplayPhoneNumber(phoneNumber.substring(4)); // Enlever le +237
        }
        else if (phoneNumber.startsWith('+33')) {
          setCountryCode('FR');
          setDisplayPhoneNumber(phoneNumber.substring(3)); // Enlever le +33
        }
        // Ajouter d'autres cas selon les besoins
        else {
          // Cas par défaut
          setDisplayPhoneNumber(phoneNumber);
        }
      } else {
        setDisplayPhoneNumber(phoneNumber);
      }
    } else {
      setDisplayPhoneNumber("");
    }
  }, [phoneNumber]);

  const handleCountryChange = (code: CountryCode) => {
    setCountryCode(code);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Formater le numéro avec l'indicatif du pays pour le stockage
    const rawPhoneNumber = e.target.value;
    
    if (rawPhoneNumber) {
      const formattedNumber = `+${getCountryCallingCode(countryCode)}${rawPhoneNumber}`;
      
      // Créer un nouvel événement avec le numéro formaté
      const newEvent = {
        ...e,
        target: {
          ...e.target,
          name: "phone_number",
          value: formattedNumber
        }
      } as React.ChangeEvent<HTMLInputElement>;
      
      onInputChange(newEvent);
    } else {
      // Si le champ est vide
      const newEvent = {
        ...e,
        target: {
          ...e.target,
          name: "phone_number",
          value: ""
        }
      } as React.ChangeEvent<HTMLInputElement>;
      
      onInputChange(newEvent);
    }
  };

  return (
    <>
      <div className="space-y-2">
        <Label className="text-cmr-green font-medium">Email</Label>
        <Input
          type="email"
          value={userEmail}
          disabled
          className="bg-gray-50"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-cmr-green font-medium">Nom</Label>
        <Input
          name="last_name"
          value={lastName}
          onChange={onInputChange}
          disabled={!isEditing}
          className={!isEditing ? "bg-gray-50" : ""}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-cmr-green font-medium">Prénom</Label>
        <Input
          name="first_name"
          value={firstName}
          onChange={onInputChange}
          disabled={!isEditing}
          className={!isEditing ? "bg-gray-50" : ""}
        />
      </div>

      {isEditing ? (
        <PhoneInput
          label="Téléphone"
          countryCode={countryCode}
          onCountryChange={handleCountryChange}
          value={displayPhoneNumber}
          onChange={handlePhoneChange}
          disabled={!isEditing}
        />
      ) : (
        <div className="space-y-2">
          <Label className="text-cmr-green font-medium">Téléphone</Label>
          <Input
            name="phone_number"
            value={phoneNumber}
            onChange={onInputChange}
            disabled={!isEditing}
            className="bg-gray-50"
          />
        </div>
      )}
    </>
  );
}
