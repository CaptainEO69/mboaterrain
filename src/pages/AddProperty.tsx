
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function AddProperty() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Ajouter une propriété</h1>
        {/* Le formulaire sera implémenté plus tard */}
      </div>
    </ProtectedRoute>
  );
}
