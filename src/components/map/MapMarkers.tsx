
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { useNavigate } from "react-router-dom";
import { PropertyWithLocation } from "@/hooks/usePropertiesWithLocation";
import { createPropertyPopup, createBoundsForProperties } from "./utils/mapUtils";

interface MapMarkersProps {
  map: mapboxgl.Map | null;
  properties: PropertyWithLocation[];
  userLocation?: { latitude: number | null; longitude: number | null };
  mapReady: boolean;
}

export function MapMarkers({ map, properties, userLocation, mapReady }: MapMarkersProps) {
  const navigate = useNavigate();
  const markers = useRef<mapboxgl.Marker[]>([]);

  // Ajouter le marqueur de l'utilisateur
  useEffect(() => {
    if (!mapReady || !map || !userLocation?.latitude || !userLocation?.longitude) return;
    
    // Ajouter un marqueur pour la position de l'utilisateur
    new mapboxgl.Marker({ color: "#4668F2" })
      .setLngLat([userLocation.longitude, userLocation.latitude])
      .addTo(map)
      .setPopup(new mapboxgl.Popup().setHTML("<strong>Votre position</strong>"));
      
  }, [mapReady, userLocation, map]);

  // Ajouter les marqueurs des propriétés
  useEffect(() => {
    if (!mapReady || !map) return;

    // Supprimer les marqueurs existants
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Si aucune propriété, centrer sur l'utilisateur
    if (properties.length === 0) {
      if (userLocation?.latitude && userLocation?.longitude) {
        map.flyTo({
          center: [userLocation.longitude, userLocation.latitude],
          zoom: 12
        });
      }
      return;
    }

    // Ajouter de nouveaux marqueurs
    properties.forEach(property => {
      if (!property.latitude || !property.longitude) return;

      // Créer le popup
      const popup = createPropertyPopup(property);

      // Ajouter le marqueur
      const marker = new mapboxgl.Marker({ color: "#ef4444" })
        .setLngLat([property.longitude, property.latitude])
        .setPopup(popup)
        .addTo(map);

      markers.current.push(marker);
    });

    // Ajuster la vue pour montrer tous les marqueurs
    const bounds = createBoundsForProperties(properties, userLocation);
    if (bounds) {
      map.fitBounds(bounds, {
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
  }, [properties, mapReady, map, userLocation, navigate]);

  return null; // Ce composant ne rend rien visuellement
}
