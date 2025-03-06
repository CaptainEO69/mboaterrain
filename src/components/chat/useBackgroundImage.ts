
import { useState, useEffect } from "react";

export function useBackgroundImage(imagePath: string) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    // Fonction pour vérifier si une image existe
    const checkImage = async (src: string): Promise<boolean> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = src;
      });
    };

    // Essayer avec différentes extensions
    const tryLoadImage = async () => {
      // Récupérer le chemin de base sans extension
      const basePath = imagePath.includes('.')
        ? imagePath.substring(0, imagePath.lastIndexOf('.'))
        : imagePath;
      
      // Extensions à essayer
      const extensions = ['.png', '.jpg', '.jpeg', '.webp', '.svg'];
      
      // Si le chemin original inclut déjà une extension, l'essayer en premier
      if (imagePath.includes('.')) {
        const exists = await checkImage(imagePath);
        if (exists) {
          setImageSrc(imagePath);
          setImageLoaded(true);
          return;
        }
      }
      
      // Sinon, essayer avec différentes extensions
      for (const ext of extensions) {
        const fullPath = `${basePath}${ext}`;
        const exists = await checkImage(fullPath);
        if (exists) {
          setImageSrc(fullPath);
          setImageLoaded(true);
          return;
        }
      }
      
      // Si aucune image n'est trouvée, définir imageLoaded à false
      console.log("Aucune image trouvée pour le chemin:", basePath);
      setImageLoaded(false);
    };

    tryLoadImage();
  }, [imagePath]);

  return { imageLoaded, imageSrc };
}
