
import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface DatePickerFieldProps {
  label: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  yearRange?: {
    fromYear: number;
    toYear: number;
  };
}

export function DatePickerField({ 
  label, 
  value, 
  onChange, 
  yearRange = { 
    fromYear: 1930, 
    toYear: 2006 
  } 
}: DatePickerFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="birthDate">{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? (
              format(value, "PPP", { locale: fr })
            ) : (
              <span>Sélectionner une date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-auto p-0 bg-popover shadow-md border border-border" 
          align="start"
        >
          <Calendar
            mode="single"
            selected={value || undefined}
            onSelect={onChange}
            initialFocus
            captionLayout="dropdown-buttons"
            fromYear={yearRange.fromYear}
            toYear={yearRange.toYear}
            locale={fr}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
