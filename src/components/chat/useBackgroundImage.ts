
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

    const loadImage = async () => {
      try {
        const img = new Image();
        
        const imageLoadPromise = new Promise<void>((resolve, reject) => {
          img.onload = () => {
            resolve();
          };
          
          img.onerror = () => {
            reject(new Error(`Échec du chargement de l'image: ${imagePath}`));
          };
        });
        
        img.src = imagePath;
        
        await imageLoadPromise;
        
        setImageSrc(img.src);
        setImageLoaded(true);
        setError(null);
        
      } catch (err) {
        setError("Erreur lors du chargement de l'image");
        setImageLoaded(false);
      }
    };

    loadImage();
    
    return () => {
      setImageLoaded(false);
      setImageSrc("");
      setError(null);
    };
  }, [imagePath]);

  return { imageLoaded, imageSrc, error };
}
