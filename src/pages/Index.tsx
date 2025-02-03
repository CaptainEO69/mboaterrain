import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Building2, Key, PlusCircle } from "lucide-react";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-cmr-green to-cmr-green/80 text-white p-6">
        <h1 className="text-2xl font-bold mb-2 font-playfair">
          Trouvez votre bien au Cameroun
        </h1>
        <p className="text-sm opacity-90 mb-4">
          Achetez, louez ou vendez en toute simplicité
        </p>
        <SearchBar />
      </div>

      {/* Main Actions */}
      <div className="px-4">
        <div className="grid grid-cols-1 gap-4">
          <Button
            onClick={() => navigate("/buy")}
            className="h-20 bg-cmr-green hover:bg-cmr-green/90 flex items-center justify-center gap-3"
          >
            <Building2 className="w-6 h-6" />
            <div className="flex flex-col items-start">
              <span className="text-lg font-semibold">Acheter</span>
              <span className="text-xs opacity-90">Trouvez votre bien idéal</span>
            </div>
          </Button>

          <Button
            onClick={() => navigate("/rent")}
            className="h-20 bg-cmr-red hover:bg-cmr-red/90 flex items-center justify-center gap-3"
          >
            <Key className="w-6 h-6" />
            <div className="flex flex-col items-start">
              <span className="text-lg font-semibold">Louer</span>
              <span className="text-xs opacity-90">Location courte ou longue durée</span>
            </div>
          </Button>

          <Button
            onClick={() => navigate("/sell")}
            className="h-20 bg-cmr-yellow hover:bg-cmr-yellow/90 flex items-center justify-center gap-3 text-black"
          >
            <PlusCircle className="w-6 h-6" />
            <div className="flex flex-col items-start">
              <span className="text-lg font-semibold">Vendre</span>
              <span className="text-xs opacity-75">Publiez votre annonce</span>
            </div>
          </Button>
        </div>
      </div>

      {/* Featured Properties Section */}
      <div className="px-4">
        <h2 className="text-xl font-semibold mb-4 font-playfair">Biens à la une</h2>
        <div className="grid grid-cols-1 gap-4">
          {/* Cette section sera remplie dynamiquement avec les propriétés mises en avant */}
          <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
            Bientôt disponible
          </div>
        </div>
      </div>
    </div>
  );
}