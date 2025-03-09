
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define user types outside the component
export const userTypes = [
  { value: "owner", label: "Propriétaire" },
  { value: "seller", label: "Agence/Mandataire" },
  { value: "buyer", label: "Acheteur/Locataire" },
  { value: "surveyor", label: "Géomètre" },
  { value: "notary", label: "Notaire" },
  { value: "notary_clerk", label: "Clerc de notaire" },
  { value: "financier", label: "Financier Lotisseur" },
  { value: "mover", label: "Déménageur" },
];

export const getCurrentUserType = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("type") || "";
};

interface UserTypeSelectorProps {
  currentType: string;
}

export function UserTypeSelector({ currentType }: UserTypeSelectorProps) {
  const navigate = useNavigate();

  const handleUserTypeChange = (value: string) => {
    navigate(`/register/form?type=${value}`);
  };

  return (
    <div className="space-y-2">
      <Label>Type de compte</Label>
      <Select
        value={currentType}
        onValueChange={handleUserTypeChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Sélectionnez un type de compte" />
        </SelectTrigger>
        <SelectContent>
          {userTypes.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
