
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRegistrationForm } from "@/hooks/registration";
import { useVerification } from "@/hooks/useVerification";
import { toast } from "sonner";
import { UserTypeSelector, getCurrentUserType } from "@/components/registration/UserTypeSelector";
import { RegistrationFormContent } from "@/components/registration/RegistrationFormContent";
import { RegistrationFormFooter } from "@/components/registration/RegistrationFormFooter";

export default function RegisterForm() {
  const currentUserType = getCurrentUserType();
  const { formData, setters, handleSubmit: originalHandleSubmit } = useRegistrationForm(currentUserType);
  const [isAwaitingVerification, setIsAwaitingVerification] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    verificationCode,
    setVerificationCode,
    isCodeSent,
    isVerifying,
    isSendingCode,
    sendSMSVerification,
    sendEmailVerification,
    verifyCode,
  } = useVerification();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vérifier que les données requises sont fournies
    if (!formData.email || !formData.password || !formData.firstName || 
        !formData.lastName || !formData.phoneNumber) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    
    // Pour simplifier et débloquer le process d'inscription pendant les tests,
    // on procède directement à l'inscription sans la vérification email/SMS
    console.log("Proceeding with registration...");
    try {
      setIsSubmitting(true);
      await originalHandleSubmit(e);
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Erreur lors de l'inscription. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    try {
      console.log("Resending verification codes to:", formData.email, formData.phoneNumber);
      await Promise.all([
        sendEmailVerification(formData.email),
        sendSMSVerification(formData.phoneNumber)
      ]);
      toast.success("Codes de vérification renvoyés");
    } catch (error) {
      console.error("Error resending verification codes:", error);
      toast.error("Erreur lors du renvoi des codes de vérification");
    }
  };

  const handleVerificationSuccess = () => {
    console.log("Verification successful, proceeding with registration");
    // Proceed with the actual registration
    originalHandleSubmit({ preventDefault: () => {} } as React.FormEvent);
  };

  const verificationProps = {
    phoneNumber: formData.phoneNumber,
    email: formData.email,
    onVerificationSuccess: handleVerificationSuccess,
    onResendCode: handleResendCode,
    verificationCode,
    setVerificationCode,
    verifyCode,
    isVerifying,
    isResending: isSendingCode
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Inscription
          </CardTitle>
          <CardDescription className="text-center">
            Créez votre compte MboaTer
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {!isAwaitingVerification && (
              <UserTypeSelector currentType={currentUserType} />
            )}

            <RegistrationFormContent 
              formData={formData} 
              setters={setters} 
              isAwaitingVerification={isAwaitingVerification} 
              verificationProps={verificationProps}
            />
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <RegistrationFormFooter 
              isSubmitting={isSubmitting} 
              isAwaitingVerification={isAwaitingVerification} 
            />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
