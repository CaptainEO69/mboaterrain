
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CFAIcon } from "@/components/icons/CFAIcon";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useState } from "react";

interface PriceInputProps {
  error?: string;
  isRental?: boolean;
}

export function PriceInput({ error, isRental = false }: PriceInputProps) {
  const [priceType, setPriceType] = useState<string>("fixed");

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Label htmlFor="price">{isRental ? "Prix de location (FCFA)" : "Prix de vente (FCFA)"}</Label>
          <CFAIcon className="w-4 h-4 text-muted-foreground" />
        </div>
        <Input
          id="price"
          name="price"
          type="number"
          min="0"
          step="1000"
          required
          className={error ? "border-red-500" : ""}
        />
        {error && (
          <p className="text-red-500 text-sm mt-1">{error}</p>
        )}
      </div>

      {isRental && (
        <>
          <div>
            <Label htmlFor="price_type" className="block mb-2">Type de tarification</Label>
            <Select 
              name="price_type" 
              defaultValue="fixed"
              onValueChange={(value) => setPriceType(value)}
            >
              <SelectTrigger id="price_type" className="w-full">
                <SelectValue placeholder="Choisir un type de tarification" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fixed">Fixe</SelectItem>
                <SelectItem value="negotiable">Négociable</SelectItem>
                <SelectItem value="range">Fourchette de prix</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {priceType === "range" && (
            <div>
              <Label htmlFor="max_price" className="block mb-2">Prix maximum (FCFA)</Label>
              <Input
                id="max_price"
                name="max_price"
                type="number"
                min="0"
                step="1000"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
