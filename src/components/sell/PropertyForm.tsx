import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "./ImageUpload";
import { BasicInfoSection } from "./form-sections/BasicInfoSection";
import { PriceLocationSection } from "./form-sections/PriceLocationSection";
import { LandDocumentsSection } from "./form-sections/land-documents/LandDocumentsSection";
import { usePropertyFormValidation } from "./form-validation/usePropertyFormValidation";
import { toast } from "sonner";

interface PropertyFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  isSubmitting: boolean;
}

export function PropertyForm({ onSubmit, isSubmitting }: PropertyFormProps) {
  const [propertyType, setPropertyType] = useState<string>("");
  const [images, setImages] = useState<FileList | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const { validateForm } = usePropertyFormValidation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const errors = validateForm(formData, images);
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
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
        }} 
      />

      <PriceLocationSection errors={validationErrors} />

      {propertyType === "land" && (
        <LandDocumentsSection errors={validationErrors} />
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