
import { useState, useEffect } from "react";

export function useBackgroundImage(imageUrl: string) {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Précharger l'image pour vérifier si elle existe
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      console.log("Image chargée avec succès:", imageUrl);
      setImageLoaded(true);
    };
    img.onerror = (e) => {
      console.error("Erreur de chargement de l'image:", e);
      console.log(`L'image ${imageUrl} n'a pas été trouvée dans le dossier public`);
      
      // Essayer avec d'autres extensions au cas où
      const extensions = ['.jpg', '.jpeg', '.svg', '.webp'];
      let extensionIndex = 0;
      
      const tryNextExtension = () => {
        if (extensionIndex >= extensions.length) {
          console.log("Toutes les extensions ont été essayées sans succès");
          setImageLoaded(false);
          return;
        }
        
        const baseImageName = '/lion'; // Utiliser "lion" en minuscule
        const nextExtension = extensions[extensionIndex];
        const imgWithExt = new Image();
        imgWithExt.src = baseImageName + nextExtension;
        
        console.log(`Essai avec l'extension ${nextExtension}:`, imgWithExt.src);
        
        imgWithExt.onload = () => {
          console.log(`Image chargée avec succès avec l'extension ${nextExtension}`);
          setImageLoaded(true);
        };
        
        imgWithExt.onerror = () => {
          console.log(`Échec avec l'extension ${nextExtension}`);
          extensionIndex++;
          tryNextExtension();
        };
      };
      
      tryNextExtension();
    };
  }, [imageUrl]);

  return { imageLoaded };
}
