
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  CommonFields,
  OwnerFields,
  SellerFields,
  BuyerFields,
  SurveyorFields,
  NotaryFields,
  NotaryClerkFields,
  FinancierFields,
  MoverFields
} from "./personal-info";

interface PersonalInfoSectionProps {
  idNumber: string;
  profession: string;
  residencePlace: string;
  userType: string;
  isEditing: boolean;
  propertyType?: string;
  agencyName?: string;
  commercialRegister?: string;
  operationZone?: string;
  estimatedBudget?: number;
  desiredLocation?: string;
  approvalNumber?: string;
  interventionZone?: string;
  notaryOffice?: string;
  experienceQualifications?: string;
  companyName?: string;
  legalStatus?: string;
  investmentType?: string;
  estimatedFundingCapacity?: string;
  serviceType?: string;
  transportCapacity?: string;
  insuranceIncluded?: boolean;
  associatedNotaries?: Array<{name: string; approval_number: string}>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: string | number | boolean | any[] } }) => void;
}

export function PersonalInfoSection({
  idNumber,
  profession,
  residencePlace,
  userType,
  isEditing,
  propertyType,
  agencyName,
  commercialRegister,
  operationZone,
  estimatedBudget,
  desiredLocation,
  approvalNumber,
  interventionZone,
  notaryOffice,
  experienceQualifications,
  companyName,
  legalStatus,
  investmentType,
  estimatedFundingCapacity,
  serviceType,
  transportCapacity,
  insuranceIncluded,
  associatedNotaries,
  onInputChange,
}: PersonalInfoSectionProps) {
  
  // Champs communs à plusieurs profils
  const renderCommonFields = () => (
    <CommonFields
      idNumber={idNumber}
      profession={profession}
      residencePlace={residencePlace}
      userType={userType}
      isEditing={isEditing}
      onInputChange={onInputChange}
    />
  );

  // Champs spécifiques pour chaque type de profil
  const renderProfileSpecificFields = () => {
    switch(userType) {
      case "owner":
        return (
          <OwnerFields
            propertyType={propertyType}
            isEditing={isEditing}
            onInputChange={onInputChange}
          />
        );
      
      case "seller":
        return (
          <SellerFields
            agencyName={agencyName}
            commercialRegister={commercialRegister}
            operationZone={operationZone}
            isEditing={isEditing}
            onInputChange={onInputChange}
          />
        );
      
      case "buyer":
        return (
          <BuyerFields
            estimatedBudget={estimatedBudget}
            propertyType={propertyType}
            desiredLocation={desiredLocation}
            isEditing={isEditing}
            onInputChange={onInputChange}
          />
        );
      
      case "surveyor":
        return (
          <SurveyorFields
            approvalNumber={approvalNumber}
            interventionZone={interventionZone}
            isEditing={isEditing}
            onInputChange={onInputChange}
          />
        );
      
      case "notary":
        return (
          <NotaryFields
            notaryOffice={notaryOffice}
            approvalNumber={approvalNumber}
            associatedNotaries={associatedNotaries}
            isEditing={isEditing}
            onInputChange={onInputChange}
          />
        );
      
      case "notary_clerk":
        return (
          <NotaryClerkFields
            notaryOffice={notaryOffice}
            experienceQualifications={experienceQualifications}
            isEditing={isEditing}
            onInputChange={onInputChange}
          />
        );
      
      case "financier":
        return (
          <FinancierFields
            companyName={companyName}
            legalStatus={legalStatus}
            investmentType={investmentType}
            operationZone={operationZone}
            estimatedFundingCapacity={estimatedFundingCapacity}
            isEditing={isEditing}
            onInputChange={onInputChange}
          />
        );
      
      case "mover":
        return (
          <MoverFields
            companyName={companyName}
            serviceType={serviceType}
            transportCapacity={transportCapacity}
            interventionZone={interventionZone}
            insuranceIncluded={insuranceIncluded}
            isEditing={isEditing}
            onInputChange={onInputChange}
          />
        );
      
      default:
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
  };

  return (
    <>
      {renderCommonFields()}
      {renderProfileSpecificFields()}
    </>
  );
}
