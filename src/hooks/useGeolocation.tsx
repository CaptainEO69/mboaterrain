
import { useState, useCallback, useRef, useEffect } from "react";

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
  const timeoutRef = useRef<number | null>(null);
  const watchIdRef = useRef<number | null>(null);

  // Cleanup function
  const cleanupGeolocation = useCallback(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  }, []);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      cleanupGeolocation();
    };
  }, [cleanupGeolocation]);

  const getPosition = useCallback(() => {
    // Clean up any existing geolocation requests
    cleanupGeolocation();

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

    // Set timeout for geolocation request
    timeoutRef.current = window.setTimeout(() => {
      setState({
        ...initialState,
        error: "La demande de géolocalisation a expiré. Veuillez réessayer.",
      });
      
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    }, 15000); // 15 seconds timeout

    try {
      // Try to get high accuracy position first
      watchIdRef.current = navigator.geolocation.watchPosition(
        // Success
        (position) => {
          cleanupGeolocation();
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
          cleanupGeolocation();
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
          maximumAge: 0,
          timeout: 10000 
        }
      );
    } catch (e) {
      console.error("Exception during geolocation request:", e);
      setState({
        ...initialState,
        error: "Une erreur s'est produite lors de la demande de localisation"
      });
    }
  }, [cleanupGeolocation]);

  // Reset state
  const resetGeolocation = useCallback(() => {
    cleanupGeolocation();
    setState(initialState);
  }, [cleanupGeolocation]);

  return { ...state, getPosition, resetGeolocation };
}
