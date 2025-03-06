
import { useState, useEffect } from "react";

export function useBackgroundImage(imagePath: string) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadImage = async () => {
      // Réinitialiser l'état à chaque changement de chemin d'image
      setImageLoaded(false);
      setImageSrc("");
      setError(null);
      
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
        // Ajout d'un paramètre aléatoire pour forcer le contournement du cache
        const timestamp = Date.now();
        const cacheBuster = `?v=${timestamp}`;
        
        // S'assurer que l'URL est correctement formée selon qu'elle est absolue ou relative
        const fullImagePath = imagePath.startsWith('http') 
          ? `${imagePath}${imagePath.includes('?') ? '&' : '?'}nocache=${timestamp}`
          : `${imagePath}${cacheBuster}`;
          
        img.src = fullImagePath;
        
        // Attendre que l'image soit chargée
        await imageLoadPromise;
        
        // Si on arrive ici, l'image est chargée avec succès
        setImageSrc(img.src);
        setImageLoaded(true);
        setError(null);
        
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Erreur inconnue";
        console.error(`❌ Erreur lors du chargement de l'image: ${errorMessage}`);
        setError(`Erreur: ${errorMessage}`);
        setImageLoaded(false);
        setImageSrc("");
      }
    };

    // Lancer le chargement immédiatement
    loadImage();
    
    // Nettoyage au démontage du composant
    return () => {
      setImageLoaded(false);
      setImageSrc("");
      setError(null);
    };
  }, [imagePath]);

  return { imageLoaded, imageSrc, error };
}
