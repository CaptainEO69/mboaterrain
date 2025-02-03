import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MapPin, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function RoadDistanceInput() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Label htmlFor="distance_from_road">Distance de la route principale (m)</Label>
        <MapPin className="w-4 h-4 text-muted-foreground" />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="w-4 h-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Distance entre le bien et la route principale la plus proche</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Input
        id="distance_from_road"
        name="distance_from_road"
        type="number"
        min="0"
        step="0.01"
        placeholder="Distance en mètres"
      />
    </div>
  );
}