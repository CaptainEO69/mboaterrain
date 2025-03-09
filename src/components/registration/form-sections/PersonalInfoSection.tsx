
import { RegistrationFormData, RegistrationFormSetters } from "@/types/registration";
import { getCurrentUserType } from "../UserTypeSelector";
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
  formData: RegistrationFormData;
  setters: RegistrationFormSetters;
}

export function PersonalInfoSection({ formData, setters }: PersonalInfoSectionProps) {
  const userType = getCurrentUserType();

  const renderSpecificFields = () => {
    switch (userType) {
      case "owner":
        return (
          <OwnerFields
            propertyType={formData.propertyType}
            setPropertyType={setters.setPropertyType}
          />
        );
      
      case "seller":
        return (
          <SellerFields
            agencyName={formData.agencyName}
            commercialRegister={formData.commercialRegister}
            operationZone={formData.operationZone}
            setAgencyName={setters.setAgencyName}
            setCommercialRegister={setters.setCommercialRegister}
            setOperationZone={setters.setOperationZone}
          />
        );
      
      case "buyer":
        return (
          <BuyerFields
            estimatedBudget={formData.estimatedBudget}
            propertyType={formData.propertyType}
            desiredLocation={formData.desiredLocation}
            setEstimatedBudget={setters.setEstimatedBudget}
            setPropertyType={setters.setPropertyType}
            setDesiredLocation={setters.setDesiredLocation}
          />
        );
      
      case "surveyor":
        return (
          <SurveyorFields
            approvalNumber={formData.approvalNumber}
            interventionZone={formData.interventionZone}
            setApprovalNumber={setters.setApprovalNumber}
            setInterventionZone={setters.setInterventionZone}
          />
        );
      
      case "notary":
        return (
          <NotaryFields
            notaryOffice={formData.notaryOffice}
            approvalNumber={formData.approvalNumber}
            setNotaryOffice={setters.setNotaryOffice}
            setApprovalNumber={setters.setApprovalNumber}
          />
        );
      
      case "notary_clerk":
        return (
          <NotaryClerkFields
            notaryOffice={formData.notaryOffice}
            experienceQualifications={formData.experienceQualifications}
            setNotaryOffice={setters.setNotaryOffice}
            setExperienceQualifications={setters.setExperienceQualifications}
          />
        );
      
      case "financier":
        return (
          <FinancierFields
            companyName={formData.companyName}
            legalStatus={formData.legalStatus}
            investmentType={formData.investmentType}
            operationZone={formData.operationZone}
            estimatedFundingCapacity={formData.estimatedFundingCapacity}
            setCompanyName={setters.setCompanyName}
            setLegalStatus={setters.setLegalStatus}
            setInvestmentType={setters.setInvestmentType}
            setOperationZone={setters.setOperationZone}
            setEstimatedFundingCapacity={setters.setEstimatedFundingCapacity}
          />
        );
      
      case "mover":
        return (
          <MoverFields
            companyName={formData.companyName}
            serviceType={formData.serviceType}
            transportCapacity={formData.transportCapacity}
            interventionZone={formData.interventionZone}
            insuranceIncluded={formData.insuranceIncluded}
            setCompanyName={setters.setCompanyName}
            setServiceType={setters.setServiceType}
            setTransportCapacity={setters.setTransportCapacity}
            setInterventionZone={setters.setInterventionZone}
            setInsuranceIncluded={setters.setInsuranceIncluded}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <CommonFields 
        formData={formData} 
        setters={setters} 
        userType={userType} 
      />
      {renderSpecificFields()}
    </div>
  );
}
