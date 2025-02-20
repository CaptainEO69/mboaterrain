
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CFAIcon } from "@/components/icons/CFAIcon";

interface PriceInputProps {
  error?: string;
}

export function PriceInput({ error }: PriceInputProps) {
  return (
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
  );
}
