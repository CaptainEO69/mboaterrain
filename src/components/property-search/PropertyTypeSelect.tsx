
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PropertyTypeSelectProps {
  onValueChange: (value: string) => void;
  transactionType?: "sale" | "rent";
}

export function PropertyTypeSelect({ onValueChange, transactionType }: PropertyTypeSelectProps) {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="Type de bien" />
      </SelectTrigger>
      <SelectContent>
        {transactionType === "sale" ? (
          <>
            <SelectItem value="house">Maison</SelectItem>
            <SelectItem value="apartment">Appartement</SelectItem>
            <SelectItem value="land">Terrain</SelectItem>
          </>
        ) : (
          <>
            <SelectItem value="house">Maison</SelectItem>
            <SelectItem value="apartment">Appartement</SelectItem>
            <SelectItem value="land">Terrain</SelectItem>
            <SelectItem value="commercial">Local commercial</SelectItem>
          </>
        )}
      </SelectContent>
    </Select>
  );
}
