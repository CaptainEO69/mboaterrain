
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LandTitleSection } from "@/components/sell/form-sections/LandTitleSection";

interface SellerSectionProps {
  formData: {
    saleReason: string;
  };
  setters: {
    setSaleReason: (value: string) => void;
  };
}

export function SellerSection({ formData, setters }: SellerSectionProps) {
  return (
    <div className="space-y-4">
      <LandTitleSection errors={{}} />
      <div className="space-y-2">
        <Label>Motif de vente</Label>
        <Textarea
          value={formData.saleReason}
          onChange={(e) => setters.setSaleReason(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Preuve du droit de vente</Label>
        <Input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => {
            // Handle file upload
          }}
          required
        />
      </div>
    </div>
  );
}
