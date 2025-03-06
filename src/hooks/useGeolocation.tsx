
import { useState, useEffect } from "react";

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  error: string | null;
  loading: boolean;
  success: boolean;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    accuracy: null,
    error: null,
    loading: false,
    success: false
  });

  const getPosition = () => {
    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        error: "La géolocalisation n'est pas supportée par votre navigateur",
        loading: false,
        success: false
      }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null, success: false }));

    navigator.geolocation.getCurrentPosition(
      position => {
        console.log("Géolocalisation réussie:", position.coords);
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          error: null,
          loading: false,
          success: true
        });
      },
      error => {
        console.error("Erreur de géolocalisation:", error);
        let errorMessage = "Erreur de géolocalisation inconnue";
        
        // Traduire les messages d'erreur courants
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Vous avez refusé l'accès à la géolocalisation";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Les informations de localisation ne sont pas disponibles";
            break;
          case error.TIMEOUT:
            errorMessage = "La demande de localisation a expiré";
            break;
        }
        
        setState(prev => ({
          ...prev,
          error: errorMessage,
          loading: false,
          success: false
        }));
      },
      { 
        enableHighAccuracy: true, 
        timeout: 10000, 
        maximumAge: 0 
      }
    );
  };

  // Nettoyer le state lors du démontage du composant
  useEffect(() => {
    return () => {
      setState({
        latitude: null,
        longitude: null,
        accuracy: null,
        error: null,
        loading: false,
        success: false
      });
    };
  }, []);

  return { ...state, getPosition };
}
