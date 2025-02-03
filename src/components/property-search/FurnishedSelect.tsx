import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FurnishedSelectProps {
  onValueChange: (value: boolean) => void;
}

export function FurnishedSelect({ onValueChange }: FurnishedSelectProps) {
  return (
    <Select onValueChange={(value) => onValueChange(value === "true")}>
      <SelectTrigger>
        <SelectValue placeholder="Meublé" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="true">Meublé</SelectItem>
        <SelectItem value="false">Non meublé</SelectItem>
      </SelectContent>
    </Select>
  );
}