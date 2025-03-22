
import mapboxgl from 'mapbox-gl';

// Remplacer par votre token Mapbox
export const MAPBOX_TOKEN = "pk.eyJ1IjoiZXhhbXBsZXRva2VuIiwiYSI6ImNrdGg4ZjBwMzE3ZWQyd3BlYjA4c3lpYmUifQ.Kz0sP9xKpEZ2MIYcxFsZ9Q";

// Coordonnées par défaut (centre du Cameroun)
export const DEFAULT_CENTER = [11.5021, 3.8480]; // Yaoundé

// Configuration de Mapbox
mapboxgl.accessToken = MAPBOX_TOKEN;

// Initialiser la carte
export function initializeMap(container: HTMLElement, center: [number, number]) {
  const map = new mapboxgl.Map({
    container,
    style: "mapbox://styles/mapbox/streets-v12",
    center,
    zoom: 12
  });

  // Ajouter les contrôles de navigation
  map.addControl(new mapboxgl.NavigationControl(), "top-right");

  return map;
}
