
import { useState, useEffect } from "react";
import { useGeolocation } from "./useGeolocation";

interface LocationStorage {
  latitude: number | null;
  longitude: number | null;
}

export function useLocationStorage() {
  const { 
    coordinates, 
    requestGeolocation, 
    hasLocation,
    permissionDenied,
    error
  } = useGeolocation();

  const clearLocation = () => {
    localStorage.removeItem('userLatitude');
    localStorage.removeItem('userLongitude');
    console.log("Coordonnées effacées du localStorage");
  };

  return {
    hasLocation,
    permissionDenied,
    locationError: error,
    location: coordinates,
    clearLocation,
    saveLocation: requestGeolocation
  };
}
