
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useRegionSelector } from "@/hooks/useRegionSelector";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface RegionSelectProps {
  onRegionChange: (region: string) => void;
}

export function RegionSelect({ onRegionChange }: RegionSelectProps) {
  const { regions, loading, error, useFallback } = useRegionSelector();
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [retryCount, setRetryCount] = useState(0);

  // Réessayer le chargement si nécessaire
  useEffect(() => {
    if (error && retryCount < 2) {
      const timer = setTimeout(() => {
        console.log(`Tentative de rechargement des régions (${retryCount + 1}/2)...`);
        setRetryCount(prev => prev + 1);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [error, retryCount]);

  // Effets de débogage
  useEffect(() => {
    console.log("État du RegionSelect:", { loading, regionsCount: regions.length, useFallback, error: error?.message });
  }, [loading, regions, useFallback, error]);

  const handleRegionChange = (value: string) => {
    console.log("Région sélectionnée:", value);
    setSelectedRegion(value);
    onRegionChange(value);
  };

  if (loading) {
    return <Skeleton className="h-10 w-full" />;
  }

  return (
    <Select
      value={selectedRegion}
      onValueChange={handleRegionChange}
    >
      <SelectTrigger className="w-full">
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
        {regions && regions.length > 0 ? (
          regions.map((region) => (
            <SelectItem key={region.id} value={region.name}>
              {region.name}
              {useFallback && region.id.startsWith('fallback') && ' (données locales)'}
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
