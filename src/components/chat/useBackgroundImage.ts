
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
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = src;
      });
    };

    // Essayer avec différentes extensions et emplacements
    const tryLoadImage = async () => {
      // S'assurer que le chemin commence par "/"
      const normalizedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
      
      // Récupérer le chemin de base sans extension
      const basePath = normalizedPath.includes('.')
        ? normalizedPath.substring(0, normalizedPath.lastIndexOf('.'))
        : normalizedPath;
      
      // Extensions à essayer
      const extensions = ['.png', '.jpg', '.jpeg', '.webp', '.svg'];
      
      // Emplacements à essayer (racine et sous-dossiers communs)
      const locations = ['', '/images/', '/assets/', '/img/'];
      
      // Si le chemin original inclut déjà une extension, l'essayer en premier
      if (normalizedPath.includes('.')) {
        console.log("Trying with original path:", normalizedPath);
        const exists = await checkImage(normalizedPath);
        if (exists) {
          console.log("✅ Image loaded successfully:", normalizedPath);
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
        console.log("Trying path:", fullPath);
        const exists = await checkImage(fullPath);
        if (exists) {
          console.log("✅ Image loaded successfully:", fullPath);
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
          console.log("Trying path in subfolder:", fullPath);
          const exists = await checkImage(fullPath);
          if (exists) {
            console.log("✅ Image loaded successfully in subfolder:", fullPath);
            setImageSrc(fullPath);
            setImageLoaded(true);
            setError(null);
            allAttemptsFailed = false;
            return;
          }
        }
      }
      
      // Essayer une image de secours de placeholder depuis Unsplash
      const placeholderImage = 'https://images.unsplash.com/photo-1582562124811-c09040d0a901';
      console.log("Trying placeholder image:", placeholderImage);
      const placeholderExists = await checkImage(placeholderImage);
      
      if (placeholderExists) {
        console.log("✅ Using placeholder image as fallback");
        setImageSrc(placeholderImage);
        setImageLoaded(true);
        setError("Image d'origine non trouvée, utilisation d'une image de secours");
        allAttemptsFailed = false;
        return;
      }
      
      // Si aucune image n'est trouvée, définir imageLoaded à false
      if (allAttemptsFailed) {
        const errorMsg = `Aucune image trouvée pour le chemin: ${basePath}. Vérifiez que l'image existe dans le dossier public.`;
        console.error(errorMsg);
        console.log("Chemins essayés:", [
          normalizedPath.includes('.') ? normalizedPath : null,
          ...extensions.map(ext => `${basePath}${ext}`),
          ...locations.flatMap(loc => 
            extensions.map(ext => `${loc}${basePath.split('/').pop()}${ext}`)
          )
        ].filter(Boolean));
        setError(errorMsg);
        setImageLoaded(false);
      }
    };

    tryLoadImage();
  }, [imagePath]);

  return { imageLoaded, imageSrc, error };
}
