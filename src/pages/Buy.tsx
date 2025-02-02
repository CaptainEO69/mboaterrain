import { SearchBar } from "@/components/SearchBar";
import { PropertyCard } from "@/components/PropertyCard";
import { BottomNav } from "@/components/BottomNav";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Buy() {
  const properties = [
    {
      title: "Villa moderne à Bastos",
      price: "150M FCFA",
      location: "Yaoundé, Bastos",
      size: "400 m²",
      imageUrl: "/placeholder.svg"
    },
    // ... more properties
  ];

  return (
    <div className="min-h-screen pb-20">
      <div className="bg-white p-4 shadow-md">
        <h1 className="text-xl font-bold mb-4">Acheter un bien</h1>
        
        <div className="space-y-4">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Type de bien" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="house">Maison</SelectItem>
              <SelectItem value="apartment">Appartement</SelectItem>
              <SelectItem value="land">Terrain</SelectItem>
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
              <SelectItem value="bastos">Bastos</SelectItem>
              <SelectItem value="mvan">Mvan</SelectItem>
              <SelectItem value="nsimeyong">Nsimeyong</SelectItem>
            </SelectContent>
          </Select>

          <div className="grid grid-cols-2 gap-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Superficie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="100">100-200 m²</SelectItem>
                <SelectItem value="200">200-300 m²</SelectItem>
                <SelectItem value="300">300+ m²</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="50">0-50M FCFA</SelectItem>
                <SelectItem value="100">50-100M FCFA</SelectItem>
                <SelectItem value="150">100M+ FCFA</SelectItem>
              </SelectContent>
            </Select>
          </div>
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