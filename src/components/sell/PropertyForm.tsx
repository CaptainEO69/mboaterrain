import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PropertyTypeSelect } from "../property-search/PropertyTypeSelect";
import { FurnishedSelect } from "../property-search/FurnishedSelect";
import { LocationSelect } from "../property-search/LocationSelect";

interface PropertyFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  isSubmitting: boolean;
}

export function PropertyForm({ onSubmit, isSubmitting }: PropertyFormProps) {
  const [propertyType, setPropertyType] = useState<string>("");
  const [images, setImages] = useState<FileList | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Titre de l'annonce</Label>
        <Input id="title" name="title" required />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" />
      </div>

      <div>
        <Label>Type de bien</Label>
        <PropertyTypeSelect 
          onValueChange={(value) => {
            setPropertyType(value);
            const form = document.querySelector('form');
            if (form) {
              const formData = new FormData(form);
              formData.set('property_type', value);
            }
          }} 
        />
      </div>

      <div>
        <Label htmlFor="transaction_type">Type de transaction</Label>
        <Select name="transaction_type" required>
          <SelectTrigger>
            <SelectValue placeholder="Vente ou Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sale">Vente</SelectItem>
            <SelectItem value="rent">Location</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Meublé</Label>
        <FurnishedSelect
          onValueChange={(value) => {
            const form = document.querySelector('form');
            if (form) {
              const formData = new FormData(form);
              formData.set('is_furnished', value.toString());
            }
          }}
        />
      </div>

      <div>
        <Label htmlFor="price">Prix (FCFA)</Label>
        <Input
          id="price"
          name="price"
          type="number"
          min="0"
          step="1000"
          required
        />
      </div>

      <LocationSelect
        onCityChange={(city) => {
          const form = document.querySelector('form');
          if (form) {
            const formData = new FormData(form);
            formData.set('city', city);
          }
        }}
        onNeighborhoodChange={(neighborhood) => {
          const form = document.querySelector('form');
          if (form) {
            const formData = new FormData(form);
            formData.set('neighborhood', neighborhood);
          }
        }}
      />

      <div>
        <Label htmlFor="area_size">Superficie (m²)</Label>
        <Input
          id="area_size"
          name="area_size"
          type="number"
          min="0"
          step="0.01"
          required
        />
      </div>

      <div>
        <Label htmlFor="distance_from_road">Distance de la route principale (m)</Label>
        <Input
          id="distance_from_road"
          name="distance_from_road"
          type="number"
          min="0"
          step="0.01"
        />
      </div>

      {propertyType === "land" && (
        <div className="space-y-4 border-t pt-4">
          <div>
            <Label htmlFor="land_title">Numéro du titre foncier</Label>
            <Input id="land_title" name="land_title" required />
          </div>
          <div>
            <Label htmlFor="property_certificate">Numéro de certificat de propriété</Label>
            <Input id="property_certificate" name="property_certificate" required />
          </div>
          <div>
            <Label htmlFor="certificate_validity">Date de validité du certificat</Label>
            <Input id="certificate_validity" name="certificate_validity" type="date" required />
          </div>
        </div>
      )}

      <div>
        <Label htmlFor="images">Photos</Label>
        <Input
          id="images"
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setImages(e.target.files)}
          className="cursor-pointer"
        />
        <p className="text-sm text-gray-500 mt-1">
          Vous pouvez sélectionner plusieurs photos. La première sera l'image principale.
        </p>
      </div>

      <Button
        type="submit"
        className="w-full bg-cmr-green hover:bg-cmr-green/90"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Publication en cours..." : "Publier l'annonce"}
      </Button>
    </form>
  );
}