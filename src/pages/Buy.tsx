import { PropertySearchForm } from "@/components/PropertySearchForm";
import { PropertyList } from "@/components/PropertyList";
import { BottomNav } from "@/components/BottomNav";
import { useProperties } from "@/hooks/useProperties";

export default function Buy() {
  const { properties, loading, fetchProperties } = useProperties("sale");

  return (
    <div className="min-h-screen pb-20">
      <div className="bg-white p-4 shadow-md">
        <h1 className="text-xl font-bold mb-4">Acheter un bien</h1>
        <PropertySearchForm transactionType="sale" onSearch={fetchProperties} />
      </div>

      <div className="p-4">
        <PropertyList properties={properties} loading={loading} />
      </div>

      <BottomNav />
    </div>
  );
}