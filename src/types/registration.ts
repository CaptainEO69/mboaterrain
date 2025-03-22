
// Types related to user registration
export interface RegistrationFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  birthPlace: string;
  birthDate: Date | null;
  idNumber: string;
  profession: string;
  residencePlace: string;
  saleReason: string;
  isCertified: boolean;
  notaryOffice: string;
  servicePrices: Record<string, number>;
  
  // Property specific fields
  propertyType: string;
  agencyName: string;
  commercialRegister: string;
  operationZone: string;
  estimatedBudget: number;
  desiredLocation: string;
  approvalNumber: string;
  interventionZone: string;
  experienceQualifications: string;
  companyName: string;
  legalStatus: string;
  investmentType: string;
  estimatedFundingCapacity: string;
  serviceType: string;
  transportCapacity: string;
  insuranceIncluded: boolean;
}

export interface RegistrationFormSetters {
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setPhoneNumber: (value: string) => void;
  setBirthPlace: (value: string) => void;
  setBirthDate: (value: Date | null) => void;
  setIdNumber: (value: string) => void;
  setProfession: (value: string) => void;
  setResidencePlace: (value: string) => void;
  setSaleReason: (value: string) => void;
  setIsCertified: (value: boolean) => void;
  setNotaryOffice: (value: string) => void;
  setServicePrices: (value: Record<string, number>) => void;
  
  // Property specific setters
  setPropertyType: (value: string) => void;
  setAgencyName: (value: string) => void;
  setCommercialRegister: (value: string) => void;
  setOperationZone: (value: string) => void;
  setEstimatedBudget: (value: number) => void;
  setDesiredLocation: (value: string) => void;
  setApprovalNumber: (value: string) => void;
  setInterventionZone: (value: string) => void;
  setExperienceQualifications: (value: string) => void;
  setCompanyName: (value: string) => void;
  setLegalStatus: (value: string) => void;
  setInvestmentType: (value: string) => void;
  setEstimatedFundingCapacity: (value: string) => void;
  setServiceType: (value: string) => void;
  setTransportCapacity: (value: string) => void;
  setInsuranceIncluded: (value: boolean) => void;
}

export interface RegistrationResult {
  formData: RegistrationFormData;
  setters: RegistrationFormSetters;
  handleSubmit: (e: React.FormEvent) => Promise<{
    success: boolean;
    redirectToOTP?: boolean;
    message?: string;
  } | undefined>;
}

// Types pour géolocalisation et propriétés
export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface PropertyWithLocation extends Coordinates {
  distance?: number; // Distance en km par rapport à l'utilisateur
}
