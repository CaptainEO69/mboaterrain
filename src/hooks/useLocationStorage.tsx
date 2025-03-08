
import { useState, useEffect } from "react";

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

  // Cette fonction est maintenue pour compatibilité avec le code existant
  // mais ne permet plus d'accéder à la géolocalisation
  const saveLocation = () => {
    console.log("La géolocalisation a été désactivée");
  };

  // Effacer les coordonnées du localStorage
  const clearLocation = () => {
    setLocation({ latitude: null, longitude: null });
    localStorage.removeItem('userLatitude');
    localStorage.removeItem('userLongitude');
    console.log("Coordonnées effacées du localStorage");
  };

  return {
    location,
    saveLocation,
    clearLocation,
    hasLocation: location.latitude !== null && location.longitude !== null
  };
}
