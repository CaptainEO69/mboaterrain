
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ManualCityInputProps {
  onCityChange: (city: string) => void;
}

export function ManualCityInput({ onCityChange }: ManualCityInputProps) {
  const [city, setCity] = useState("");

  return (
    <div>
      <Label>Ville</Label>
      <Input
        value={city}
        onChange={(e) => {
          const value = e.target.value;
          setCity(value);
          onCityChange(value);
        }}
        placeholder="Entrez le nom de la ville"
        className="w-full"
      />
    </div>
  );
}
