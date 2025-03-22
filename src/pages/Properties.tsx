
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Properties() {
  const [properties] = useState([]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Propriétés disponibles</h1>
      
      {properties.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Aucune propriété disponible pour le moment</p>
          <Button variant="outline">Rafraîchir</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Property cards would go here */}
        </div>
      )}
    </div>
  );
}
