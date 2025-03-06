
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
        
        img.onerror = (e) => {
          console.log(`❌ Échec du chargement de l'image: ${src}`, e);
          resolve(false);
        };
        
        // Ajouter un timestamp pour éviter la mise en cache du navigateur
        img.src = `${src}?t=${new Date().getTime()}`;
      });
    };

    const loadImage = async () => {
      console.log(`🔍 Tentative de chargement de l'image: ${imagePath}`);
      
      try {
        // Vérifier que le chemin n'est pas vide
        if (!imagePath) {
          throw new Error("Chemin d'image vide");
        }
        
        const exists = await checkImage(imagePath);
        if (exists) {
          console.log(`✅ Image chargée avec succès: ${imagePath}`);
          setImageSrc(imagePath);
          setImageLoaded(true);
          setError(null);
          return;
        }
        
        // Si l'image n'est pas trouvée, afficher un message d'erreur
        throw new Error(`Image '${imagePath}' non trouvée`);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Erreur inconnue";
        console.error(`❌ Erreur lors du chargement de l'image: ${errorMessage}`);
        setError(`Image '${imagePath}' non trouvée`);
        setImageLoaded(false);
      }
    };

    loadImage();
  }, [imagePath]);

  return { imageLoaded, imageSrc, error };
}
