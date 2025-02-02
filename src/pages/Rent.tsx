import { SearchBar } from "@/components/SearchBar";
import { PropertyCard } from "@/components/PropertyCard";
import { BottomNav } from "@/components/BottomNav";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Rent() {
  const properties = [
    {
      title: "Appartement meublé à Bonanjo",
      price: "300 000 FCFA/mois",
      location: "Douala, Bonanjo",
      size: "150 m²",
      imageUrl: "/placeholder.svg"
    },
    // ... more properties
  ];

  return (
    <div className="min-h-screen pb-20">
      <div className="bg-white p-4 shadow-md">
        <h1 className="text-xl font-bold mb-4">Louer un bien</h1>
        
        <div className="space-y-4">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Type de bien" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="house-furnished">Maison meublée</SelectItem>
              <SelectItem value="house-unfurnished">Maison non meublée</SelectItem>
              <SelectItem value="apartment-furnished">Appartement meublé</SelectItem>
              <SelectItem value="apartment-unfurnished">Appartement non meublé</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Ville" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yaounde">Yaoundé</SelectItem>
              <SelectItem value="douala">Douala</SelectItem>
              <SelectItem value="bafoussam">Bafoussam</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Quartier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bonanjo">Bonanjo</SelectItem>
              <SelectItem value="akwa">Akwa</SelectItem>
              <SelectItem value="deido">Deido</SelectItem>
            </SelectContent>
          </Select>

          <div className="grid grid-cols-2 gap-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Superficie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="50">50-100 m²</SelectItem>
                <SelectItem value="100">100-150 m²</SelectItem>
                <SelectItem value="150">150+ m²</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Prix location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Mensuel</SelectItem>
                <SelectItem value="daily">Journalier</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Distance route principale" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Bord de route</SelectItem>
              <SelectItem value="100">100m ou moins</SelectItem>
              <SelectItem value="500">500m ou moins</SelectItem>
              <SelectItem value="1000">1km ou moins</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="p-4 grid gap-4">
        {properties.map((property, index) => (
          <PropertyCard key={index} {...property} />
        ))}
      </div>

      <BottomNav />
    </div>
  );
}