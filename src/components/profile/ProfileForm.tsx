
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { ProfileFormData } from "@/types/profile";

interface ProfileFormProps {
  formData: ProfileFormData;
  isEditing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: any } }) => void;
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
  // Générer les options pour les jours (1-31)
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  
  // Générer les options pour les mois (1-12)
  const months = [
    { value: 1, label: "Janvier" },
    { value: 2, label: "Février" },
    { value: 3, label: "Mars" },
    { value: 4, label: "Avril" },
    { value: 5, label: "Mai" },
    { value: 6, label: "Juin" },
    { value: 7, label: "Juillet" },
    { value: 8, label: "Août" },
    { value: 9, label: "Septembre" },
    { value: 10, label: "Octobre" },
    { value: 11, label: "Novembre" },
    { value: 12, label: "Décembre" },
  ];

  // Générer les options pour les années (1900 jusqu'à l'année actuelle)
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, i) => currentYear - i
  ).reverse();

  // Extraire jour, mois, année de la date actuelle
  const currentDate = formData.birth_date ? new Date(formData.birth_date) : null;
  const currentDay = currentDate ? currentDate.getDate() : "";
  const currentMonth = currentDate ? currentDate.getMonth() + 1 : "";
  const currentYear2 = currentDate ? currentDate.getFullYear() : "";

  const handleDateChange = (type: 'day' | 'month' | 'year', value: number) => {
    let newDate;
    if (!formData.birth_date) {
      // Si pas de date existante, créer une nouvelle date
      const now = new Date();
      newDate = new Date(
        type === 'year' ? value : now.getFullYear(),
        type === 'month' ? value - 1 : 0,
        type === 'day' ? value : 1
      );
    } else {
      // Modifier la date existante
      newDate = new Date(formData.birth_date);
      if (type === 'day') newDate.setDate(value);
      if (type === 'month') newDate.setMonth(value - 1);
      if (type === 'year') newDate.setFullYear(value);
    }
    
    onInputChange({
      target: {
        name: 'birth_date',
        value: newDate
      }
    });
  };

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
          <div className="grid grid-cols-3 gap-2">
            <Select
              disabled={!isEditing}
              value={currentDay.toString()}
              onValueChange={(value) => handleDateChange('day', parseInt(value))}
            >
              <SelectTrigger className={!isEditing ? "bg-gray-50" : ""}>
                <SelectValue placeholder="Jour" />
              </SelectTrigger>
              <SelectContent>
                {days.map((day) => (
                  <SelectItem key={day} value={day.toString()}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              disabled={!isEditing}
              value={currentMonth.toString()}
              onValueChange={(value) => handleDateChange('month', parseInt(value))}
            >
              <SelectTrigger className={!isEditing ? "bg-gray-50" : ""}>
                <SelectValue placeholder="Mois" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month.value} value={month.value.toString()}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              disabled={!isEditing}
              value={currentYear2.toString()}
              onValueChange={(value) => handleDateChange('year', parseInt(value))}
            >
              <SelectTrigger className={!isEditing ? "bg-gray-50" : ""}>
                <SelectValue placeholder="Année" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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
          <Select
            value={formData.user_type || ""}
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
              <SelectItem value="seller">Vendeur</SelectItem>
              <SelectItem value="buyer">Acheteur</SelectItem>
              <SelectItem value="surveyor">Géomètre</SelectItem>
              <SelectItem value="notary">Notaire</SelectItem>
              <SelectItem value="notary_clerk">Clerc de notaire</SelectItem>
            </SelectContent>
          </Select>
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
