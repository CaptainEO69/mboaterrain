
import { usePropertiesWithLocation } from "@/hooks/usePropertiesWithLocation";
import { PropertyMap } from "@/components/map/PropertyMap";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { NearbyPropertiesControls } from "@/components/map/NearbyPropertiesControls";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function MapView() {
  const navigate = useNavigate();
  const { 
    properties, 
    loading, 
    nearbyLoading,
    findNearbyProperties, 
    resetNearbyFilter,
    hasLocation,
    permissionDenied
  } = usePropertiesWithLocation("sale");
  
  const [nearbyActive, setNearbyActive] = useState(false);
  
  const handleFindNearby = () => {
    findNearbyProperties();
    setNearbyActive(true);
  };
  
  const handleResetFilter = () => {
    resetNearbyFilter();
    setNearbyActive(false);
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex justify-between items-center">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Button>
        
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <MapPin className="h-5 w-5 text-cmr-green" />
          Carte des biens
        </h1>
      </div>
      
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
      
      <PropertyMap 
        properties={properties} 
        userLocation={hasLocation ? { 
          latitude: localStorage.getItem('userLatitude') ? parseFloat(localStorage.getItem('userLatitude')!) : null,
          longitude: localStorage.getItem('userLongitude') ? parseFloat(localStorage.getItem('userLongitude')!) : null
        } : undefined}
        mapHeight="calc(100vh - 200px)"
      />
    </div>
  );
}
