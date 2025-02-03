export function usePropertyFormValidation() {
  const validateForm = (formData: FormData, images: FileList | null): Record<string, string> => {
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

    const propertyType = formData.get("property_type") as string;
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

    return errors;
  };

  return { validateForm };
}