
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
          
          img.onerror = () => {
            console.error(`❌ Échec du chargement de l'image: ${imagePath}`);
            reject(new Error("Image non trouvée"));
          };
        });
        
        // Définir le src après avoir défini les gestionnaires d'événements
        // Ajout d'un paramètre aléatoire pour forcer le contournement du cache
        const timestamp = Date.now();
        
        // S'assurer que l'URL est correctement formée selon qu'elle est absolue ou relative
        const fullImagePath = imagePath.startsWith('http') 
          ? `${imagePath}${imagePath.includes('?') ? '&' : '?'}v=${timestamp}`
          : `${imagePath}?v=${timestamp}`;
          
        img.src = fullImagePath;
        
        // Attendre que l'image soit chargée avec un timeout
        const timeoutPromise = new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error("Délai d'attente dépassé")), 5000);
        });
        
        await Promise.race([imageLoadPromise, timeoutPromise]);
        
        // Si on arrive ici, l'image est chargée avec succès
        setImageSrc(img.src);
        setImageLoaded(true);
        setError(null);
        
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Erreur inconnue";
        console.error(`❌ Erreur lors du chargement de l'image: ${errorMessage}`);
        setError(errorMessage);
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
