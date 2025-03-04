
import { PriceInput } from "./price-location/PriceInput";
import { LocationField } from "./price-location/LocationField";
import { AreaSizeInput } from "./price-location/AreaSizeInput";
import { RoadDistanceInput } from "./price-location/RoadDistanceInput";

interface PriceLocationSectionProps {
  errors: Record<string, string>;
  isRental?: boolean;
}

export function PriceLocationSection({ errors, isRental = false }: PriceLocationSectionProps) {
  return (
    <div className="space-y-6">
      <PriceInput error={errors.price} isRental={isRental} />
      <LocationField />
      <AreaSizeInput error={errors.area_size} />
      <RoadDistanceInput />
    </div>
  );
}
