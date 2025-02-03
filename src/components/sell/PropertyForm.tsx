import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
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
import { ImageUpload } from "./ImageUpload";

interface PropertyFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  isSubmitting: boolean;
}

export function PropertyForm({ onSubmit, isSubmitting }: PropertyFormProps) {
  const [propertyType, setPropertyType] = useState<string>("");
  const [images, setImages] = useState<FileList | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateForm = (formData: FormData): boolean => {
    const errors: Record<string, string> = {};
    
    // Validation du titre
    const title = formData.get("title") as string;
    if (!title || title.length < 10) {
      errors.title = "Le titre doit faire au moins 10 caractères";
    }

    // Validation du prix
    const price = Number(formData.get("price"));
    if (!price || price <= 0) {
      errors.price = "Le prix doit être supérieur à 0";
    }

    // Validation de la superficie
    const areaSize = Number(formData.get("area_size"));
    if (!areaSize || areaSize <= 0) {
      errors.area_size = "La superficie doit être supérieure à 0";
    }

    // Validation des images
    if (!images || images.length === 0) {
      errors.images = "Au moins une image est requise";
    }

    // Validation spécifique pour les terrains
    if (propertyType === "land") {
      const landTitle = formData.get("land_title") as string;
      if (!landTitle) {
        errors.land_title = "Le numéro du titre foncier est requis";
      }

      const propertyCertificate = formData.get("property_certificate") as string;
      if (!propertyCertificate) {
        errors.property_certificate = "Le numéro de certificat est requis";
      }

      const certificateValidity = formData.get("certificate_validity") as string;
      if (!certificateValidity) {
        errors.certificate_validity = "La date de validité est requise";
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    if (!validateForm(formData)) {
      toast.error("Veuillez corriger les erreurs dans le formulaire");
      return;
    }

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="title">Titre de l'annonce</Label>
        <Input 
          id="title" 
          name="title" 
          required 
          className={validationErrors.title ? "border-red-500" : ""}
        />
        {validationErrors.title && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.title}</p>
        )}
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description" 
          name="description" 
          placeholder="Décrivez votre bien en détail..."
        />
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
          className={validationErrors.price ? "border-red-500" : ""}
        />
        {validationErrors.price && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.price}</p>
        )}
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
          className={validationErrors.area_size ? "border-red-500" : ""}
        />
        {validationErrors.area_size && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.area_size}</p>
        )}
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
            <Input 
              id="land_title" 
              name="land_title" 
              required 
              className={validationErrors.land_title ? "border-red-500" : ""}
            />
            {validationErrors.land_title && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.land_title}</p>
            )}
          </div>
          <div>
            <Label htmlFor="property_certificate">Numéro de certificat de propriété</Label>
            <Input 
              id="property_certificate" 
              name="property_certificate" 
              required 
              className={validationErrors.property_certificate ? "border-red-500" : ""}
            />
            {validationErrors.property_certificate && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.property_certificate}</p>
            )}
          </div>
          <div>
            <Label htmlFor="certificate_validity">Date de validité du certificat</Label>
            <Input 
              id="certificate_validity" 
              name="certificate_validity" 
              type="date" 
              required 
              className={validationErrors.certificate_validity ? "border-red-500" : ""}
            />
            {validationErrors.certificate_validity && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.certificate_validity}</p>
            )}
          </div>
        </div>
      )}

      <div className={validationErrors.images ? "border border-red-500 rounded-lg p-4" : ""}>
        <ImageUpload onChange={(files) => setImages(files)} />
        {validationErrors.images && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.images}</p>
        )}
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