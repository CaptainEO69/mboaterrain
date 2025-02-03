import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LocationSelect } from "../../property-search/LocationSelect";
import { DollarSign, MapPin, Ruler } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PriceLocationSectionProps {
  errors: Record<string, string>;
}

export function PriceLocationSection({ errors }: PriceLocationSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Label htmlFor="price">Prix (FCFA)</Label>
          <DollarSign className="w-4 h-4 text-muted-foreground" />
        </div>
        <Input
          id="price"
          name="price"
          type="number"
          min="0"
          step="1000"
          required
          className={errors.price ? "border-red-500" : ""}
        />
        {errors.price && (
          <p className="text-red-500 text-sm mt-1">{errors.price}</p>
        )}
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <Label>Localisation</Label>
          <MapPin className="w-4 h-4 text-muted-foreground" />
        </div>
        <LocationSelect
          onCityChange={(city) => {
            const form = document.querySelector('form');
            if (form) {
              const formData = new FormData(form);
              formData.set('city', city);
            }
          }}
          onNeighborhoodChange={(neighborhood) => {
            const form = document.querySelector('form');
            if (form) {
              const formData = new FormData(form);
              formData.set('neighborhood', neighborhood);
            }
          }}
        />
      </div>

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
          className={errors.area_size ? "border-red-500" : ""}
        />
        {errors.area_size && (
          <p className="text-red-500 text-sm mt-1">{errors.area_size}</p>
        )}
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <Label htmlFor="distance_from_road">Distance de la route principale (m)</Label>
          <MapPin className="w-4 h-4 text-muted-foreground" />
        </div>
        <Input
          id="distance_from_road"
          name="distance_from_road"
          type="number"
          min="0"
          step="0.01"
        />
      </div>
    </div>
  );
}