
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { fr } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ProfileFormData } from "@/types/profile";

interface ProfileFormProps {
  formData: ProfileFormData;
  isEditing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onEdit: () => void;
  onCancel: () => void;
  onSignOut: () => void;
  userEmail: string;
  userType: string | null;
}

export function ProfileForm({
  formData,
  isEditing,
  onInputChange,
  onSubmit,
  onEdit,
  onCancel,
  onSignOut,
  userEmail,
  userType,
}: ProfileFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-cmr-green font-medium">Email</Label>
          <Input
            type="email"
            value={userEmail}
            disabled
            className="bg-gray-50"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-cmr-green font-medium">Nom</Label>
          <Input
            name="last_name"
            value={formData.last_name}
            onChange={onInputChange}
            disabled={!isEditing}
            className={!isEditing ? "bg-gray-50" : ""}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-cmr-green font-medium">Prénom</Label>
          <Input
            name="first_name"
            value={formData.first_name}
            onChange={onInputChange}
            disabled={!isEditing}
            className={!isEditing ? "bg-gray-50" : ""}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-cmr-green font-medium">Téléphone</Label>
          <Input
            name="phone_number"
            value={formData.phone_number}
            onChange={onInputChange}
            disabled={!isEditing}
            className={!isEditing ? "bg-gray-50" : ""}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-cmr-green font-medium">Date de naissance</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                disabled={!isEditing}
                className={`w-full justify-start text-left font-normal ${
                  !formData.birth_date && "text-muted-foreground"
                } ${!isEditing ? "bg-gray-50" : ""}`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.birth_date ? (
                  format(formData.birth_date, "P", { locale: fr })
                ) : (
                  <span>Sélectionner une date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formData.birth_date || undefined}
                onSelect={(date) => onInputChange({
                  target: { name: 'birth_date', value: date }
                } as any)}
                initialFocus
                locale={fr}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label className="text-cmr-green font-medium">Lieu de naissance</Label>
          <Input
            name="birth_place"
            value={formData.birth_place}
            onChange={onInputChange}
            disabled={!isEditing}
            className={!isEditing ? "bg-gray-50" : ""}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-cmr-green font-medium">Numéro CNI</Label>
          <Input
            name="id_number"
            value={formData.id_number}
            onChange={onInputChange}
            disabled={!isEditing}
            className={!isEditing ? "bg-gray-50" : ""}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-cmr-green font-medium">Profession</Label>
          <Input
            name="profession"
            value={formData.profession}
            onChange={onInputChange}
            disabled={!isEditing}
            className={!isEditing ? "bg-gray-50" : ""}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-cmr-green font-medium">Lieu d'habitation</Label>
          <Input
            name="residence_place"
            value={formData.residence_place}
            onChange={onInputChange}
            disabled={!isEditing}
            className={!isEditing ? "bg-gray-50" : ""}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-cmr-green font-medium">Type de compte</Label>
          <Input
            value={userType || "Non spécifié"}
            disabled
            className="bg-gray-50"
          />
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        {!isEditing ? (
          <Button
            type="button"
            onClick={onEdit}
            className="bg-cmr-yellow text-black hover:bg-cmr-yellow/90"
          >
            Modifier le profil
          </Button>
        ) : (
          <>
            <Button
              type="submit"
              className="bg-cmr-green hover:bg-cmr-green/90"
            >
              Enregistrer
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="border-cmr-red text-cmr-red hover:bg-cmr-red/10"
            >
              Annuler
            </Button>
          </>
        )}
        <Button
          type="button"
          onClick={onSignOut}
          className="bg-cmr-red hover:bg-cmr-red/90 ml-auto"
        >
          Se déconnecter
        </Button>
      </div>
    </form>
  );
}
