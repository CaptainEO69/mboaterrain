
import { PropertiesWithMap } from "@/components/PropertiesWithMap";

const Properties = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8 font-playfair text-cmr-green">Propriétés disponibles</h1>
      <PropertiesWithMap />
    </div>
  );
};

export default Properties;
