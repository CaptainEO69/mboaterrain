
import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768;

export function useMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    
    // Vérification initiale
    checkIsMobile();
    
    // Ajouter un écouteur pour le redimensionnement de la fenêtre
    window.addEventListener("resize", checkIsMobile);
    
    // Nettoyer l'écouteur lors du démontage du composant
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return isMobile;
}
