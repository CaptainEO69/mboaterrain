
import { Button } from "@/components/ui/button";
import { MapPin, Loader2, RefreshCw } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface NearbyPropertiesControlsProps {
  onFindNearby: () => void;
  onReset: () => void;
  loading: boolean;
  hasLocation: boolean;
  permissionDenied: boolean;
  nearbyActive: boolean;
}

export function NearbyPropertiesControls({
  onFindNearby,
  onReset,
  loading,
  hasLocation,
  permissionDenied,
  nearbyActive
}: NearbyPropertiesControlsProps) {
  return (
    <div className="space-y-3">
      {permissionDenied && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>
            Vous avez refusé l'accès à votre position. La recherche de biens à proximité n'est pas disponible.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={onFindNearby}
          disabled={loading || !hasLocation || permissionDenied}
          className="bg-cmr-green hover:bg-cmr-green/90"
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <MapPin className="mr-2 h-4 w-4" />
          )}
          Trouver les annonces proches
        </Button>
        
        {nearbyActive && (
          <Button
            onClick={onReset}
            variant="outline"
            disabled={loading}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Réinitialiser la recherche
          </Button>
        )}
      </div>
    </div>
  );
}
