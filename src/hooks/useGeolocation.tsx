
import { useState, useCallback } from "react";

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  error: string | null;
  loading: boolean;
  success: boolean;
}

const initialState: GeolocationState = {
  latitude: null,
  longitude: null,
  accuracy: null,
  error: null,
  loading: false,
  success: false
};

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>(initialState);

  const getPosition = useCallback(() => {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      setState({
        ...initialState,
        error: "La géolocalisation n'est pas supportée par votre navigateur",
      });
      return;
    }

    // Update state to indicate geolocation is in progress
    setState({
      ...initialState,
      loading: true
    });

    // Request current position with a timeout
    const geolocationTimeout = setTimeout(() => {
      setState({
        ...initialState,
        error: "La demande de géolocalisation a pris trop de temps. Veuillez réessayer.",
      });
    }, 15000); // 15 seconds timeout

    navigator.geolocation.getCurrentPosition(
      // Success
      (position) => {
        clearTimeout(geolocationTimeout);
        console.log("Geolocation successful:", position.coords);
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          error: null,
          loading: false,
          success: true
        });
      },
      // Error
      (error) => {
        clearTimeout(geolocationTimeout);
        console.error("Geolocation error:", error);
        let errorMessage = "Erreur de géolocalisation inconnue";
        
        // Translate common error messages
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
        
        setState({
          ...initialState,
          error: errorMessage
        });
      },
      // Options
      { 
        enableHighAccuracy: true, 
        timeout: 10000, 
        maximumAge: 0 
      }
    );
  }, []);

  // Reset state
  const resetGeolocation = useCallback(() => {
    setState(initialState);
  }, []);

  return { ...state, getPosition, resetGeolocation };
}
