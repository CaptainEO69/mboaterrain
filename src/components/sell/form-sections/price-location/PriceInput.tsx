
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Info } from "lucide-react";
import { CFAIcon } from "@/components/icons/CFAIcon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PriceInputProps {
  error?: string;
}

export function PriceInput({ error }: PriceInputProps) {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Label htmlFor="price">Prix de vente (FCFA)</Label>
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

      <div>
        <div className="flex items-center gap-2 mb-2">
          <Label htmlFor="market_price">Prix de la Mercuriale (FCFA)</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Prix officiel du marché selon la mercuriale</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Input
          id="market_price"
          name="market_price"
          type="number"
          min="0"
          step="1000"
        />
      </div>
    </div>
  );
}
