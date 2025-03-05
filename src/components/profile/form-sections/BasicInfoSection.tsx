
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import { useState, useEffect } from "react";

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
  const [countryCode, setCountryCode] = useState("CM"); // Cameroun par défaut
  
  // Détecter le code pays si un numéro existe déjà
  useEffect(() => {
    if (phoneNumber) {
      // Si le numéro commence par +, essayons de détecter le pays
      if (phoneNumber.startsWith('+')) {
        // Logique simple: +237 -> CM (Cameroun), +33 -> FR (France), etc.
        // Pour une implémentation plus complète, utiliser une bibliothèque comme libphonenumber-js
        if (phoneNumber.startsWith('+237')) setCountryCode('CM');
        else if (phoneNumber.startsWith('+33')) setCountryCode('FR');
        // Ajouter d'autres cas selon les besoins
      }
    }
  }, [phoneNumber]);

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
          onCountryChange={setCountryCode}
          value={phoneNumber}
          name="phone_number"
          onChange={onInputChange}
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
