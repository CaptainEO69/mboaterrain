
import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { useNavigate } from 'react-router-dom';
import { PropertyWithLocation } from '@/hooks/usePropertiesWithLocation';

interface MapMarkersProps {
  map: mapboxgl.Map | null;
  properties: PropertyWithLocation[];
  userLocation?: { latitude: number | null; longitude: number | null };
  mapReady: boolean;
}

export function MapMarkers({ map, properties, userLocation, mapReady }: MapMarkersProps) {
  const markers = useRef<mapboxgl.Marker[]>([]);
  const navigate = useNavigate();

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
        .addTo(map);

      markers.current.push(marker);

      // Ajouter les coordonnées aux limites pour le zoom
      bounds.extend([property.longitude, property.latitude]);
    });

    // Ajouter l'emplacement de l'utilisateur aux limites si disponible
    if (userLocation?.latitude && userLocation?.longitude) {
      // Ajouter un marqueur pour la position de l'utilisateur
      new mapboxgl.Marker({ color: "#4668F2" })
        .setLngLat([userLocation.longitude, userLocation.latitude])
        .addTo(map)
        .setPopup(new mapboxgl.Popup().setHTML("<strong>Votre position</strong>"));
        
      bounds.extend([userLocation.longitude, userLocation.latitude]);
    }

    // Ajuster la vue pour montrer tous les marqueurs
    if (markers.current.length > 0) {
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

  return null;
}
