
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
      
      // Récupérer le chemin de base sans extension
      const basePath = normalizedPath.includes('.')
        ? normalizedPath.substring(0, normalizedPath.lastIndexOf('.'))
        : normalizedPath;
      console.log(`📂 Chemin de base: ${basePath}`);
      
      // Extensions à essayer
      const extensions = ['.png', '.jpg', '.jpeg', '.webp', '.svg'];
      
      // Emplacements à essayer (racine et sous-dossiers communs)
      const locations = ['', '/images/', '/assets/', '/img/', '/lovable-uploads/'];
      
      // Si le chemin original inclut déjà une extension, l'essayer en premier
      if (normalizedPath.includes('.')) {
        console.log("🥇 Essai avec le chemin original:", normalizedPath);
        const exists = await checkImage(normalizedPath);
        if (exists) {
          console.log("✅ Image chargée avec succès:", normalizedPath);
          setImageSrc(normalizedPath);
          setImageLoaded(true);
          setError(null);
          return;
        }
      }
      
      // Essayer toutes les combinaisons d'emplacements et d'extensions
      let allAttemptsFailed = true;
      
      // D'abord essayer les extensions à la racine
      for (const ext of extensions) {
        const fullPath = `${basePath}${ext}`;
        console.log("🔄 Essai avec le chemin:", fullPath);
        const exists = await checkImage(fullPath);
        if (exists) {
          console.log("✅ Image chargée avec succès:", fullPath);
          setImageSrc(fullPath);
          setImageLoaded(true);
          setError(null);
          allAttemptsFailed = false;
          return;
        }
      }
      
      // Essayer dans les sous-dossiers
      for (const location of locations) {
        // Extraire juste le nom du fichier sans le chemin
        const fileName = basePath.split('/').pop();
        if (!fileName) continue;
        
        for (const ext of extensions) {
          const fullPath = `${location}${fileName}${ext}`;
          console.log("🔄 Essai dans le sous-dossier:", fullPath);
          const exists = await checkImage(fullPath);
          if (exists) {
            console.log("✅ Image chargée avec succès dans le sous-dossier:", fullPath);
            setImageSrc(fullPath);
            setImageLoaded(true);
            setError(null);
            allAttemptsFailed = false;
            return;
          }
        }
      }
      
      // Vérifier spécifiquement dans les chemins existants connus
      const knownPaths = [
        '/lovable-uploads/83fc2739-1a70-4b50-b7a3-127bda76b51d.png',
        '/lovable-uploads/b0d64b27-cdd5-43a9-b0dd-fba53da4a96d.png',
        '/lovable-uploads/ff74bfca-be9a-4f99-9ec1-a7e93bc5c72f.png'
      ];
      
      console.log("🔍 Vérification des chemins connus...");
      for (const path of knownPaths) {
        console.log("🔄 Essai avec le chemin connu:", path);
        const exists = await checkImage(path);
        if (exists) {
          console.log("✅ Image trouvée et chargée depuis un chemin connu:", path);
          setImageSrc(path);
          setImageLoaded(true);
          setError(`Image originale '${imagePath}' non trouvée, utilisation d'une image alternative`);
          allAttemptsFailed = false;
          return;
        }
      }
      
      // Si aucune image n'est trouvée, définir imageLoaded à false
      if (allAttemptsFailed) {
        const errorMsg = `❌ Aucune image trouvée pour '${imagePath}'. Vérifiez que l'image existe dans le dossier public ou utilisez un chemin valide.`;
        console.error(errorMsg);
        setError(errorMsg);
        setImageLoaded(false);
      }
    };

    tryLoadImage();
  }, [imagePath]);

  return { imageLoaded, imageSrc, error };
}
