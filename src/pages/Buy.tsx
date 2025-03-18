
import { PropertySearchForm } from "@/components/PropertySearchForm";
import { PropertyList } from "@/components/PropertyList";
import { useProperties } from "@/hooks/useProperties";
import { Building2, MapPin, Ruler } from "lucide-react";
import { CFAIcon } from "@/components/icons/CFAIcon";
import { FeatureCard } from "@/components/sell/FeatureCard";

export default function Buy() {
  const { properties, loading, fetchProperties } = useProperties("sale");

  // Fonction pour faire défiler vers le formulaire de recherche
  const scrollToSearchForm = () => {
    const formElement = document.querySelector('.search-form-container');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="bg-gradient-to-r from-cmr-green to-cmr-green/80 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">Acheter un bien au Cameroun</h1>
          <p className="text-lg opacity-90 mb-8">
            Trouvez la propriété de vos rêves parmi notre sélection exclusive
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div 
              className="bg-white/10 backdrop-blur-sm p-4 rounded-lg flex items-center space-x-3 cursor-pointer hover:bg-white/20 transition-colors"
              onClick={scrollToSearchForm}
            >
              <Building2 className="w-6 h-6" />
              <div>
                <h3 className="font-semibold">Propriétés Variées</h3>
                <p className="text-sm opacity-75">Maisons, appartements, terrains</p>
              </div>
            </div>
            <div 
              className="bg-white/10 backdrop-blur-sm p-4 rounded-lg flex items-center space-x-3 cursor-pointer hover:bg-white/20 transition-colors"
              onClick={scrollToSearchForm}
            >
              <MapPin className="w-6 h-6" />
              <div>
                <h3 className="font-semibold">Emplacements Premium</h3>
                <p className="text-sm opacity-75">Dans tout le Cameroun</p>
              </div>
            </div>
            <div 
              className="bg-white/10 backdrop-blur-sm p-4 rounded-lg flex items-center space-x-3 cursor-pointer hover:bg-white/20 transition-colors"
              onClick={scrollToSearchForm}
            >
              <Ruler className="w-6 h-6" />
              <div>
                <h3 className="font-semibold">Toutes Surfaces</h3>
                <p className="text-sm opacity-75">Pour tous vos besoins</p>
              </div>
            </div>
            <div 
              className="bg-white/10 backdrop-blur-sm p-4 rounded-lg flex items-center space-x-3 cursor-pointer hover:bg-white/20 transition-colors"
              onClick={scrollToSearchForm}
            >
              <CFAIcon className="w-6 h-6" />
              <div>
                <h3 className="font-semibold">Prix Compétitifs CFA</h3>
                <p className="text-sm opacity-75">Pour tous les budgets</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-6">
        <div className="bg-white rounded-lg shadow-lg mb-8 search-form-container">
          <PropertySearchForm transactionType="sale" onSearch={fetchProperties} />
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-6">Propriétés disponibles</h2>
          <PropertyList properties={properties} loading={loading} />
        </div>
      </div>
    </div>
  );
}
