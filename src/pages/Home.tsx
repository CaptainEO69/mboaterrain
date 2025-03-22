
import { PropertySearchForm } from "@/components/PropertySearchForm";
import { PropertyList } from "@/components/PropertyList";
import { useProperties } from "@/hooks/useProperties";

const Home = () => {
  const { properties, loading } = useProperties();

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8 font-playfair text-cmr-green">MboaTer</h1>
      
      <div className="mb-8">
        <PropertySearchForm />
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Propriétés récentes</h2>
        <PropertyList properties={properties} loading={loading} />
      </div>
    </div>
  );
};

export default Home;
