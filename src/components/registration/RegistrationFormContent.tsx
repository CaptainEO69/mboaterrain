
import { useState } from "react";
import { RegistrationFormData, RegistrationFormSetters } from "@/types/registration";
import { PersonalInfoSection } from "@/components/registration/form-sections/PersonalInfoSection";
import { ProfessionalSection } from "@/components/registration/form-sections/ProfessionalSection";
import { VerificationForm } from "@/components/auth/VerificationForm";
import { getCurrentUserType } from "./UserTypeSelector";
import { toast } from "sonner";
import { CountryCode } from "libphonenumber-js";
import { BasicFormFields } from "./form-fields/BasicFormFields";

interface RegistrationFormContentProps {
  formData: RegistrationFormData;
  setters: RegistrationFormSetters;
  isAwaitingVerification: boolean;
  verificationProps: {
    phoneNumber: string;
    email: string;
    onVerificationSuccess: () => void;
    onResendCode: () => Promise<void>;
    verificationCode: string;
    setVerificationCode: (code: string) => void;
    verifyCode: (code: string) => boolean;
    isVerifying: boolean;
    isResending: boolean;
  };
}

export function RegistrationFormContent({
  formData,
  setters,
  isAwaitingVerification,
  verificationProps,
}: RegistrationFormContentProps) {
  const currentUserType = getCurrentUserType();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [verificationCompleted, setVerificationCompleted] = useState<boolean>(false);
  const [countryCode, setCountryCode] = useState<CountryCode>("CM");

  const handleVerificationSuccess = () => {
    setVerificationCompleted(true);
    toast.success("Vérification réussie! Vous pouvez maintenant continuer.");
    
    // Appeler la fonction de succès fournie par les props
    if (verificationProps.onVerificationSuccess) {
      verificationProps.onVerificationSuccess();
    }
  };

  if (isAwaitingVerification) {
    return <VerificationForm 
      {...verificationProps} 
      onVerificationSuccess={handleVerificationSuccess}
    />;
  }

  return (
    <div className="space-y-6">
      {/* Champs de base pour tous les types d'utilisateurs */}
      <BasicFormFields
        firstName={formData.firstName}
        lastName={formData.lastName}
        email={formData.email}
        phoneNumber={formData.phoneNumber}
        birthDate={formData.birthDate}
        password={formData.password}
        countryCode={countryCode}
        setFirstName={setters.setFirstName}
        setLastName={setters.setLastName}
        setEmail={setters.setEmail}
        setPhoneNumber={setters.setPhoneNumber}
        setBirthDate={setters.setBirthDate}
        setPassword={setters.setPassword}
        onCountryChange={setCountryCode}
      />

      {currentUserType && (
        <>
          {(currentUserType === "owner" || 
            currentUserType === "seller" || 
            currentUserType === "surveyor" || 
            currentUserType === "notary" || 
            currentUserType === "notary_clerk" ||
            currentUserType === "financier" ||
            currentUserType === "mover") && (
            <PersonalInfoSection formData={formData} setters={setters} />
          )}

          {(currentUserType === "surveyor" || 
            currentUserType === "notary" || 
            currentUserType === "notary_clerk") && (
            <ProfessionalSection
              type={currentUserType as "surveyor" | "notary" | "notary_clerk"}
              formData={formData}
              setters={setters}
            />
          )}
        </>
      )}
    </div>
  );
}
