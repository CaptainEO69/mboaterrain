
import { useParams } from "react-router-dom";

export default function PropertyDetail() {
  const { id } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Détail de la propriété</h1>
      <p>ID de la propriété : {id}</p>
      
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Contenu à venir</h2>
        <p className="text-gray-600">
          Les détails de cette propriété seront bientôt disponibles.
        </p>
      </div>
    </div>
  );
}
