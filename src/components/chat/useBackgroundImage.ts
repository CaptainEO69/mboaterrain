
import { useState, useEffect } from "react";

export function useBackgroundImage(imagePath: string) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadImage = async () => {
      console.log(`🔍 Tentative de chargement de l'image: ${imagePath}`);
      
      try {
        // Vérifier que le chemin n'est pas vide
        if (!imagePath) {
          throw new Error("Chemin d'image vide");
        }
        
        // Créer un nouvel objet Image et le précharger
        const img = new Image();
        
        // Promesse pour gérer le chargement de l'image
        const imageLoadPromise = new Promise<void>((resolve, reject) => {
          img.onload = () => {
            console.log(`✅ Image chargée avec succès: ${imagePath}`);
            resolve();
          };
          
          img.onerror = (e) => {
            console.error(`❌ Échec du chargement de l'image: ${imagePath}`, e);
            reject(new Error(`Image '${imagePath}' non trouvée`));
          };
        });
        
        // Définir le src après avoir défini les gestionnaires d'événements
        // Ajout d'un paramètre aléatoire pour contourner le cache du navigateur
        const cacheBuster = `?nocache=${Date.now()}`;
        const fullPath = imagePath.startsWith('http') ? imagePath : `${imagePath}${cacheBuster}`;
        img.src = fullPath;
        
        // Attendre que l'image soit chargée
        await imageLoadPromise;
        
        // Si on arrive ici, l'image est chargée avec succès
        setImageSrc(img.src);
        setImageLoaded(true);
        setError(null);
        
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Erreur inconnue";
        console.error(`❌ Erreur lors du chargement de l'image: ${errorMessage}`);
        setError(`Image '${imagePath}' non trouvée`);
        setImageLoaded(false);
        setImageSrc("");
      }
    };

    loadImage();
  }, [imagePath]);

  return { imageLoaded, imageSrc, error };
}
