
import { Input } from "@/components/ui/input";

interface PropertyFiltersProps {
  transactionType: "sale" | "rent";
  propertyType?: string;
  onMaxPriceChange: (value: number) => void;
  onMinSizeChange: (value: number) => void;
  onRoomsChange: (value: number) => void;
  onDistanceFromRoadChange: (value: number) => void;
}

export function PropertyFilters({
  transactionType,
  propertyType,
  onMaxPriceChange,
  onMinSizeChange,
  onRoomsChange,
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

      {propertyType && propertyType !== "land" && (
        <Input
          placeholder="Nombre de pièces disponibles"
          type="number"
          onChange={(e) => onRoomsChange(Number(e.target.value))}
          className="w-full"
        />
      )}

      <Input
        placeholder="Distance max. de la route (m)"
        type="number"
        onChange={(e) => onDistanceFromRoadChange(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
}
