
import mapboxgl from "mapbox-gl";

// Remplacer par votre token Mapbox
export const MAPBOX_TOKEN = "pk.eyJ1IjoiZXhhbXBsZXRva2VuIiwiYSI6ImNrdGg4ZjBwMzE3ZWQyd3BlYjA4c3lpYmUifQ.Kz0sP9xKpEZ2MIYcxFsZ9Q";

// Coordonnées par défaut (centre du Cameroun si pas de localisation utilisateur)
export const DEFAULT_CENTER = [11.5021, 3.8480]; // Yaoundé

// Initialiser la carte Mapbox
export const initializeMap = (
  container: HTMLDivElement,
  center: [number, number],
  zoom: number = 12
): mapboxgl.Map => {
  // Configuration de Mapbox
  mapboxgl.accessToken = MAPBOX_TOKEN;
  
  // Créer la carte
  const map = new mapboxgl.Map({
    container,
    style: "mapbox://styles/mapbox/streets-v12",
    center,
    zoom
  });

  // Ajouter les contrôles de navigation
  map.addControl(new mapboxgl.NavigationControl(), "top-right");
  
  return map;
};

// Créer un popup pour une propriété
export const createPropertyPopup = (property: {
  id: string;
  title: string;
  price: number;
  neighborhood: string;
  city: string;
  distance?: number | null;
}): mapboxgl.Popup => {
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

  return new mapboxgl.Popup({ offset: 25 }).setHTML(popupContent);
};

// Créer des limites de carte pour ajuster la vue
export const createBoundsForProperties = (
  properties: Array<{ latitude: number | null; longitude: number | null }>,
  userLocation?: { latitude: number | null; longitude: number | null }
): mapboxgl.LngLatBounds | null => {
  // Si aucune propriété avec coordonnées, retourner null
  if (!properties.some(p => p.latitude && p.longitude)) {
    return null;
  }

  const bounds = new mapboxgl.LngLatBounds();
  
  // Ajouter chaque propriété aux limites
  properties.forEach(property => {
    if (property.latitude && property.longitude) {
      bounds.extend([property.longitude, property.latitude]);
    }
  });

  // Ajouter l'emplacement de l'utilisateur si disponible
  if (userLocation?.latitude && userLocation?.longitude) {
    bounds.extend([userLocation.longitude, userLocation.latitude]);
  }

  return bounds.isEmpty() ? null : bounds;
};
