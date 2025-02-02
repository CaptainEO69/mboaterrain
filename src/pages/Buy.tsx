import { SearchBar } from "@/components/SearchBar";
import { PropertyCard } from "@/components/PropertyCard";
import { BottomNav } from "@/components/BottomNav";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Buy() {
  return (
    <div className="min-h-screen pb-20">
      <div className="bg-white p-4 shadow-md">
        <h1 className="text-xl font-bold mb-4">Acheter un bien</h1>
        
        <form className="space-y-4">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Type de bien" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="house">Maison</SelectItem>
              <SelectItem value="apartment">Appartement</SelectItem>
              <SelectItem value="land">Terrain</SelectItem>
              <SelectItem value="commercial">Local commercial</SelectItem>
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
              <SelectItem value="bamenda">Bamenda</SelectItem>
              <SelectItem value="garoua">Garoua</SelectItem>
              <SelectItem value="maroua">Maroua</SelectItem>
              <SelectItem value="bertoua">Bertoua</SelectItem>
              <SelectItem value="ebolowa">Ebolowa</SelectItem>
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
              <SelectItem value="mendong">Mendong</SelectItem>
              <SelectItem value="mvogbi">Mvog-Bi</SelectItem>
            </SelectContent>
          </Select>

          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="Superficie (m²)" type="number" />
            <Input placeholder="Budget (FCFA)" type="number" />
          </div>

          <Button type="submit" className="w-full bg-cmr-green hover:bg-cmr-green/90">
            Rechercher
          </Button>
        </form>
      </div>

      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <PropertyCard
          title="Villa moderne à Bastos"
          price="150 000 000 FCFA"
          location="Bastos, Yaoundé"
          size="500 m²"
          imageUrl="/placeholder.svg"
        />
        <PropertyCard
          title="Appartement au centre-ville"
          price="75 000 000 FCFA"
          location="Centre, Douala"
          size="120 m²"
          imageUrl="/placeholder.svg"
        />
        <PropertyCard
          title="Terrain titré à Nsimeyong"
          price="45 000 000 FCFA"
          location="Nsimeyong, Yaoundé"
          size="400 m²"
          imageUrl="/placeholder.svg"
        />
      </div>

      <BottomNav />
    </div>
  );
}