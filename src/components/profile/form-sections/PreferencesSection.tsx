
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PreferencesSectionProps {
  priceMin?: number;
  priceMax?: number;
  preferredLocations?: string[];
  specificCriteria?: Record<string, boolean>;
  propertyType?: string;
  isEditing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: any } }) => void;
}

const criteriaOptions = [
  { id: "pool", label: "Piscine" },
  { id: "balcony", label: "Balcon" },
  { id: "garage", label: "Garage" },
  { id: "garden", label: "Jardin" },
  { id: "security", label: "Sécurité" },
  { id: "furnished", label: "Meublé" },
];

const cityOptions = [
  "Yaoundé",
  "Douala",
  "Garoua",
  "Bamenda",
  "Bafoussam",
  "Ngaoundéré",
  "Bertoua",
  "Maroua",
  "Limbe",
  "Kribi",
];

export function PreferencesSection({
  priceMin,
  priceMax,
  preferredLocations = [],
  specificCriteria = {},
  propertyType,
  isEditing,
  onInputChange,
}: PreferencesSectionProps) {
  const [selectedLocations, setSelectedLocations] = useState<string[]>(preferredLocations);

  const handleLocationChange = (location: string, checked: boolean) => {
    let newLocations: string[];
    if (checked) {
      newLocations = [...selectedLocations, location];
    } else {
      newLocations = selectedLocations.filter(loc => loc !== location);
    }
    
    setSelectedLocations(newLocations);
    onInputChange({
      target: {
        name: "preferred_locations",
        value: newLocations
      }
    });
  };

  const handleCriteriaChange = (criteriaId: string, checked: boolean) => {
    const newCriteria = {
      ...specificCriteria,
      [criteriaId]: checked
    };
    
    onInputChange({
      target: {
        name: "specific_criteria",
        value: newCriteria
      }
    });
  };

  return (
    <Card className="border-cmr-green mt-6">
      <CardHeader className="bg-cmr-green/10">
        <CardTitle className="text-cmr-green text-lg font-medium">Mes préférences immobilières</CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Budget range */}
          <div className="space-y-2">
            <Label className="text-cmr-green font-medium">Budget minimum (FCFA)</Label>
            <Input
              name="price_min"
              type="number"
              value={priceMin || ""}
              onChange={onInputChange}
              disabled={!isEditing}
              className={!isEditing ? "bg-gray-50" : ""}
              placeholder="Ex: 5000000"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-cmr-green font-medium">Budget maximum (FCFA)</Label>
            <Input
              name="price_max"
              type="number" 
              value={priceMax || ""}
              onChange={onInputChange}
              disabled={!isEditing}
              className={!isEditing ? "bg-gray-50" : ""}
              placeholder="Ex: 20000000"
            />
          </div>
        </div>
        
        {/* Property Type */}
        <div className="space-y-2">
          <Label className="text-cmr-green font-medium">Type de bien recherché</Label>
          <Select
            value={propertyType || ""}
            onValueChange={(value) => 
              onInputChange({ target: { name: 'property_type', value } })
            }
            disabled={!isEditing}
          >
            <SelectTrigger className={!isEditing ? "bg-gray-50" : ""}>
              <SelectValue placeholder="Sélectionner un type de bien" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apartment">Appartement</SelectItem>
              <SelectItem value="house">Villa/Maison</SelectItem>
              <SelectItem value="land">Terrain</SelectItem>
              <SelectItem value="commercial">Local commercial</SelectItem>
              <SelectItem value="building">Immeuble</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Preferred Locations */}
        <div className="space-y-2">
          <Label className="text-cmr-green font-medium">Localisations préférées</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            {cityOptions.map((city) => (
              <div key={city} className="flex items-center space-x-2">
                <Checkbox 
                  id={`location-${city}`} 
                  checked={selectedLocations.includes(city)}
                  onCheckedChange={(checked) => handleLocationChange(city, checked === true)}
                  disabled={!isEditing}
                />
                <label 
                  htmlFor={`location-${city}`}
                  className={`text-sm ${!isEditing ? "text-gray-500" : ""}`}
                >
                  {city}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Specific Criteria */}
        <div className="space-y-2">
          <Label className="text-cmr-green font-medium">Critères spécifiques</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            {criteriaOptions.map((criterion) => (
              <div key={criterion.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={`criteria-${criterion.id}`} 
                  checked={specificCriteria[criterion.id] || false}
                  onCheckedChange={(checked) => handleCriteriaChange(criterion.id, checked === true)}
                  disabled={!isEditing}
                />
                <label 
                  htmlFor={`criteria-${criterion.id}`}
                  className={`text-sm ${!isEditing ? "text-gray-500" : ""}`}
                >
                  {criterion.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
