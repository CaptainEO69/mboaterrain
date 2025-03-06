
import { useState, useCallback, useEffect } from "react";

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
    // Vérifier si la géolocalisation est supportée
    if (!navigator.geolocation) {
      setState({
        ...initialState,
        error: "La géolocalisation n'est pas supportée par votre navigateur"
      });
      return;
    }

    // Mettre à jour l'état pour indiquer que la géolocalisation est en cours
    setState({
      ...initialState,
      loading: true
    });

    try {
      navigator.geolocation.getCurrentPosition(
        // Succès
        (position) => {
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
        // Erreur
        (error) => {
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
          
          setState({
            ...initialState,
            error: errorMessage
          });
        },
        // Options
        { 
          enableHighAccuracy: true, 
          maximumAge: 0,
          timeout: 10000 
        }
      );
    } catch (e) {
      console.error("Exception lors de la demande de géolocalisation:", e);
      setState({
        ...initialState,
        error: "Une erreur s'est produite lors de la demande de localisation"
      });
    }
  }, []);

  // Réinitialiser l'état
  const resetGeolocation = useCallback(() => {
    setState(initialState);
  }, []);

  return { ...state, getPosition, resetGeolocation };
}
