
export function MapPlaceholder() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100/90 p-4 text-center">
      <p className="text-sm text-gray-600 mb-2">
        Veuillez configurer votre token Mapbox pour utiliser la carte.
      </p>
      <p className="text-xs text-gray-500">
        Remplacez "exampletoken" dans le fichier utils/mapUtils.ts par votre token Mapbox.
      </p>
    </div>
  );
}
