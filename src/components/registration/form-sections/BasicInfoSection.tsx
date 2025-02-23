
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/sell/ImageUpload";

interface BasicInfoSectionProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    profileImage: File | null;
  };
  setters: {
    setFirstName: (value: string) => void;
    setLastName: (value: string) => void;
    setEmail: (value: string) => void;
    setPhoneNumber: (value: string) => void;
    setPassword: (value: string) => void;
    setProfileImage: (value: File | null) => void;
  };
}

export function BasicInfoSection({ formData, setters }: BasicInfoSectionProps) {
  const handleImageChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      setters.setProfileImage(files[0]);
    } else {
      setters.setProfileImage(null);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>Nom</Label>
        <Input
          value={formData.lastName}
          onChange={(e) => setters.setLastName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Prénom</Label>
        <Input
          value={formData.firstName}
          onChange={(e) => setters.setFirstName(e.target.value)}
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
      <div className="space-y-2">
        <Label>Photo de profil</Label>
        <ImageUpload onChange={handleImageChange} />
      </div>
    </div>
  );
}
