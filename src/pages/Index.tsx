
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Building2, Key, PlusCircle, MapPin, Map } from "lucide-react";
import { useEffect, useState } from "react";
import { useGeolocation } from "@/hooks/useGeolocation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PropertyMap } from "@/components/map/PropertyMap";
import { usePropertiesWithLocation } from "@/hooks/usePropertiesWithLocation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Index() {
  const navigate = useNavigate();
  const { permissionDenied, requestGeolocation, hasLocation } = useGeolocation();
  const { properties, findNearbyProperties, loading, nearbyLoading } = usePropertiesWithLocation("sale");
  const [showMap, setShowMap] = useState(false);
  const [nearbyProperties, setNearbyProperties] = useState(false);

  // Demander la géolocalisation au chargement initial
  useEffect(() => {
    const hasPromptedLocation = localStorage.getItem('hasPromptedLocation');
    
    if (!hasPromptedLocation) {
      // Attendre un peu avant de demander la permission
      const timer = setTimeout(() => {
        requestGeolocation();
        localStorage.setItem('hasPromptedLocation', 'true');
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleFindNearby = () => {
    findNearbyProperties(5); // Chercher dans un rayon de 5km
    setNearbyProperties(true);
    setShowMap(true);
  };

  return (
    <div className="flex flex-col gap-6 pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-cmr-green to-cmr-green/80 text-white p-6">
        <h1 className="text-3xl md:text-4xl font-playfair font-bold mb-3 leading-tight tracking-tight">
          Trouvez votre bien au Cameroun
        </h1>
        <p className="text-base md:text-lg opacity-90 mb-4 font-light">
          Achetez, louez ou vendez en toute simplicité
        </p>
        <SearchBar />
      </div>

      {/* Géolocalisation Alert */}
      {permissionDenied && (
        <Alert className="mx-4">
          <AlertDescription>
            Vous avez refusé l'accès à votre position. La recherche de biens à proximité n'est pas disponible. 
            Vous pouvez modifier ce paramètre dans les options de votre navigateur.
          </AlertDescription>
        </Alert>
      )}

      {/* Nearby Properties Button */}
      <div className="px-4">
        <Button
          onClick={handleFindNearby}
          disabled={!hasLocation || loading || nearbyLoading}
          className="w-full bg-cmr-green hover:bg-cmr-green/90 h-16"
        >
          <MapPin className="mr-2 h-5 w-5" />
          <div className="flex flex-col items-start">
            <span className="text-lg font-semibold">Trouver les annonces proches</span>
            <span className="text-xs opacity-90">Biens immobiliers à proximité</span>
          </div>
        </Button>
      </div>

      {/* Map Section (conditionally rendered) */}
      {showMap && (
        <div className="px-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="h-5 w-5" />
                <span>{nearbyProperties ? "Biens à proximité" : "Carte des biens"}</span>
              </CardTitle>
              <CardDescription>
                {nearbyProperties 
                  ? `${properties.length} bien${properties.length > 1 ? 's' : ''} trouvé${properties.length > 1 ? 's' : ''} dans un rayon de 5 km`
                  : "Visualisez les biens disponibles sur la carte"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PropertyMap 
                properties={properties} 
                userLocation={hasLocation ? { 
                  latitude: localStorage.getItem('userLatitude') ? parseFloat(localStorage.getItem('userLatitude')!) : null,
                  longitude: localStorage.getItem('userLongitude') ? parseFloat(localStorage.getItem('userLongitude')!) : null
                } : undefined}
                mapHeight="300px"
              />
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate(nearbyProperties ? "/buy" : "/map")}
              >
                Voir {nearbyProperties ? "tous les biens" : "la carte complète"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Main Actions */}
      <div className="px-4">
        <div className="grid grid-cols-1 gap-4">
          <Button
            onClick={() => navigate("/buy")}
            className="h-20 bg-cmr-green hover:bg-cmr-green/90 flex items-center justify-center gap-3"
          >
            <Building2 className="w-6 h-6" />
            <div className="flex flex-col items-start">
              <span className="text-lg font-semibold">Acheter</span>
              <span className="text-xs opacity-90">Trouvez votre bien idéal</span>
            </div>
          </Button>

          <Button
            onClick={() => navigate("/rent")}
            className="h-20 bg-cmr-red hover:bg-cmr-red/90 flex items-center justify-center gap-3"
          >
            <Key className="w-6 h-6" />
            <div className="flex flex-col items-start">
              <span className="text-lg font-semibold">Louer</span>
              <span className="text-xs opacity-90">Location courte ou longue durée</span>
            </div>
          </Button>

          <Button
            onClick={() => navigate("/sell")}
            className="h-20 bg-cmr-yellow hover:bg-cmr-yellow/90 flex items-center justify-center gap-3 text-black"
          >
            <PlusCircle className="w-6 h-6" />
            <div className="flex flex-col items-start">
              <span className="text-lg font-semibold">Vendre</span>
              <span className="text-xs opacity-75">Publiez votre annonce</span>
            </div>
          </Button>
        </div>
      </div>

      {/* Featured Properties Section */}
      <div className="px-4">
        <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4 tracking-tight text-cmr-green">
          Biens à la une
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {/* Cette section sera remplie dynamiquement avec les propriétés mises en avant */}
          <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
            Bientôt disponible
          </div>
        </div>
      </div>
    </div>
  );
}
