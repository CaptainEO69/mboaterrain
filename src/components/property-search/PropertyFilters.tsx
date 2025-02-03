import { Input } from "@/components/ui/input";

interface PropertyFiltersProps {
  transactionType: "sale" | "rent";
  onMaxPriceChange: (value: number) => void;
  onMinSizeChange: (value: number) => void;
  onMinBedroomsChange: (value: number) => void;
  onMinBathroomsChange: (value: number) => void;
  onDistanceFromRoadChange: (value: number) => void;
}

export function PropertyFilters({
  transactionType,
  onMaxPriceChange,
  onMinSizeChange,
  onMinBedroomsChange,
  onMinBathroomsChange,
  onDistanceFromRoadChange,
}: PropertyFiltersProps) {
  return (
    <div className="space-y-4">
      <Input
        placeholder={`Budget maximum (FCFA${transactionType === "rent" ? "/mois" : ""})`}
        type="number"
        onChange={(e) => onMaxPriceChange(Number(e.target.value))}
        className="w-full"
      />

      <Input
        placeholder="Surface minimum (m²)"
        type="number"
        onChange={(e) => onMinSizeChange(Number(e.target.value))}
        className="w-full"
      />

      <Input
        placeholder="Chambres minimum"
        type="number"
        onChange={(e) => onMinBedroomsChange(Number(e.target.value))}
        className="w-full"
      />

      <Input
        placeholder="Salles de bain minimum"
        type="number"
        onChange={(e) => onMinBathroomsChange(Number(e.target.value))}
        className="w-full"
      />

      <Input
        placeholder="Distance max. de la route (m)"
        type="number"
        onChange={(e) => onDistanceFromRoadChange(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
}