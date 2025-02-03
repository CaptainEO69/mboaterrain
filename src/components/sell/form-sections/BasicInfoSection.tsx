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
import { Building2, DollarSign, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BasicInfoSectionProps {
  errors: Record<string, string>;
  onPropertyTypeChange: (value: string) => void;
}

export function BasicInfoSection({ errors, onPropertyTypeChange }: BasicInfoSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Label htmlFor="title">Titre de l'annonce</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Donnez un titre accrocheur à votre annonce</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
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
          className="min-h-[120px]"
        />
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <Label>Type de bien</Label>
          <Building2 className="w-4 h-4 text-muted-foreground" />
        </div>
        <PropertyTypeSelect onValueChange={onPropertyTypeChange} />
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <Label htmlFor="transaction_type">Type de transaction</Label>
          <DollarSign className="w-4 h-4 text-muted-foreground" />
        </div>
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