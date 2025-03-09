
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProfileTypeSelectorProps {
  userType: string;
  isEditing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: any } }) => void;
}

export function ProfileTypeSelector({ 
  userType, 
  isEditing, 
  onInputChange 
}: ProfileTypeSelectorProps) {
  return (
    <div className="space-y-2">
      <Label className="text-cmr-green font-medium">Type de compte</Label>
      <Select
        value={userType || ""}
        onValueChange={(value) => 
          onInputChange({ target: { name: 'user_type', value } })
        }
        disabled={!isEditing}
      >
        <SelectTrigger className={!isEditing ? "bg-gray-50" : ""}>
          <SelectValue placeholder="Choisir un type de compte" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="owner">Propriétaire</SelectItem>
          <SelectItem value="seller">Agence/Mandataire</SelectItem>
          <SelectItem value="buyer">Acheteur/Locataire</SelectItem>
          <SelectItem value="surveyor">Géomètre</SelectItem>
          <SelectItem value="notary">Notaire</SelectItem>
          <SelectItem value="notary_clerk">Clerc de notaire</SelectItem>
          <SelectItem value="financier">Financier Lotisseur</SelectItem>
          <SelectItem value="mover">Déménageur</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
