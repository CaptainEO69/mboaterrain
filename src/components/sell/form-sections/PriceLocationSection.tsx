import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LocationSelect } from "../../property-search/LocationSelect";

interface PriceLocationSectionProps {
  errors: Record<string, string>;
}

export function PriceLocationSection({ errors }: PriceLocationSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="price">Prix (FCFA)</Label>
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

      <div>
        <Label htmlFor="area_size">Superficie (m²)</Label>
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
        <Label htmlFor="distance_from_road">Distance de la route principale (m)</Label>
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