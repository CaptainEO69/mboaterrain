import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Ruler, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AreaSizeInputProps {
  error?: string;
}

export function AreaSizeInput({ error }: AreaSizeInputProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Label htmlFor="area_size">Superficie (m²)</Label>
        <Ruler className="w-4 h-4 text-muted-foreground" />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="w-4 h-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Surface totale du bien en mètres carrés</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Input
        id="area_size"
        name="area_size"
        type="number"
        min="0"
        step="0.01"
        required
        className={error ? "border-red-500" : ""}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}