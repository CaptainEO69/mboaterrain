import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export type PropertyFilters = {
  propertyType?: string;
  city?: string;
  maxPrice?: number;
  minSize?: number;
  bedrooms?: number;
  isFurnished?: boolean;
};

interface PropertySearchFormProps {
  transactionType: "sale" | "rent";
  onSearch: (filters: PropertyFilters) => void;
}

export function PropertySearchForm({ transactionType, onSearch }: PropertySearchFormProps) {
  const [filters, setFilters] = useState<PropertyFilters>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select
        onValueChange={(value) => setFilters({ ...filters, propertyType: value })}
      >
        <SelectTrigger>
          <SelectValue placeholder="Type de bien" />
        </SelectTrigger>
        <SelectContent>
          {transactionType === "sale" ? (
            <>
              <SelectItem value="house">Maison</SelectItem>
              <SelectItem value="apartment">Appartement</SelectItem>
              <SelectItem value="land">Terrain</SelectItem>
              <SelectItem value="office">Bureau</SelectItem>
              <SelectItem value="store">Commerce</SelectItem>
            </>
          ) : (
            <>
              <SelectItem value="furnished_house">Maison meublée</SelectItem>
              <SelectItem value="unfurnished_house">Maison non meublée</SelectItem>
              <SelectItem value="furnished_apartment">Appartement meublé</SelectItem>
              <SelectItem value="unfurnished_apartment">Appartement non meublé</SelectItem>
            </>
          )}
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) => setFilters({ ...filters, city: value })}
      >
        <SelectTrigger>
          <SelectValue placeholder="Ville" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="yaounde">Yaoundé</SelectItem>
          <SelectItem value="douala">Douala</SelectItem>
          <SelectItem value="bafoussam">Bafoussam</SelectItem>
        </SelectContent>
      </Select>

      <Input
        placeholder={`Budget maximum (FCFA${transactionType === "rent" ? "/mois" : ""})`}
        type="number"
        onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
      />

      <Input
        placeholder="Surface minimum (m²)"
        type="number"
        onChange={(e) => setFilters({ ...filters, minSize: Number(e.target.value) })}
      />

      {transactionType === "rent" && (
        <Select
          onValueChange={(value) => setFilters({ ...filters, isFurnished: value === "true" })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Meublé" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Oui</SelectItem>
            <SelectItem value="false">Non</SelectItem>
          </SelectContent>
        </Select>
      )}

      <Button type="submit" className="w-full bg-cmr-green hover:bg-cmr-green/90">
        Rechercher
      </Button>
    </form>
  );
}