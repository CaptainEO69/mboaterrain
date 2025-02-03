import { PriceInput } from "./price-location/PriceInput";
import { LocationField } from "./price-location/LocationField";
import { AreaSizeInput } from "./price-location/AreaSizeInput";
import { RoadDistanceInput } from "./price-location/RoadDistanceInput";

interface PriceLocationSectionProps {
  errors: Record<string, string>;
}

export function PriceLocationSection({ errors }: PriceLocationSectionProps) {
  return (
    <div className="space-y-6">
      <PriceInput error={errors.price} />
      <LocationField />
      <AreaSizeInput error={errors.area_size} />
      <RoadDistanceInput />
    </div>
  );
}