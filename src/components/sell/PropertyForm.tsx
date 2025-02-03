import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "./ImageUpload";
import { BasicInfoSection } from "./form-sections/BasicInfoSection";
import { PriceLocationSection } from "./form-sections/PriceLocationSection";
import { LandDetailsSection } from "./form-sections/LandDetailsSection";

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
    
    const title = formData.get("title") as string;
    if (!title || title.length < 10) {
      errors.title = "Le titre doit faire au moins 10 caractères";
    }

    const price = Number(formData.get("price"));
    if (!price || price <= 0) {
      errors.price = "Le prix doit être supérieur à 0";
    }

    const areaSize = Number(formData.get("area_size"));
    if (!areaSize || areaSize <= 0) {
      errors.area_size = "La superficie doit être supérieure à 0";
    }

    if (!images || images.length === 0) {
      errors.images = "Au moins une image est requise";
    }

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
      <BasicInfoSection 
        errors={validationErrors} 
        onPropertyTypeChange={(value) => {
          setPropertyType(value);
          const form = document.querySelector('form');
          if (form) {
            const formData = new FormData(form);
            formData.set('property_type', value);
          }
        }} 
      />

      <PriceLocationSection errors={validationErrors} />

      {propertyType === "land" && (
        <LandDetailsSection errors={validationErrors} />
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