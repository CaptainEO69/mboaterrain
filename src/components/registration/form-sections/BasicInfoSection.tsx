
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BasicInfoSectionProps {
  formData: {
    fullName: string;
    email: string;
    phoneNumber: string;
    password: string;
  };
  setters: {
    setFullName: (value: string) => void;
    setEmail: (value: string) => void;
    setPhoneNumber: (value: string) => void;
    setPassword: (value: string) => void;
  };
}

export function BasicInfoSection({ formData, setters }: BasicInfoSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>Nom complet</Label>
        <Input
          value={formData.fullName}
          onChange={(e) => setters.setFullName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Email</Label>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => setters.setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Téléphone</Label>
        <Input
          type="tel"
          value={formData.phoneNumber}
          onChange={(e) => setters.setPhoneNumber(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Mot de passe</Label>
        <Input
          type="password"
          value={formData.password}
          onChange={(e) => setters.setPassword(e.target.value)}
          required
          minLength={6}
        />
      </div>
    </div>
  );
}
