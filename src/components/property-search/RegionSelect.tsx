
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useRegionSelector } from "@/hooks/useRegionSelector";

interface RegionSelectProps {
  onRegionChange: (region: string) => void;
}

export function RegionSelect({ onRegionChange }: RegionSelectProps) {
  const { regions, loading } = useRegionSelector();

  return (
    <Select
      onValueChange={onRegionChange}
      disabled={loading}
    >
      <SelectTrigger>
        {loading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Chargement des régions...</span>
          </div>
        ) : (
          <SelectValue placeholder="Région" />
        )}
      </SelectTrigger>
      <SelectContent>
        {regions.length > 0 ? (
          regions.map((region) => (
            <SelectItem key={region.id} value={region.name}>
              {region.name}
            </SelectItem>
          ))
        ) : (
          <SelectItem value="no-regions" disabled>
            {loading ? "Chargement..." : "Aucune région disponible"}
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
}
