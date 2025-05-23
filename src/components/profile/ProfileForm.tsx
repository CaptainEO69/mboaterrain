
import { Button } from "@/components/ui/button";
import { ProfileFormData } from "@/types/profile";
import { BasicInfoSection } from "./form-sections/BasicInfoSection";
import { BirthInfoSection } from "./form-sections/BirthInfoSection";
import { PersonalInfoSection } from "./form-sections/PersonalInfoSection";

interface ProfileFormProps {
  formData: ProfileFormData;
  isEditing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: any } }) => void;
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
  const handleDateChange = (type: 'day' | 'month' | 'year', value: number) => {
    let newDate;
    if (!formData.birth_date) {
      const now = new Date();
      newDate = new Date(
        type === 'year' ? value : now.getFullYear(),
        type === 'month' ? value - 1 : 0,
        type === 'day' ? value : 1
      );
    } else {
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
        <BasicInfoSection
          userEmail={userEmail}
          lastName={formData.last_name}
          firstName={formData.first_name}
          phoneNumber={formData.phone_number}
          isEditing={isEditing}
          onInputChange={onInputChange}
        />

        <BirthInfoSection
          birthDate={formData.birth_date}
          birthPlace={formData.birth_place}
          isEditing={isEditing}
          onDateChange={handleDateChange}
          onInputChange={onInputChange}
        />

        <PersonalInfoSection
          idNumber={formData.id_number}
          profession={formData.profession}
          residencePlace={formData.residence_place}
          userType={formData.user_type}
          isEditing={isEditing}
          propertyType={formData.property_type}
          agencyName={formData.agency_name}
          commercialRegister={formData.commercial_register}
          operationZone={formData.operation_zone}
          estimatedBudget={formData.estimated_budget}
          desiredLocation={formData.desired_location}
          approvalNumber={formData.approval_number}
          interventionZone={formData.intervention_zone}
          notaryOffice={formData.notary_office}
          experienceQualifications={formData.experience_qualifications}
          companyName={formData.company_name}
          legalStatus={formData.legal_status}
          investmentType={formData.investment_type}
          estimatedFundingCapacity={formData.estimated_funding_capacity}
          serviceType={formData.service_type}
          transportCapacity={formData.transport_capacity}
          insuranceIncluded={formData.insurance_included}
          associatedNotaries={formData.associated_notaries}
          onInputChange={onInputChange}
        />
      </div>

      <div className="flex flex-wrap gap-4 justify-between items-center pt-4">
        <div className="flex gap-4 flex-wrap">
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
        </div>
        <Button
          type="button"
          onClick={onSignOut}
          className="bg-cmr-red hover:bg-cmr-red/90"
        >
          Se déconnecter
        </Button>
      </div>
    </form>
  );
}
