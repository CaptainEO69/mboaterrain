
import { CommonFields } from "./personal-info";
import { UserTypeFieldsRenderer } from "./personal-info/UserTypeFieldsRenderer";

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
  return (
    <>
      <CommonFields
        idNumber={idNumber}
        profession={profession}
        residencePlace={residencePlace}
        userType={userType}
        isEditing={isEditing}
        onInputChange={onInputChange}
      />
      <UserTypeFieldsRenderer
        userType={userType}
        isEditing={isEditing}
        propertyType={propertyType}
        agencyName={agencyName}
        commercialRegister={commercialRegister}
        operationZone={operationZone}
        estimatedBudget={estimatedBudget}
        desiredLocation={desiredLocation}
        approvalNumber={approvalNumber}
        interventionZone={interventionZone}
        notaryOffice={notaryOffice}
        experienceQualifications={experienceQualifications}
        companyName={companyName}
        legalStatus={legalStatus}
        investmentType={investmentType}
        estimatedFundingCapacity={estimatedFundingCapacity}
        serviceType={serviceType}
        transportCapacity={transportCapacity}
        insuranceIncluded={insuranceIncluded}
        associatedNotaries={associatedNotaries}
        onInputChange={onInputChange}
      />
    </>
  );
}
