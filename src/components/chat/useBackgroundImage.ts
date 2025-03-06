
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
        
        // IMPORTANT: Désactiver la mise en cache pour être sûr d'avoir l'image la plus récente
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
        
        // Forcer le chargement sans cache
        const exists = await checkImage(imagePath);
        if (exists) {
          console.log(`✅ Image chargée avec succès: ${imagePath}`);
          // Ajouter un paramètre aléatoire pour éviter le cache du navigateur
          setImageSrc(`${imagePath}?nocache=${Date.now()}`);
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
