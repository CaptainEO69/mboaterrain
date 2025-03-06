
import { useState, useEffect, useCallback } from "react";

interface LocationStorage {
  latitude: number | null;
  longitude: number | null;
}

export function useLocationStorage() {
  // État local pour stocker les coordonnées
  const [location, setLocation] = useState<LocationStorage>({
    latitude: null,
    longitude: null
  });

  // Charger les coordonnées depuis localStorage au montage du composant
  useEffect(() => {
    const storedLatitude = localStorage.getItem('userLatitude');
    const storedLongitude = localStorage.getItem('userLongitude');
    
    if (storedLatitude && storedLongitude) {
      setLocation({
        latitude: parseFloat(storedLatitude),
        longitude: parseFloat(storedLongitude)
      });
      console.log("Coordonnées chargées depuis localStorage:", {
        latitude: parseFloat(storedLatitude),
        longitude: parseFloat(storedLongitude)
      });
    }
  }, []);

  // Sauvegarder les coordonnées dans localStorage
  const saveLocation = useCallback((latitude: number, longitude: number) => {
    // Mettre à jour le state
    setLocation({ latitude, longitude });
    
    // Sauvegarder dans localStorage
    localStorage.setItem('userLatitude', latitude.toString());
    localStorage.setItem('userLongitude', longitude.toString());
    
    console.log("Coordonnées sauvegardées dans localStorage:", { latitude, longitude });
  }, []);

  // Effacer les coordonnées du localStorage
  const clearLocation = useCallback(() => {
    setLocation({ latitude: null, longitude: null });
    localStorage.removeItem('userLatitude');
    localStorage.removeItem('userLongitude');
    console.log("Coordonnées effacées du localStorage");
  }, []);

  return {
    location,
    saveLocation,
    clearLocation,
    hasLocation: location.latitude !== null && location.longitude !== null
  };
}
