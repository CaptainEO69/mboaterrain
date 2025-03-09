
import {
  OwnerFields,
  SellerFields,
  BuyerFields,
  SurveyorFields,
  NotaryFields,
  NotaryClerkFields,
  FinancierFields,
  MoverFields,
  ProfileTypeSelector
} from ".";

interface UserTypeFieldsRendererProps {
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
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: any } }) => void;
}

export function UserTypeFieldsRenderer({
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
  onInputChange
}: UserTypeFieldsRendererProps) {
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
        <ProfileTypeSelector
          userType={userType}
          isEditing={isEditing}
          onInputChange={onInputChange}
        />
      );
  }
}
