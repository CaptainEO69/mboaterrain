import { useState, useEffect } from "react";

interface LocationStorage {
  latitude: number | null;
  longitude: number | null;
}

export function useLocationStorage() {
  const [location, setLocation] = useState<LocationStorage>({
    latitude: null,
    longitude: null
  });

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

  const saveLocation = () => {
    console.log("La géolocalisation a été désactivée");
  };

  const clearLocation = () => {
    setLocation({ latitude: null, longitude: null });
    localStorage.removeItem('userLatitude');
    localStorage.removeItem('userLongitude');
    console.log("Coordonnées effacées du localStorage");
  };

  return {
    hasLocation: false,
    location: {},
    clearLocation: () => {
      console.log("Location functionality has been removed");
    },
    saveLocation: () => {
      console.log("Location functionality has been removed");
    }
  };
}
