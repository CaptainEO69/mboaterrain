
import { useState, useEffect } from "react";

export function useBackgroundImage(imagePath: string) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Si aucun chemin d'image n'est fourni, ne rien faire
    if (!imagePath) {
      setImageLoaded(false);
      setImageSrc("");
      setError(null);
      return;
    }

    // Précharger l'image avant de la définir comme chargée
    const img = new Image();
    
    img.onload = () => {
      setImageSrc(img.src);
      setImageLoaded(true);
      setError(null);
      console.log("Image de fond chargée avec succès:", img.src);
    };
    
    img.onerror = (err) => {
      setError("Erreur lors du chargement de l'image");
      setImageLoaded(false);
      console.error("Erreur lors du chargement de l'image de fond:", err);
      console.log("Chemin de l'image tentée:", img.src);
    };
    
    // Important: définir src après avoir défini les gestionnaires d'événements
    img.src = imagePath;
    
    return () => {
      // Nettoyage lors du démontage du composant
      setImageLoaded(false);
      setImageSrc("");
      setError(null);
    };
  }, [imagePath]);

  return { imageLoaded, imageSrc, error };
}
