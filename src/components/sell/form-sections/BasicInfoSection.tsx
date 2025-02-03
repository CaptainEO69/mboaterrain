import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PropertyTypeSelect } from "../../property-search/PropertyTypeSelect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FurnishedSelect } from "../../property-search/FurnishedSelect";

interface BasicInfoSectionProps {
  errors: Record<string, string>;
  onPropertyTypeChange: (value: string) => void;
}

export function BasicInfoSection({ errors, onPropertyTypeChange }: BasicInfoSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="title">Titre de l'annonce</Label>
        <Input 
          id="title" 
          name="title" 
          required 
          className={errors.title ? "border-red-500" : ""}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
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
        <PropertyTypeSelect onValueChange={onPropertyTypeChange} />
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
    </div>
  );
}