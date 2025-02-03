import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ServicePricesFormProps {
  type: "surveyor" | "notary" | "notary_clerk";
  servicePrices: Record<string, number>;
  onChange: (prices: Record<string, number>) => void;
}

const surveyorServices = [
  { key: "bornage", label: "Bornage" },
  { key: "implantation", label: "Implantation" },
  { key: "topographic", label: "Levée topographique" },
  { key: "technical_file", label: "Dossier technique" },
];

const notaryServices = [
  { key: "file_opening", label: "Ouverture de dossier" },
  { key: "subdivision", label: "Morcellement" },
  { key: "sale_deed", label: "Acte notarié de vente" },
  { key: "death_transfer", label: "Mutation par décès" },
  { key: "indivision", label: "Retraits d'indivision" },
  { key: "testament", label: "Testament" },
  { key: "protocol", label: "Enregistrement de protocole d'accord" },
  { key: "authentication", label: "Authentification des actes" },
  { key: "donation", label: "Acte de donation" },
];

export function ServicePricesForm({ type, servicePrices, onChange }: ServicePricesFormProps) {
  const services = type === "surveyor" ? surveyorServices : notaryServices;

  const handlePriceChange = (key: string, value: string) => {
    onChange({
      ...servicePrices,
      [key]: Number(value) || 0,
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Prix des services</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map(({ key, label }) => (
          <div key={key}>
            <Label>{label}</Label>
            <Input
              type="number"
              value={servicePrices[key] || ""}
              onChange={(e) => handlePriceChange(key, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}