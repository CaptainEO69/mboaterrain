
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./mapbox-css.css";
import { MapMarkers } from "./MapMarkers";
import { MapControls } from "./MapControls";
import { MapPlaceholder } from "./MapPlaceholder";
import { MAPBOX_TOKEN, DEFAULT_CENTER, initializeMap } from "./utils/mapUtils";

export function PropertyMap({ 
  properties, 
  userLocation, 
  className = "", 
  mapHeight = "400px" 
}) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [mapReady, setMapReady] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  // Initialiser la carte
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Déterminer le centre initial de la carte
    let center: [number, number];
    if (userLocation?.latitude && userLocation?.longitude) {
      // On s'assure que center est un tuple de deux nombres
      center = [userLocation.longitude, userLocation.latitude] as [number, number];
    } else {
      center = DEFAULT_CENTER;
    }
    
    // Créer la carte
    map.current = initializeMap(mapContainer.current, center);

    // Marquer que la carte est prête
    map.current.on("load", () => {
      setMapReady(true);
    });

    // Nettoyage
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Gérer l'affichage en plein écran
  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
    // Redimensionner la carte après le changement d'affichage
    setTimeout(() => {
      if (map.current) {
        map.current.resize();
      }
    }, 100);
  };

  return (
    <div 
      className={`relative ${className} ${fullscreen ? 'fixed inset-0 z-50 bg-white' : ''}`}
      style={{ height: fullscreen ? '100vh' : mapHeight }}
    >
      <div ref={mapContainer} className="w-full h-full rounded-lg overflow-hidden" />
      
      {!MAPBOX_TOKEN.includes("exampletoken") ? null : <MapPlaceholder />}
      
      <MapControls 
        fullscreen={fullscreen} 
        toggleFullscreen={toggleFullscreen} 
      />
      
      <MapMarkers
        map={map.current}
        properties={properties}
        userLocation={userLocation}
        mapReady={mapReady}
      />
    </div>
  );
}
