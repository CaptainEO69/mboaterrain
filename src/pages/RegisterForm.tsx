
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRegistrationForm } from "@/hooks/useRegistrationForm";
import { useVerification } from "@/hooks/useVerification";
import { toast } from "sonner";
import { UserTypeSelector, getCurrentUserType } from "@/components/registration/UserTypeSelector";
import { RegistrationFormContent } from "@/components/registration/RegistrationFormContent";
import { RegistrationFormFooter } from "@/components/registration/RegistrationFormFooter";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const navigate = useNavigate();
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
    
    try {
      console.log("Début de l'inscription...");
      setIsSubmitting(true);
      
      // Appel direct à la fonction originale
      const result = await originalHandleSubmit(e);
      
      // Si nous arrivons ici, l'inscription a réussi
      toast.success(result?.message || "Inscription réussie !");
      
      // Si l'API demande une redirection vers OTP
      if (result?.redirectToOTP) {
        console.log("Redirection vers la page de vérification OTP...");
        // Vous pouvez ajouter ici la redirection vers la page OTP
        // Par exemple:
        navigate("/verify-otp");
      } else {
        // Comportement par défaut existant
        // Redirection vers la page de connexion après un court délai
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
      
    } catch (error: any) {
      console.error("Erreur lors de l'inscription:", error);
      toast.error(error.message || "Inscription échouée, veuillez réessayer plus tard.");
    } finally {
      setIsSubmitting(false);
    }
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
              verificationProps={{
                phoneNumber: formData.phoneNumber,
                email: formData.email,
                onVerificationSuccess: () => {},
                onResendCode: async () => {},
                verificationCode,
                setVerificationCode,
                verifyCode,
                isVerifying,
                isResending: isSendingCode
              }}
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
