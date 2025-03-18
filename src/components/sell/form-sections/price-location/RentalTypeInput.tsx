
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Calendar } from "lucide-react";

export function RentalTypeInput() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Label htmlFor="rental_type">Type de bail</Label>
        <Calendar className="w-4 h-4 text-muted-foreground" />
      </div>
      
      <Select name="rental_type" defaultValue="monthly">
        <SelectTrigger id="rental_type" className="w-full">
          <SelectValue placeholder="Choisir le type de bail" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="monthly">Mensuel</SelectItem>
          <SelectItem value="daily">Journalier</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
