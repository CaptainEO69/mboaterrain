
import { useState } from "react";
import { RegistrationFormData, RegistrationFormSetters } from "@/types/registration";

export function useRegistrationState() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [idNumber, setIdNumber] = useState("");
  const [profession, setProfession] = useState("");
  const [residencePlace, setResidencePlace] = useState("");
  const [saleReason, setSaleReason] = useState("");
  const [isCertified, setIsCertified] = useState(false);
  const [notaryOffice, setNotaryOffice] = useState("");
  const [servicePrices, setServicePrices] = useState<Record<string, number>>({});
  
  // Nouveaux champs
  const [propertyType, setPropertyType] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [commercialRegister, setCommercialRegister] = useState("");
  const [operationZone, setOperationZone] = useState("");
  const [estimatedBudget, setEstimatedBudget] = useState<number>(0);
  const [desiredLocation, setDesiredLocation] = useState("");
  const [approvalNumber, setApprovalNumber] = useState("");
  const [interventionZone, setInterventionZone] = useState("");
  const [experienceQualifications, setExperienceQualifications] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [legalStatus, setLegalStatus] = useState("");
  const [investmentType, setInvestmentType] = useState("");
  const [estimatedFundingCapacity, setEstimatedFundingCapacity] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [transportCapacity, setTransportCapacity] = useState("");
  const [insuranceIncluded, setInsuranceIncluded] = useState(false);

  const formData: RegistrationFormData = {
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
    birthPlace,
    birthDate,
    idNumber,
    profession,
    residencePlace,
    saleReason,
    isCertified,
    notaryOffice,
    servicePrices,
    propertyType,
    agencyName,
    commercialRegister,
    operationZone,
    estimatedBudget,
    desiredLocation,
    approvalNumber,
    interventionZone,
    experienceQualifications,
    companyName,
    legalStatus,
    investmentType,
    estimatedFundingCapacity,
    serviceType,
    transportCapacity,
    insuranceIncluded,
  };

  const setters: RegistrationFormSetters = {
    setEmail,
    setPassword,
    setFirstName,
    setLastName,
    setPhoneNumber,
    setBirthPlace,
    setBirthDate,
    setIdNumber,
    setProfession,
    setResidencePlace,
    setSaleReason,
    setIsCertified,
    setNotaryOffice,
    setServicePrices,
    setPropertyType,
    setAgencyName,
    setCommercialRegister,
    setOperationZone,
    setEstimatedBudget,
    setDesiredLocation,
    setApprovalNumber,
    setInterventionZone,
    setExperienceQualifications,
    setCompanyName,
    setLegalStatus,
    setInvestmentType,
    setEstimatedFundingCapacity,
    setServiceType,
    setTransportCapacity,
    setInsuranceIncluded,
  };

  return {
    formData,
    setters
  };
}
