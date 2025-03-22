
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-css.css";
import { PropertyWithLocation } from "@/hooks/usePropertiesWithLocation";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

// Remplacer par votre token Mapbox
const MAPBOX_TOKEN = "pk.eyJ1IjoiZXhhbXBsZXRva2VuIiwiYSI6ImNrdGg4ZjBwMzE3ZWQyd3BlYjA4c3lpYmUifQ.Kz0sP9xKpEZ2MIYcxFsZ9Q";

interface PropertyMapProps {
  properties: PropertyWithLocation[];
  userLocation?: { latitude: number | null; longitude: number | null };
  className?: string;
  mapHeight?: string;
}

export function PropertyMap({ 
  properties, 
  userLocation, 
  className = "", 
  mapHeight = "400px" 
}: PropertyMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [mapReady, setMapReady] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const navigate = useNavigate();

  // Configuration de Mapbox
  mapboxgl.accessToken = MAPBOX_TOKEN;

  // Initialiser la carte
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Coordonnées par défaut (centre du Cameroun si pas de localisation utilisateur)
    const defaultCenter = [11.5021, 3.8480]; // Yaoundé
    
    // Créer la carte
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: userLocation?.latitude && userLocation?.longitude 
        ? [userLocation.longitude, userLocation.latitude] 
        : defaultCenter,
      zoom: 12
    });

    // Ajouter les contrôles de navigation
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

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

  // Mettre à jour la position de l'utilisateur sur la carte
  useEffect(() => {
    if (!mapReady || !map.current || !userLocation?.latitude || !userLocation?.longitude) return;
    
    // Ajouter un marqueur pour la position de l'utilisateur
    new mapboxgl.Marker({ color: "#4668F2" })
      .setLngLat([userLocation.longitude, userLocation.latitude])
      .addTo(map.current)
      .setPopup(new mapboxgl.Popup().setHTML("<strong>Votre position</strong>"));
      
  }, [mapReady, userLocation]);

  // Ajouter les marqueurs des propriétés
  useEffect(() => {
    if (!mapReady || !map.current) return;

    // Supprimer les marqueurs existants
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Si aucune propriété, centrer sur l'utilisateur
    if (properties.length === 0) {
      if (userLocation?.latitude && userLocation?.longitude) {
        map.current.flyTo({
          center: [userLocation.longitude, userLocation.latitude],
          zoom: 12
        });
      }
      return;
    }

    // Coordonnées pour le zoom
    const bounds = new mapboxgl.LngLatBounds();

    // Ajouter de nouveaux marqueurs
    properties.forEach(property => {
      if (!property.latitude || !property.longitude) return;

      const popupContent = `
        <div style="max-width: 200px;">
          <h3 style="font-weight: bold; margin-bottom: 5px;">${property.title}</h3>
          <p>${property.price.toLocaleString()} FCFA</p>
          <p>${property.neighborhood}, ${property.city}</p>
          ${property.distance ? `<p><strong>À ${property.distance} km de vous</strong></p>` : ''}
          <button 
            id="view-property-${property.id}" 
            style="background-color: #10B981; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; margin-top: 5px;">
            Voir les détails
          </button>
        </div>
      `;

      // Créer le popup
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(popupContent);

      // Ajouter le marqueur
      const marker = new mapboxgl.Marker({ color: "#ef4444" })
        .setLngLat([property.longitude, property.latitude])
        .setPopup(popup)
        .addTo(map.current!);

      markers.current.push(marker);

      // Ajouter les coordonnées aux limites pour le zoom
      bounds.extend([property.longitude, property.latitude]);
    });

    // Ajouter l'emplacement de l'utilisateur aux limites si disponible
    if (userLocation?.latitude && userLocation?.longitude) {
      bounds.extend([userLocation.longitude, userLocation.latitude]);
    }

    // Ajuster la vue pour montrer tous les marqueurs
    if (markers.current.length > 0) {
      map.current.fitBounds(bounds, {
        padding: { top: 50, bottom: 50, left: 50, right: 50 },
        maxZoom: 15
      });
    }

    // Ajouter des gestionnaires d'événements pour les boutons de détail
    properties.forEach(property => {
      const button = document.getElementById(`view-property-${property.id}`);
      if (button) {
        button.addEventListener('click', () => {
          navigate(`/property/${property.id}`);
        });
      }
    });
  }, [properties, mapReady]);

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
      
      {!MAPBOX_TOKEN.includes("exampletoken") ? null : (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100/90 p-4 text-center">
          <p className="text-sm text-gray-600 mb-2">
            Veuillez configurer votre token Mapbox pour utiliser la carte.
          </p>
          <p className="text-xs text-gray-500">
            Remplacez "exampletoken" dans le fichier PropertyMap.tsx par votre token Mapbox.
          </p>
        </div>
      )}
      
      {fullscreen && (
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute top-4 right-4 z-10 bg-white"
          onClick={toggleFullscreen}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
      
      {!fullscreen && (
        <Button 
          variant="outline" 
          size="sm"
          className="absolute bottom-4 right-4 z-10 bg-white"
          onClick={toggleFullscreen}
        >
          Agrandir la carte
        </Button>
      )}
    </div>
  );
}
