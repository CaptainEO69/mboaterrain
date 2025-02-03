import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileCheck } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface LandDetailsSectionProps {
  errors: Record<string, string>;
}

export function LandDetailsSection({ errors }: LandDetailsSectionProps) {
  return (
    <div className="space-y-4 border-t pt-4">
      <div className="flex items-center gap-2 mb-4">
        <FileCheck className="w-5 h-5 text-cmr-green" />
        <h3 className="font-medium">Documents du terrain</h3>
      </div>

      <div>
        <Label htmlFor="land_title">Numéro du titre foncier</Label>
        <Input 
          id="land_title" 
          name="land_title" 
          required 
          className={errors.land_title ? "border-red-500" : ""}
        />
        {errors.land_title && (
          <p className="text-red-500 text-sm mt-1">{errors.land_title}</p>
        )}
      </div>

      <div>
        <Label htmlFor="property_certificate">Numéro de certificat de propriété</Label>
        <Input 
          id="property_certificate" 
          name="property_certificate" 
          required 
          className={errors.property_certificate ? "border-red-500" : ""}
        />
        {errors.property_certificate && (
          <p className="text-red-500 text-sm mt-1">{errors.property_certificate}</p>
        )}
      </div>

      <div>
        <Label htmlFor="certificate_validity">Date de validité du certificat</Label>
        <Input 
          id="certificate_validity" 
          name="certificate_validity" 
          type="date" 
          required 
          className={errors.certificate_validity ? "border-red-500" : ""}
        />
        {errors.certificate_validity && (
          <p className="text-red-500 text-sm mt-1">{errors.certificate_validity}</p>
        )}
      </div>
    </div>
  );
}