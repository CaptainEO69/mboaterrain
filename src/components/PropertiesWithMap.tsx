
import { useState } from "react";
import { usePropertiesWithLocation } from "@/hooks/usePropertiesWithLocation";
import { PropertyList } from "./PropertyList";
import { PropertyMap } from "./map/PropertyMap";
import { NearbyPropertiesControls } from "./map/NearbyPropertiesControls";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PropertyFilters } from "./PropertySearchForm";
import { Card, CardContent } from "./ui/card";

interface PropertiesWithMapProps {
  transactionType: "sale" | "rent";
}

export function PropertiesWithMap({ transactionType }: PropertiesWithMapProps) {
  const { 
    properties, 
    loading, 
    nearbyLoading,
    fetchProperties, 
    findNearbyProperties, 
    resetNearbyFilter,
    hasLocation,
    permissionDenied
  } = usePropertiesWithLocation(transactionType);
  
  const [activeView, setActiveView] = useState<"list" | "map">("list");
  const [nearbyActive, setNearbyActive] = useState(false);
  
  const handleFindNearby = () => {
    findNearbyProperties();
    setNearbyActive(true);
  };
  
  const handleResetFilter = () => {
    resetNearbyFilter();
    setNearbyActive(false);
  };
  
  const applyFilters = (filters: PropertyFilters) => {
    fetchProperties(filters);
    setNearbyActive(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <NearbyPropertiesControls
            onFindNearby={handleFindNearby}
            onReset={handleResetFilter}
            loading={loading || nearbyLoading}
            hasLocation={hasLocation}
            permissionDenied={permissionDenied}
            nearbyActive={nearbyActive}
          />
        </CardContent>
      </Card>
      
      <Tabs defaultValue="list" onValueChange={(value) => setActiveView(value as "list" | "map")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">Liste</TabsTrigger>
          <TabsTrigger value="map">Carte</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="mt-6">
          <PropertyList 
            properties={properties} 
            loading={loading || nearbyLoading} 
            isRental={transactionType === "rent"} 
          />
        </TabsContent>
        
        <TabsContent value="map" className="mt-6">
          <PropertyMap 
            properties={properties} 
            userLocation={hasLocation ? { 
              latitude: localStorage.getItem('userLatitude') ? parseFloat(localStorage.getItem('userLatitude')!) : null,
              longitude: localStorage.getItem('userLongitude') ? parseFloat(localStorage.getItem('userLongitude')!) : null
            } : undefined}
            mapHeight="600px"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
