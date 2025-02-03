import { PropertySearchForm } from "@/components/PropertySearchForm";
import { PropertyList } from "@/components/PropertyList";
import { BottomNav } from "@/components/BottomNav";
import { useProperties } from "@/hooks/useProperties";

export default function Rent() {
  const { properties, loading, fetchProperties } = useProperties("rent");

  return (
    <div className="min-h-screen pb-20">
      <div className="bg-gradient-to-r from-cmr-green to-cmr-green/80 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">Louer un bien au Cameroun</h1>
          <p className="text-lg opacity-90 mb-8">
            Trouvez la location idéale parmi notre sélection
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-6">
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <PropertySearchForm transactionType="rent" onSearch={fetchProperties} />
        </div>

        <div className="mt-8">
          <PropertyList properties={properties} loading={loading} isRental />
        </div>
      </div>

      <BottomNav />
    </div>
  );
}