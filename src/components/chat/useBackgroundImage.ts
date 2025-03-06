
import { useState, useEffect } from "react";

export function useBackgroundImage(imagePath: string) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fonction pour vérifier si une image existe
    const checkImage = (src: string): Promise<boolean> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          console.log(`✅ Image chargée avec succès: ${src}`);
          resolve(true);
        };
        img.onerror = () => {
          console.log(`❌ Échec du chargement de l'image: ${src}`);
          resolve(false);
        };
        img.src = src;
      });
    };

    const loadImage = async () => {
      console.log(`🔍 Tentative de chargement de l'image: ${imagePath}`);
      
      const exists = await checkImage(imagePath);
      if (exists) {
        console.log(`✅ Image chargée avec succès: ${imagePath}`);
        setImageSrc(imagePath);
        setImageLoaded(true);
        setError(null);
        return;
      }
      
      // Si l'image n'est pas trouvée, utiliser une image de secours
      setError(`Image '${imagePath}' non trouvée`);
      setImageLoaded(false);
    };

    loadImage();
  }, [imagePath]);

  return { imageLoaded, imageSrc, error };
}
