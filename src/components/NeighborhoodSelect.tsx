
import { useNeighborhoods } from "@/hooks/useNeighborhoods";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NeighborhoodSelectProps {
  cityId?: string;
  value?: string;
  onChange: (value: string) => void;
}

export function NeighborhoodSelect({ cityId, value, onChange }: NeighborhoodSelectProps) {
  const { neighborhoods, isLoading } = useNeighborhoods(cityId);

  return (
    <Select
      value={value}
      onValueChange={onChange}
      disabled={isLoading || !cityId}
    >
      <SelectTrigger className="w-full">
        <SelectValue 
          placeholder={!cityId ? "Sélectionnez d'abord une ville" : "Sélectionnez un quartier"} 
        />
      </SelectTrigger>
      <SelectContent>
        {neighborhoods.map((neighborhood) => (
          <SelectItem key={neighborhood.id} value={neighborhood.name}>
            {neighborhood.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
