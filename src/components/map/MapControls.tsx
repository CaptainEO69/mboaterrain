
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface MapControlsProps {
  fullscreen: boolean;
  toggleFullscreen: () => void;
}

export function MapControls({ fullscreen, toggleFullscreen }: MapControlsProps) {
  return (
    <>
      {fullscreen ? (
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute top-4 right-4 z-10 bg-white"
          onClick={toggleFullscreen}
        >
          <X className="h-4 w-4" />
        </Button>
      ) : (
        <Button 
          variant="outline" 
          size="sm"
          className="absolute bottom-4 right-4 z-10 bg-white"
          onClick={toggleFullscreen}
        >
          Agrandir la carte
        </Button>
      )}
    </>
  );
}
