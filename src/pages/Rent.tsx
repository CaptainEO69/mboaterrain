import { SearchBar } from "@/components/SearchBar";
import { PropertyCard } from "@/components/PropertyCard";
import { BottomNav } from "@/components/BottomNav";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Rent() {
  return (
    <div className="min-h-screen pb-20">
      <div className="bg-white p-4 shadow-md">
        <h1 className="text-xl font-bold mb-4">Louer un bien</h1>
        
        <form className="space-y-4">
          <div className="space-y-2">
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
          </div>

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

          <Input placeholder="Superficie (m²)" type="number" />

          <div className="space-y-2">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Type de location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Mensuel</SelectItem>
                <SelectItem value="daily">Journalier</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Prix de location (FCFA)" type="number" />
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

          <Button type="submit" className="w-full bg-cmr-green hover:bg-cmr-green/90">
            Rechercher
          </Button>
        </form>
      </div>

      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <PropertyCard
          title="Appartement meublé"
          price="250 000 FCFA/mois"
          location="Bastos, Yaoundé"
          size="120 m²"
          imageUrl="/placeholder.svg"
        />
        <PropertyCard
          title="Villa non meublée"
          price="400 000 FCFA/mois"
          location="Bonanjo, Douala"
          size="300 m²"
          imageUrl="/placeholder.svg"
        />
        <PropertyCard
          title="Studio meublé"
          price="25 000 FCFA/jour"
          location="Centre, Yaoundé"
          size="45 m²"
          imageUrl="/placeholder.svg"
        />
      </div>

      <BottomNav />
    </div>
  );
}