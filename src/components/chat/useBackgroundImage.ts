
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
      
      // Essayons plusieurs chemins possibles pour l'image
      const possiblePaths = [
        imagePath,
        `/${imagePath}`,
        `/public/${imagePath}`,
        `./public/${imagePath}`,
        `./src/assets/${imagePath}`
      ];
      
      console.log(`🔍 Tentative de chargement de l'image avec plusieurs chemins pour: ${imagePath}`);
      
      // Ignorons explicitement les chemins problématiques
      if (imagePath.includes('83fc2739-1a70-4b50-b7a3-127bda76b51d')) {
        setError("Image spécifique ignorée intentionnellement");
        return;
      }
      
      let loaded = false;
      
      // Essayons tous les chemins possibles
      for (const path of possiblePaths) {
        if (loaded) break;
        
        try {
          // Créer un nouvel objet Image et le précharger
          const img = new Image();
          
          // Promesse pour gérer le chargement de l'image
          const imageLoadPromise = new Promise<void>((resolve, reject) => {
            img.onload = () => {
              console.log(`✅ Image chargée avec succès avec le chemin: ${path}`);
              loaded = true;
              resolve();
            };
            
            img.onerror = () => {
              console.log(`❌ Échec du chargement de l'image avec le chemin: ${path}`);
              reject(new Error(`Échec avec le chemin: ${path}`));
            };
          });
          
          // Définir le src après avoir défini les gestionnaires d'événements
          // Ajout d'un paramètre aléatoire pour forcer le contournement du cache
          const timestamp = Date.now();
          const fullImagePath = `${path}?v=${timestamp}`;
          img.src = fullImagePath;
          
          // Attendre que l'image soit chargée avec un timeout de 2 secondes
          const timeoutPromise = new Promise<never>((_, reject) => {
            setTimeout(() => reject(new Error("Délai d'attente dépassé")), 2000);
          });
          
          await Promise.race([imageLoadPromise, timeoutPromise]);
          
          // Si on arrive ici, l'image est chargée avec succès
          setImageSrc(img.src);
          setImageLoaded(true);
          setError(null);
          return; // Sortir de la fonction si l'image est chargée
          
        } catch (err) {
          // Continuons avec le chemin suivant si celui-ci a échoué
          console.log(`Échec pour le chemin ${path}, essayons le suivant...`);
        }
      }
      
      // Si on arrive ici, aucun des chemins n'a fonctionné
      setError("Image non trouvée après avoir essayé plusieurs chemins");
      console.error("❌ Erreur lors du chargement de l'image: tous les chemins ont échoué");
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
