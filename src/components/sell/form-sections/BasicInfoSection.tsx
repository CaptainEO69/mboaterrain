
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Info } from "lucide-react";
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
    <div className="space-y-4">
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
          rows={4}
          placeholder="Décrivez votre bien en détail..."
        />
      </div>

      <div>
        <Label htmlFor="property_type">Type de bien</Label>
        <Select
          name="property_type"
          onValueChange={(value) => {
            onPropertyTypeChange(value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez le type de bien" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="house">Maison</SelectItem>
            <SelectItem value="apartment">Appartement</SelectItem>
            <SelectItem value="land">Terrain</SelectItem>
            <SelectItem value="commercial">Local commercial</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Label htmlFor="is_furnished">Meublé</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Indiquez si le bien est vendu meublé ou non</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <Switch id="is_furnished" name="is_furnished" />
      </div>
    </div>
  );
}
