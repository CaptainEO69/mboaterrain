
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useParams } from "react-router-dom";

export default function EditProperty() {
  const { id } = useParams();

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Modifier la propriété</h1>
        {/* Le formulaire sera implémenté plus tard */}
      </div>
    </ProtectedRoute>
  );
}
