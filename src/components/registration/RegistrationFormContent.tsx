
import { useState } from "react";
import { RegistrationFormData, RegistrationFormSetters } from "@/types/registration";
import { BasicInfoSection } from "@/components/registration/form-sections/BasicInfoSection";
import { PersonalInfoSection } from "@/components/registration/form-sections/PersonalInfoSection";
import { ProfessionalSection } from "@/components/registration/form-sections/ProfessionalSection";
import { VerificationForm } from "@/components/auth/VerificationForm";
import { getCurrentUserType } from "./UserTypeSelector";

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

  if (isAwaitingVerification) {
    return <VerificationForm {...verificationProps} />;
  }

  return (
    <>
      {currentUserType && (
        <>
          <BasicInfoSection formData={formData} setters={setters} />

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
    </>
  );
}
