import { SearchBar } from "@/components/SearchBar";
import { PropertyCard } from "@/components/PropertyCard";
import { BottomNav } from "@/components/BottomNav";
import { House } from "lucide-react";

const Index = () => {
  const featuredProperties = [
    {
      title: "Villa moderne à Bastos",
      price: "150M FCFA",
      location: "Yaoundé, Bastos",
      size: "400 m²",
      imageUrl: "/lovable-uploads/83fc2739-1a70-4b50-b7a3-127bda76b51d.png",
      details: {
        bedrooms: "5 chambres",
        bathrooms: "3 SDB"
      }
    },
    {
      title: "Terrain titré à Simbock",
      price: "25M FCFA",
      location: "Yaoundé, Simbock",
      size: "500 m²",
      imageUrl: "/placeholder.svg"
    },
    {
      title: "Appartement à Bonanjo",
      price: "80M FCFA",
      location: "Douala, Bonanjo",
      size: "150 m²",
      imageUrl: "/placeholder.svg",
      details: {
        bedrooms: "3 chambres",
        bathrooms: "2 SDB"
      }
    }
  ];

  return (
    <div className="min-h-screen pb-20">
      {/* Header with Logo */}
      <header className="bg-cmr-green text-white p-4 shadow-md">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <House className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">MboaTer</h1>
              <p className="text-xs text-cmr-yellow">La première plateforme immobilière 100% camerounaise</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="bg-cmr-yellow text-black px-3 py-1 rounded-md text-sm">
              Se connecter
            </button>
            <button className="bg-cmr-red text-white px-3 py-1 rounded-md text-sm">
              S'inscrire
            </button>
          </div>
        </div>
      </header>

      {/* Main Navigation */}
      <nav className="bg-white shadow-md">
        <div className="flex justify-center space-x-6 p-4">
          <button className="text-gray-700 hover:text-cmr-green font-medium">
            Acheter
          </button>
          <button className="text-gray-700 hover:text-cmr-green font-medium">
            Louer
          </button>
          <button className="text-gray-700 hover:text-cmr-green font-medium">
            Vendre
          </button>
        </div>
      </nav>

      {/* Search Section */}
      <div className="bg-white p-6 shadow-sm">
        <SearchBar />
      </div>

      {/* Featured Properties */}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Biens en vedette</h2>
        <div className="space-y-4">
          {featuredProperties.map((property, index) => (
            <PropertyCard key={index} {...property} />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Index;