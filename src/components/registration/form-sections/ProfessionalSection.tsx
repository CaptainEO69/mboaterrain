
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ServicePricesForm } from "@/components/registration/ServicePricesForm";

interface ProfessionalSectionProps {
  type: "surveyor" | "notary" | "notary_clerk";
  formData: {
    isCertified?: boolean;
    notaryOffice?: string;
    servicePrices: Record<string, number>;
  };
  setters: {
    setIsCertified?: (value: boolean) => void;
    setNotaryOffice?: (value: string) => void;
    setServicePrices: (value: Record<string, number>) => void;
  };
}

export function ProfessionalSection({ type, formData, setters }: ProfessionalSectionProps) {
  if (type === "surveyor") {
    return (
      <>
        <div className="flex items-center space-x-2">
          <Switch
            checked={formData.isCertified}
            onCheckedChange={setters.setIsCertified}
          />
          <Label>Je suis assermenté</Label>
        </div>
        <ServicePricesForm
          type="surveyor"
          servicePrices={formData.servicePrices}
          onChange={setters.setServicePrices}
        />
      </>
    );
  }

  if (type === "notary" || type === "notary_clerk") {
    return (
      <>
        <div className="space-y-2">
          <Label>Étude notariale</Label>
          <Input
            value={formData.notaryOffice}
            onChange={(e) => setters.setNotaryOffice?.(e.target.value)}
            required
          />
        </div>
        <ServicePricesForm
          type="notary"
          servicePrices={formData.servicePrices}
          onChange={setters.setServicePrices}
        />
      </>
    );
  }

  return null;
}
