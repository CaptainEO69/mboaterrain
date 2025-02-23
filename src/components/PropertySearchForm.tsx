
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PropertyTypeSelect } from "./property-search/PropertyTypeSelect";
import { FurnishedSelect } from "./property-search/FurnishedSelect";
import { LocationSelect } from "./property-search/LocationSelect";
import { PropertyFilters } from "./property-search/PropertyFilters";

export type PropertyFilters = {
  propertyType?: string;
  city?: string;
  neighborhood?: string;
  department?: string;
  district?: string;
  maxPrice?: number;
  minSize?: number;
  rooms?: number;
  isFurnished?: boolean;
  distanceFromRoad?: number;
};

interface PropertySearchFormProps {
  transactionType: "sale" | "rent";
  onSearch: (filters: PropertyFilters) => void;
}

export function PropertySearchForm({ transactionType, onSearch }: PropertySearchFormProps) {
  const [filters, setFilters] = useState<PropertyFilters>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <PropertyTypeSelect
            onValueChange={(value) => setFilters({ ...filters, propertyType: value })}
            transactionType={transactionType}
          />
        </div>

        {filters.propertyType && filters.propertyType !== "land" && (
          <div>
            <FurnishedSelect
              onValueChange={(value) => setFilters({ ...filters, isFurnished: value })}
            />
          </div>
        )}

        <div className="col-span-2">
          <LocationSelect
            onCityChange={(city) => setFilters({ ...filters, city })}
            onNeighborhoodChange={(neighborhood) => setFilters({ ...filters, neighborhood })}
            onDepartmentChange={(department) => setFilters({ ...filters, department })}
            onDistrictChange={(district) => setFilters({ ...filters, district })}
          />
        </div>

        <div className="col-span-2">
          <PropertyFilters
            transactionType={transactionType}
            propertyType={filters.propertyType}
            onMaxPriceChange={(value) => setFilters({ ...filters, maxPrice: value })}
            onMinSizeChange={(value) => setFilters({ ...filters, minSize: value })}
            onRoomsChange={(value) => setFilters({ ...filters, rooms: value })}
            onDistanceFromRoadChange={(value) => setFilters({ ...filters, distanceFromRoad: value })}
          />
        </div>
      </div>

      <Button type="submit" className="w-full bg-cmr-green hover:bg-cmr-green/90">
        Rechercher
      </Button>
    </form>
  );
}
