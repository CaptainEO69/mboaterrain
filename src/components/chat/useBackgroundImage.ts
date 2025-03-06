
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
      
      // Essayer les images existantes dans lovable-uploads
      console.log("🔍 Recherche d'images dans lovable-uploads...");
      const lovableImages = [
        '/lovable-uploads/83fc2739-1a70-4b50-b7a3-127bda76b51d.png',
        '/lovable-uploads/b0d64b27-cdd5-43a9-b0dd-fba53da4a96d.png',
        '/lovable-uploads/ff74bfca-be9a-4f99-9ec1-a7e93bc5c72f.png'
      ];
      
      for (const img of lovableImages) {
        console.log("🔄 Essai avec l'image uploadée:", img);
        const exists = await checkImage(img);
        if (exists) {
          console.log("✅ Image uploadée trouvée et chargée:", img);
          setImageSrc(img);
          setImageLoaded(true);
          setError("Image d'origine non trouvée, utilisation d'une image uploadée");
          allAttemptsFailed = false;
          return;
        }
      }
      
      // Essayer une image de secours de placeholder depuis Unsplash
      const placeholderImage = 'https://images.unsplash.com/photo-1582562124811-c09040d0a901';
      console.log("🔄 Essai avec l'image de secours Unsplash:", placeholderImage);
      const placeholderExists = await checkImage(placeholderImage);
      
      if (placeholderExists) {
        console.log("✅ Utilisation de l'image de secours");
        setImageSrc(placeholderImage);
        setImageLoaded(true);
        setError("Image d'origine non trouvée, utilisation d'une image de secours");
        allAttemptsFailed = false;
        return;
      }
      
      // Si aucune image n'est trouvée, définir imageLoaded à false
      if (allAttemptsFailed) {
        const errorMsg = `❌ Aucune image trouvée pour le chemin: ${basePath}. Vérifiez que l'image existe dans le dossier public.`;
        console.error(errorMsg);
        console.log("🔍 Chemins essayés:", [
          normalizedPath.includes('.') ? normalizedPath : null,
          ...extensions.map(ext => `${basePath}${ext}`),
          ...locations.flatMap(loc => 
            extensions.map(ext => `${loc}${basePath.split('/').pop()}${ext}`)
          ),
          ...lovableImages,
          placeholderImage
        ].filter(Boolean));
        setError(errorMsg);
        setImageLoaded(false);
      }
    };

    tryLoadImage();
  }, [imagePath]);

  return { imageLoaded, imageSrc, error };
}
