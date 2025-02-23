
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PropertyTypeSelectProps {
  onValueChange: (value: string) => void;
}

export function PropertyTypeSelect({ onValueChange }: PropertyTypeSelectProps) {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="Type de bien" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="house">Maison</SelectItem>
        <SelectItem value="land">Terrain</SelectItem>
      </SelectContent>
    </Select>
  );
}
