
import { useState, useEffect } from "react";

export function useBackgroundImage(imagePath: string) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fonction pour vérifier si une image existe
    const checkImage = async (src: string): Promise<boolean> => {
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

    // Essayer avec différentes extensions et emplacements
    const tryLoadImage = async () => {
      console.log(`🔍 Tentative de chargement de l'image: ${imagePath}`);
      
      // S'assurer que le chemin commence par "/"
      const normalizedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
      console.log(`🔄 Chemin normalisé: ${normalizedPath}`);
      
      // Premier essai avec le chemin exact spécifié
      console.log(`🥇 Essai avec le chemin exact: ${normalizedPath}`);
      let exists = await checkImage(normalizedPath);
      if (exists) {
        console.log(`✅ Image chargée avec succès: ${normalizedPath}`);
        setImageSrc(normalizedPath);
        setImageLoaded(true);
        setError(null);
        return;
      }
      
      // Si l'image n'est pas trouvée, essayer avec l'image téléchargée par l'utilisateur
      const lieuImageUpload = '/lovable-uploads/eeb5c7e7-53ad-4681-9530-5c3db0a0c19d.png';
      console.log(`🔄 Essai avec l'image téléchargée: ${lieuImageUpload}`);
      exists = await checkImage(lieuImageUpload);
      if (exists) {
        console.log(`✅ Image trouvée et chargée depuis: ${lieuImageUpload}`);
        setImageSrc(lieuImageUpload);
        setImageLoaded(true);
        setError(null);
        return;
      }
      
      // Si aucune image n'est trouvée, utiliser une image de secours
      const fallbackImages = [
        '/lovable-uploads/83fc2739-1a70-4b50-b7a3-127bda76b51d.png',
        '/lovable-uploads/b0d64b27-cdd5-43a9-b0dd-fba53da4a96d.png',
        '/lovable-uploads/ff74bfca-be9a-4f99-9ec1-a7e93bc5c72f.png'
      ];
      
      for (const fallbackPath of fallbackImages) {
        console.log(`🔄 Essai avec l'image de secours: ${fallbackPath}`);
        exists = await checkImage(fallbackPath);
        if (exists) {
          console.log(`✅ Image de secours chargée: ${fallbackPath}`);
          setImageSrc(fallbackPath);
          setImageLoaded(true);
          setError(`Image '${imagePath}' non trouvée, utilisation d'une image de secours`);
          return;
        }
      }
      
      // Si aucune image n'est trouvée, définir imageLoaded à false
      const errorMsg = `❌ Aucune image trouvée pour '${imagePath}'. Vérifiez que l'image existe dans le dossier public.`;
      console.error(errorMsg);
      setError(errorMsg);
      setImageLoaded(false);
    };

    tryLoadImage();
  }, [imagePath]);

  return { imageLoaded, imageSrc, error };
}
