
import { useState, useEffect } from "react";
import { toast } from "sonner";

export interface GeolocationState {
  coordinates: {
    latitude: number | null;
    longitude: number | null;
  };
  accuracy: number | null;
  loading: boolean;
  error: string | null;
  timestamp: number | null;
  permissionDenied: boolean;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    coordinates: { latitude: null, longitude: null },
    accuracy: null,
    loading: true,
    error: null,
    timestamp: null,
    permissionDenied: false
  });

  // Vérifier si des coordonnées sont stockées dans localStorage
  useEffect(() => {
    const storedLatitude = localStorage.getItem('userLatitude');
    const storedLongitude = localStorage.getItem('userLongitude');
    
    if (storedLatitude && storedLongitude) {
      setState(prev => ({
        ...prev,
        coordinates: {
          latitude: parseFloat(storedLatitude),
          longitude: parseFloat(storedLongitude)
        },
        loading: false
      }));
      console.log("Coordonnées chargées depuis localStorage:", {
        latitude: parseFloat(storedLatitude),
        longitude: parseFloat(storedLongitude)
      });
    } else {
      // Si pas de coordonnées stockées, on demande la géolocalisation
      requestGeolocation();
    }
  }, []);

  const requestGeolocation = () => {
    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: "La géolocalisation n'est pas supportée par votre navigateur",
        permissionDenied: true
      }));
      return;
    }

    setState(prev => ({ ...prev, loading: true }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        // Stocker les coordonnées dans localStorage
        localStorage.setItem('userLatitude', latitude.toString());
        localStorage.setItem('userLongitude', longitude.toString());
        
        setState({
          coordinates: { latitude, longitude },
          accuracy: position.coords.accuracy,
          loading: false,
          error: null,
          timestamp: position.timestamp,
          permissionDenied: false
        });
        
        console.log("Position obtenue:", { latitude, longitude });
      },
      (error) => {
        console.error("Erreur de géolocalisation:", error);
        let errorMessage = "Une erreur est survenue lors de la géolocalisation";
        let denied = false;

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Vous avez refusé l'accès à votre position";
            denied = true;
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Les informations de localisation ne sont pas disponibles";
            break;
          case error.TIMEOUT:
            errorMessage = "La demande de géolocalisation a expiré";
            break;
        }

        setState({
          coordinates: { latitude: null, longitude: null },
          accuracy: null,
          loading: false,
          error: errorMessage,
          timestamp: null,
          permissionDenied: denied
        });

        toast.error(errorMessage);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 }
    );
  };

  // Calculer la distance entre deux points en km (formule de Haversine)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Rayon de la Terre en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c; // Distance en km
    return Math.round(distance * 10) / 10; // Arrondi à 1 décimale
  };

  // Formater la distance pour l'affichage
  const formatDistance = (distance: number): string => {
    if (distance < 1) {
      // Si moins d'1 km, afficher en mètres
      return `${Math.round(distance * 1000)} m de vous`;
    }
    return `${distance} km de vous`;
  };

  return { 
    ...state, 
    requestGeolocation,
    calculateDistance,
    formatDistance,
    hasLocation: state.coordinates.latitude !== null && state.coordinates.longitude !== null
  };
}
