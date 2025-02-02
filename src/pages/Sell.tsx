import { SearchBar } from "@/components/SearchBar";
import { PropertyCard } from "@/components/PropertyCard";
import { BottomNav } from "@/components/BottomNav";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Sell() {
  return (
    <div className="min-h-screen pb-20">
      <div className="bg-white p-4 shadow-md">
        <h1 className="text-xl font-bold mb-4">Vendre un bien</h1>
        
        <form className="space-y-4">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Type de bien" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="house-furnished">Maison meublée</SelectItem>
              <SelectItem value="house-unfurnished">Maison non meublée</SelectItem>
              <SelectItem value="apartment-furnished">Appartement meublé</SelectItem>
              <SelectItem value="apartment-unfurnished">Appartement non meublé</SelectItem>
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
            <Input placeholder="Superficie (m²)" type="number" />
            <Input placeholder="Prix de vente (FCFA)" type="number" />
          </div>

          <Input placeholder="Prix de la Mercuriale" type="number" />

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

          <div id="land-details" className="space-y-4 border-t pt-4">
            <h3 className="font-semibold">Détails du terrain</h3>
            <Input placeholder="Numéro du titre foncier" />
            <Input placeholder="Numéro de certificat de propriété" />
            <Input placeholder="Validité du certificat de propriété" type="date" />
          </div>

          <Button type="submit" className="w-full bg-cmr-green hover:bg-cmr-green/90">
            Publier l'annonce
          </Button>
        </form>
      </div>

      <BottomNav />
    </div>
  );
}