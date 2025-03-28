
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

// Données des régions du Cameroun
const CAMEROON_REGIONS = [
  { id: "1", name: "Adamaoua" },
  { id: "2", name: "Centre" },
  { id: "3", name: "Est" },
  { id: "4", name: "Extrême-Nord" },
  { id: "5", name: "Littoral" },
  { id: "6", name: "Nord" },
  { id: "7", name: "Nord-Ouest" },
  { id: "8", name: "Ouest" },
  { id: "9", name: "Sud" },
  { id: "10", name: "Sud-Ouest" }
];

interface RegionSelectProps {
  onRegionChange: (region: string) => void;
}

export function RegionSelect({ onRegionChange }: RegionSelectProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Debug
  useEffect(() => {
    console.log("RegionSelect mounted, regions available:", CAMEROON_REGIONS);
  }, []);

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
        <SelectValue placeholder="Sélectionnez une région" />
      </SelectTrigger>
      <SelectContent>
        {CAMEROON_REGIONS.map((region) => (
          <SelectItem key={region.id} value={region.name}>
            {region.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
