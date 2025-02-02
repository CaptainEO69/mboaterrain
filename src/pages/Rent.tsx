import { PropertySearchForm } from "@/components/PropertySearchForm";
import { PropertyList } from "@/components/PropertyList";
import { BottomNav } from "@/components/BottomNav";
import { useProperties } from "@/hooks/useProperties";

export default function Rent() {
  const { properties, loading, fetchProperties } = useProperties("rent");

  return (
    <div className="min-h-screen pb-20">
      <div className="bg-white p-4 shadow-md">
        <h1 className="text-xl font-bold mb-4">Louer un bien</h1>
        <PropertySearchForm transactionType="rent" onSearch={fetchProperties} />
      </div>

      <div className="p-4">
        <PropertyList properties={properties} loading={loading} isRental />
      </div>

      <BottomNav />
    </div>
  );
}