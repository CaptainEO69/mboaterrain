import { SearchBar } from "@/components/SearchBar";
import { PropertyCard } from "@/components/PropertyCard";
import { BottomNav } from "@/components/BottomNav";

const Index = () => {
  const featuredProperties = [
    {
      title: "Appartement Moderne",
      price: "580 € / mois",
      location: "Lyon 3ème",
      size: "63,1 m²",
      imageUrl: "/lovable-uploads/83fc2739-1a70-4b50-b7a3-127bda76b51d.png"
    },
    {
      title: "Villa Spacieuse",
      price: "450 000 €",
      location: "Yaoundé, Bastos",
      size: "250 m²",
      imageUrl: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-cmr-green to-green-600 text-white p-6">
        <h1 className="text-2xl font-bold mb-6">Trouvez votre bien au Cameroun</h1>
        <SearchBar />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 p-4">
        <button className="p-4 rounded-lg bg-cmr-red text-white font-semibold">
          Acheter
        </button>
        <button className="p-4 rounded-lg bg-cmr-yellow text-black font-semibold">
          Louer
        </button>
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